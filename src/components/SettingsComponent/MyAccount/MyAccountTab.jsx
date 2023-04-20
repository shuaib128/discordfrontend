import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PrifileImageTop from './PrifileImageTop';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MyAccountTab = ({ SelectedTab }) => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: ["block", "block", "block", "none"],
                        zIndex: 2,
                        marginRight: "7px"
                    }}
                    onClick={() => {
                        const selectedUserDOM = document.querySelector(".setting-tab")
                        var computedStyle = window.getComputedStyle(selectedUserDOM);

                        if (computedStyle.display === "none") {
                            selectedUserDOM.style.cssText = "display: block"
                        } else {
                            selectedUserDOM.style.cssText = "display: none"
                        }
                    }}
                >
                    <IconButton color="primary" aria-label="open user info" sx={{ padding: 0, marginTop: "-8px" }}>
                        <MenuIcon
                            style={{ color: "white", width: "20px" }}
                        />
                    </IconButton>
                </Box>

                <Typography
                    variant="h6"
                    gutterBottom
                    color="white"
                >
                    {SelectedTab}
                </Typography>
            </Box>

            <PrifileImageTop />
        </Box>
    )
}

export default MyAccountTab