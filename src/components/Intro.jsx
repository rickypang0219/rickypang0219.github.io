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
import { Typewriter } from "react-simple-typewriter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { indigo, grey, red } from "@mui/material/colors";

// card for displaying photos
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// Animation
import { useTransform, motion, useScroll } from "framer-motion";
import { Height } from "@mui/icons-material";

const Banner = () => {
  const careers = ["Researcher", "Programmer", "AI/Web Developer", "Photographer"];
  return (
    <>
      <Box
        sx={{
          // justifyContent: "left",
          height: "340px",
          display: { xs: "block", md: "none" },
        }}
      >
        <Typography sx={{ fontSize: 55, justifyContent: 'center' }}>
          <span style={{ fontWeight: "bold" }}>Ricky Pang</span>, <br />I am a{" "}
          <span
            style={{
              background: "linear-gradient(to right, #3f51b5, #2196f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              // textAlign: "left",
            }}
          >
            <Typewriter
              words={careers}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </Typography>
        <br />
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography sx={{ fontSize: 60 }}>
          <span style={{ fontWeight: "bold" }}>Ricky Pang</span>, <br />I am a{" "}
          <span
            style={{
              background: "linear-gradient(to right, #3f51b5, #2196f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            <Typewriter
              words={careers}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </Typography>
      </Box>
    </>
  );
};


const Employment = ({ theme }) => {
  const [isCenter, setIsCenter] = React.useState(false);
  const MotionBox = motion(Box);
  React.useEffect(() => {
    function handleScroll() {
      const centerOfScreen = window.innerHeight / 2;
      const connectorTop = connectorRef.current.getBoundingClientRect().top;
      const connectorBottom =
        connectorRef.current.getBoundingClientRect().bottom;
      const connectorCenter = (connectorTop + connectorBottom) / 2;

      if (connectorCenter <= centerOfScreen) {
        setIsCenter(true);
      } else if (connectorBottom >= centerOfScreen) {
        setIsCenter(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const connectorRef = React.useRef(null);

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontSize: 50, fontWeight: "bold" }}>
        Employment
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ height: 15, width: 15 }} />
            <TimelineConnector
              ref={connectorRef}
              style={{
                backgroundColor: isCenter ? "#2196f3" : "#818181",
                width: 10,
                alignItems: "center",
                borderRadius: 10,
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <span style={{ fontSize: 20 }}>Graduate Research Assistant</span>
              <br />
              <span style={{ color: grey[500] }}> SEPT. 2022 - MAY 2023 </span>
            </Typography>
            <br />
            <MotionBox
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? grey[900]
                    : "background.paper",
                boxShadow: 3,
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
              borderRadius={2}
              p={2}
            >
              <Paper />
              <Box
                sx={{
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(to right, #3f51b5, #2196f3)",
                  padding: "8px 15px",
                  borderRadius: 10,
                  textAlign: "center",
                  display: "inline-flex",
                  height: 7,
                }}
                p={1}
              >
                <Typography sx={{ fontSize: 12, alignSelf: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    FULL-TIME
                  </span>
                </Typography>
              </Box>
              <br />
              <br />
              <Grid container spacing={2} wrap="wrap" display="flex">
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{
                      align: "center",
                      fontWeight: "bold",
                      fontSize: 30,
                    }}
                  >
                    Research Assistant <br />
                    Department of Physics, HKUST
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="ul">
                    <Typography component="li">
                      The First team to achieve efficient compression in specific quantum systems with a cutting-edge algorithm
                    </Typography>
                    <Typography component="li">
                      Devised Auto-Encoder/CNN-like algorithm in physics to achieve essential information extraction,
                    </Typography>
                    <Typography component="li">
                      Optimized large-scale computations with Tensor Network in Python
                    </Typography>
                    <Typography component="li">
                      Collaborated in an international research group with researchers from HK, China, and the USA.
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
            <br />
            <br />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ height: 15, width: 15 }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <span style={{ fontSize: 20 }}>Graduate Researcher </span> <br />
              <span style={{ color: grey[500] }}> SEPT. 2020 - AUG. 2022 </span>
            </Typography>
            <br />
            <MotionBox
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? grey[900]
                    : "background.paper",
                boxShadow: 3,
                width: "100%",
              }}
              borderRadius={2}
              p={2}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(to right, #3f51b5, #2196f3)",
                  padding: "8px 15px",
                  borderRadius: 10,
                  textAlign: "center",
                  display: "inline-flex",
                  height: 7,
                }}
              >
                <Typography sx={{ fontSize: 12, alignSelf: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    FULL-TIME
                  </span>
                </Typography>
              </Box>
              <br />
              <br />
              <Grid container spacing={2} wrap="wrap" display="flex">
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{
                      align: "center",
                      fontWeight: "bold",
                      fontSize: 30,
                    }}
                  >
                    Graduate Researcher <br />
                    Department of Physics, HKUST
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="ul" justifyContent={'center'}>
                    <Typography component="li">
                      Analyzed 10,000+ data and developed a classification model using an Artificial Neural Network (ANN)
                    </Typography>
                    <Typography component="li">
                      Optimized statistical models to increase accuracy for 30% improvement and better decision making
                    </Typography>
                    <Typography component="li">
                      Instructed two-semester upper-division courses and achieved a teaching rating of over 90%
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};


const Education = ({ theme }) => {
  const MotionBox = motion(Box);
  const [isCenter, setIsCenter] = React.useState(false);
  const connectorRef = React.useRef(null);

  React.useEffect(() => {
    function handleScroll() {
      const bottomOfWindow = window.scrollY;
      const centerOfScreen = window.innerHeight / 2;
      const connectorTop = connectorRef.current.getBoundingClientRect().top;
      const connectorBottom =
        connectorRef.current.getBoundingClientRect().bottom;
      const connectorCenter = (connectorTop + connectorBottom) / 2;

      if (connectorTop <= centerOfScreen) {
        setIsCenter(true);
      } else {
        setIsCenter(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Box p={2}>
      <Typography sx={{ fontSize: 50, fontWeight: "bold" }}>
        {" "}
        Education{" "}
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ height: 15, width: 15 }} />
            <TimelineConnector
              ref={connectorRef}
              style={{
                width: 10,
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: isCenter ? "#2196f3" : "#818181",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <MotionBox
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? grey[900]
                    : "background.paper",
                boxShadow: 3,
                width: "100%",
                opacity: 1,
              }}
              borderRadius={2}
              p={2}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(to right, #3f51b5, #2196f3)",
                  padding: "8px 15px",
                  borderRadius: 10,
                  textAlign: "center",
                  display: "inline-flex",
                  height: 7,
                }}
                p={1}
              >
                <Typography sx={{ fontSize: 12, alignSelf: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    SEPT. 2020 - JUNE 2023
                  </span>
                </Typography>
              </Box>
              <br />
              <br />
              <Grid container spacing={2} wrap="wrap" display="flex">
                <Grid item xs={12} sm={6}>
                  <Typography style={{ align: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: 30 }}>
                      {" "}
                      Hong Kong University of Science and Technology
                    </span>{" "}
                    <br />
                    Master of Philosophy,  Physics
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontWeight: "bold" }}>
                    DS related:
                  </Typography>
                  <Typography component="ul">
                    <Typography component="li">
                      Quantum Simulation using Python
                    </Typography>
                    <Typography component="li">
                      Features Extraction with Auto-Encoder/CNN
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
            <br />
            <br />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ height: 15, width: 15 }} />
            <TimelineConnector
              ref={connectorRef}
              style={{
                width: 10,
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: isCenter ? "#2196f3" : "#818181",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <MotionBox
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? grey[900]
                    : "background.paper",
                boxShadow: 3,
                width: "100%",
              }}
              borderRadius={2}
              p={2}
            >
              <Paper />
              <Box
                sx={{
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(to right, #3f51b5, #2196f3)",
                  padding: "8px 15px",
                  borderRadius: 10,
                  textAlign: "center",
                  display: "inline-flex",
                  height: 7,
                }}
                p={1}
              >
                <Typography sx={{ fontSize: 12, alignSelf: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    SEPT. 2016 - AUG. 2020
                  </span>
                </Typography>
              </Box>
              <br />
              <br />
              <Grid container spacing={2} wrap="wrap" display="flex">
                <Grid item xs={12} sm={6}>
                  <Typography style={{ align: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: 30 }}>
                      {" "}
                      Hong Kong University of Science and Technology
                    </span>{" "}
                    <br />
                    Bachelor of Science, Physics (Upper-Second Class Honors)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontWeight: "bold" }}>
                    DS related:
                  </Typography>
                  <Typography component="ul">
                    <Typography component="li">
                      {" "}
                      Scientific simulation using Python
                    </Typography>
                    <Typography component="li">
                      {" "}
                      Data visualization using Seaborn and Matplolib{" "}
                    </Typography>
                  </Typography>
                  <Typography style={{ fontWeight: "bold" }}>
                    Quant related:
                  </Typography>
                  <Typography component="ul">
                    <Typography component="li">
                      {" "}
                      Studied Advanced Partial Differential Euqations courses
                    </Typography>
                    <Typography component="li">
                      {" "}
                      Solved Partial Differential Euqations with Python
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
            <br />
            <br />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ height: 15, width: 15 }} />
            {/* <TimelineConnector
              style={{
                width: 10,
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: isCenter ? "#2196f3" : "#818181",
              }}
            /> */}
          </TimelineSeparator>
          <TimelineContent>
            <MotionBox
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? grey[900]
                    : "background.paper",
                boxShadow: 3,
                width: "100%",
              }}
              borderRadius={2}
              p={2}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(to right, #3f51b5, #2196f3)",
                  padding: "8px 15px",
                  borderRadius: 10,
                  textAlign: "center",
                  display: "inline-flex",
                  height: 7,
                }}
                p={1}
              >
                <Typography sx={{ fontSize: 12, alignSelf: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    JUNE 2020
                  </span>
                </Typography>
              </Box>
              <br />
              <br />
              <Grid container spacing={2} wrap="wrap" display="flex">
                <Grid item xs={12} sm={6}>
                  <Typography style={{ align: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: 30 }}>
                      {" "}
                      Conseil Européen pour la Recherche Nucléaire (CERN)
                    </span>{" "}
                    <br />
                    Summer Research Student
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    DS related:
                  </Typography>
                  <Typography component="ul">
                    <Typography component="li">
                      {" "}
                      Selected out of over 4200 worldwide applicants{" "}
                    </Typography>
                    <Typography component="li">
                      {" "}
                      Participated in statistical inference in particle
                      simulation{" "}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
            <br />
            <br />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};




const Photos = ({ theme }) => {
  return (
    <>
      <Box padding={3}>
        <Typography sx={{ fontSize: 50, fontFamily: 'bold' }} textAlign="justify">
          Photos 📷
        </Typography>
      </Box>

      <Box padding={3}
        display="flex"
        justifyContent="center"
        alignItems="center" >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 320 }}>
              <CardMedia
                sx={{ height: 400 }}
                image="images/photos/4569-20.jpg"
                title="你的名字"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  須賀神社
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The stair near 須賀神社 in Shijuku, Japan. This stair appears in a famous anime movie - Your Name (君の名は).
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 320 }}>
              <CardMedia
                sx={{ height: 400 }}
                image="images/photos/inari.jpg"
                title="你的名字"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  千本鳥居，伏見稲荷大社
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Senbon Torii(千本鳥居) in Fushimi Inari Taisha (伏見稻荷大社), Kyoto, Japan.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>

  );
}


