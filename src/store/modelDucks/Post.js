import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

// =====ACTIONS=====
export const createPost = createAction("models/posts/create");
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
        if (!payload.content || !payload.user) {
          console.warn("Unable to create a post with no content or user");
        } else {
          Post.upsert(payload);
        }
        break;
      }
      case deletePost.type: {
        let post = Post.withId(payload);
        post.delete();
        break;
      }
      default:
        break;
    }
  }
}
