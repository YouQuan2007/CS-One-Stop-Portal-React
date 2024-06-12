// import React from 'react'
import { BsPeopleFill } from "react-icons/bs"
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import './Home.css'
// import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Home = () => {
  return (
    <main className='main-container'>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total visitors</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>120</h1>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>Total pageviews</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>120</h1>
        </div>
      </div>

      <p></p>
      <p></p>
      <Card>
        <Card.Header as="h5">Announcements</Card.Header>
        <p></p>
        <Card>
          <Card.Body>
            <Card.Title>Announcement 1</Card.Title>
            <Card.Text>
              Announcement 1 details
            </Card.Text>
            
          </Card.Body>
        </Card>
        <p></p>
        <Card>
          <Card.Body>
            <Card.Title>Announcement 2</Card.Title>
            <Card.Text>
              Announcement 2 details
            </Card.Text>
            
          </Card.Body>
        </Card>
      </Card>
    </main>
  )
}

export default Home
