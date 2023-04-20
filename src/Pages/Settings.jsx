import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlackLight } from '../utilits/Colors/Colors';
import SettingsTabs from '../components/SettingsComponent/SettingsTabs';
import MyAccountTab from '../components/SettingsComponent/MyAccount/MyAccountTab';

export default function Settings() {
    let Tab;
    const [SelectedTab, setSelectedTab] = useState("My Account")

    switch (SelectedTab) {
        case 'My Account':
            Tab = <MyAccountTab
                SelectedTab="My Account"
            />
            break;
        case "Profile":
            Tab = <MyAccountTab
                SelectedTab="Profile"
            />
            break;
        case "Privacy & Safety":
            Tab = <MyAccountTab
                SelectedTab="Privacy & Safety"
            />
            break;
        default:
            Tab = <MyAccountTab
                SelectedTab="My Account"
            />
            break;
    }

    return (
        <Box
            sx={{
                gridTemplateColumns: "30% 70%",
                width: "100%",
                display: ["block", "block", "grid", "grid"],
                height: "100%",
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    backgroundColor: BlackLight,
                    paddingTop: "30px",
                    display: ["none", "none", "flex", "flex"],
                    justifyContent: "end",
                    paddingRight: ["0px", "0px", "20px", "20px"],
                    position: ["fixed", "fixed", "static", "static"],
                    height: "100vh",
                    width: "100%",
                    top: 0,
                    zIndex: 3
                }}
                className="setting-tab"
            >
                <Box sx={{  
                    width: ["cacl(100% - 50px)", "cacl(100% - 50px)", "205px", "205px"],
                    marginX: "25px"
                }}>
                    <Typography
                        variant="button"
                        display="block"
                        gutterBottom
                        color="whitesmoke"
                    >
                        user settings
                    </Typography>

                    <SettingsTabs
                        SelectedTab={SelectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#313338",
                    paddingX: "20px",
                    paddingY: "40px"
                }}
            >
                <Box
                    sx={{
                        width: ["100%,", "100%", "650px", "650px"]
                    }}
                >
                    {Tab}
                </Box>
            </Box>
        </Box>
    );
}