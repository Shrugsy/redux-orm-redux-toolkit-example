import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

// =====ACTIONS=====
export const createPost = createAction("models/posts/create");
export const editPost = createAction("models/posts/edit");
export const deletePost = createAction("models/posts/delete");

// =====MODEL=====
export class Post extends Model {
  static modelName = "Post";

  static get fields() {
    return {
      id: attr(),
      content: attr(),
      user: fk("User", "posts")
    };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case createPost.type: {
        const { content, user } = payload;
        if (!content || !user) {
          console.warn("Unable to create a post with no content or user");
        } else {
          Post.create(payload);
        }
        break;
      }
      case editPost.type: {
        const { id, content } = payload;
        if (!content || id === undefined || id === null) {
          console.warn("Unable to edit a post with no content or id");
        } else {
          const post = Post.withId(id);
          post.content = payload.content;
        }
        break;
      }
      case deletePost.type: {
        const id = payload;
        let post = Post.withId(id);
        post.delete();
        break;
      }
      default:
        break;
    }
  }
}
