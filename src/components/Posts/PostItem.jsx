import React, { useState, useMemo } from "react";
import { number } from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { editPost, deletePost } from "../../store/modelDucks/Post";
import { makeGetPostsByID } from "../../store/modelDucks/PostSelectors";
import RenderCounter from "../RenderCounter";

PostItem.propTypes = {
  id: number.isRequired
};

function PostItem({ id }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const thisPostSelector = useMemo(() => makeGetPostsByID(id), [id]);
  const post = useSelector(thisPostSelector);
  const [editedContent, setEditedContent] = useState(post ? post.content : "");

  if (!post) {
    return <div>Error: No post found with id {id}!</div>;
  }

  function handleInputChange(e) {
    setEditedContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editedContent && editedContent !== post.content) {
      const modifiedPost = {
        ...post,
        content: editedContent
      };
      dispatch(editPost(modifiedPost));
    }
    setEditing(false);
  }

  function deleteCurrentPost() {
    dispatch(deletePost(id));
  }

  const postId = (
    <Grid item xs={1}>
      <span data-testid={"postItem-id"} style={{ paddingRight: "0.5em" }}>
        {post.id}.
      </span>
    </Grid>
  );

  const postRenderCounter = (
    <Grid item>
      <RenderCounter id={post.id} />
    </Grid>
  );

  const postName = (
    <Grid item xs={2}>
      <span
        data-testid={"postItem-user-name"}
        style={{ marginRight: "0.5em", fontStyle: "italic" }}
      >
        ({post.name})
      </span>
    </Grid>
  );

  const editContentForm = (
    <form onSubmit={handleSubmit} onBlur={handleSubmit}>
      <TextField
        size="small"
        fullWidth
        placeholder={post.content}
        value={editedContent}
        onChange={handleInputChange}
        autoFocus
      />
    </form>
  );

  const postContent = (
    <Grid
      item
      style={{
        display: "flex",
        flexGrow: 1,
        cursor: !editing ? "pointer" : ""
      }}
      onClick={() => {
        !editing && setEditing(true);
      }}
    >
      <span data-testid={"postItem-content"} style={{ marginRight: "auto" }}>
        {editing ? editContentForm : post.content}
      </span>
    </Grid>
  );

  const deleteButton = (
    <Grid item xs={1}>
      <span
        data-testid={"postItem-delete"}
        onClick={deleteCurrentPost}
        style={{ color: "red", cursor: "pointer", marginLeft: "auto" }}
      >
        x
      </span>
    </Grid>
  );

  return (
    <>
      <div data-testid={"postItem"} style={{ display: "flex", padding: "5px" }}>
        <Grid container justify="flex-start" alignItems="flex-start">
          {postId}
          {postRenderCounter}
          {postName}
          {postContent}
          {deleteButton}
        </Grid>
      </div>
    </>
  );
}

export default React.memo(PostItem);
