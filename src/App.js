import './App.css';
import { Routes, Route } from "react-router-dom"
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { Black } from './utilits/Colors/Colors';
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
//Pages
import Home from './Pages/Home';
import UserSetting from './Pages/UserSetting';
import DirectMessages from './Pages/DirectMessages';

function App() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: Black,
          height: "auto"
        }}
      >
        <Typography variant="subtitle2" gutterBottom color="white">
          <Container maxWidth={false} sx={{ paddingY: 0.3 }}>
            Discord
          </Container>
        </Typography>
      </Box>

      <Container maxWidth={false}>
        <Grid container gap={7}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Grid one
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6" gutterBottom>
              Grid two
            </Typography>
          </Grid>

          <Grid item>
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
        </Grid>
      </Container>
    </Box >
  );
}

export default App;
