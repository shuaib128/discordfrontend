import React from 'react'
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { Orange } from '../../utilits/Colors/Colors';

const ButtonComponent = ({ Icon }) => {
    return (
        <Box>
            <IconButton
                aria-label="add"
                color="warning"
                size="large"
                type="button"
            >
                <Icon />
            </IconButton>
        </Box>
    )
}

export default ButtonComponent