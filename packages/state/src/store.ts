import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './posts/postsSlice'
//import { syncReducer } from '@boundbybetter/backend'
import { userReducer } from './user/userSlice'
import { featuresReducer } from './features/featuresSlice'
// ...

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    features: featuresReducer,
    //sync: syncReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;