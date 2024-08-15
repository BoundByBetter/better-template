import {
  compareStringArrays,
  logCall,
  StateObject,
} from '@boundbybetter/shared';
import { StateObjectCollection } from './StateObjectCollection';
export function syncObjects<T extends StateObject>(
  objectName: string,
  remoteObjects: T[],
  localObjects: StateObjectCollection<T>,
) {
  logCall(`${objectName}Slice.${objectName}LoadedViaSync`);
  const remoteObjectIds = remoteObjects.map((feature) => feature.id);
  const localObjectIds = localObjects.ids;
  // If the collection of objects do not match.
  if (!compareStringArrays(localObjectIds, remoteObjectIds)) {
    // Find local objects to remove.
    const localObjectIdsToRemove = localObjectIds.filter(
      (id) => remoteObjectIds.includes(id) === false,
    );
    // Remove local objects.
    localObjectIdsToRemove.forEach((id) => {
      logCall(`${objectName}Slice.${objectName}LoadedViaSync.delete`, id);
      delete localObjects.entities[id];
    });
    // Find remote objects to add.
    const remoteObjectIdsToAdd = remoteObjectIds.filter(
      (id) => localObjects.ids.includes(id) === false,
    );
    // Add new server objects.
    remoteObjectIdsToAdd.forEach((id) => {
      const newRemoteObject = remoteObjects.find((obj) => obj.id === id);
      /* istanbul ignore else */
      if (newRemoteObject !== undefined) {
        logCall(
          `${objectName}Slice.${objectName}LoadedViaSync.add`,
          newRemoteObject,
        );
        localObjects.entities[id] = newRemoteObject;
      }
    });
    localObjects.ids = remoteObjectIds;
  }
  // Find local objects to update.
  const localObjectIdsToUpdate = localObjects.ids.filter(
    (id) => remoteObjectIds.includes(id) === true,
  );
  localObjectIdsToUpdate.forEach((id) => {
    const remoteObject = remoteObjects.find((obj) => obj.id === id);

    if (
      remoteObject !== undefined &&
      (JSON.stringify(localObjects.entities[id]) ===
        JSON.stringify(remoteObject)) ===
        false
    ) {
      logCall(
        `${objectName}Slice.${objectName}LoadedViaSync.update`,
        remoteObject,
      );
      localObjects.entities[id] = remoteObject;
    }
  });
}
