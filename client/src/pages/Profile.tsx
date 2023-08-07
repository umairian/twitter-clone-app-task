import React, { useContext } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
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
import { Link as RouteLink, useParams } from "react-router-dom";
import { AuthContext, UserI } from "../contexts/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUserApi, getProfileApi } from "../services/api/User";
import Layout from "../components/Layout";

export default function Profile() {
  const theme = useTheme();

  const context = useContext(AuthContext);
  const user = context.user as UserI
  const token = context.token;

  const { userId } = useParams()
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ["profile", { token, userId: user?._id, searchId: userId }],
    queryFn: getProfileApi,
  });

  const { mutate } = useMutation({
    mutationFn: followUserApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("profile");
    },
  });

  const handleFollow = async () => {
    mutate({
      userId: user?._id,
      token,
      body: { followingUserId: userId }
    })
  };

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
              <Typography variant="h6">{data && data.data.profile?.name}</Typography>
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
                <Avatar
                  sx={{ width: 120, height: 120}}
                  src={data && data.data.profile?.profileUrl}
                  alt="profile"
                />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
            {data && data.data.profile._id !== user?._id && <Button
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
                disabled={data?.data.isFollowing}
              >
                {data?.data.isFollowing ? "Following" : "Follow"}
              </Button>}
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
            {data && data.data.profile.posts &&
              data.data.profile.posts.map((post) => (
                <Post key={post._id} post={post} profile={data.data.profile} />
              ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
}
