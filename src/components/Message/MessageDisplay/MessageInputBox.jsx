import React, { useRef } from 'react'
import { Box } from '@mui/system';
import { BlackLightMore } from '../../../utilits/Colors/Colors';
import UseAutosizeTextArea from "./UseAutosizeTextArea";
import IconButton from '@mui/material/IconButton';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const MessageInputBox = ({
    File,
    Message,
    setMessage,
    handleSubmit,
    handleFileChange
}) => {
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
            >
                <DriveFolderUploadIcon
                    style={{ color: "white", width: "30px" }}
                />

                <input
                    className='media-fields'
                    type="file"
                    accept="image/*, video/*"
                    multiple
                    onChange={handleFileChange}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "100%",
                        cursor: "pointer",
                        opacity: 0
                    }}
                />
            </IconButton>

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