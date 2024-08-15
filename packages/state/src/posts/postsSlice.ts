import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Posts } from './Posts';
import { RootState } from '../store';
import { comparePosts } from './comparePosts';
import {
  Post,
  compareStringArrays,
  logCall,
  postAdded,
  postAddedOrUpdatedViaSync,
  postDeleted,
  postDeletedViaSync,
  postsLoadedViaSync,
} from '@boundbybetter/shared';

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => {
    /*istanbul ignore next*/
    const aCreatedAt = a.createdAt ?? new Date().toISOString();
    /*istanbul ignore next*/
    const bCreatedAt = b.createdAt ?? new Date().toISOString();

    return bCreatedAt.localeCompare(aCreatedAt);
  },
});

const initialState: Posts = postsAdapter.getInitialState({
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAdded, (state, action) => {
        logCall('postsSlice.addPost', action.payload);
        if (action.payload.createdAt === undefined) {
          action.payload.createdAt = new Date().toISOString();
        }
        postsAdapter.addOne(state, action.payload);
        // state.entities[action.payload.id] = action.payload;
        // add new post to the beginning of the array
        // state.ids.unshift(action.payload.id);
      })
      .addCase(postDeleted, (state, action) => {
        logCall('postsSlice.deletePost', action.payload);
        postsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(postDeletedViaSync, (state, action) => {
        logCall('postsSlice.postDeletedViaSync', action.payload);
        postsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(
        postAddedOrUpdatedViaSync,
        (state, action: PayloadAction<Post>) => {
          logCall('postsSlice.postAddedOrUpdatedViaSync', action.payload);
          const post = state.entities[action.payload.id];
          if (comparePosts(post, action.payload) === false) {
            logCall('postsSlice.postAddedOrUpdatedViaSync.upsertOne');
            postsAdapter.upsertOne(state, action.payload);
          }
        },
      )
      .addCase(postsLoadedViaSync, (state, action) => {
        logCall('postsSlice.postsLoadedViaSync');
        const posts = action.payload;
        const postIds = posts.map((post) => post.id);
        if (!compareStringArrays(state.ids, postIds)) {
          const activityIdsToRemove = state.ids.filter(
            (id) => postIds.includes(id) === false,
          );
          activityIdsToRemove.forEach((id) => {
            logCall('postsSlice.postsLoadedViaSync.delete', id);
            delete state.entities[id];
          });
          const activityIdsToAdd = postIds.filter(
            (id) => state.ids.includes(id) === false,
          );
          activityIdsToAdd.forEach((id) => {
            const newPost = posts.find((post) => post.id === id);
            /* istanbul ignore else */
            if (newPost !== undefined) {
              logCall('postsSlice.postsLoadedViaSync.add', newPost);
              state.entities[id] = newPost;
            }
          });
          state.ids = postIds;
        }
        const activityIdsToUpdate = state.ids.filter(
          (id) => postIds.includes(id) === true,
        );
        activityIdsToUpdate.forEach((id) => {
          const newPost = posts.find((post) => post.id === id);

          if (
            newPost !== undefined &&
            comparePosts(state.entities[id], newPost) === false
          ) {
            logCall('postsSlice.postsLoadedViaSync.update', newPost);
            state.entities[id] = newPost;
          }
        });
      });
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);
