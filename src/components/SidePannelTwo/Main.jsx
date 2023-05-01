import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import Search from './Search'
import MessagesOptions from './MessagesOptions'
import User from './User'
import { useSelector } from 'react-redux'
import Modal from '@mui/material/Modal';
import SearchFriendModal from './SearchFriendModal'
import SendData from '../../utilits/Data/SendData'
import MessagesFound from './MessagesFound'
import GetChatroom from '../Message/GetChatroom'

const MainPannelTwo = () => {
    const user = useSelector(state => state.Profile.User)
    const SelectedUser = useSelector(state => state.SelectedUser.SelectedUser)

    const chatRoom = GetChatroom(user, SelectedUser)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [SearchValue, setSearchValue] = useState("")
    const [FoundMessages, setFoundMessages] = useState([])
    const [timerId, setTimerId] = useState(null);
    const [Loading, setLoading] = useState(false);

    /**Send message to search message */
    useEffect(() => {
        const trimmedSearchValue = SearchValue.trim();
        if (trimmedSearchValue.length > 1) {
            if (timerId) {
                clearTimeout(timerId);
            }

            const newTimerId = setTimeout(() => SendData(
                "POST", "/api/chat/search/message/", {
                    message: trimmedSearchValue,
                    chatroom: chatRoom
                }
            ).then((data) => {
                if (data !== "No user found") {
                    setFoundMessages(data);
                    setLoading(false)
                } else {
                    setLoading(false)
                    setFoundMessages([]);
                    /**Handle case where no messages were found */
                }
            }), 500);

            setTimerId(newTimerId);
        } else {
            setFoundMessages([]);
        }
    }, [SearchValue])

    return (
        <Box sx={{
            width: ["calc(100% - 111px)", "calc(100% - 111px)", "250px", "250px"],
            position: ["fixed", "fixed", "relative", "relative"],
            paddingX: "13px",
            height: "100vh",
            zIndex: 4,
            backgroundColor: "#2b2d31"
        }}>
            <Search
                SearchValue={SearchValue}
                setSearchValue={setSearchValue}
                setLoading={setLoading}
            />
            {FoundMessages.length === 0 ?
                <MessagesOptions
                    handleOpen={handleOpen}
                /> :
                <MessagesFound 
                    messages={FoundMessages}
                    SearchValue={SearchValue}
                />
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SearchFriendModal
                    handleClose={handleClose}
                />
            </Modal>
            <User />
        </Box>
    )
}

export default MainPannelTwo