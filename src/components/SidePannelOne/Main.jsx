import React from 'react'
import { Box } from '@mui/system';
import AvatarComponent from './Avatar';
import ButtonComponent from './Button';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';

const Main = () => {
    return (
        <Box>
            <Box>
                <AvatarComponent
                    image="https://images.pexels.com/photos/15580815/pexels-photo-15580815.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
                <AvatarComponent
                    image="https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load 150w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load 300w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load 400w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load 600w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load 800w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load 1200w, https://images.pexels.com/photos/15460077/pexels-photo-15460077.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load 1600w"
                />
                <AvatarComponent
                    image="https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load 150w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load 300w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load 400w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load 600w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load 800w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load 1200w, https://images.pexels.com/photos/14433545/pexels-photo-14433545.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load 1600w"
                />
                <AvatarComponent
                    image="https://images.pexels.com/photos/11442244/pexels-photo-11442244.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
                <AvatarComponent
                    image="https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load 150w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load 300w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load 400w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load 600w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load 800w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load 1200w, https://images.pexels.com/photos/13921662/pexels-photo-13921662.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load 1600w"
                />
                <AvatarComponent
                    image="https://images.pexels.com/photos/15278251/pexels-photo-15278251.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
            </Box>

            <Box sx={{marginTop: "10px"}}>
                <ButtonComponent
                    Icon={AddIcon}
                />
                <ButtonComponent
                    Icon={ExploreIcon}
                />
            </Box>
        </Box>
    )
}

export default Main