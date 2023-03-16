import React from 'react'
import { Box } from '@mui/system'
import Search from './Search'
import MessagesOptions from './MessagesOptions'
import User from './User'
import Modal from '@mui/material/Modal';
import SearchFriendModal from './SearchFriendModal'

const MainPannelTwo = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{
            width: "250px",
            paddingX: "13px",
            height: "100vh",
            position: "relative"
        }}>
            <Search />
            <MessagesOptions 
                handleOpen={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SearchFriendModal />
            </Modal>
            <User />
        </Box>
    )
}

export default MainPannelTwo