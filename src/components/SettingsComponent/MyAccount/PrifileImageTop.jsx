import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ButtonComponent from '../../Button/Button';
import Typography from '@mui/material/Typography';
import { Orange, OrangeLight, Black } from '../../../utilits/Colors/Colors';
import UserNameChangeBlock from './UserNameChangeBlock';
import { useDispatch, useSelector } from 'react-redux';
import { BackendLink } from '../../../utilits/BackendLink';
import FetchData from '../../../utilits/Data/FetchData';
import { getUser } from '../../../redux/Profile/ProfileActions';

const PrifileImageTop = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.Profile.User)
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        FetchData("/api/users/user/").then(data => {
            dispatch(getUser(data))
        });
    }, []);

    return (
        <Box sx={{ backgroundColor: Black, paddingBottom: "20px" }}>
            <Box
                sx={{
                    backgroundColor: "#2b2f3b",
                    width: "100%",
                    height: "100px",
                    marginTop: "13px",
                    borderTopRightRadius: "5px",
                    borderToLeftRadius: "5px",
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 20px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt={user.username}
                        src={`${BackendLink}${user.profile_picture}`}
                        sx={{ width: 85, height: 85, }}
                    />

                    <Typography ml="15px" color="white" variant="h6" gutterBottom>
                        {user.username}
                    </Typography>
                </Box>

                <Box>
                    <ButtonComponent
                        Text="Save User Profile"
                        TextColor="white"
                        Loading={Loading}
                        Height="35px"
                        BG={Orange}
                        BGHover={OrangeLight}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#313338",
                    width: "calc(100% - 80px)",
                    margin: "0 auto",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    paddingTop: "5px"
                }}
            >
                <UserNameChangeBlock
                    Lavel="username"
                    Value={user.username}
                />

                <UserNameChangeBlock
                    Lavel="email"
                    Value={user.email}
                />

                <UserNameChangeBlock
                    Lavel="phone number"
                    Value="+44409822"
                />
            </Box>
        </Box>
    )
}

export default PrifileImageTop