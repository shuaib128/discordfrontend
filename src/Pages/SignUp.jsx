import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { Blue, Black, BlueDark } from '../utilits/Colors/Colors';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { BackendLink } from '../utilits/BackendLink';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const SignUp = () => {
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [IsLoading, setIsLoading] = useState(false)
    const [isAlert, setisAlert] = useState(false)

    const navigate = useNavigate();

    const inputStyle = {
        border: 0,
        backgroundColor: Black,
        color: "white",
        width: 'calc(100% - 28px)',
        height: '50px',
        marginTop: '10px',
        padding: "0px 14px",
        fontSize: "15px"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setisAlert(false)
        setIsLoading(true)

        fetch(`${BackendLink}/api/users/user/create/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: UserName,
                email: UserEmail,
                password: UserPassword
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => {
                if (data) {
                    setisAlert(false)
                    setIsLoading(false)
                    navigate("/signin")
                }
            })
            .catch((error) => {
                console.error(error);
                setisAlert(true)
                setIsLoading(false)
            });
    };
    //Label component
    function LabelComponent({ Text }) {
        return (
            <InputLabel
                id="age-label"
                sx={{
                    color: "white",
                    fontSize: "15px"
                }}
            >
                {Text}
            </InputLabel>
        )
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(Blue),
        backgroundColor: Blue,
        '&:hover': {
            backgroundColor: BlueDark,
        },
    }));

    return (
        <Box sx={{ backgroundColor: Blue, height: "100vh" }}>
            <Container
                maxWidth="md"
                sx={{
                    position: "absolute",
                    top: "50%",
                    margin: "0 auto",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#313338",
                    padding: "40px 30px",
                    borderRadius: "6px",
                    display: "flex"
                }}
            >
                <Box
                    sx={{
                        width: "60%"
                    }}
                >
                    <Typography
                        variant="h5"
                        color="white"
                        textAlign="center"
                        gutterBottom
                    >
                        Welcome back!
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        textAlign="center"
                        color="#b9b9b9"
                        marginBottom="13px"
                        gutterBottom
                    >
                        So excited to see you again
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: "17px" }}>
                            <LabelComponent
                                Text={"User name"}
                            />
                            <input
                                className='search-input'
                                type="text"
                                style={inputStyle}
                                name="User Name"
                                value={UserName}
                                required
                                disabled={IsLoading}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Box>

                        <Box sx={{ marginBottom: "17px" }}>
                            <LabelComponent
                                Text={"Email address"}
                            />
                            <input
                                className='search-input'
                                type="email"
                                style={inputStyle}
                                name="User Email"
                                value={UserEmail}
                                required
                                disabled={IsLoading}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </Box>

                        <Box sx={{ marginBottom: "5px" }}>
                            <LabelComponent
                                Text={"Create Password"}
                            />
                            <input
                                className='search-input'
                                type="password"
                                style={inputStyle}
                                name="User Password"
                                value={UserPassword}
                                required
                                disabled={IsLoading}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </Box>

                        {isAlert ?
                            <Alert severity="warning" sx={{ mt: "10px" }}>
                                Email or User name exists.
                            </Alert> :
                            <Box></Box>
                        }

                        <ColorButton
                            variant="contained"
                            type='submut'
                            fullWidth
                            sx={{ height: "50px", marginTop: "20px" }}
                            disabled={IsLoading}
                        >
                            Sign Up
                        </ColorButton>
                    </form >

                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        color="white"
                    >
                        Have an account? <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/signin")}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>

                <Box>

                </Box>
            </Container >
        </Box >
    )
}

export default SignUp