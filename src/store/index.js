import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./slices/error";
import { currentUserReducer } from "./slices/currentUser";
import { reducer as ormReducer } from "./orm";
import { createPost } from "./modelDucks/Post";
import { createUser } from "./modelDucks/User";

const store = configureStore({
  reducer: {
    orm: ormReducer,
    currentUser: currentUserReducer,
    error: errorReducer
  }
});

// add some initial fake data
store.dispatch(createUser({ id: 1, name: "Frank" }));
store.dispatch(createUser({ id: 2, name: "John" }));
store.dispatch(createUser({ id: 3, name: "Anne" }));
store.dispatch(createPost({ content: "A starter post by Frank", user: 1 }));
store.dispatch(createPost({ content: "A second post by Frank", user: 1 }));
store.dispatch(createPost({ content: "A starter post by John", user: 2 }));
store.dispatch(createPost({ content: "A starter post by Anne", user: 3 }));

export default store;
