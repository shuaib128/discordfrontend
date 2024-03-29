import React from 'react'
import { Box } from '@mui/system'
import { Black } from '../../utilits/Colors/Colors'

const Search = ({ SearchValue, setSearchValue, setLoading }) => {
    function FetchConvertation(text) {
        setSearchValue(text)
        setLoading(true)
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <input
                className='search-input'
                type="search"
                placeholder='Find or start a convertation'
                value={SearchValue}
                onChange={(e) => FetchConvertation(e.target.value)}
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