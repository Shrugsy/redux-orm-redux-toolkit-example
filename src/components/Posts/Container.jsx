import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PostInput from "./PostInput";
import PostsList from "./PostsList";
import { deletePost } from "../../store/modelDucks/Post";
import {
  postsSelector,
  currentUserPostsSelector
} from "../../store/modelDucks/PostSelectors";

import UserDropdown from "./UserDropdown";

export default function Container() {
  const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);
  const dispatch = useDispatch();

  const posts = useSelector(postsSelector);
  const currentUserPosts = useSelector(currentUserPostsSelector);

  return (
    <>
      <div style={{ maxWidth: "600px", margin: "0 auto", width: "90%" }}>
        <UserDropdown />
        <PostInput />
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlyUserPosts}
              onChange={() => setShowOnlyUserPosts((prev) => !prev)}
            />
          }
          label={"Show only my posts"}
        />
        <PostsList
          posts={showOnlyUserPosts ? currentUserPosts : posts}
          onDeletePost={(post) => dispatch(deletePost(post))}
        />
      </div>
    </>
  );
}
