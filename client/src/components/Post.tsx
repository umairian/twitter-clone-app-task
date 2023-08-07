import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useState, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext, UserI } from "../contexts/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "../services/api/Post";

export default function Post({ post, profile }) {
  const [commentText, setCommentText] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePostApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("profile");
    },
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: Event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(AuthContext);
  const user = context.user as UserI;
  const token = context.token;

  const handleLike = async (e) => {
    e.preventDefault();
    // dispatch(updateLike({ id: post._id }));
    const response = { message: "123" }; // await likeOrDislikePost({ id: post._id });
    if (response.message !== "Post updated successfully.") {
      // dispatch(updateLike({ id: post._id }));
    }
  };
  const handleAddComment = async () => {
    const response = true; // await addComment({ id: post._id, text: commentText });
    if (response) {
      setCommentText("");
    }
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    const confirmation = window.confirm("Are you sure to delete this post?");
    if (!confirmation) return;
    mutate({ userId: user._id, token, postId: post?._id });
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Link
        to={`/posts/${post._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          padding="1rem"
          sx={{
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Link to={`/profile/${post._id}`}>
                <img src={profile.profileUrl} alt="lgoog" width="50px" />
              </Link>
            </Grid>
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Box display="flex">
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                      >
                        {profile.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        @{profile.email}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        {formatDistanceToNow(new Date(post.createdAt))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {post.text}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    {profile?._id === user?._id && (
                      <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(e);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={(e) => e.stopPropagation()}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(e) => handleDeletePost(e)}>
                        Delete Post
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginRight="5rem"
                  marginTop=".8rem"
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalOpen();
                    }}
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SyncIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={handleLike} size="small">
                    {post.isLiked ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          handleSave={handleAddComment}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
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
