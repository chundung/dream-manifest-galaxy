import React from 'react';
import { Container, Title, Card } from '../components/common/UI';
import { useAppSelector } from '../store/hooks';

const StatsPage = () => {
  const { sessions, dailyStats } = useAppSelector(state => state.stats);
  const { averageWPM, bestWPM, totalSessions, totalPracticeTime } =
    useAppSelector(state => state.user);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (minutes > 0) {
      return `${minutes}분 ${secs}초`;
    } else {
      return `${secs}초`;
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayStats = dailyStats[today] || {
    sessions: 0,
    totalTime: 0,
    averageWPM: 0,
    bestWPM: 0,
    averageAccuracy: 0,
  };

  return (
    <Container>
      <Title size="3xl">통계</Title>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Card>
          <h3>전체 통계</h3>
          <p>총 세션 수: {totalSessions}</p>
          <p>평균 WPM: {averageWPM}</p>
          <p>최고 WPM: {bestWPM}</p>
          <p>총 연습 시간: {formatTime(totalPracticeTime)}</p>
        </Card>

        <Card>
          <h3>오늘의 통계</h3>
          <p>세션 수: {todayStats.sessions}</p>
          <p>평균 WPM: {todayStats.averageWPM}</p>
          <p>최고 WPM: {todayStats.bestWPM}</p>
          <p>정확성: {todayStats.averageAccuracy}%</p>
        </Card>
      </div>

      <Card>
        <h3>최근 세션 기록</h3>
        {sessions.length > 0 ? (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {sessions
              .slice(-10)
              .reverse()
              .map(session => (
                <div
                  key={session.id}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p>WPM: {session.wpm}</p>
                    <p>정확성: {session.accuracy}%</p>
                  </div>
                  <div>
                    <p>{new Date(session.timestamp).toLocaleString()}</p>
                    <p>시간: {formatTime(session.timeSpent)}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>아직 세션 기록이 없습니다.</p>
        )}
      </Card>
    </Container>
  );
};

export default StatsPage;
