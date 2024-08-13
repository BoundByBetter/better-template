/* istanbul ignore file */
import { createAction } from "@reduxjs/toolkit";
import { Post } from "./types/Post";
import { User } from "./types/User";
import { Feature } from "./types/Feature";

export const postDeletedViaSync = createAction<Post>(
  "posts/postDeletedViaSync",
);
export const postAddedOrUpdatedViaSync = createAction<Post>(
  "posts/postAddedOrUpdatedViaSync",
);
export const postsLoadedViaSync = createAction<Post[]>(
  "posts/postsLoadedViaSync",
);

export const postAdded = createAction<Post>("posts/postAdded");
export const postDeleted = createAction<Post>("posts/postDeleted");

export const featureDeletedViaSync = createAction<Feature>(
  "features/featureDeletedViaSync",
);
export const featureAddedOrUpdatedViaSync = createAction<Feature>(
  "features/featureAddedOrUpdatedViaSync",
);
export const featuresLoadedViaSync = createAction<Feature[]>(
  "features/featuresLoadedViaSync",
);

export const featureAdded = createAction<Feature>("features/featureAdded");
export const featureDeleted = createAction<Feature>("features/featureDeleted");

export const userLoggedIn = createAction<User>("user/userLoggedIn");
export const userLoggedOut = createAction<void>("user/userLoggedOut");
