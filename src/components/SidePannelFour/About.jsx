import React from 'react'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography';
import { FormatedDate, Main } from "../../utilits/Date/Main"

const About = ({ SelectedUser }) => {
    return (
        <Box sx={{
            backgroundColor: "#111214",
            marginX: "15px",
            paddingX: "13px",
            paddingY: "15px",
            marginTop: "-20px",
            borderRadius: 1.5
        }}>
            <Box
                sx={{ marginBottom: "10px" }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    color="white"
                    paddingBottom="5px"
                    borderBottom="1px solid #474444"
                >
                    {SelectedUser && SelectedUser.username}
                </Typography>
            </Box>

            <Box sx={{ marginBottom: "10px", borderBottom: "1px solid #474444" }}>
                <Typography
                    variant="body2"
                    gutterBottom
                    color="white"
                >
                    DESCORD MEMBER SINCE
                </Typography>
                <Typography
                    variant="overline"
                    gutterBottom
                    color="white"
                    paddingBottom="5px"
                >
                    {FormatedDate(SelectedUser && SelectedUser.created_at)}
                </Typography>
            </Box>

            <Box sx={{ marginBottom: "10px" }}>
                <Typography
                    variant="body2"
                    gutterBottom
                    color="white"
                >
                    NOTE
                </Typography>
                <Typography
                    variant="overline"
                    gutterBottom
                    color="white"
                    lineHeight="25px"
                >
                    {SelectedUser && SelectedUser.bio}
                </Typography>
            </Box>
        </Box>
    )
}

export default About