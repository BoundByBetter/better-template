import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../posts/postsSlice';
import { userLoggedIn, userLoggedOut } from '@boundbybetter/shared';
import { AppStore } from '../store';
//import { syncReducer } from "@boundbybetter/backend";
import { userReducer } from './userSlice';
import { featuresReducer } from '../features/featuresSlice';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('userSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        //sync: syncReducer,
        user: userReducer,
        features: featuresReducer,
      },
    });
  });

  it('should update the user when userLoggedIn action is dispatched.', () => {
    store.dispatch(
      userLoggedIn({
        userName: 'user',
        userEmail: 'userEmail',
        groups: ['Admin'],
      }),
    );

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');
    expect(state.groups).toEqual(['Admin']);
  });

  it('should clear the user when userLoggedOut action is dispatched.', () => {
    store.dispatch(
      userLoggedIn({
        userName: 'user',
        userEmail: 'userEmail',
        groups: ['Admin'],
      }),
    );

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');
    expect(state.groups).toEqual(['Admin']);

    store.dispatch(userLoggedOut());

    const clearedState = store.getState().user;

    expect(clearedState.userName).toBeNull();
    expect(clearedState.userEmail).toBeNull();
    expect(clearedState.groups).toHaveLength(0);
  });
});
