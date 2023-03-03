import './App.css';
import { Routes, Route } from "react-router-dom"
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { Black, BlackLight } from './utilits/Colors/Colors';
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Main from './components/SidePannelOne/Main';
import MainPannelTwo from './components/SidePannelTwo/Main';
import MainPannelFour from './components/SidePannelFour/MainPannelFour';
//Pages
import Home from './Pages/Home';
import UserSetting from './Pages/UserSetting';
import DirectMessages from './Pages/DirectMessages';

function App() {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: Black,
          height: "auto"
        }}
      >
        <Container maxWidth={false} sx={{ paddingY: 0.4 }}>
          <Typography variant="subtitle2" gutterBottom color="white">
            Discord
          </Typography>
        </Container>
      </Box>

      <Box>
        <Grid
          container 
          sx={{
            gridTemplateColumns: "auto auto 1fr auto", 
            width: "100%", 
            display: "grid"
          }}
        >
          <Grid item sx={{ backgroundColor: Black, height: "100vh" }}>
            <Container maxWidth={false}>
              <Main />
            </Container>
          </Grid>

          <Grid item sx={{ backgroundColor: BlackLight }}>
            <MainPannelTwo />
          </Grid>

          <Grid item sx={{ backgroundColor: "#2e3035" }}>
            <Container maxWidth={false}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>

              <Routes>
                <Route path="/messages/direct-messages" element={<DirectMessages />} />
              </Routes>

              <Routes>
                <Route path="/user-setting" element={<UserSetting />} />
              </Routes>
            </Container>
          </Grid>

          <Grid item sx={{ backgroundColor: "#232428" }}>
            <MainPannelFour />
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}

export default App;
