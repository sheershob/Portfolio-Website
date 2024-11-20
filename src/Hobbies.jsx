import React from 'react'
import { useState, useEffect } from 'react';
import './Hobbies.css'
import win1 from './assets/win1.jpg'
import win2 from './assets/win2.jpg'
import win3 from './assets/win3.jpg'
import win4 from './assets/win4.png'
import win5 from './assets/win5.png'
import win6 from './assets/win6.png'

// const Hobbies = () => {
//   return (
//     <div>
//       <h1>My Hobbies</h1>
//       <h2>Chess</h2>
//       <div class="ratingsContainer">
//         <div class="rapid RatingsBox" id="rapid">
//           <h3>Rapid</h3>
//         </div>
//         <div class="blitz RatingsBox" id="blitz">
//           <h3>Blitz</h3>
//         </div>
//         <div class="bullet RatingsBox" id="bullet">
//           <h3>Bullet</h3>
//         </div>
//         <div class="daily RatingsBox" id="daily">
//           <h3>Daily</h3>
//         </div>
//       </div>
//     </div>
//   )
// }

const Hobbies = ({ username }) => {
  const [ratings, setRatings] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user ratings
  const getUserRatings = async (username) => {
    const url = `https://api.chess.com/pub/player/${username}/stats`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setStats(data);
      setRatings(data); // Store fetched data in state
    } catch (error) {
      // setError('Error fetching the ratings. Please try again later.');
      console.error('Error fetching the ratings:', error);
    }
  };

  useEffect(() => {
    getUserRatings(username); // Fetch data when the component mounts
  }, [username]);

  const calculatePercentages = (wins, draws, losses) => {
    const total = wins + draws + losses;
    if (total === 0) return { winPercent: 0, drawPercent: 0, lossPercent: 0 };

    const winPercent = Math.round((wins / total) * 100);
    const drawPercent = Math.round((draws / total) * 100);
    const lossPercent = Math.round((losses / total) * 100);
    return { winPercent, drawPercent, lossPercent };
  };

  // Render the progress bar for each category
  const renderProgressBar = (title, category) => {
    if (!stats || !stats[category]) return null;
    // console.log('Progress bar displayed');
    const { winPercent, drawPercent, lossPercent } = calculatePercentages(
      stats[category].record.win || 0,
      stats[category].record.draw || 0,
      stats[category].record.loss || 0
    );

    return (
      <div className="progress-bar">
        <div
          className="progress-bar-segment wins"
          style={{ width: `${winPercent}%` }}
        >
          {winPercent > 0 && `${winPercent}%`}
        </div>
        <div
          className="progress-bar-segment draws"
          style={{ width: `${drawPercent}%` }}
        >
          {drawPercent > 0 && `${drawPercent}%`}
        </div>
        <div
          className="progress-bar-segment losses"
          style={{ width: `${lossPercent}%` }}
        >
          {lossPercent > 0 && `${lossPercent}%`}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>My Chess.com Stats</h1>
      {error && <p className="error">{error}</p>}
      {!ratings && !error && <p>Loading ratings...</p>}

      {stats && (
        <div className="progress-bars">
        </div>
      )}

      {ratings && (
        <div className="ratingsContainer">
          <div class="rapid ratingsBox" id="rapid">
            <h2>Rapid</h2>
            <h3>Current Rating: {ratings.chess_rapid?.last.rating || 'N/A'}</h3>
            <h4>Peak: {ratings.chess_rapid?.best.rating || 'N/A'}</h4>
            {renderProgressBar('Rapid', 'chess_rapid')}
          </div>
          <div class="blitz ratingsBox" id="blitz">
            <h2>Blitz</h2>
            <h3>Current Rating: {ratings.chess_blitz?.last.rating || 'N/A'}</h3>
            <h4>Peak: {ratings.chess_blitz?.best.rating || 'N/A'}</h4>
            {renderProgressBar('Blitz', 'chess_blitz')}
          </div>
          <div class="bullet ratingsBox" id="bullet">
            <h2>Bullet</h2>
            <h3>Current Rating: {ratings.chess_bullet?.last.rating || 'N/A'}</h3>
            <h4>Peak: {ratings.chess_bullet?.best.rating || 'N/A'}</h4>
            {renderProgressBar('Bullet', 'chess_bullet')}
          </div>
          <div class="daily ratingsBox" id="daily">
            <h2>Daily</h2>
            <h3>Current Rating: {ratings.chess_daily?.last.rating || 'N/A'}</h3>
            <h4>Peak: {ratings.chess_daily?.best.rating || 'N/A'}</h4>
            {renderProgressBar('Daily', 'chess_daily')}
          </div>
        </div>
      )}
      <p>Check out my <a href="https://www.chess.com/member/sheershobanerjee">chess.com</a> profile</p>
      <h2>Some Tournament Victories:</h2>
      <div className="gallery">
          <img src={win1} alt="Inter-batch Tounament 2023" />
          <img src={win3} alt="Inter-batch Tounament 2023" />
          <img src={win2} alt="Inter-batch Tounament 2024" />
          <img src={win4} alt="Inter-batch Tounament 2023" />
          <img src={win5} alt="Inter-batch Tounament 2023" />
          <img src={win6} alt="September 2024" />
      </div>
      
      <h1>Lawn Tennis</h1>
      <p>I played tennis at the DDA Sports Complex Academy from Class VI to X, during which the sport became an integral part of my life. Some of my fondest memories include early mornings during vacations when my mother would drop me off at 6 AM to practice and play with friends. Over the years, I had the opportunity to participate in several tournaments, representing my school with pride. My best performance came when I secured fourth place in a zonal tournament, an achievement that remains close to my heart. Tennis has always been more than just a sport for me, it's a passion that fuels my competitive spirit and brings immense joy. I cherish every chance I get to play and look forward to continuing my journey with the game whenever possible.</p>
    </div>
  );
};

export default Hobbies