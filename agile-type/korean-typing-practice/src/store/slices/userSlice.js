import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: '',
  email: '',
  level: 1,
  experience: 0,
  totalPracticeTime: 0,
  averageWPM: 0,
  bestWPM: 0,
  totalSessions: 0,
  achievements: [],
  preferences: {
    theme: 'light',
    soundEnabled: true,
    difficulty: 'medium',
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, email } = action.payload;
      state.username = username;
      state.email = email;
      state.isLoggedIn = true;
      // Load from localStorage if exists
      const savedData = localStorage.getItem(`user_${username}`);
      if (savedData) {
        const userData = JSON.parse(savedData);
        return { ...state, ...userData, isLoggedIn: true };
      }
    },
    logout: state => {
      // Save current data before logout
      if (state.username) {
        localStorage.setItem(
          `user_${state.username}`,
          JSON.stringify({
            level: state.level,
            experience: state.experience,
            totalPracticeTime: state.totalPracticeTime,
            averageWPM: state.averageWPM,
            bestWPM: state.bestWPM,
            totalSessions: state.totalSessions,
            achievements: state.achievements,
            preferences: state.preferences,
          })
        );
      }

      return { ...initialState };
    },
    updateStats: (state, action) => {
      const { wpm, accuracy, timeSpent } = action.payload;

      // Update best WPM
      if (wpm > state.bestWPM) {
        state.bestWPM = wpm;
      }

      // Update average WPM
      state.totalSessions++;
      const totalWPM = state.averageWPM * (state.totalSessions - 1) + wpm;
      state.averageWPM = Math.round(totalWPM / state.totalSessions);

      // Update total practice time
      state.totalPracticeTime += timeSpent;

      // Add experience (simple formula)
      const expGained = Math.round((wpm * accuracy * timeSpent) / 100);
      state.experience += expGained;

      // Level up check (simple formula: 1000 exp per level)
      const expNeeded = state.level * 1000;
      if (state.experience >= expNeeded) {
        state.level++;
        state.experience = state.experience - expNeeded;
      }
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addAchievement: (state, action) => {
      const achievement = action.payload;
      if (!state.achievements.find(a => a.id === achievement.id)) {
        state.achievements.push({
          ...achievement,
          earnedAt: new Date().toISOString(),
        });
      }
    },
  },
});

export const { login, logout, updateStats, updatePreferences, addAchievement } =
  userSlice.actions;

export default userSlice.reducer;
