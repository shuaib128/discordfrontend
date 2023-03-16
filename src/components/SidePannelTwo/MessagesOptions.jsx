import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { PlaceHostColor } from '../../utilits/Colors/Colors'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import MessagesOption from './MessagesOption';

const MessagesOptions = (props) => {
    return (
        <Box sx={{ marginTop: "14px" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    color={PlaceHostColor}
                >
                    Direct Messages
                </Typography>

                <Button onClick={props.handleOpen}>
                    <AddIcon
                        style={{
                            color: "white",
                            width: "20px"
                        }}
                    />
                </Button>
            </Box>

            <Box>
                <MessagesOption 
                    Name="trrausts117"
                    Image="https://images.pexels.com/photos/15580815/pexels-photo-15580815.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
                <MessagesOption 
                    Name="carlos.226"
                    Image="https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load 150w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load 300w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load 400w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load 600w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load 800w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load 1200w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load 1600w"
                />
                <MessagesOption 
                    Name="saltyneat"
                    Image="https://images.pexels.com/photos/11442244/pexels-photo-11442244.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
            </Box>
        </Box>
    )
}

export default MessagesOptions