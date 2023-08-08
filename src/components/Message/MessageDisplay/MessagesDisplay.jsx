import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { BackendLink } from '../../../utilits/BackendLink';
import { FormatedDateTime } from "../../../utilits/Date/Main";
import Modal from '@mui/material/Modal';
import DisplayImages from '../Image/DisplayImages';
import VideoDisplay from '../Video/VideoDisplay';

const MessagesDisplay = ({ Messages }) => {
    const scrollableContainer = useRef(null);
    const [ImageModalOpen, setImageModalOpen] = useState(false)
    const [PreviewImage, setPreviewImage] = useState("")

    const handleOpen = (imageURL) => {
        setPreviewImage(imageURL)
        setImageModalOpen(true)
    };
    const handleClose = () => setImageModalOpen(false);

    useEffect(() => {
        /**Scroll to the bottom of the container when Messages change or when the component first mounts */
        scrollableContainer.current.scrollTop = scrollableContainer.current.scrollHeight;
    }, [Messages]);

    /**Infinity scroll handler */
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

        if (scrollTop === 0) {
            console.log("Reached the top of the scroll!");
        }

        if (scrollHeight - scrollTop === clientHeight) {
            console.log("Reached the bottom of the scroll!");
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: ["85%", "85%", 450, 450],
        bgcolor: 'background.paper',
    };

    return (
        <Box
            ref={scrollableContainer}
            onScroll={handleScroll}
            sx={{
                padding: "0px 17px",
                height: "calc(100vh - 175px)",
                overflowY: "scroll"
            }}
        >
            <Modal
                open={ImageModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={PreviewImage} alt="prev-img" />
                </Box>
            </Modal>

            {Messages && Messages.map((message, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            marginTop: "20px",
                            display: "flex",
                            transition: "0.3s"
                        }}
                        id={message.id}
                    >
                        `<Avatar
                            alt="Remy Sharp"
                            src={BackendLink + message.sender.profile_picture}
                            sx={{ width: 45, height: 45 }}
                        />`

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

                            <DisplayImages
                                message={message}
                                handleOpen={handleOpen}
                            />

                            <VideoDisplay
                                message={message}
                            />

                            <Typography
                                fontWeight={550}
                                color="#dcdcdc"
                                variant="body1"
                                style={{ whiteSpace: 'pre-wrap' }}
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
