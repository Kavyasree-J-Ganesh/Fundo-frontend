import React, { useState } from "react"
import DehazeIcon from '@mui/icons-material/Dehaze';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import "./Header.css"
import { connect, Connect } from "react-redux";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "10px",
    backgroundColor: "#f3f3f3",
    '&:hover': {
      backgroundColor: "#ffffff"
    },
    marginLeft: 0,
    width: '100%',
    height: "3rem",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));




const Header = props => {
  const toggleMenu = () => {
    props.handleMenuClick();
  }
    return (
        <div className="header">
            <DehazeIcon color="action" sx={{ fontSize: 30 }} onClick={toggleMenu} />
            <div>
                <img src="./keep_pic.png" alt="keep icon" />
            </div>
            <h1 className="header_heading">{props.title}</h1>
            <div className="header_search">
                <Search onChange={(event)=> props.onSearch(event.target.value)}>
                    <SearchIconWrapper>
                        <SearchIcon color="action"/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>
            <RefreshIcon color="action" sx={{ fontSize: 30 }} />
            <ViewStreamOutlinedIcon color="action" sx={{ fontSize: 30 }} />
            <SettingsOutlinedIcon color="action" sx={{ fontSize: 30 }} />
        </div>
    )
}

const mapStateToProps = (state) => {
  console.log(state)
return {
  title: state.drawerReducer.title,
};
};

export default connect(mapStateToProps)(Header)