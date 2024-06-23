import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="main-container">
        <Header />
        <div className="home-container-description">
          <h1 className="main-heading"> Find The Job That Fits Your life </h1>
          <p className="description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-job-button"
              onClick={this.onClickFindJob}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
