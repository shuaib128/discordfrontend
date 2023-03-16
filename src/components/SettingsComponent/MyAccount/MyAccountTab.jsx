import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PrifileImageTop from './PrifileImageTop';

const MyAccountTab = ({ SelectedTab }) => {
    return (
        <Box>
            <Typography
                variant="h6"
                gutterBottom
                color="white"
            >
                {SelectedTab}
            </Typography>

            <PrifileImageTop />
        </Box>
    )
}

export default MyAccountTab