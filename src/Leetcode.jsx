import React, { useState, useEffect } from 'react';
import './Leetcode.css'

const Leetcode = () => {
  const [stats, setStats] = useState(null); // State to hold fetched data
  const [error, setError] = useState(null); // State to handle errors

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

       let response = await fetch(targetUrl, requestOptions);
      if (!response.ok) {
        // If first fetch fails, try the second one
        response = await fetch(proxyUrl + targetUrl, requestOptions);
        if (!response.ok) {
          throw new Error('Unable to fetch the User details from both sources');
        }
      }

      const parsedData = await response.json();
      console.log('Logging data: ', parsedData);
      setStats(parsedData); // Save fetched data in state

    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch stats. Please try again later.');
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch stats on component mount
  }, []);

  const displayData = (data) => {
    if (!data) return null;

    const { matchedUser, allQuestionsCount } = data?.data || {};

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
          {matchedUser?.submitStats?.acSubmissionNum.map((item, index) => (
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
      I began practicing on Leetcode around mid-2023, primarily solving problems in Java and later in C++ and Python to strengthen my grasp of other languages. 
      I chose Java as my primary language, recognizing its significant value and widespread use in the industry. Additionally, I have tackled database-related questions using MySQL, which has helped me deepen my understanding of data management and explore various perspectives on structuring and querying data efficiently.
       This experience has enhanced my problem-solving skills and broadened my technical expertise.
      </p>
    </div>
  );
};

export default Leetcode
