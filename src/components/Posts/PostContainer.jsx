import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PostInput from "./PostInput";
import PostsList from "./PostsList";
import { deletePost } from "../../store/modelDucks/Post";
import {
  currentUserPostIDsSelector,
  postIDsSelector
} from "../../store/modelDucks/PostSelectors";

import UserDropdown from "./UserDropdown";

export default function PostContainer() {
  const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);
  const dispatch = useDispatch();

  const currentUserPostIDs = useSelector(currentUserPostIDsSelector);
  const allPostIDs = useSelector(postIDsSelector);

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
          style={{ userSelect: "none" }}
        />
        <PostsList
          postIDs={showOnlyUserPosts ? currentUserPostIDs : allPostIDs}
          onDeletePost={(post) => dispatch(deletePost(post))}
        />
      </div>
    </>
  );
}
