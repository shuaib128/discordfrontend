import React, { useState } from 'react'
import { Box } from '@mui/system';
import MessageInputBox from '../components/Message/MessageInputBox'
import MessageTop from '../components/Message/MessageTop';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUser } from '../redux/Messages/MessagesActions';
import SendData from '../utilits/Data/SendData';
import GetChatroom from '../components/Message/GetChatroom';
import MessagesDisplay from '../components/Message/MessagesDisplay';
import { getMessages } from '../redux/Messages/MessagesActions';
import { resetMessages } from '../redux/Messages/MessagesActions';
import { GetToken } from '../utilits/Token/GetToken';
import { BackendLinkChat } from '../utilits/BackendLink';
import ChatMessages from '../components/SkalitonLoader/ChatMessages';
import { resizeImageFile } from '../utilits/Compression/imageCompress';
import { getUser } from '../redux/Profile/ProfileActions';
import ImagePreview from '../components/Message/ImagePreview';

function Home() {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const User = useSelector(state => state.Profile.User)
    const SelectedUser = useSelector(state => state.SelectedUser.SelectedUser)
    const SelectedUsers = useSelector(state => state.Profile.SelectedUsers)
    const Messages = useSelector(state => state.SelectedUser.Messages)
    const [Message, setMessage] = useState("")
    const [Loading, setLoading] = useState(false)
    const [File, setFile] = useState([]);

    //Chech who you were talking to from localhost
    React.useEffect(() => {
        try {
            dispatch(getSelectedUser(
                JSON.parse(localStorage.getItem("SelectedUser"))
            ))
        } catch (error) {

        }
    }, [])

    //Get chats from the chat room
    React.useEffect(() => {
        try {
            setLoading(true)
            const chatRoom = GetChatroom(User, SelectedUser)
            SendData(
                "POST",
                "/api/chat/chatroom/",
                {
                    chatRoom: chatRoom,
                    user: User.username,
                    selectedUser: SelectedUser.username
                }
            ).then((data) => {
                /**
                 * Delete all the messages from the redux messages and
                 * add message from history
                 */
                dispatch(resetMessages())
                dispatch(getMessages(data.chatContext))
                setLoading(false)
            })
        } catch (error) {

        }
    }, [User, SelectedUser])

    //Connect to the websocket
    React.useEffect(() => {
        const url_end = GetChatroom(User, SelectedUser)
        const newSocket = new WebSocket(
            `ws://${BackendLinkChat}/ws/chat/${url_end}/?token=${GetToken().accessToken}`
        );
        setSocket(newSocket);
        return () => newSocket.close();
    }, [User, SelectedUser])

    //Send the message onclick
    const handleSubmit = () => {
        /**
         * Add al data to data variable
         */
        var data = {
            "message": Message,
            "user": User,
            "image_length": File.length
        }
        for (const file in File) {
            data[`img${file}`] = File[file]
        }

        /**
         * Send it to backend &
         * setMessage and setFile empty
         */
        socket.send(JSON.stringify(data));
        setMessage("")
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
        if (SelectedUsers && SelectedUsers.length === 0) {
            sendToFriendList()
        } else {
            const foundObject = SelectedUsers.find(obj => obj.username === SelectedUser.username);

            if (!foundObject) {
                sendToFriendList()
            }
        }
    };

    //Recives the text
    React.useEffect(() => {
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

        for (let i = 0; i < files.length; i++) {
            const resizedFile = await resizeImageFile(files[i], 440, 280);

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

    /**
     * Remove Image Item
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
                    <MessageInputBox
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