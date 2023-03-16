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
                display: "grid",
                height: "100%",
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    backgroundColor: BlackLight,
                    paddingTop: "30px",
                    display: "flex",
                    justifyContent: "end",
                    paddingRight: "20px"
                }}
            >
                <Box sx={{ width: "205px" }}>
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
                    padding: "20px 40px",
                }}
            >
                <Box width="650px">
                    {Tab}
                </Box>
            </Box>
        </Box>
    );
}