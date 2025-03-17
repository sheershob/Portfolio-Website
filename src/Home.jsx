import React from 'react'
import pic from './assets/me.jpg'

const Home = () => {
  return (
    <div>
      <img src={pic} alt="profile photo" style={{width:"22vw"}} />
      <h1>About me</h1>
      <p>
I was born in New Delhi in 2001 and spent a part of my early childhood in the UAE, where I lived for six years before returning to India. 
I completed my schooling at Maxfort School, Dwarka, where I developed a strong foundation in academics and extracurricular activities. 
After successfully clearing the JEE Mains exam, I secured admission to the prestigious School of Engineering at Jawaharlal Nehru University (JNU) for a Dual Degree program (B.Tech + M.Tech) in Electronics and Communication Engineering. 
This journey has shaped my academic and personal growth, fueling my passion for technology and problem-solving.
      </p>
      <p>I possess a strong technical skill set, including proficiency in Android app development in Java and Kotlin, Front-end web development (HTML, CSS, JavaScript, and React); Data Structures and Algorithms, and Object Oriented Programming in C++ and Java. I also have a good understanding of Operating Systems and am comfortable in both Windows and Linux.
        </p>
        <p>
          Additionally, I am a sporty and adventurous individual. I used to play tennis in my school days and participated in zonal tournaments. Now, I mostly play football and ocassionaly badminton. Since the lockdown, I have been playing chess quite often and am rated at about 1950 rapid on chess.com and 2050 on Lichess. I also have a keen interest in world geography. I do play Geoguessr and other Geography games like TimeGuessr, WhereTaken, Worldle, Countryle, Globle, Flagle.
        </p>
    </div>
  )
}

export default Home
