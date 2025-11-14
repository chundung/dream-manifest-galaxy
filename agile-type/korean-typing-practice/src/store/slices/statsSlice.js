import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: [],
  dailyStats: {},
  weeklyStats: {},
  monthlyStats: {},
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addSession: (state, action) => {
      const session = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };

      state.sessions.push(session);

      // Update daily stats
      const date = new Date().toISOString().split('T')[0];
      if (!state.dailyStats[date]) {
        state.dailyStats[date] = {
          date,
          sessions: 0,
          totalTime: 0,
          averageWPM: 0,
          bestWPM: 0,
          averageAccuracy: 0,
        };
      }

      const dailyStat = state.dailyStats[date];
      dailyStat.sessions++;
      dailyStat.totalTime += session.timeSpent;
      dailyStat.bestWPM = Math.max(dailyStat.bestWPM, session.wpm);

      // Calculate averages
      const daySessions = state.sessions.filter(s =>
        s.timestamp.startsWith(date)
      );
      const totalWPM = daySessions.reduce((sum, s) => sum + s.wpm, 0);
      const totalAccuracy = daySessions.reduce((sum, s) => sum + s.accuracy, 0);

      dailyStat.averageWPM = Math.round(totalWPM / daySessions.length);
      dailyStat.averageAccuracy = Math.round(
        totalAccuracy / daySessions.length
      );

      // Update weekly stats
      const weekStart = getWeekStart(new Date());
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!state.weeklyStats[weekKey]) {
        state.weeklyStats[weekKey] = {
          weekStart: weekKey,
          sessions: 0,
          totalTime: 0,
          averageWPM: 0,
          bestWPM: 0,
          averageAccuracy: 0,
        };
      }

      const weekSessions = state.sessions.filter(s => {
        const sessionDate = new Date(s.timestamp);
        return sessionDate >= weekStart;
      });

      const weeklyStat = state.weeklyStats[weekKey];
      weeklyStat.sessions = weekSessions.length;
      weeklyStat.totalTime = weekSessions.reduce(
        (sum, s) => sum + s.timeSpent,
        0
      );
      weeklyStat.bestWPM = Math.max(...weekSessions.map(s => s.wpm), 0);
      weeklyStat.averageWPM = Math.round(
        weekSessions.reduce((sum, s) => sum + s.wpm, 0) / weekSessions.length
      );
      weeklyStat.averageAccuracy = Math.round(
        weekSessions.reduce((sum, s) => sum + s.accuracy, 0) /
          weekSessions.length
      );
    },

    clearStats: state => {
      state.sessions = [];
      state.dailyStats = {};
      state.weeklyStats = {};
      state.monthlyStats = {};
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Helper function to get week start (Sunday)
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export const { addSession, clearStats, setLoading, setError } =
  statsSlice.actions;

export default statsSlice.reducer;
