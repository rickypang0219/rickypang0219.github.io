import * as React from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Profile = ({ theme }) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          // display: 'flex',
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          minWidth: "25vw",
          position: "fixed",
        }}
      >
        <Avatar
          alt="Ricky Pang"
          src="src/assets/propic.JPEG"
          sx={{ height: 170, width: 170 }}
        >
          {" "}
        </Avatar>
        <br />
        <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>
          {" "}
          Ricky Pang{" "}
        </Typography>
        <br />

        <IconButton
          aria-label="location"
          href="https://www.google.com.hk/maps/@22.352734,114.1277,11z"
        >
          <LocationOnIcon sx={{ color: "red" }} />
          <Typography sx={{ fontSize: 20 }}> Hong Kong</Typography>
        </IconButton>
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="Github"
            href="https://github.com/rickypang0219"
          >
            {theme.palette.mode === "dark" ? (
              <GitHubIcon sx={{ color: "white", fontSize: 40 }} />
            ) : (
              <GitHubIcon sx={{ color: "black", fontSize: 40 }} />
            )}
          </IconButton>
          <IconButton
            aria-label="linkedin"
            href="https://www.linkedin.com/in/ka-chun-pang-674269229/"
          >
            {theme.palette.mode === "dark" ? (
              <LinkedInIcon sx={{ color: "white", fontSize: 40 }} />
            ) : (
              <LinkedInIcon sx={{ color: "black", fontSize: 40 }} />
            )}
          </IconButton>
          <IconButton
            variant="contained"
            color="primary"
            component="a"
            href="mailto:rickypang_aidev@outlook.com"
          >
            {theme.palette.mode === "dark" ? (
              <EmailIcon sx={{ color: "white", fontSize: 40 }} />
            ) : (
              <EmailIcon sx={{ color: "black", fontSize: 40 }} />
            )}
          </IconButton>
        </Stack>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
          <Avatar
            alt="Ricky Pang"
            src="src/assets/propic.JPEG"
            sx={{ height: 120, width: 120 }}
          >
            {" "}
          </Avatar>
          <Box direction="row" useflexgap="true" flexWrap="wrap">
            <Stack direction="column" spacing={2}>
              <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                {" "}
                Ricky Pang{" "}
              </Typography>
              <Box spacing={2}>
                <IconButton
                  aria-label="Github"
                  href="https://github.com/rickypang0219"
                >
                  {theme.palette.mode === "dark" ? (
                    <GitHubIcon sx={{ color: "white", fontSize: 40 }} />
                  ) : (
                    <GitHubIcon sx={{ color: "black", fontSize: 40 }} />
                  )}
                </IconButton>
                <IconButton
                  aria-label="linkedin"
                  href="https://www.linkedin.com/in/ka-chun-pang-674269229/"
                >
                  {theme.palette.mode === "dark" ? (
                    <LinkedInIcon sx={{ color: "white", fontSize: 40 }} />
                  ) : (
                    <LinkedInIcon sx={{ color: "black", fontSize: 40 }} />
                  )}
                </IconButton>
                <IconButton
                  variant="contained"
                  color="primary"
                  component="a"
                  href="mailto:rickypang_aidev@outlook.com"
                >
                  {theme.palette.mode === "dark" ? (
                    <EmailIcon sx={{ color: "white", fontSize: 40 }} />
                  ) : (
                    <EmailIcon sx={{ color: "black", fontSize: 40 }} />
                  )}
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
