import { PostStatus } from "@boundbybetter/shared";
import { RootState } from "../store";
import { selectAllPosts, selectPostById, selectPostIds } from "./postsSlice";

describe("postsSlice selectors", () => {
  let state: RootState;

  beforeEach(() => {
    state = {
      posts: {
        ids: ["1", "2"],
        entities: {
          "1": {
            id: "1",
            title: "Post 1",
            content: "Lorem ipsum dolor sit amet",
            status: PostStatus.ACTIVE,
          },
          "2": {
            id: "2",
            title: "Post 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            status: PostStatus.ACTIVE,
          },
        },
        status: "idle",
        error: null,
      },
      user: {
        userName: null,
        userEmail: null,
        groups: [],
      },
      features: {
        ids: [],
        entities: {},
        status: "idle",
        error: null,
      },
    };
  });

  it("should select all posts", () => {
    const selectedPosts = selectAllPosts(state);

    expect(selectedPosts.length).toBe(2);
    expect(selectedPosts[0]).toEqual(state.posts.entities["1"]);
    expect(selectedPosts[1]).toEqual(state.posts.entities["2"]);
  });

  it("should select a post by id", () => {
    const selectedPost = selectPostById(state, "1");

    expect(selectedPost).toEqual(state.posts.entities["1"]);
  });

  it("should select post ids", () => {
    const selectedPostIds = selectPostIds(state);

    expect(selectedPostIds.length).toBe(2);
    expect(selectedPostIds[0]).toBe("1");
    expect(selectedPostIds[1]).toBe("2");
  });
});
