import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  within,
  createDefaultStore,
  fireEvent
} from "../../test-utils";
import { createUser } from "../../store/modelDucks/User";
import PostContainer from "./PostContainer";

describe("Posts component", () => {
  beforeEach(() => {
    const store = createDefaultStore();
    store.dispatch(createUser({ id: 1, name: "Billy" }));
    store.dispatch(createUser({ id: 2, name: "Jane" }));
    render(<PostContainer />, { store });
  });

  it("Shows the first user as the current user", () => {
    // screen.debug();
    const currentUserDropdown = screen.getByRole("button", { name: /billy/i });
    expect(currentUserDropdown).toBeDefined();
  });

  it("Allows changing users", () => {
    const currentUserDropdown = screen.getByRole("button", { name: /billy/i });
    userEvent.click(currentUserDropdown);
    const optionJane = screen.getByRole("option", { name: /jane/i });
    expect(optionJane).toBeDefined();
    userEvent.click(optionJane);
    const newCurrentUserDropdown = screen.getByRole("button", {
      name: /jane/i
    });
    expect(newCurrentUserDropdown).toBeDefined();
  });

  it("Handles Create/Edit/Delete & filtering posts", () => {
    // check current is Billy
    const currentUserDropdown = screen.getByRole("button", { name: /billy/i });
    expect(currentUserDropdown).toBeDefined();

    // type and submit in the input
    const input = screen.getByRole("textbox");
    userEvent.type(input, "This is my post content");
    expect(input.value).toBe("This is my post content");
    userEvent.type(input, "{enter}");
    expect(input.value).toBe("");

    // check the first post item shows expected content
    let allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(1);
    const firstPostItem = allPostItems[0];
    expect(within(firstPostItem).getByText(/billy/i)).toBeDefined();
    expect(
      within(firstPostItem).getByText("This is my post content")
    ).toBeDefined();

    // change user
    userEvent.click(currentUserDropdown);
    const optionJane = screen.getByRole("option", { name: /jane/i });
    userEvent.click(optionJane);

    // type and submit a new post in the input
    userEvent.type(input, "This is my first post{enter}");

    // check the second post item shows expected content
    allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(2);
    const secondPostItem = allPostItems[1];
    expect(within(secondPostItem).getByText(/jane/i)).toBeDefined();
    const firstPostContentJane = within(secondPostItem).getByText(
      "This is my first post"
    );
    expect(firstPostContentJane).toBeDefined();

    // edit the first post
    userEvent.click(firstPostContentJane);
    // should auto focus in the correct input
    userEvent.clear(document.activeElement);
    userEvent.type(document.activeElement, "Some edited content");
    fireEvent.blur(document.activeElement);
    // shouldn't see the previous text now
    expect(
      within(secondPostItem).queryByText("This is my first post")
    ).toBeNull();
    // should see the new text
    expect(
      within(secondPostItem).getByText("Some edited content")
    ).toBeDefined();

    // type and submit a second post for this user in the input
    userEvent.type(input, "Another post{enter}");

    // check the third post item shows expected content
    allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(3);
    const thirdPostItem = allPostItems[2];
    expect(within(thirdPostItem).getByText(/jane/i)).toBeDefined();
    expect(within(thirdPostItem).getByText("Another post")).toBeDefined();

    // click to show only Jane's posts
    const showOnlyMineCheckbox = screen.getByRole("checkbox", {
      name: /show only my posts/i
    });
    userEvent.click(showOnlyMineCheckbox);

    // check that the only posts shown belong to Jane
    allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(2);
    expect(within(allPostItems[0]).getByText(/jane/i)).toBeDefined();
    expect(
      within(allPostItems[0]).getByText("Some edited content")
    ).toBeDefined();
    expect(within(allPostItems[1]).getByText(/jane/i)).toBeDefined();
    expect(within(allPostItems[1]).getByText("Another post")).toBeDefined();

    // delete the first post
    const deleteSpan = within(allPostItems[0]).getByText(/x/i); // TODO: this should be a delete button probably
    userEvent.click(deleteSpan);

    // check that only one post (Jane's second post) is shown
    allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(1);
    expect(within(allPostItems[0]).getByText(/jane/i)).toBeDefined();
    expect(within(allPostItems[0]).getByText("Another post")).toBeDefined();

    // untick 'show only my posts'
    userEvent.click(showOnlyMineCheckbox);

    // check that Billy's post & Jane's second post are shown
    allPostItems = screen.getAllByTestId("postItem");
    expect(allPostItems).toHaveLength(2);
    expect(within(allPostItems[0]).getByText(/billy/i)).toBeDefined();
    expect(
      within(allPostItems[0]).getByText("This is my post content")
    ).toBeDefined();
    expect(within(allPostItems[1]).getByText(/jane/i)).toBeDefined();
    expect(within(allPostItems[1]).getByText("Another post")).toBeDefined();
  });
});
