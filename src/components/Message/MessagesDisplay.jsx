import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { BackendLink } from '../../utilits/BackendLink';
import { FormatedDateTime } from "../../utilits/Date/Main";

const MessagesDisplay = ({ Messages }) => {
    const scrollableContainer = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the container when Messages change or when the component first mounts
        scrollableContainer.current.scrollTop = scrollableContainer.current.scrollHeight;
    }, [Messages]);

    return (
        <Box
            ref={scrollableContainer}
            sx={{
                padding: "0px 17px",
                height: "calc(100vh - 175px)",
                overflowY: "scroll"
            }}
        >
            {Messages && Messages.map((message, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            marginTop: "20px",
                            display: "flex",
                        }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={BackendLink + message.sender.profile_picture}
                            sx={{ width: 45, height: 45 }}
                        />

                        <Box sx={{ marginLeft: "15px" }}>
                            <Box>
                                <Typography
                                    fontWeight={550}
                                    color="white"
                                    variant="subtitle1"
                                    gutterBottom
                                    margin={0}
                                    paddingBottom={0}
                                >
                                    {message.sender.username}
                                </Typography>

                                <Typography
                                    color="#b2b1b1"
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                    fontSize="11.5px"
                                    margin={0}
                                    padding={0}
                                    lineHeight="25px"
                                >
                                    {FormatedDateTime(message.timestamp)}
                                </Typography>
                            </Box>

                            {message.images.length !== 0 ?
                                <Box
                                    sx={{
                                        width: ["100%", "350px", "350px", "350px"]
                                    }}
                                >
                                    {message.images.map((image, index) => {
                                        return (
                                            <img
                                                style={{
                                                    marginBottom: "7px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer"
                                                }}
                                                key={index}
                                                src={BackendLink + image.image}
                                            />
                                        )
                                    })}
                                </Box> :
                                <Box></Box>
                            }
                            <Typography
                                fontWeight={550}
                                color="#dcdcdc"
                                variant="body1"
                                gutterBottom
                            >
                                {message.content}
                            </Typography>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default MessagesDisplay;