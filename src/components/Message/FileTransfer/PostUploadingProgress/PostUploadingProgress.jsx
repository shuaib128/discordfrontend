import React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert';
import LinearWithValueLabel from './Progress'

const PostUploadingProgress = ({ Progress }) => {
    return (
        <Box
            sx={{
                textAlign: "left"
            }}
        >
            <Alert severity="info" sx={{ flexDirection: "column" }}>
                Your file is uploading right now.

                <Box
                    sx={{
                        mt: "",
                        width: "100%"
                    }}
                >
                    <LinearWithValueLabel
                        Progress={Progress}
                    />

                    {/* <Box sx={{ width: "100px", mt: "-10px" }}>
                        <ButtonOutLine
                            ButtonText="cancel"
                            OnClickHandler={cancelButtonHandler}
                            varient="contained"
                        />
                    </Box> */}
                </Box>
            </Alert>
        </Box>
    )
}

export default PostUploadingProgress