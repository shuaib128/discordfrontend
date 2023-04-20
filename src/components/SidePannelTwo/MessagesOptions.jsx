import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { PlaceHostColor } from '../../utilits/Colors/Colors'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import MessagesOption from './MessagesOption';
import { useSelector, useDispatch } from 'react-redux';
import { BackendLink } from '../../utilits/BackendLink';
import { getSelectedUser } from '../../redux/Messages/MessagesActions';
import { SetSelectedUser } from '../Message/SetSelectedUserLocalhost';
import { getSelectedUsers } from '../../redux/Profile/ProfileActions';

const MessagesOptions = (props) => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.Profile.User)
    const SelectedUsers = useSelector(state => state.Profile.SelectedUsers)

    useEffect(() => {
        dispatch(getSelectedUsers(User.chat_friend))
    }, [User])

    return (
        <Box sx={{ marginTop: "14px" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    color={PlaceHostColor}
                >
                    Direct Messages
                </Typography>

                <Button onClick={props.handleOpen}>
                    <AddIcon
                        style={{
                            color: "white",
                            width: "20px"
                        }}
                    />
                </Button>
            </Box>

            <Box>
                {SelectedUsers && SelectedUsers.map((option, index) => {
                    return (
                        <Box
                            key={index}
                            onClick={() => {
                                dispatch(getSelectedUser(option))
                                SetSelectedUser(option)

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
                            }}
                        >
                            <MessagesOption
                                Name={option.username}
                                Image={BackendLink + option.profile_picture}
                            />
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default MessagesOptions