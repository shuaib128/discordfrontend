import React from 'react'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography';
import { Black } from '../../utilits/Colors/Colors';

const About = () => {
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
                    carlitos.206
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
                    Jan 07, 2021
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur und.
                </Typography>
            </Box>
        </Box>
    )
}

export default About