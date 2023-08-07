import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext, UserI } from "../contexts/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostApi } from "../services/api/Post";

const links = [
  {
    label: "Home",
    to: "/home",
    icon: <HomeIcon fontSize="medium" color="action" />,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: <PersonOutlineIcon fontSize="medium" color="action" />,
  },
  {
    label: "Logout",
    to: "/logout",
    icon: <LogoutIcon fontSize="medium" color="action" />,
  },
];

export default function LeftSidebar() {
  const theme = useTheme();
  const context = useContext(AuthContext);
  const user = context.user as UserI;
  const token = context.token;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addPostApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("profile");
      setOpenModal(false);
      setPostText("")
    },
  });

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [postText, setPostText] = React.useState("");
  const handleAddPost = async () => {
    mutate({
      userId: user?._id,
      token: token,
      body: { text: postText },
    });
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <Box textAlign="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png"
              alt="logo"
              width="50px"
            />{" "}
            <Typography>Twitter Clone</Typography>
          </Link>
        </Box>
        <List>
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      color: theme.palette.action.active,
                    }}
                    primary={link.label}
                  />
                </Hidden>
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Hidden lgDown>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            fullWidth
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={
            isLoading ? (
              <CircularProgress size={24} sx={{ color: "#FFF" }} />
            ) : (
              "Post"
            )
          }
          len={postText.trimStart().length}
          handleSave={handleAddPost}
        >
          <Box>
            <Grid container>
              <Grid item>
                <Avatar
                  src={user?.profileUrl}
                  alt="logo"
                  sx={{ width: 50, height: 50, marginRight: 1 }}
                />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="What's happening?"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
