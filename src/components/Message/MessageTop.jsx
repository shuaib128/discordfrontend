import React from 'react'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { BlackLightMore } from '../../utilits/Colors/Colors';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DuoIcon from '@mui/icons-material/Duo';

const MessageTop = ({ SelectedUser }) => {
    return (
        <Box
            sx={{
                borderBottom: `1px solid ${BlackLightMore}`,
                padding: "8px 17px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    color="white"
                    mb={0}
                >
                    @ {SelectedUser.username}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <IconButton color="primary" aria-label="open user info">
                    <LocalPhoneIcon
                        style={{ color: "white", width: "20px" }}
                    />
                </IconButton>
                <IconButton color="primary" aria-label="open user info">
                    <DuoIcon
                        style={{ color: "white", width: "20px" }}
                    />
                </IconButton>

                <Box
                    sx={{
                        display: ["block", "block", "block", "none"],
                        zIndex: 3
                    }}
                    onClick={() => {
                        const selectedUserDOM = document.querySelector(".selected-user")
                        var computedStyle = window.getComputedStyle(selectedUserDOM);

                        if (computedStyle.right === "-700px") {
                            selectedUserDOM.style.cssText = "right: 0px; transition: 0.5s"
                        } else {
                            selectedUserDOM.style.cssText = "right: -700px; transition: 0.5s"
                        }
                    }}
                >
                    <IconButton color="primary" aria-label="open user info">
                        <PeopleAltIcon
                            style={{ color: "white", width: "20px" }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default MessageTop