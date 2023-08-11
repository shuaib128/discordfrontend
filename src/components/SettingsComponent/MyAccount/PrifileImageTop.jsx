import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Black } from '../../../utilits/Colors/Colors';
import UserNameChangeBlock from './UserNameChangeBlock';
import { useDispatch, useSelector } from 'react-redux';
import { BackendLink } from '../../../utilits/BackendLink';
import FetchData from '../../../utilits/Data/FetchData';
import { getUser } from '../../../redux/Profile/ProfileActions';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import SendData from '../../../utilits/Data/SendData';
import { BlackLight, BlackLightMore } from '../../../utilits/Colors/Colors';
import ButtonComponent from '../../Button/Button';
import { resizeImageFile } from '../../../utilits/Compression/imageCompress';

const PrifileImageTop = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.Profile.User)
    const [Loading, setLoading] = useState(false)

    const [ProfileImage, setProfileImage] = useState("")
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserPhoneNumber, setUserPhoneNumber] = useState("")
    const [UserNote, setUserNote] = useState("")

    useEffect(() => {
        FetchData("/api/users/user/").then(data => {
            dispatch(getUser(data))
        });
    }, []);

    useEffect(() => {
        setUserName(user.username)
        setUserEmail(user.email)
        setUserNote(user.bio)
    }, [user])

    /**
     * Handle submit function
     */
    function handleSubmit() {
        SendData(
            "PATCH",
            "/api/users/user/update/",
            JSON.stringify(
                {
                    bio: UserNote,
                    profile_picture: ProfileImage,
                }
            )
        ).then((data) => { })
    }

    //Handle file change
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const resizedFile = await resizeImageFile(file, 440, 280);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(resizedFile);

        fileReader.addEventListener('load', (event) => {
            const dataUrl = event.target.result;
            setProfileImage(dataUrl)
        });
    };


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
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            alt={user.username}
                            src={ProfileImage === "" ?
                                `${BackendLink}${user.profile_picture}` :
                                ProfileImage
                            }
                            sx={{ width: 85, height: 85, }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: '-11px',
                                right: '-8px'
                            }}
                        >
                            <Box>
                                <IconButton
                                    color="primary"
                                    aria-label="open menu"
                                    sx={{
                                        position: "relative",
                                        cursor: "pointer",
                                        float: "right"
                                    }}
                                    onClick={() => {

                                    }}
                                >
                                    <CreateIcon
                                        style={{ color: "#f46f3e", width: "30px" }}
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
                                        onChange={handleFileChange}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>

                    <Typography ml="15px" color="white" variant="h6" gutterBottom>
                        {user.username}
                    </Typography>
                </Box>

                {ProfileImage !== "" ?
                    <Box sx={{ width: "100px" }} onClick={() => handleSubmit()}>
                        <ButtonComponent
                            Text="Save"
                            TextColor="white"
                            Loading={Loading}
                            Height="40px"
                            BG={BlackLightMore}
                            BGHover={BlackLight}
                        />
                    </Box> :
                    <Box></Box>
                }
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
                    Value={UserName}
                    setValue={setUserName}
                />

                <UserNameChangeBlock
                    Lavel="email"
                    Value={UserEmail}
                    setValue={setUserEmail}
                />

                <UserNameChangeBlock
                    Lavel="phone number"
                    Value="+44409822"
                    setValue={setUserPhoneNumber}
                />

                <UserNameChangeBlock
                    Lavel="note"
                    Value={UserNote}
                    setValue={setUserNote}
                />
            </Box>
        </Box>
    )
}

export default PrifileImageTop