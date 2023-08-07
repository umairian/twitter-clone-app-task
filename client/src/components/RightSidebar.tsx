import { useContext, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { Input, Typography, Grid, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import WhoToFollow from "./WhoToFollow";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchUsersApi } from "../services/api/User";
import { AuthContext, UserI } from "../contexts/Auth";

export default function RightSidebar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const context = useContext(AuthContext)
  const user = context.user as UserI
  const token = context.token;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["profile", { token, userId: user._id, searchTerm }],
    queryFn: searchUsersApi,
    enabled: false,
  });

  useEffect(() => {
    if(searchTerm.length >= 2) {
      refetch();
    }
  }, [searchTerm])

  return (
    <Box sx={{ height: "100%" }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
          {searchTerm.length !== 0 && (
            <Box
              width="100%"
              sx={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "28px",
                padding: "1rem 0",
                zIndex: "999",
                maxHeight: "50vh",
                overflowY: "scroll",
              }}
              position="absolute"
            >
              {searchTerm.length !== 0 && data && data.data.users.length === 0 && (
                <Typography sx={{ padding: "0 1rem" }}>
                  No users found!
                </Typography>
              )}
              {data && data.data.users.map((user: UserI) => (
                <Box key={user._id}>
                  <Link
                    onClick={() => setSearchTerm("")}
                    style={{ textDecoration: "none" }}
                    to={`/profile/${user._id}`}
                  >
                    <Grid
                      sx={{
                        overflow: "hidden",
                        padding: ".2rem 1rem",
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                      container
                      alignItems="center"
                    >
                      <Grid item sx={{ paddingRight: "12px" }}>
                        <img src={user.profileUrl} width="50px" alt="logo" />
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000",
                              }}
                            >
                              {user.name}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  mr: "6px",
                                  color: "#555",
                                }}
                              >
                                {user.email}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
