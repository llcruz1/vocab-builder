import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

 
export default function SearchBar(props) {

    return (
        <>
        <TextField
            type = "search"
            //label="Search Words"
            placeholder="Search Words"
            variant="outlined"
            size="small"
            onChange={props.function}
            InputProps={{ 
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
        </>
    );
}