const Intro = ({ theme }) => {
  return (
    <>
      <Box padding={3}>
        <Banner />
        <Typography sx={{ fontSize: 20 }} textAlign="justify">
          Data science and quantitative finance professional with expertise in computational physics,
          statistical modeling, and machine learning. M.Phil in Physics from Hong Kong University of Science & Technology (HKUST).
          Proven track record in analyzing data, developing predictive models, and providing strategic insights for decision-making.
          Seeking opportunities in data science and quantitative finance to apply my skills and contribute to innovative projects.
        </Typography>
        <br />
        <i className="devicon-c-plain colored" style={{ fontSize: 70 }}></i>
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          style={{ width: 70, height: 70 }}
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
          style={{ width: 70, height: 70 }}
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          style={{ width: 70, height: 70 }}
        />
        <i className="devicon-html5-plain colored" style={{ fontSize: 70 }}></i>
        <i className="devicon-css3-plain colored" style={{ fontSize: 70 }}></i>
        <i className="devicon-react-original colored" style={{ fontSize: 70 }}></i>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" style={{ width: 70, height: 70 }} />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style={{ width: 70, height: 70 }} />
        <i className="devicon-vim-plain colored" style={{ fontSize: 70 }}></i>
      </Box>
      <Photos theme={theme} />
      <Employment theme={theme} />
      <Education theme={theme} />
    </>
  );
};


export default Intro;








