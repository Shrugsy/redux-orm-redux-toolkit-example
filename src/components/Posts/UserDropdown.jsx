import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentUser,
  clearCurrentUser
} from "../../store/slices/currentUser";
import { usersSelector } from "../../store/modelDucks/UserSelectors";

/**
 * Has a dropdown for all current users and allows selecting the current user
 */
export default function UserDropdown() {
  const dispatch = useDispatch();
  const users = useSelector((state) => usersSelector(state));
  const currentUser = useSelector((state) => state.currentUser);

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(clearCurrentUser());
    } else {
      dispatch(setCurrentUser(e.target.value));
    }
  };

  return (
    <>
      <div>Current user:</div>
      <Select
        value={currentUser !== null ? currentUser : ""}
        onChange={handleChange}
        displayEmpty
        style={{ marginBottom: "0.8em" }}
      >
        <MenuItem value={""}>
          <em>No user</em>
        </MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
