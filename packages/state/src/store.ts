import { createStore } from 'tinybase';

export const store = createStore()
  .setTables({
    posts: {},
    features: {},
    user: {},
  });

export type Store = typeof store;
