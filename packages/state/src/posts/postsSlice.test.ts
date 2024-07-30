import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, selectAllPosts } from "./postsSlice";
import { postAdded, postDeleted, postDeletedViaSync, postAddedOrUpdatedViaSync, postsLoadedViaSync, PostStatus, Post } from "@boundbybetter/shared";
import { AppStore } from "../store";
import { userReducer } from "../user/userSlice";
import { featuresReducer } from "../features/featuresSlice";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('postsSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        user: userReducer,
        features: featuresReducer,
      },
    });
  });

  it('should add a post when postAdded action is dispatched', () => {
    const post: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(1);
    expect(posts[0]).toEqual(post);
    expect(state.ids.length).toBe(1);
    expect(state.entities[post.id]).toEqual(post);
  });

  it('should store posts sorted by created date', () => {
    const post1: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
      createdAt: new Date('2021-01-01').toISOString(),
      updatedAt: new Date('2021-01-01').toISOString(),
    };

    const post2: Post = {
      id: '2',
      title: 'New Post 2',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
      createdAt: new Date('2021-01-02').toISOString(),
      updatedAt: new Date('2021-01-02').toISOString(),
    };

    store.dispatch(postAdded(post1));
    store.dispatch(postAdded(post2));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(2);
    expect(state.ids.length).toBe(2);
    expect(state.ids[0]).toBe(post2.id);
    expect(state.ids[1]).toBe(post1.id);
    expect(state.entities[post1.id]).toEqual(post1);
  });

  it('should store posts sorted by created date without dates', async () => {
    const post1: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    const post2: Post = {
      id: '2',
      title: 'New Post 2',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post1));
    await delay(100);
    store.dispatch(postAdded(post2));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(2);
    expect(state.ids.length).toBe(2);
    expect(state.ids[0]).toBe(post2.id);
    expect(state.ids[1]).toBe(post1.id);
    expect(state.entities[post1.id]).toEqual(post1);
  });

  it('should remove a post when postDeleted action is dispatched', () => {
    const post: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));
    store.dispatch(postDeleted(post));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(0);
    expect(state.ids.length).toBe(0);
    expect(state.entities[post.id]).toBeUndefined();
  });

  it('should remove a post when postDeletedViaSync action is dispatched', () => {
    const post: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));
    store.dispatch(postDeletedViaSync(post));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(0);
    expect(state.ids.length).toBe(0);
    expect(state.entities[post.id]).toBeUndefined();
  });

  it('should add or update a post when postAddedOrUpdatedViaSync action is dispatched', () => {
    const post: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));

    const updatedPost: Post = {
      id: '1',
      title: 'Updated Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAddedOrUpdatedViaSync(updatedPost));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(1);
    expect(posts[0]).toEqual(expect.objectContaining({
      ...updatedPost,
      createdAt: expect.any(String)
    }));
    expect(state.ids.length).toBe(1);
    expect(state.entities[updatedPost.id]).toEqual(expect.objectContaining({
      ...updatedPost,
      createdAt: expect.any(String)
    }));
  });

  it('should not update a post when postAddedOrUpdatedViaSync action is dispatched and the post in state is the same as the payload', () => {
    const post: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
      createdAt: new Date('2021-01-01').toISOString(),
    };

    store.dispatch(postAdded(post));

    const updatedPost: Post = {
      id: '1',
      title: 'New Post',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
      createdAt: new Date('2021-01-01').toISOString(),
    };

    store.dispatch(postAddedOrUpdatedViaSync(updatedPost));

    const state = store.getState().posts;
    const posts = selectAllPosts(store.getState());

    expect(posts.length).toBe(1);
    expect(posts[0]).toEqual(post);
    expect(state.ids.length).toBe(1);
    expect(state.entities[post.id]).toEqual(post);
  });

  it('should load posts when postsLoadedViaSync action is dispatched', () => {
    const posts: Post[] = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet',
        status: PostStatus.ACTIVE,
      },
      {
        id: '2',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        status: PostStatus.ACTIVE,
      },
    ];

    store.dispatch(postsLoadedViaSync(posts));

    const state = store.getState().posts;
    const storedPosts = selectAllPosts(store.getState());

    expect(storedPosts.length).toBe(2);
    expect(storedPosts).toEqual(posts);
    expect(state.ids.length).toBe(2);
    expect(state.entities[posts[0].id]).toEqual(posts[0]);
    expect(state.entities[posts[1].id]).toEqual(posts[1]);
  });
  it('should delete a post when postLoadedViaSync action is dispatched and a post in state is not in the payload', () => {
    const post: Post = {
      id: '1',
      title: 'Post 1',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));

    const posts: Post[] = [
      {
        id: '2',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        status: PostStatus.ACTIVE,
      },
    ];

    store.dispatch(postsLoadedViaSync(posts));

    const state = store.getState().posts;
    const storedPosts = selectAllPosts(store.getState());

    expect(storedPosts.length).toBe(1);
    expect(storedPosts).toEqual(posts);
    expect(state.ids.length).toBe(1);
    expect(state.entities[posts[0].id]).toEqual(posts[0]);
  });
  it('should update an existing post when postLoadedViaSync action is dispatched and a post in state is in the payload', () => {
    const post: Post = {
      id: '1',
      title: 'Post 1',
      content: 'Lorem ipsum dolor sit amet',
      status: PostStatus.ACTIVE,
    };

    store.dispatch(postAdded(post));

    const posts: Post[] = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        status: PostStatus.ACTIVE,
      },
    ];

    store.dispatch(postsLoadedViaSync(posts));

    const state = store.getState().posts;
    const storedPosts = selectAllPosts(store.getState());

    expect(storedPosts.length).toBe(1);
    expect(storedPosts).toEqual(posts);
    expect(state.ids.length).toBe(1);
    expect(state.entities[posts[0].id]).toEqual(posts[0]);
  });
});