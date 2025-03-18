import React, { useState, useEffect } from 'react';
import './Leetcode.css'
import contest1 from './assets/contest1.webp'
import contest2 from './assets/contest2.webp'
import contest3 from './assets/contest3.webp'

const Leetcode = () => {
  const [stats, setStats] = useState(null); // Fetched OR hardcoded stats
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

  const fetchStats = async () => {
    try {
      const username = 'sheersho_b';
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://leetcode.com/graphql';

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const graphql = JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username },
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow',
      };

      // First try without proxy
      let response = await fetch(targetUrl, requestOptions);
      if (!response.ok) {
        // Try with proxy
        response = await fetch(proxyUrl + targetUrl, requestOptions);
        if (!response.ok) {
          throw new Error('Both sources failed');
        }
      }

      const parsedData = await response.json();
      console.log('Logging API Data: ', parsedData);

      // If data is empty or API returns error, fallback
      if (!parsedData.data || !parsedData.data.matchedUser) {
        throw new Error('Invalid data received');
      }

      setStats(parsedData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // setError('Failed to fetch stats. Showing default stats.');
      // Fallback to hardcoded data
      setStats(hardcodedStats);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const displayData = (data) => {
    if (!data) return null;

    const { matchedUser, allQuestionsCount } = data.data;

    return (
      <div>
        <h2>All Questions Count:</h2>
        <ul>
          {allQuestionsCount.map((item, index) => (
            <li key={index}>
              {item.difficulty}: {item.count}
            </li>
          ))}
        </ul>

        <h2>Submission Stats:</h2>
        <ul>
          {matchedUser.submitStats.acSubmissionNum.map((item, index) => (
            <li key={index}>
              {item.difficulty}:
              <ul>
                <li>Accepted Count: {item.count}</li>
                <li>Submissions: {item.submissions}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>LeetCode Stats</h1>
      {error && <p className="error">{error}</p>}
      {!stats && !error && <p>Loading stats...</p>}
      { <h2>Peak contest rating after 70+ contests: 1752</h2> }
      {stats && displayData(stats)}
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
