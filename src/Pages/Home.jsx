import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import MessageInputBox from '../components/Message/MessageDisplay/MessageInputBox'
import MessageTop from '../components/Message/MessageTop';
import { useSelector, useDispatch } from 'react-redux';
import SendData from '../utilits/Data/SendData';
import GetChatroom from '../components/Message/GetChatroom';
import MessagesDisplay from '../components/Message/MessageDisplay/MessagesDisplay';
import { getMessages } from '../redux/Messages/MessagesActions';
import { resetMessages } from '../redux/Messages/MessagesActions';
import { GetToken } from '../utilits/Token/GetToken';
import { BackendLinkChat } from '../utilits/BackendLink';
import ChatMessages from '../components/SkalitonLoader/ChatMessages';
import { resizeImageFile } from '../utilits/Compression/imageCompress';
import { getUser } from '../redux/Profile/ProfileActions';
import ImagePreview from '../components/Message/MessageDisplay/ImagePreview';
import Connected from '../components/ConnectionStatus/Connected';
import Connecting from '../components/ConnectionStatus/Connecting';
import Disconnected from '../components/ConnectionStatus/Disconnected';
import SendingFileLoading from '../components/Message/Image/SendingFileLoading';
import VideoSendingProgress from '../components/Message/Video/VideoSendingProgress';
import { sendVideoChunks } from '../components/Message/Video/sendVideoChunks';
import { useGetLatestChatUser } from '../components/Message/GetLatestChatUser';
import { useGetPreviousChats } from '../components/Message/GetPreviousChats';

