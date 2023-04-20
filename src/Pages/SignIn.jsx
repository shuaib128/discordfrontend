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
import { StoreToken } from '../utilits/Token/StoreToken';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const SignIn = () => {
    const [UserName, setUserName] = useState("")
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

        fetch(`${BackendLink}/api/users/user/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: UserName,
                password: UserPassword
            }),
        })
            .then(response => response.text())
            .then((result) => {
                if (JSON.parse(result).access) {
                    const accessToken = JSON.parse(result).access
                    const refreshToken = JSON.parse(result).refresh
                    StoreToken(accessToken, refreshToken)
                    setisAlert(false)
                    setIsLoading(false)
                    navigate("/")
                } else {
                    setisAlert(true)
                    setIsLoading(false)
                }
            })
            .catch(error => { })
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
                    display: ["block", "flex", "flex", "flex"]
                }}
            >
                <Box
                    sx={{
                        width: ["100%", "60%", "60%", "60%"]
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
                                required
                                disabled={IsLoading}
                                value={UserName}
                                onChange={(e) => setUserName(e.target.value)}
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
                                required
                                disabled={IsLoading}
                                name="User Password"
                                value={UserPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </Box>

                        {isAlert ?
                            <Alert severity="warning" sx={{ mt: "10px" }}>
                                Email or User invalid.
                            </Alert> :
                            <Box></Box>
                        }

                        <ColorButton
                            variant="contained"
                            type='submut'
                            fullWidth
                            disabled={IsLoading}
                            sx={{ height: "50px", marginTop: "20px" }}
                        >
                            Sign In
                        </ColorButton>
                    </form >

                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        color="white"
                    >
                        Dont have an account? <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/signup")}
                        >
                            Create Account
                        </Link>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: ["100%", "60%", "60%", "60%"]
                    }}
                >

                </Box>
            </Container>
        </Box>
    )
}

export default SignIn