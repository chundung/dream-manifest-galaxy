import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './slices/typingSlice';
import userReducer from './slices/userSlice';
import statsReducer from './slices/statsSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    typing: typingReducer,
    user: userReducer,
    stats: statsReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// For TypeScript support, these would be:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
