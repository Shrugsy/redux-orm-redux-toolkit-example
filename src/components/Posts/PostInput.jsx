import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createPost } from "../../store/modelDucks/Post";

export default function PostInput() {
  const [postInput, setPostInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const handleInputChange = (e) => {
    setPostInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (postInput) {
      if (currentUser === null) {
        setSnackbarOpen(true);
        return;
      }
      dispatch(createPost({ content: postInput, user: currentUser }));
      setPostInput("");
    }
  };
  return (
    <>
      <form data-testid={"postSubmission-form"} onSubmit={handleFormSubmit}>
        <TextField
          label="Add a post"
          variant="outlined"
          size="small"
          fullWidth
          value={postInput}
          onChange={handleInputChange}
        />
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning">
          Please select a user!
        </Alert>
      </Snackbar>
    </>
  );
}
