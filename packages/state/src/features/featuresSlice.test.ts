import { configureStore } from "@reduxjs/toolkit";
import { featuresReducer, selectAllFeatures } from "./featuresSlice";
import {
  featureAdded,
  featureDeleted,
  featureDeletedViaSync,
  featureAddedOrUpdatedViaSync,
  featuresLoadedViaSync,
  FeatureStatus,
  Feature,
} from "@boundbybetter/shared";
import { AppStore } from "../store";
//import { syncReducer } from "@boundbybetter/backend";
import { userReducer } from "../user/userSlice";
import { postsReducer } from "../posts/postsSlice";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("featuresSlice", () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        features: featuresReducer,
        //sync: syncReducer,
        user: userReducer,
        posts: postsReducer,
      },
    });
  });

  it("should add a feature when featureAdded action is dispatched", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(1);
    expect(features[0]).toEqual(feature);
    expect(state.ids.length).toBe(1);
    expect(state.entities[feature.id]).toEqual(feature);
  });

  it("should store features sorted by created date", () => {
    const feature1: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
      createdAt: new Date("2021-01-01").toISOString(),
      updatedAt: new Date("2021-01-01").toISOString(),
    };

    const feature2: Feature = {
      id: "2",
      key: "key2",
      groups: [],
      status: FeatureStatus.ACTIVE,
      createdAt: new Date("2021-01-02").toISOString(),
      updatedAt: new Date("2021-01-02").toISOString(),
    };

    store.dispatch(featureAdded(feature1));
    store.dispatch(featureAdded(feature2));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(2);
    expect(state.ids.length).toBe(2);
    expect(state.ids[0]).toBe(feature2.id);
    expect(state.ids[1]).toBe(feature1.id);
    expect(state.entities[feature1.id]).toEqual(feature1);
  });

  it("should store features sorted by created date without dates", async () => {
    const feature1: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    const feature2: Feature = {
      id: "2",
      key: "key2",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature1));
    await delay(100);
    store.dispatch(featureAdded(feature2));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(2);
    expect(state.ids.length).toBe(2);
    expect(state.ids[0]).toBe(feature2.id);
    expect(state.ids[1]).toBe(feature1.id);
    expect(state.entities[feature1.id]).toEqual(feature1);
  });

  it("should remove a feature when featureDeleted action is dispatched", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));
    store.dispatch(featureDeleted(feature));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(0);
    expect(state.ids.length).toBe(0);
    expect(state.entities[feature.id]).toBeUndefined();
  });

  it("should remove a feature when featureDeletedViaSync action is dispatched", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));
    store.dispatch(featureDeletedViaSync(feature));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(0);
    expect(state.ids.length).toBe(0);
    expect(state.entities[feature.id]).toBeUndefined();
  });

  it("should add or update a feature when featureAddedOrUpdatedViaSync action is dispatched", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));

    const updatedFeature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAddedOrUpdatedViaSync(updatedFeature));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(1);
    expect(features[0]).toEqual(
      expect.objectContaining({
        ...updatedFeature,
        createdAt: expect.any(String),
      }),
    );
    expect(state.ids.length).toBe(1);
    expect(state.entities[updatedFeature.id]).toEqual(
      expect.objectContaining({
        ...updatedFeature,
        createdAt: expect.any(String),
      }),
    );
  });

  it("should not update a feature when featureAddedOrUpdatedViaSync action is dispatched and the feature in state is the same as the payload", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
      createdAt: new Date("2021-01-01").toISOString(),
    };

    store.dispatch(featureAdded(feature));

    const updatedFeature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
      createdAt: new Date("2021-01-01").toISOString(),
    };

    store.dispatch(featureAddedOrUpdatedViaSync(updatedFeature));

    const state = store.getState().features;
    const features = selectAllFeatures(store.getState());

    expect(features.length).toBe(1);
    expect(features[0]).toEqual(feature);
    expect(state.ids.length).toBe(1);
    expect(state.entities[feature.id]).toEqual(feature);
  });

  it("should load features when featuresLoadedViaSync action is dispatched", () => {
    const features: Feature[] = [
      {
        id: "1",
        key: "key1",
        groups: [],
        status: FeatureStatus.ACTIVE,
      },
      {
        id: "2",
        key: "key2",
        groups: [],
        status: FeatureStatus.ACTIVE,
      },
    ];

    store.dispatch(featuresLoadedViaSync(features));

    const state = store.getState().features;
    const storedFeatures = selectAllFeatures(store.getState());

    expect(storedFeatures.length).toBe(2);
    expect(storedFeatures).toEqual(features);
    expect(state.ids.length).toBe(2);
    expect(state.entities[features[0].id]).toEqual(features[0]);
    expect(state.entities[features[1].id]).toEqual(features[1]);
  });
  it("should delete a feature when featureLoadedViaSync action is dispatched and a feature in state is not in the payload", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));

    const features: Feature[] = [
      {
        id: "2",
        key: "key2",
        groups: [],
        status: FeatureStatus.ACTIVE,
      },
    ];

    store.dispatch(featuresLoadedViaSync(features));

    const state = store.getState().features;
    const storedFeatures = selectAllFeatures(store.getState());

    expect(storedFeatures.length).toBe(1);
    expect(storedFeatures).toEqual(features);
    expect(state.ids.length).toBe(1);
    expect(state.entities[features[0].id]).toEqual(features[0]);
  });
  it("should update an existing feature when featureLoadedViaSync action is dispatched and a feature in state is in the payload", () => {
    const feature: Feature = {
      id: "1",
      key: "key1",
      groups: [],
      status: FeatureStatus.ACTIVE,
    };

    store.dispatch(featureAdded(feature));

    const features: Feature[] = [
      {
        id: "1",
        key: "key1",
        groups: ["Group 1"],
        status: FeatureStatus.ACTIVE,
      },
    ];

    store.dispatch(featuresLoadedViaSync(features));

    const state = store.getState().features;
    const storedFeatures = selectAllFeatures(store.getState());

    expect(storedFeatures.length).toBe(1);
    expect(storedFeatures).toEqual(features);
    expect(state.ids.length).toBe(1);
    expect(state.entities[features[0].id]).toEqual(features[0]);
  });
});
