import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlackLight, BlackLightMore } from '../../../utilits/Colors/Colors';
import ButtonComponent from '../../Button/Button';

const UserNameChangeBlock = ({Lavel, Value}) => {
    const [Loading, setLoading] = useState(false)

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt:"13px"
            }}
        >
            <Box>
                <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    color="#d6d5d5"
                    margin={0}
                >
                    {Lavel}
                </Typography>

                <Typography
                    variant="subtitle1"
                    display="block"
                    gutterBottom
                    color="#d6d5d5"
                    margin={0}
                >
                    {Value}
                </Typography>
            </Box>

            <Box sx={{width: "100px"}}>
                <ButtonComponent
                    Text="Edit"
                    TextColor="white"
                    Loading={Loading}
                    Height="35px"
                    BG={BlackLightMore}
                    BGHover={BlackLight}
                />
            </Box>
        </Box>
    )
}

export default UserNameChangeBlock