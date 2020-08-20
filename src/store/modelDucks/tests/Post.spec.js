// Post.spec.js

import orm from "../../orm";
import {
  applyActionToModelReducer,
  applyActionAndGetNextSession
} from "./ormTestUtils";
import { createPost, deletePost } from "../Post";
import { createUser } from "../User";
import { postsSelector } from "../PostSelectors";

const postData = [
  { id: 1, content: "something", user: 1 },
  { id: 2, content: "something else", user: 1 }
];

describe("Post - actions", () => {
  let ormState, session;
  beforeEach(() => {
    ormState = orm.getEmptyState();
    session = orm.mutableSession(ormState);
    postData.forEach((post) => session.Post.create(post));
  });

  it("handles creating posts", () => {
    const payload = {
      id: 3,
      content: "This is the post message",
      user: 3
    };

    let numPosts = session.Post.all().count();
    expect(numPosts).toBe(postData.length);

    const action = createPost(payload);
    applyActionToModelReducer(action, "Post", session);

    let postsQS = session.Post.all();
    expect(postsQS.count()).toBe(postData.length + 1);
    expect(postsQS.last().id).toEqual(payload.id);
    expect(postsQS.last().content).toEqual(payload.content);
  });

  it("handles deleting posts", () => {
    const numPosts = session.Post.all().count();
    expect(numPosts).toBe(postData.length);

    const action = deletePost(postData[0].id);
    applyActionToModelReducer(action, "Post", session);

    let postsQS = session.Post.all();
    expect(postsQS.count()).toBe(postData.length - 1);

    const postDataWithoutFirst = [...postData].splice(1);
    expect(postsQS.toRefArray()).toEqual(postDataWithoutFirst);
  });
});

// SELECTOR TESTS
const selectorPostData1 = [
  { id: 1, content: "something", user: 1 },
  { id: 2, content: "something else", user: 1 }
];
const selectorPostData2 = [
  { id: 3, content: "post4", user: 1 },
  { id: 4, content: "post5", user: 1 }
];
const selectorPostData3 = [
  { id: 5, content: "post6", user: 1 },
  { id: 6, content: "post7", user: 1 }
];

const expectedSelectedPostData1 = [
  { id: 1, content: "something", name: "Johnson" },
  { id: 2, content: "something else", name: "Johnson" }
];
const expectedSelectedPostData2 = [
  { id: 3, content: "post4", name: "Johnson" },
  { id: 4, content: "post5", name: "Johnson" }
];
const expectedSelectedPostData3 = [
  { id: 5, content: "post6", name: "Johnson" },
  { id: 6, content: "post7", name: "Johnson" }
];

describe("Post - Selectors", () => {
  let ormState;
  let session;
  beforeEach(() => {
    ormState = orm.getEmptyState();
    session = orm.mutableSession(ormState);
    selectorPostData1.forEach((post) => {
      session = applyActionAndGetNextSession(createPost(post), "Post", session);
    });

    // make one user
    session = applyActionAndGetNextSession(
      createUser({ id: 1, name: "Johnson" }),
      "User",
      session
    );
  });

  it("should select all posts with postsSelector", () => {
    const posts = postsSelector({ orm: session.state });
    expect(posts).toEqual(expectedSelectedPostData1);
  });

  it("should select all posts after adding more posts", () => {
    selectorPostData2.forEach(
      (post) =>
        (session = applyActionAndGetNextSession(
          createPost(post),
          "Post",
          session
        ))
    );
    const newPosts = postsSelector({ orm: session.state });
    expect(newPosts).toEqual([
      ...expectedSelectedPostData1,
      ...expectedSelectedPostData2
    ]);

    selectorPostData3.forEach(
      (post) =>
        (session = applyActionAndGetNextSession(
          createPost(post),
          "Post",
          session
        ))
    );
    const newPosts1 = postsSelector({ orm: session.state });
    expect(newPosts1).toEqual([
      ...expectedSelectedPostData1,
      ...expectedSelectedPostData2,
      ...expectedSelectedPostData3
    ]);
  });

  it("should select the remaining posts after deleting posts", () => {
    session = applyActionAndGetNextSession(
      deletePost(postData[0].id),
      "Post",
      session
    );
    const posts = postsSelector({ orm: session.state });
    const expectedPostDataWithoutFirst = [...expectedSelectedPostData1].splice(
      1
    );
    expect(posts).toEqual(expectedPostDataWithoutFirst);
  });
});
