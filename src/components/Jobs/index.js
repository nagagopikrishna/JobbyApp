import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="jobs-main-container">
        <Header />
        <div className="job-container">
          <div className="search-container">
            <input type="search" className="search-jobs" placeholder="Search" />
            <BsSearch className="search-icon" />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
