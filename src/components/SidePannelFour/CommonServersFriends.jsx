import React from 'react'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommonServers from './CommonServers'
import CommonFriends from './CommonFriends'

const CommonServersFriends = () => {
    return (
        <Box sx={{
            backgroundColor: "#111214",
            marginX: "15px",
            paddingX: "13px",
            paddingY: "15px",
            marginTop: "-20px",
            borderRadius: 1.5,
        }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>1 Mutual Server</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CommonServers />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>2 Mutuals Friends</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CommonFriends />
                    <CommonFriends />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default CommonServersFriends