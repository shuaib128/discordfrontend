import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlackLight, BlackLightMore } from '../../../utilits/Colors/Colors';
import ButtonComponent from '../../Button/Button';
import { Black } from '../../../utilits/Colors/Colors';
import SendData from '../../../utilits/Data/SendData';

const UserNameChangeBlock = ({ Lavel, Value, setValue }) => {
    const [Loading, setLoading] = useState(false)
    const [Editing, setEditing] = useState(false)

    /**
     * Handle submit function
     */
    function handleSubmit() {
        setEditing(!Editing)
        
        if (Editing) {
            SendData(
                "PUT",
                "/api/users/user/update/",
                JSON.stringify(
                    {
                        bio: Value
                    }
                )
            ).then((data) => {})
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "13px"
            }}
        >
            <Box sx={{ width: "80%" }}>
                <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    color="#d6d5d5"
                    margin={0}
                >
                    {Lavel}
                </Typography>

                {!Editing ?
                    <Typography
                        variant="subtitle1"
                        display="block"
                        gutterBottom
                        color="#d6d5d5"
                        margin={0}
                    >
                        {Value}
                    </Typography> :
                    <textarea
                        className='search-input'
                        type="search"
                        placeholder={Lavel}
                        value={Value}
                        style={{
                            border: 0,
                            backgroundColor: Black,
                            color: "white",
                            width: 'calc(100% - 20px)',
                            height: '70px',
                            marginTop: '10px',
                            padding: "10px 10px",
                        }}
                        onChange={(e) => setValue(e.target.value)}
                    />
                }
            </Box>

            {Lavel !== "username" && Lavel !== "email" && Lavel !== "phone number" ?
                <Box sx={{ width: "100px" }} onClick={() => handleSubmit()}>
                    <ButtonComponent
                        Text={!Editing ? "Edit" : "Done"}
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
    )
}

export default UserNameChangeBlock