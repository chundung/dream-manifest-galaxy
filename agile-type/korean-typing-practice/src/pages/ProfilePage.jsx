import React from 'react';
import { Container, Title, Card, Button, Input } from '../components/common/UI';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login, logout, updatePreferences } from '../store/slices/userSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    username,
    email,
    level,
    experience,
    averageWPM,
    bestWPM,
    totalSessions,
    preferences,
    isLoggedIn,
  } = useAppSelector(state => state.user);

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    email: '',
  });

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login(loginForm));
    setLoginForm({ username: '', email: '' });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePreferenceChange = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  const getExperienceProgress = () => {
    const expNeeded = level * 1000;
    return (experience / expNeeded) * 100;
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <Title size="3xl">로그인</Title>

        <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label>사용자 이름:</label>
              <Input
                type="text"
                value={loginForm.username}
                onChange={e =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>이메일:</label>
              <Input
                type="email"
                value={loginForm.email}
                onChange={e =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              로그인
            </Button>
          </form>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Title size="3xl">프로필</Title>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Card>
          <h3>사용자 정보</h3>
          <p>사용자 이름: {username}</p>
          <p>이메일: {email}</p>
          <p>레벨: {level}</p>
          <p>
            경험치: {experience}/{level * 1000}
          </p>
          <div
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginTop: '0.5rem',
            }}
          >
            <div
              style={{
                width: `${getExperienceProgress()}%`,
                height: '100%',
                backgroundColor: '#007bff',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </Card>

        <Card>
          <h3>타이핑 통계</h3>
          <p>평균 WPM: {averageWPM}</p>
          <p>최고 WPM: {bestWPM}</p>
          <p>총 세션 수: {totalSessions}</p>
        </Card>
      </div>

      <Card>
        <h3>설정</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={preferences.soundEnabled}
              onChange={e =>
                handlePreferenceChange('soundEnabled', e.target.checked)
              }
              style={{ marginRight: '0.5rem' }}
            />
            효과음 사용
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>난이도:</label>
          <select
            value={preferences.difficulty}
            onChange={e => handlePreferenceChange('difficulty', e.target.value)}
            style={{
              marginLeft: '0.5rem',
              padding: '0.25rem 0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
            }}
          >
            <option value="easy">쉬움</option>
            <option value="medium">보통</option>
            <option value="hard">어려움</option>
          </select>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          로그아웃
        </Button>
      </Card>
    </Container>
  );
};

export default ProfilePage;
