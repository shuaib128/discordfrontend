import React from 'react'
import { Box } from '@mui/system'
import { Black } from '../../utilits/Colors/Colors'

const Search = () => {
    return (
        <Box>
            <input 
                className='search-input'
                type="search"
                placeholder='Find or start a convertation'
                style={{
                    border: 0,
                    backgroundColor: Black,
                    color: "white",
                    width: '100%',
                    height: '40px',
                    marginTop: '10px',
                    padding: "0px 10px"
                }}
            />
        </Box>
    )
}

export default Search