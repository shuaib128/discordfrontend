import React, { useState, useRef } from 'react'
import { Box } from '@mui/system';
import { BlackLightMore } from '../../utilits/Colors/Colors';
import UseAutosizeTextArea from "./UseAutosizeTextArea";

const MessageInputBox = () => {
    const [value, setValue] = useState("");
    const textAreaRef = useRef();

    UseAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (evt) => {
        const val = evt.target?.value;
        setValue(val);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "53px",
                left: "15px",
                width: "calc(100% - 30px)"
            }}
        >
            <textarea
                onChange={handleChange}
                rows={1}
                placeholder="Send a message"
                value={value}
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