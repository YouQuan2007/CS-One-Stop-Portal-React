//import React from 'react'
import { BsPeopleFill } from "react-icons/bs"
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
//import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Home = () => {

    // const data = [
    //     {
    //       name: 'Page A',
    //       uv: 4000,
    //       pv: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'Page B',
    //       uv: 3000,
    //       pv: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'Page C',
    //       uv: 2000,
    //       pv: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'Page D',
    //       uv: 2780,
    //       pv: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'Page E',
    //       uv: 1890,
    //       pv: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'Page F',
    //       uv: 2390,
    //       pv: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'Page G',
    //       uv: 3490,
    //       pv: 4300,
    //       amt: 2100,
    //     },
    //   ];

  return (
    <main className='main-container'>

        <div className='main-cards'>
            <div className='card'>
            <div className='card-inner'>
                <h3>Total visits</h3>
                <BsPeopleFill className='card_icon'/>
            </div>
            <h1></h1>
        </div>
  
        <div className='card'>
            <div className='card-inner'>
                <h3>Total pageviews</h3>
                <BsPeopleFill className='card_icon'/>
            </div>
            <h1></h1>
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

        {/* <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
        </div> */}
    </main>
  )
}

export default Home