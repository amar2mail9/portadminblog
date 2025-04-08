import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useLocation } from 'react-router-dom'


const Dashboard = () => {


  return (
    <Layout>
      
      <div>
        <h2 className='text-3xl font-bold mb-4'>Welcome to the Dashboard</h2>
        <p>This is where the main content will go.</p>
      </div>
    </Layout>
  )
}

export default Dashboard
