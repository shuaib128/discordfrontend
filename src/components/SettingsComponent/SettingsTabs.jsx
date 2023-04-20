import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlackLightMore } from '../../utilits/Colors/Colors';

const SettingsTabs = ({ SelectedTab, setSelectedTab }) => {
    //Tab component
    function Tab({ Name }) {
        return (
            <Box
                sx={{
                    backgroundColor: SelectedTab === Name ? BlackLightMore : "inherit",
                    padding: "5px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                onClick={() => {
                    setSelectedTab(Name)

                    const selectedUserDOM = document.querySelector(".setting-tab")
                    var computedStyle = window.getComputedStyle(selectedUserDOM);

                    if (computedStyle.display === "none") {
                        selectedUserDOM.style.cssText = "display: block"
                    } else {
                        selectedUserDOM.style.cssText = "display: none"
                    }
                }}
            >
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    color="white"
                    margin={0}
                >
                    {Name}
                </Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Tab
                Name="My Account"
            />
            <Tab
                Name="Profile"
            />
            <Tab
                Name="Privacy & Safety"
            />
        </Box>
    )
}

export default SettingsTabs