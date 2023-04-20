import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ChatMessages = () => {
    return (
        <Box
            sx={{
                padding: "15px 20px",
                height: "80vh",
                overflow: "hidden"
            }}
        >
            <Stack spacing={2}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} sx={{
                        backgroundColor: "white"
                    }} />
                    <Box sx={{width: "50%", ml: "10px"}}>
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "45%",

                        }} />
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "25%",

                        }} />
                    </Box>
                </Box>
                <Skeleton variant="rounded" width={"55%"} height={100} sx={{
                    backgroundColor: "white",
                    marginTop: "20px"
                }}/>
            </Stack>

            <Stack spacing={2} mt="35px">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} sx={{
                        backgroundColor: "white"
                    }} />
                    <Box sx={{width: "50%", ml: "10px"}}>
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "45%",

                        }} />
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "25%",

                        }} />
                    </Box>
                </Box>
                <Skeleton variant="rounded" width={"75%"} height={100} sx={{
                    backgroundColor: "white",
                    marginTop: "20px"
                }}/>
            </Stack>

            <Stack spacing={2} mt="35px">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} sx={{
                        backgroundColor: "white"
                    }} />
                    <Box sx={{width: "50%", ml: "10px"}}>
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "45%",

                        }} />
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "25%",

                        }} />
                    </Box>
                </Box>
                <Skeleton variant="rounded" width={"45%"} height={100} sx={{
                    backgroundColor: "white",
                    marginTop: "20px"
                }}/>
            </Stack>

            <Stack spacing={2} mt="35px">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} sx={{
                        backgroundColor: "white"
                    }} />
                    <Box sx={{width: "50%", ml: "10px"}}>
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "45%",

                        }} />
                        <Skeleton variant="text" sx={{
                            fontSize: '1rem', backgroundColor: "white", width: "25%",

                        }} />
                    </Box>
                </Box>
                <Skeleton variant="rounded" width={"45%"} height={100} sx={{
                    backgroundColor: "white",
                    marginTop: "20px"
                }}/>
            </Stack>
        </Box>
    )
}

export default ChatMessages