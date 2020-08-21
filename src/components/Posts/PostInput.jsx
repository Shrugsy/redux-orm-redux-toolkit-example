import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { createPost } from "../../store/modelDucks/Post";
import { setError } from "../../store/slices/error";

export default function PostInput() {
  const [postInput, setPostInput] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const createNoUserError = () => {
    dispatch(setError("Please select a user!"));
  };

  const handleInputChange = (e) => {
    setPostInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (postInput) {
      if (currentUser === null) {
        createNoUserError();
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
    </>
  );
}
