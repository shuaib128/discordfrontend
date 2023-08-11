import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/system';
import MessageInputBox from '../components/Message/MessageDisplay/MessageInputBox'
import { motion } from "framer-motion"
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
import { getUser } from '../redux/Profile/ProfileActions';
import ImagePreview from '../components/Message/MessageDisplay/ImagePreview';
import Connected from '../components/ConnectionStatus/Connected';
import Connecting from '../components/ConnectionStatus/Connecting';
import Disconnected from '../components/ConnectionStatus/Disconnected';
import { useGetLatestChatUser } from '../components/Message/GetLatestChatUser';
import { useGetPreviousChats } from '../components/Message/GetPreviousChats';
import { transformedData } from '../components/Message/FileTransfer/transformedData';
import { storeDataInIndexedDB } from '../components/Message/FileTransfer/indexedDB';
import { transferFiles } from '../components/Message/FileTransfer/transferFiles';
import PostUploadingProgress from '../components/Message/FileTransfer/PostUploadingProgress/PostUploadingProgress';

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
    const [Files, setFiles] = useState([]);
    const FilesRef = useRef(Files);
    const [SendingFile, setSendingFile] = useState(false)
    const [Progress, setProgress] = useState(0)

    //Chech who you were talking to from localhost
    useEffect(() => {
        getLatestChatUser()
    }, [])

    /**Keep the files updated */
    useEffect(() => {
        FilesRef.current = Files;
    }, [Files]);

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
        /**
         * Add all data to data variable
         */
        var data = {
            type: "message",
            "message": Message,
            "user": User
        }

        setMessage("")
        if (socket.readyState === WebSocket.OPEN) {
            /**
         * Send it to backend &
         * setMessage and setFiles empty
         */
            socket.binaryType = "blob";
            socket.send(JSON.stringify(data));

            /**
             * Send data to friend list
             */
            function sendToFriendList() {
                SendData(
                    "POST",
                    "/api/users/user/friends/add/",
                    JSON.stringify(
                        {
                            selectedUser: SelectedUser,
                        }
                    )
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
            dispatch(getMessages([data]));
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
                const parsedMessage = JSON.parse(message).chat;
                dispatch(getMessages([parsedMessage]));
                sendFiles(message)
            });
        } catch (error) {

        }
    }, [socket, User, SelectedUser])

    /**Handle file upload */
    const handleFileChange = async (e) => {
        const newFiles = e.target.files;
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }

    /**Send Media Files */
    const sendFiles = async (message) => {
        /**Start uploading files */
        setSendingFile(true)

        /**Clear media input */
        const mediaField = document.querySelector(".media-fields")
        mediaField.value = ''

        const message_json = JSON.parse(message).chat
        const Files = FilesRef.current
        if (Files.length === 0) return;

        /**Save it in a way that is uploadable even after refresh */
        const transformedFiles = await transformedData(
            Files,
            message_json.id,
            message_json.sender.username
        );

        /**Save data in indexedDB */
        const mediaData = [
            { id: 1, files: transformedFiles },
            { id: 2, post_id: message_json.id },
            {
                id: 3,
                author_username: message_json.sender.username,
                chatroom: GetChatroom(User, SelectedUser)
            },
        ];
        await storeDataInIndexedDB(mediaData)
        setFiles([])

        /**Run transferFiles in the background */
        setTimeout(async () => {
            try {
                await transferFiles(
                    setProgress,
                    setSendingFile
                ).then(() => {
                    setSendingFile(false)
                })
            } catch (error) {
                /**Handle any errors that occurred during the transfer */
                console.error(error);
            }
        }, 0);
    }


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
                            File={Files}
                            setFile={setFiles}
                        /> :
                        <Box></Box>
                    }

                    <motion.div
                        style={{
                            width: "calc(100% - 20px)",
                            position: "absolute",
                            top: "-28px",
                            margin: "0px 10px"
                        }}
                        className="post-progress"
                        animate={SendingFile ? "open" : "closed"}
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            closed: { opacity: 0, height: 0 },
                        }}
                    >

                    </motion.div>
                    <MessageInputBox
                        File={Files}
                        Message={Message}
                        setMessage={setMessage}
                        handleSubmit={handleSubmit}
                        handleFileChange={handleFileChange}
                    />
                </Box> :
                <Box></Box>
            }
        </Box>
    )
}

export default Home