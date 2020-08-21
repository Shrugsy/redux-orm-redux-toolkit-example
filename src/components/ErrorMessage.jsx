import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import errorSlice from "../store/ducks/error";

export default function ErrorMessage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error);

  const clearError = () => dispatch(errorSlice.actions.clear_error());

  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={3000}
      onClose={clearError}
    >
      <Alert onClose={clearError} severity="warning">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
