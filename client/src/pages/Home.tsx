import {useContext} from "react"
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
import Layout from "../components/Layout";
import { getHomeDataApi } from "../services/api/User";
import { AuthContext, UserI } from "../contexts/Auth";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const posts = [
  //   { _id: 123, text: "Somethigns", isLiked: true, createdAt: Date.now() },
  // ];

  const context = useContext(AuthContext)
  const user = context.user as UserI
  const token = context.token

  const { data } = useQuery({
    queryKey: ["home", { token, userId: user._id,}],
    queryFn: getHomeDataApi,
  });

  return (
    <Layout>
      <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Home</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <AssistantIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box height="92vh" sx={{ overflowY: "scroll" }}>
          <AddPost />
          <Box textAlign="center" marginTop="1rem">
            {status === "loading" && (
              <CircularProgress size={20} color="primary" />
            )}
          </Box>
          {data &&
            data.data.posts.map((post) => (
              <Post key={post._id} post={post} profile={post.author} />
            ))}
        </Box>
      </Box>
    </Layout>
  );
}
