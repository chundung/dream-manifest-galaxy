import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching typing texts
export const fetchTypingTexts = createAsyncThunk(
  'typing/fetchTexts',
  async (difficulty = 'medium') => {
    // Mock data - in real app, this would be an API call
    const mockTexts = {
      easy: ['가나다라 마바사', '오늘은 날씨가 좋다', '한글은 아름다운 글이다'],
      medium: [
        '안녕하세요! 한글 타이핑 연습을 시작해보세요.',
        '오늘 하루도 즐겁고 행복한 시간이 되기를 바랍니다.',
        '꾸준한 연습은 실력 향상의 가장 좋은 방법입니다.',
      ],
      hard: [
        '프로그래밍은 논리적 사고와 창의력을 요구하는 흥미로운 분야입니다.',
        '인공지능 기술의 발전은 우리의 삶을 더욱 편리하고 풍요롭게 만들어줍니다.',
        '지속적인 학습과 자기계발은 빠르게 변화하는 현대 사회에서 생존하기 위한 필수 역량입니다.',
      ],
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      texts: mockTexts[difficulty] || mockTexts.medium,
      difficulty,
    };
  }
);

const initialState = {
  currentText: '',
  typedText: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  isActive: false,
  isCompleted: false,
  texts: [],
  difficulty: 'medium',
  loading: false,
  error: null,
  wpm: 0,
  accuracy: 0,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  // Character-level tracking for TypingTextDisplay
  charStates: [], // Array of character states: 'correct', 'incorrect', 'current', 'untyped'
  errors: [], // Array of error positions
  keystrokes: [], // Array of keystroke data for analytics
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    startTyping: state => {
      state.isActive = true;
      state.startTime = Date.now();
      state.endTime = null;
      state.isCompleted = false;
    },
    updateTypedText: (state, action) => {
      const newTypedText = action.payload;
      const previousTypedText = state.typedText;
      state.typedText = newTypedText;
      state.currentIndex = newTypedText.length;

      // Update character states
      const currentText = state.currentText;
      state.charStates = [];
      state.errors = [];
      
      for (let i = 0; i < currentText.length; i++) {
        if (i < newTypedText.length) {
          // Typed character
          if (newTypedText[i] === currentText[i]) {
            state.charStates.push('correct');
          } else {
            state.charStates.push('incorrect');
            state.errors.push(i);
          }
        } else if (i === newTypedText.length) {
          // Current position
          state.charStates.push('current');
        } else {
          // Untyped character
          state.charStates.push('untyped');
        }
      }

      // Calculate statistics
      state.correctChars = 0;
      state.incorrectChars = 0;

      for (let i = 0; i < newTypedText.length; i++) {
        if (i < currentText.length) {
          if (newTypedText[i] === currentText[i]) {
            state.correctChars++;
          } else {
            state.incorrectChars++;
          }
        }
      }

      state.totalChars = newTypedText.length;
      state.accuracy =
        state.totalChars > 0
          ? Math.round((state.correctChars / state.totalChars) * 100)
          : 0;

      // Track keystrokes for analytics
      if (newTypedText.length > previousTypedText.length) {
        // New character typed
        const charIndex = newTypedText.length - 1;
        const isCorrect = charIndex < currentText.length && 
                         newTypedText[charIndex] === currentText[charIndex];
        
        state.keystrokes.push({
          charIndex,
          character: newTypedText[charIndex],
          expected: currentText[charIndex],
          isCorrect,
          timestamp: Date.now(),
        });
      }

      // Check if completed
      if (newTypedText === currentText) {
        state.isCompleted = true;
        state.endTime = Date.now();
        state.calculateWPM();
      }
    },
    calculateWPM: state => {
      if (state.startTime && state.endTime) {
        const timeInMinutes = (state.endTime - state.startTime) / 60000;
        const words = state.correctChars / 5; // Standard: 5 chars = 1 word
        state.wpm = Math.round(words / timeInMinutes) || 0;
      }
    },
    resetTyping: state => {
      state.typedText = '';
      state.currentIndex = 0;
      state.startTime = null;
      state.endTime = null;
      state.isActive = false;
      state.isCompleted = false;
      state.wpm = 0;
      state.accuracy = 0;
      state.correctChars = 0;
      state.incorrectChars = 0;
      state.totalChars = 0;
      state.charStates = [];
      state.errors = [];
      state.keystrokes = [];
    },
    setCurrentText: (state, action) => {
      state.currentText = action.payload;
      state.resetTyping();
      
      // Initialize character states for new text
      const text = action.payload;
      state.charStates = [];
      for (let i = 0; i < text.length; i++) {
        if (i === 0) {
          state.charStates.push('current');
        } else {
          state.charStates.push('untyped');
        }
      }
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    // New actions for character-level management
    updateCharState: (state, action) => {
      const { index, charState } = action.payload;
      if (index >= 0 && index < state.charStates.length) {
        state.charStates[index] = charState;
      }
    },
    addError: (state, action) => {
      const errorIndex = action.payload;
      if (!state.errors.includes(errorIndex)) {
        state.errors.push(errorIndex);
      }
    },
    removeError: (state, action) => {
      const errorIndex = action.payload;
      state.errors = state.errors.filter(index => index !== errorIndex);
    },
    clearErrors: state => {
      state.errors = [];
    },
    recordKeystroke: (state, action) => {
      const keystrokeData = action.payload;
      state.keystrokes.push({
        ...keystrokeData,
        timestamp: Date.now(),
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTypingTexts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypingTexts.fulfilled, (state, action) => {
        state.loading = false;
        state.texts = action.payload.texts;
        state.difficulty = action.payload.difficulty;
        // Set first text as current
        if (action.payload.texts.length > 0) {
          state.currentText = action.payload.texts[0];
        }
      })
      .addCase(fetchTypingTexts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  startTyping,
  updateTypedText,
  calculateWPM,
  resetTyping,
  setCurrentText,
  setDifficulty,
  updateCharState,
  addError,
  removeError,
  clearErrors,
  recordKeystroke,
} = typingSlice.actions;

export default typingSlice.reducer;
