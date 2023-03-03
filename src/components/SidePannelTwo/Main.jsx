import React from 'react'
import { Box } from '@mui/system'
import Search from './Search'
import MessagesOptions from './MessagesOptions'
import User from './User'

const MainPannelTwo = () => {
    return (
        <Box sx={{
            width: "250px",
            paddingX: "13px",
            height: "100vh",
            position: "relative"
        }}>
            <Search />
            <MessagesOptions />
            <User />
        </Box>
    )
}

export default MainPannelTwo