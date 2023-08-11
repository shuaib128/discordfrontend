import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material'
import { Black } from '../../utilits/Colors/Colors';
import SendData from '../../utilits/Data/SendData';
import { StyledBadge } from './ActiveIndicatorAvatar';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { BackendLink } from '../../utilits/BackendLink';
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedUser } from '../../redux/Messages/MessagesActions';
import { SetSelectedUser } from '../Message/SetSelectedUserLocalhost';

const SearchFriendModal = (props) => {
    const dispatch = useDispatch();
    const Profile = useSelector(state => state.Profile.User)
    const [User, setUser] = useState("");
    const [Users, setUsers] = useState([]);
    const [timerId, setTimerId] = useState(null);
    const [Loading, setLoading] = useState(false);

    function FetchUser(text) {
        setUsers([])
        setUser(text);
        setLoading(true)
    }

    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => SendData(
            "POST", 
            "/api/users/user/search/", 
            JSON.stringify(User)
        ).then((data) => {
            if (data !== "No user found") {
                setUsers(data);
                setLoading(false)
            } else {
                setLoading(false)
            }
        }), 500);
        setTimerId(newTimerId);
    }, [User])

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: ["calc(100% - 72px)", "400px", "400px", "400px"],
                bgcolor: '#2e3035',
                boxShadow: 24,
                p: 2,
                paddingBottom: 0
            }}
        >
            <Typography
                variant="button"
                gutterBottom
                color={"white"}
            >
                Send Friend Requests
            </Typography>

            <input
                className='search-input'
                autoFocus
                type="search"
                placeholder='Find a friend to start talking'
                onChange={(e) => FetchUser(e.target.value)}
                style={{
                    border: 0,
                    backgroundColor: Black,
                    color: "white",
                    width: '100%',
                    height: '40px',
                    marginTop: '10px',
                    padding: "0px 10px",
                }}
            />

            {Loading ? <CircularProgress sx={{ mt: "10px" }} color="inherit" /> : ""}

            <Box sx={{ marginTop: "15px" }}>
                {User !== "" ?
                    <Box>
                        {Users.map((user, index) => {
                            if (user.username !== Profile.username) {
                                return (
                                    <div onClick={() => {
                                        dispatch(getSelectedUser(user))
                                        props.handleClose()
                                        SetSelectedUser(user)

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
                                    }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "10px",
                                                cursor: "pointer",
                                                padding: "8px 16px",
                                                borderRadius: 1.3,
                                                transition: ".5s"
                                            }}
                                            key={index}
                                        >
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                variant="dot"
                                            >
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={BackendLink + user.profile_picture}
                                                />
                                            </StyledBadge>

                                            <Typography
                                                variant="subtitle2"
                                                gutterBottom
                                                color='white'
                                                ml='15px'
                                            >
                                                {user.username}
                                            </Typography>
                                        </Box>
                                    </div>
                                )
                            }
                        })}
                    </Box> :
                    <Box></Box>
                }
            </Box>
        </Box>
    )
}

export default SearchFriendModal