import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const ButtonComponent = ({ Text, TextColor, Loading, Height, BG, BGHover }) => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: TextColor,
        backgroundColor: BG,
        '&:hover': {
            backgroundColor: BGHover,
        },
    }));

    return (
        <Box>
            <ColorButton
                variant="contained"
                fullWidth={true}
                disabled={Loading}
                sx={{height: Height}}
            >
                {Text}
            </ColorButton>
        </Box>
    )
}

export default ButtonComponent