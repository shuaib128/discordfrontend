import React from 'react'
import { Box } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import { BackendLink } from '../../utilits/BackendLink'
import { PlaceHostColor } from '../../utilits/Colors/Colors';

const MessagesFound = ({ messages, SearchValue }) => {
    function ScrollToMessage(id) {
        /**Scroll to the chat */
        var chatElement = document.getElementById(id)
        chatElement.scrollIntoView({ behavior: "auto", block: "center" })

        chatElement.classList.remove("found-message")
        chatElement.classList.add("found-message")

        /**Remove the style after 5 seconds */
        setTimeout(() => {
            chatElement.classList.remove("found-message")
        }, 3000);

        /**Close the pannel */
        const pannelOne = document.querySelector(".pannel-one")
        const pannelTwo = document.querySelector(".pannel-two")

        var pannelOneStyle = window.getComputedStyle(pannelOne);
        if (window.innerWidth >= 899 && pannelOneStyle.display !== "none") {
            pannelOne.style.cssText = "display: block"
            pannelTwo.style.cssText = "display: block"
        } else {
            pannelOne.style.cssText = "display: none"
            pannelTwo.style.cssText = "display: none"
        }
    }

    return (
        <Box>
            {messages.map((message, _) => {
                var message_ = ""
                const sentence = message.content;
                const word = SearchValue;
                const numofletter = 14

                if (sentence.length > 28) {
                    if (sentence.indexOf(word) !== -1) {
                        const startIndex = sentence.indexOf(word);
                        const endIndex = startIndex + word.length;

                        const firstTen = sentence.substr(Math.max(0, startIndex - numofletter), numofletter);
                        const lastTen = sentence.substr(endIndex, numofletter);

                        message_ = `${firstTen}${SearchValue}${lastTen}`;
                    } else {
                        console.log(`"${word}" not found in the sentence`);
                    }
                } else {
                    message_ = sentence
                }

                return (
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: "15px",
                            cursor: "pointer"
                        }}
                        key={message.id}
                        onClick={() => ScrollToMessage(message.id)}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={BackendLink + message.sender.profile_picture}
                            sx={{ width: 45, height: 45 }}
                        />

                        <Box>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                color='white'
                                ml='15px'
                            >
                                {message.sender.username}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                ml='15px'
                                color={PlaceHostColor}
                            >
                                {message_}
                            </Typography>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default MessagesFound