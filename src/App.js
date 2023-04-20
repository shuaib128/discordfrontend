import './App.css';
import { Routes, Route } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { Black, BlackLight } from './utilits/Colors/Colors';
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Main from './components/SidePannelOne/Main';
import MainPannelTwo from './components/SidePannelTwo/Main';
import MainPannelFour from './components/SidePannelFour/MainPannelFour';
import { Provider } from 'react-redux';
import store from './redux/store';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
//Pages
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import DirectMessages from './Pages/DirectMessages';
import Settings from './Pages/Settings';

function App() {
  const location = useLocation();
  const routeName = location.pathname;
  const condition = routeName !== "/signup" && routeName !== "/signin" && routeName !== "/settings"


  return (
    <Provider store={store}>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        {condition ?
          <Box
            sx={{
              backgroundColor: Black,
              height: "auto"
            }}
          >
            <Container maxWidth={false} sx={{
              paddingY: 0.4, display: "flex", alignItems: "center"
            }}>
              <IconButton
                color="primary"
                aria-label="open menu"
                sx={{
                  display: ["block", "block", "none", "none"],
                  position: "relative",
                  padding: 0.5
                }}
                onClick={() => {
                  const pannelOne = document.querySelector(".pannel-one")
                  const pannelTwo = document.querySelector(".pannel-two")

                  var pannelOneStyle = window.getComputedStyle(pannelOne);

                  if (pannelOneStyle.display === "none") {
                    pannelOne.style.cssText = "display: block"
                    pannelTwo.style.cssText = "display: block"
                  } else {
                    pannelOne.style.cssText = "display: none"
                    pannelTwo.style.cssText = "display: none"
                  }
                }}
              >
                <MenuIcon
                  style={{ color: "white", width: "20px" }}
                />
              </IconButton>
              <Typography variant="subtitle2" gutterBottom color="white">
                Discord
              </Typography>
            </Container>
          </Box> :
          <Box />
        }

        <Box>
          <Grid
            container
            sx={{
              gridTemplateColumns: "auto auto 1fr auto",
              width: "100%",
              display: "grid"
            }}
          >
            {condition ?
              <Grid
                item
                className='pannel-one'
                sx={{
                  backgroundColor: Black,
                  height: "100vh",
                  display: ["none", "none", "block", "block"]
                }}
              >
                <Container maxWidth={false}>
                  <Main />
                </Container>
              </Grid> :
              <Box></Box>
            }

            {condition ?
              <Grid
                className='pannel-two'
                item
                sx={{
                  backgroundColor: BlackLight,
                  display: ["none", "none", "block", "block"],
                }}
              >
                <MainPannelTwo />
              </Grid> :
              <Box />
            }

            <Grid item
              sx={{
                backgroundColor: "#2e3035",
                height: "100vh"
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>

              <Routes>
                <Route path="/messages/direct-messages" element={<DirectMessages />} />
              </Routes>

              <Routes>
                <Route path="/signup" element={<SignUp />} />
              </Routes>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
              </Routes>
              <Routes>
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Grid>

            {condition ?
              <Grid
                className='selected-user'
                item
                sx={{
                  backgroundColor: "#232428",
                  width: ["100%", "350px", "350px", "auto"],
                  position: ["fixed", "fixed", "fixed", "static"],
                  right: "-700px",
                  height: ["100vh", "100vh", "100vh", "auto"],
                  transition: "5px",
                  zIndex: 1,
                  top: 0,
                }}
              >
                <MainPannelFour />
              </Grid> :
              <Box />
            }
          </Grid>
        </Box>
      </Box >
    </Provider>
  );
}

export default App;
