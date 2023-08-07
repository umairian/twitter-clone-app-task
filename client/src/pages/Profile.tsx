import React, { useContext } from "react";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Post from "../components/Post";
import { Link as RouteLink } from "react-router-dom";
import { AuthContext, UserI } from "../contexts/Auth";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../services/api/User";
import Layout from "../components/Layout";

export default function Profile() {
  const theme = useTheme();

  const context = useContext(AuthContext);
  const user = context.user as UserI;
  const token = context.token;

  const { isLoading, data } = useQuery({
    queryKey: ["profile", { token, userId: user._id }],
    queryFn: getProfileApi,
  });

  const handleFollow = async () => {
    // handle follow
  };

  const handleUnfollow = async () => {
    // handle unfollow
  };

  function hideFollow() {
    // hide follow
  }

  function isFollowVisible() {
    // is follow visible
  }

  return (
    <Layout>
      <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>

            <Grid item>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography sx={{ fontSize: "12px", color: "#555" }}>
                {!isLoading && data && data.data.profile.posts.length} posts
              </Typography>{" "}
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          {isLoading && (
            <Box marginTop="1rem">
              <CircularProgress size={20} color="primary" />
            </Box>
          )}
        </Box>
        {data && (
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            <Box position="relative">
              <img
                width="100%"
                src={
                  "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958083/probook/i_Ocean-Quote-Twitter-_20Header_full_ap6zgw.jpg"
                }
                alt="background"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 120,
                  left: 15,
                  background: "#eee",
                  borderRadius: "50%",
                }}
              >
                <img
                  width="150px"
                  src={user?.profileUrl}
                  alt="profile"
                />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
              <Button
                onClick={handleFollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
              <Button
                onClick={handleUnfollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Unfollow
              </Button>
            </Box>
            <Box padding="10px 20px">
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                {data.data.profile.name}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                {data.data.profile.email}
              </Typography>
              <Box display="flex">
                <Typography color="#555" marginRight="1rem">
                  <strong style={{ color: "black", marginRight: 5 }}>{data.data.profile.following.length}</strong>
                  Following
                </Typography>
                <Typography color="#555" marginRight="1rem">
                  <strong style={{ color: "black", marginRight: 5 }}>{data.data.profile.followers.length}</strong>
                  Followers
                </Typography>
              </Box>
            </Box>
            <Box borderBottom="1px solid #ccc">
              <Typography
                display="inline-block"
                variant="caption"
                fontSize="16px"
                marginX="1rem"
                padding="6px 0"
                fontWeight="500"
                borderBottom={`4px solid ${theme.palette.primary.main}`}
              >
                Posts
              </Typography>
            </Box>
            {data.data.profile.posts &&
              data.data.profile.posts.map((post) => (
                <Post key={post._id} post={post} profile={user} />
              ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
}