function Home() {
    const { getLatestChatUser } = useGetLatestChatUser();
    const { getPreviousChats } = useGetPreviousChats();

    const [socket, setSocket] = useState(null);
    const [unsentMessages, setUnsentMessages] = useState([]);
    /**-----------Connecting sates--------------------- */
    const [ConnectingStatus, setConnectingStatus] = useState(false)
    const [ConnectedStatus, setConnectedStatus] = useState(false)
    const [DisconnectedStatus, setDisconnectedStatus] = useState(false)
    /**---------------------------------------------------*/
    const dispatch = useDispatch();
    const User = useSelector(state => state.Profile.User)
    const SelectedUser = useSelector(state => state.SelectedUser.SelectedUser)
    const SelectedUsers = useSelector(state => state.Profile.SelectedUsers)
    const Messages = useSelector(state => state.SelectedUser.Messages)
    const [Message, setMessage] = useState("")
    const [Loading, setLoading] = useState(false)
    const [File, setFile] = useState([]);
    const [VideoFile, setVideoFile] = useState([]);
    const [SendingFile, setSendingFile] = useState(false)
    const [SendingVideoFile, setSendingVideoFile] = useState(false)
    const [VideoFileSentPercentage, setVideoFileSentPercentage] = useState(0)
    const [VideoFileName, setVideoFileName] = useState("")

    //Chech who you were talking to from localhost
    useEffect(() => {
        getLatestChatUser()
    }, [])

    //Get chats from the chat room
    useEffect(() => {
        getPreviousChats(
            setLoading,
            User,
            SelectedUser
        )
    }, [User, SelectedUser])

    //Connect to the websocket
    useEffect(() => {
        if (SelectedUser !== null) {
            try {
                // Get the chatroom URL endpoint based on the current user and selected user
                const url_end = GetChatroom(User, SelectedUser);

                // Create a new WebSocket connection to the chatroom using the URL endpoint and access token
                const newSocket = new WebSocket(`${BackendLinkChat}/ws/chat/${url_end}/?token=${GetToken().accessToken}`);

                // Set the new socket as the state for the component
                setSocket(newSocket);

                // Define a function to handle the WebSocket connection being opened
                const handleOpen = () => {
                    setConnectedStatus(true);
                    setConnectingStatus(false);
                    setDisconnectedStatus(false);
                };

                // Define a function to handle the WebSocket connection being closed
                const handleClose = () => {
                    setDisconnectedStatus(true);
                    setConnectedStatus(false);
                    setConnectingStatus(true);
                };

                // Define a function to handle errors with the WebSocket connection
                const handleError = () => {
                    setDisconnectedStatus(true);
                    setConnectedStatus(false);
                    setConnectingStatus(true);
                };

                // Check the ready state of the new socket and update the component's connection status accordingly
                if (newSocket.readyState === WebSocket.CONNECTING) {
                    setConnectingStatus(true);
                    setDisconnectedStatus(false);
                    newSocket.addEventListener("error", handleError);
                } else if (newSocket.readyState === WebSocket.OPEN) {
                    setConnectedStatus(true);
                    setConnectingStatus(false);
                    setDisconnectedStatus(false);
                } else if (newSocket.readyState === WebSocket.CLOSED) {
                    handleClose();
                }

                // Add event listeners for the WebSocket connection being opened, closed, and encountering an error
                newSocket.addEventListener("open", handleOpen);
                newSocket.addEventListener("close", handleClose);
                newSocket.addEventListener("error", handleError);

                // Clean up the event listeners and close the WebSocket connection when the component is unmounted
                return () => {
                    newSocket.removeEventListener("open", handleOpen);
                    newSocket.removeEventListener("close", handleClose);
                    newSocket.removeEventListener("error", handleError);
                    newSocket.close();
                };
            } catch (error) {

            }
        }
    }, [User, SelectedUser]);


    //Send the message onclick
    const handleSubmit = () => {
        if (File.length !== 0) {
            setSendingFile(true)
        }
        /**
         * Add al data to data variable
         */
        var data = {
            type: "message",
            "message": Message,
            "user": User,
            "image_length": File.length,
            "video_length": VideoFile.length
        }
        for (const file in File) {
            data[`img${file}`] = File[file]
        }
        for (const video in VideoFile) {
            data[`vid${video}`] = VideoFile[video]
        }

        setMessage("")
        if (socket.readyState === WebSocket.OPEN) {
            /**
         * Send it to backend &
         * setMessage and setFile empty
         */
            socket.binaryType = "blob";
            socket.send(JSON.stringify(data));

            /**Get responce that data has been sent */
            socket.addEventListener('message', (event) => {
                setSendingFile(false)
            });
            setFile([])

            /**
             * Send data to friend list
             */
            function sendToFriendList() {
                SendData(
                    "POST",
                    "/api/users/user/friends/add/",
                    {
                        selectedUser: SelectedUser,
                    }
                ).then((data) => {
                    dispatch(getUser(data))
                })
            }
            /**Check if the user is in chatlist
             * If not add them
             */
            if (SelectedUsers && SelectedUsers.length === 0) {
                sendToFriendList()
            } else {
                const foundObject = SelectedUsers.find(
                    obj => obj.username === SelectedUser.username
                );

                if (!foundObject) {
                    sendToFriendList()
                }
            }
        } else {
            dispatch(getMessages([...Messages, data]))
            // Add message to unsent messages array
            setUnsentMessages([...unsentMessages, data]);
        }
    };


    /**Try to reconnect and send all the unsent messages */
    React.useEffect(() => {
        const url_end = GetChatroom(User, SelectedUser);
        const intervalId = setInterval(() => {
            if (SelectedUser !== null && socket.readyState === WebSocket.CLOSED) {
                try {
                    const newSocket = new WebSocket(
                        `wss://${BackendLinkChat}/ws/chat/${url_end}/?token=${GetToken().accessToken}`
                    );
                    setSocket(newSocket);

                    newSocket.addEventListener("open", () => {
                        setConnectedStatus(true);
                        setConnectingStatus(false);
                        setDisconnectedStatus(false);

                        // Send all unsent messages
                        unsentMessages.forEach(message => newSocket.send(JSON.stringify(message)));
                        setUnsentMessages([]);
                    });

                    newSocket.addEventListener("close", () => {
                        setDisconnectedStatus(true);
                        setConnectedStatus(false);
                        setConnectingStatus(true);
                    });

                    newSocket.addEventListener("error", () => {
                        setDisconnectedStatus(true);
                        setConnectedStatus(false);
                        setConnectingStatus(true);
                    });
                } catch (error) {

                }
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [socket, unsentMessages]);


    //Recives the text
    useEffect(() => {
        /** 
         * Get data back and save to getMessages
         */
        dispatch(resetMessages())
        try {
            socket.addEventListener('message', (event) => {
                const message = event.data;

                dispatch(getMessages([...Messages, JSON.parse(message).chat]))
            });
        } catch (error) {

        }
    }, [socket, User, SelectedUser])


    //Handle file change
    const handleFileChange = async (e) => {
        const files = e.target.files;
        const newFiles = [];

        /**Resize the images and add it to Files useState */
        for (let i = 0; i < files.length; i++) {
            const resizedFile = await resizeImageFile(files[i], 840, 680);

            const fileReader = new FileReader();
            fileReader.readAsDataURL(resizedFile);

            fileReader.addEventListener('load', (event) => {
                const dataUrl = event.target.result;
                newFiles.push(dataUrl);

                if (newFiles.length === files.length) {
                    setFile([...File, ...newFiles]);
                }
            });
        }
    };


    /**Handle video file input */
    const handleVideoInputChange = async (event) => {
        setSendingVideoFile(true)
        //let the server know videos are comming
        socket.send(JSON.stringify({
            type: "incoming",
            "user": User,
        }));

        const files = event.target.files;

        // loop through each file and send it to sendVideoChunks
        for (let i = 0; i < files.length; i++) {
            setVideoFileSentPercentage(0)
            const file = files[i];
            var filename = file.name
            setVideoFileName(filename)

            // Wrap the FileReader logic in a Promise
            await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);

                reader.onloadend = async () => {
                    const videoBuffer = new Uint8Array(reader.result).buffer;

                    socket.binaryType = "arraybuffer";
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify({
                            type: "title",
                            filename,
                        }));
                    }

                    // Pass the resolve function to sendVideoChunks
                    sendVideoChunks(
                        filename,
                        socket,
                        videoBuffer,
                        0,
                        resolve,
                        setVideoFileSentPercentage
                    );
                };
            });
        }
        //let the server know all video came
        socket.send(JSON.stringify({ type: "allvideocame", }));
        setSendingVideoFile(false)
    }

    /**
     * Remove Image Item when clicked delete button
     */
    const removeItem = (index) => {
        const newItems = File.filter((_, i) => i !== index);
        setFile(newItems);
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "100vh",
                width: ["100vw", "100vw", "auto", "auto"]
            }}
        >
            {SelectedUser && Object.keys(SelectedUser).length !== 0 ?
                <Box>
                    <MessageTop
                        SelectedUser={SelectedUser}
                    />

                    {ConnectedStatus && <Connected />}
                    {ConnectingStatus && <Connecting />}
                    {DisconnectedStatus && <Disconnected />}

                    {!Loading ?
                        <MessagesDisplay
                            Messages={Messages}
                        /> :
                        <ChatMessages />
                    }

                    {File.length !== 0 ?
                        <ImagePreview
                            File={File}
                            removeItem={removeItem}
                        /> :
                        <Box></Box>
                    }

                    {SendingFile && <SendingFileLoading />}
                    {
                        SendingVideoFile &&
                        <VideoSendingProgress
                            VideoFileName={VideoFileName}
                            VideoFileSentPercentage={VideoFileSentPercentage}
                        />
                    }
                    <MessageInputBox
                        Message={Message}
                        setMessage={setMessage}
                        handleSubmit={handleSubmit}
                        handleFileChange={handleFileChange}
                        handleVideoInputChange={handleVideoInputChange}
                    />
                </Box> :
                <Box></Box>
            }
        </Box>
    )
}

export default Home