import React, { useRef } from 'react'
import { Box } from '@mui/system';
import { BlackLightMore } from '../../../utilits/Colors/Colors';
import UseAutosizeTextArea from "./UseAutosizeTextArea";
import IconButton from '@mui/material/IconButton';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Popover from '@mui/material/Popover';

const MessageInputBox = ({ Message, setMessage, handleSubmit, handleFileChange, handleVideoInputChange }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const OpenFileOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const textAreaRef = useRef();
    UseAutosizeTextArea(textAreaRef.current, Message);

    const handleChange = (evt) => {
        const val = evt.target?.value;
        setMessage(val);
    };

    const handleKeyPress = (evt) => {
        if (evt.keyCode === 13 || evt.which === 13) {
            evt.preventDefault();
            handleSubmit()
        }
    }

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: ["53px", "53px", "44px", "44px"],
                left: "15px",
                width: "calc(100% - 30px)",
                display: "flex",
                alignItems: "center"
            }}
        >
            <IconButton
                color="primary"
                aria-label="open menu"
                sx={{
                    position: "relative",
                    cursor: "pointer",
                    paddingLeft: 0
                }}
                onClick={OpenFileOptions}
            >
                <DriveFolderUploadIcon
                    style={{ color: "white", width: "30px" }}
                />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ padding: "5px 15px" }}>
                    <IconButton
                        color="primary"
                        aria-label="open menu"
                        sx={{
                            position: "relative",
                            cursor: "pointer",
                            paddingLeft: 0
                        }}
                    >
                        <ImageIcon
                            style={{ color: "black", width: "30px" }}
                        />
                        <input
                            style={{
                                position: "absolute",
                                left: 0,
                                width: "100%",
                                cursor: "pointer",
                                opacity: 0
                            }}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </IconButton>

                    <IconButton
                        color="primary"
                        aria-label="open menu"
                        sx={{
                            position: "relative",
                            cursor: "pointer",
                            paddingLeft: 0
                        }}
                    >
                        <VideoLibraryIcon
                            style={{ color: "black", width: "30px" }}
                        />
                        <input
                            style={{
                                position: "absolute",
                                left: 0,
                                width: "100%",
                                cursor: "pointer",
                                opacity: 0
                            }}
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={handleVideoInputChange}
                        />
                    </IconButton>
                </Box>
            </Popover>

            <textarea
                className='message-input'
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                rows={1}
                placeholder="Send a message"
                value={Message}
                ref={textAreaRef}
                style={{
                    width: "calc(100% - 40px)",
                    borderRadius: "5px",
                    backgroundColor: BlackLightMore,
                    border: "none",
                    color: "white",
                    fontSize: "15px",
                    padding: "15px 20px",
                    resize: "none"
                }}
            />
        </Box>
    )
}

export default MessageInputBox