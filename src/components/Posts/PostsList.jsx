import React from "react";
import { arrayOf, number } from "prop-types";
import PostItem from "./PostItem";

PostsList.propTypes = {
  postIDs: arrayOf(number).isRequired
};

function PostsList({ postIDs }) {
  return (
    <div data-testid={"posts-div"} style={{ width: "90%", margin: "0 auto" }}>
      {postIDs.map((id) => (
        <PostItem key={id} id={id} />
      ))}
    </div>
  );
}

export default PostsList;
