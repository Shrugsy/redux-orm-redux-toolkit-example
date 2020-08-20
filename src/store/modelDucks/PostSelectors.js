import { createSelector } from "redux-orm";
import orm from "../orm";

// =====SELECTORS=====
// ALL POSTS
// returns all posts, with the user's name included
export const postsSelector = createSelector(orm, (session) => {
  const postModels = session.Post.all().toModelArray();
  const formattedPosts = postModels.map((post) => {
    let name = "";
    if (!post.user) {
      console.warn("No user model found for post: ", post);
    } else {
      name = post.user.name;
    }
    return {
      id: post.id,
      content: post.content,
      name
    };
  });
  return formattedPosts;
});

// CURRENT USER POSTS
// returns posts for the current user (based on currentUser 'id' in store)
export const currentUserPostsSelector = createSelector(
  [orm, (state) => state.currentUser],
  (session, currentUser) => {
    if (currentUser === undefined || currentUser === null) return [];
    const postModels = session.Post.all().toModelArray();
    return postModels.flatMap((post) => {
      if (post.user.id === currentUser) {
        return [
          {
            id: post.id,
            content: post.content,
            name: post.user.name
          }
        ];
      } else {
        return [];
      }
    });
  }
);

// POSTS BY ID
// e.g.   const userPosts = useSelector(state => userPostsSelector(state, id));
// would return an array of posts for the user with the given id
// (redux-orm style, not used in app)
export const userPostsSelector = createSelector(
  [orm.User, orm.User.posts],
  (user, posts) => {
    if (!posts) return [];
    return posts.map((post) => ({
      id: post.id,
      content: post.content,
      name: user.name
    }));
  }
);
