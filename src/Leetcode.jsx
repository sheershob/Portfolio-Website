import React, { useState, useEffect, useRef } from 'react';
import './Leetcode.css'
import contest1 from './assets/contest1.webp'
import contest2 from './assets/contest2.webp'
import contest3 from './assets/contest3.webp'

const Leetcode = () => {
  const [stats, setStats] = useState({
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    totalEasy: 0,
    mediumSolved: 0,
    totalMedium: 0,
    hardSolved: 0,
    totalHard: 0,
  });
  const [error, setError] = useState(null); // Error handling

  const hardcodedStats = {
    data: {
      allQuestionsCount: [
        { difficulty: 'Easy', count: 867 },
        { difficulty: 'Medium', count: 1813 },
        { difficulty: 'Hard', count: 811 },
        { difficulty: 'All', count: 3491 },
      ],
      matchedUser: {
        submitStats: {
          acSubmissionNum: [
            { difficulty: 'Easy', count: 541, submissions: 626 },
            { difficulty: 'Medium', count: 503, submissions: 650 },
            { difficulty: 'Hard', count: 46, submissions: 64 },
            { difficulty: 'All', count: 1090, submissions: 1551 },
          ],
          totalSubmissionNum: [
            { difficulty: 'Easy', count: 626, submissions: 900 },
            { difficulty: 'Medium', count: 650, submissions: 700 },
            { difficulty: 'Hard', count: 64, submissions: 150 },
            { difficulty: 'All', count: 1551, submissions: 1800 },
          ],
        },
      },
    },
  };

  const totalLabel = useRef(null);
  const easyLabel = useRef(null);
  const mediumLabel = useRef(null);
  const hardLabel = useRef(null);

  const totalProgressCircle = useRef(null);
  const easyProgressCircle = useRef(null);
  const mediumProgressCircle = useRef(null);
  const hardProgressCircle = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const username = 'sheersho_b';
      const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unable to fetch the User details');
      }

      const parsedData = await response.json();
      console.log('Logging data: ', parsedData);
      setStats(parsedData); // Save stats to state
      updateAllProgress(parsedData);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch stats.');
    }
  };

  const updateProgress = (solved, total, labelRef, circleRef) => {
    const progressDegree = (solved / total) * 100;
    if (circleRef.current && labelRef.current) {
      circleRef.current.style.setProperty('--progress-degree', `${progressDegree}%`);
      circleRef.current.style.animation = 'progressAnimation 1s ease forwards';
      labelRef.current.textContent = `${solved} / ${total}`;
    }
  };

  const updateAllProgress = (data) => {
    updateProgress(data.totalSolved, data.totalQuestions, totalLabel, totalProgressCircle);
    updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle);
    updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle);
    updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle);
  };

  const displayData = (data) => {
    if (!data) return null;

    return (
      <div className="leetcode-stats">
      {error && <p>{error}</p>}
      {!error && stats && (
        <div>
          <h2>LeetCode Stats:</h2>

          <div className="progress-container">
  <div className="progress-item">
    <div className="category-label">Total</div>
    <div id="total-progress" className="progress-circle" ref={totalProgressCircle}>
      <div className="label" ref={totalLabel}></div>
    </div>
  </div>
  
  <div className="progress-item">
    <div className="category-label">Easy</div>
    <div id="easy-progress" className="progress-circle" ref={easyProgressCircle}>
      <div className="label" ref={easyLabel}></div>
    </div>
  </div>

  <div className="progress-item">
    <div className="category-label">Medium</div>
    <div id="medium-progress" className="progress-circle" ref={mediumProgressCircle}>
      <div className="label" ref={mediumLabel}></div>
    </div>
  </div>

  <div className="progress-item">
    <div className="category-label">Hard</div>
    <div id="hard-progress" className="progress-circle" ref={hardProgressCircle}>
      <div className="label" ref={hardLabel}></div>
    </div>
  </div>
</div>

          <ul>
            <li>Acceptance Rate: {stats.acceptanceRate}%</li>
            <li>Ranking: {stats.ranking}</li>
            <li>Leetcode coins: {stats.contributionPoints}</li>
            <li>Reputation: {stats.reputation}</li>
          </ul>
        </div>
      )}
    </div>
    );
  };

  return (
    <div>
      <h1>LeetCode</h1>
      {error && <p className="error">{error}</p>}
      {!stats && !error && <p>Loading stats...</p>}
      
      {stats && displayData(stats)}
      { <h2>Peak contest rating after 70+ contests: 1752</h2> }
      <p>
      I began practicing DSA questions on Leetcode around mid-2023, primarily solving problems in Java and later in C++ and Python to strengthen my grasp of other languages. 
      I chose Java as my primary language, recognizing its significant value and widespread use in the industry. Additionally, I have tackled database-related questions using MySQL, which has helped me deepen my understanding of data management and explore various perspectives on structuring and querying data efficiently.
       This experience has enhanced my problem-solving skills and broadened my technical expertise.
      </p>
      <h2>Some of my best contest rankings:</h2>
      <div className="contest_gallery">
        <img src={contest1} alt="Contest Ranking screenshot" />
        <img src={contest2} alt="Contest Ranking screenshot" />
        <img src={contest3} alt="Contest Ranking screenshot" />          
      </div>
    </div>
  );
};

export default Leetcode
