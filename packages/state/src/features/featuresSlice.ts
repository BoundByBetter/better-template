import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { 
  Feature, 
  logCall, 
  featureAdded, 
  featureAddedOrUpdatedViaSync, 
  featureDeleted, 
  featureDeletedViaSync, 
  featuresLoadedViaSync, 
} from "@boundbybetter/shared";
import { StateObjectCollection } from "../StateObjectCollection";
import { syncObjects } from "../syncObjects";

const featuresAdapter = createEntityAdapter<Feature>({
  sortComparer: (a, b) => {
    /*istanbul ignore next*/ 
    const aCreatedAt = a.createdAt ?? new Date().toISOString();
    /*istanbul ignore next*/ 
    const bCreatedAt = b.createdAt ?? new Date().toISOString();

    return bCreatedAt.localeCompare(aCreatedAt)
  },
});

const initialState: StateObjectCollection<Feature> = featuresAdapter.getInitialState({
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
});

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(featureAdded, (state, action) => {
      logCall('featuresSlice.addFeature', action.payload);
      if (action.payload.createdAt === undefined) {
        action.payload.createdAt = new Date().toISOString();
      }
      featuresAdapter.addOne(state, action.payload);
      // state.entities[action.payload.id] = action.payload;
      // add new feature to the beginning of the array
      // state.ids.unshift(action.payload.id);
    })
    .addCase(featureDeleted, (state, action) => {
      logCall('featuresSlice.deleteFeature', action.payload);
      featuresAdapter.removeOne(state, action.payload.id);
    })
    .addCase(featureDeletedViaSync, (state, action) => {
      logCall('featuresSlice.featureDeletedViaSync', action.payload);
      featuresAdapter.removeOne(state, action.payload.id);
    })
    .addCase(featureAddedOrUpdatedViaSync, (state, action: PayloadAction<Feature>) => {
      logCall('featuresSlice.featureAddedOrUpdatedViaSync', action.payload);
      const feature = state.entities[action.payload.id];
      if ((JSON.stringify(feature) === JSON.stringify(action.payload)) === false) {
        logCall('featuresSlice.featureAddedOrUpdatedViaSync.upsertOne');
        featuresAdapter.upsertOne(state, action.payload);
      }
    })
    .addCase(featuresLoadedViaSync, (state, action) => {
      const objectName = 'features';
      syncObjects(objectName, action.payload, state);
    });
  },
});

export const featuresReducer = featuresSlice.reducer;

export const {
  selectAll: selectAllFeatures,
  selectById: selectFeatureById,
  selectIds: selectFeatureIds,
} = featuresAdapter.getSelectors<RootState>((state) => state.features);


