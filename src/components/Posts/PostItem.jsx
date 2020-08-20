import React from "react";
import { shape, number, string, func } from "prop-types";
import { Grid } from "@material-ui/core";

PostItem.propTypes = {
  post: shape({
    id: number.isRequired,
    name: string.isRequired,
    content: string.isRequired
  }).isRequired,
  onDeletePost: func.isRequired
};

function PostItem({ post, onDeletePost }) {
  return (
    <>
      <div data-testid={"postItem"} style={{ display: "flex", padding: "5px" }}>
        <Grid container justify="flex-start" alignItems="flex-start">
          <Grid item xs={1}>
            <span data-testid={"postItem-id"} style={{ paddingRight: "0.5em" }}>
              {post.id}.
            </span>
          </Grid>
          <Grid item xs={2}>
            <span
              data-testid={"postItem-user-name"}
              style={{ marginRight: "0.5em", fontStyle: "italic" }}
            >
              ({post.name})
            </span>
          </Grid>
          <Grid item style={{ display: "flex", flexGrow: 1 }}>
            <span
              data-testid={"postItem-content"}
              style={{ marginRight: "auto" }}
            >
              {post.content}
            </span>
          </Grid>
          <Grid item xs={1}>
            <span
              data-testid={"postItem-delete"}
              onClick={() => onDeletePost(post.id)}
              style={{ color: "red", cursor: "pointer", marginLeft: "auto" }}
            >
              x
            </span>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default PostItem;
