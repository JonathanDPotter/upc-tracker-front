import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// reducers
import { groupApi } from "./slices/groupSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [groupApi.reducerPath]: groupApi.reducer,
  },
  // get state from localStorage
  // preloadedState: loadState(),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(groupApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
