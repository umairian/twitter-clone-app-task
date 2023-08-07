import { Button, CircularProgress, Grid, Input } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { addPostApi } from "../services/api/Post";
import { AuthContext, UserI } from "../contexts/Auth";

export default function AddPost() {
  const theme = useTheme();
  const [postText, setPostText] = useState("");
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
      setPostText("")
      queryClient.invalidateQueries("profile");
    },
  });

  const handleAddPost = async () => {
    mutate({
      userId: user?._id,
      token: token,
      body: { text: postText },
    });
  };
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src={user?.profileUrl} alt="lgogo" width="50px" />
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
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              onClick={handleAddPost}
              disabled={postText.trimStart().length === 0}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
              ) : (
                "Post"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
