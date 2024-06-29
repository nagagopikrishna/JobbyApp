import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import Filters from '../Filters'
import './index.css'

class Jobs extends Component {
  state = {profileDetails: {}}

  getUserProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data.profile_details)
    const profileDetails = data.profile_details
    const updatedProfileDetails = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }

    this.setState({profileDetails: updatedProfileDetails})
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  componentDidMount = () => {
    this.getUserProfileDetails()
    this.getJobs()
  }

  renderSearchBar = () => (
    <div className="search-container">
      <input type="search" className="search-jobs" placeholder="Search" />
      <BsSearch className="search-icon" />
    </div>
  )

  renderSlideBar = () => {
    const {profileDetails} = this.state
    return (
      <div className="slider-bar-container">
        {/* {this.renderSearchBar('search-container-sm')} */}
        <ProfileDetails profileDetails={profileDetails} />
        <hr className="line" />
        <Filters />
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-main-container">
        <Header />
        <div className="job-sub-container">
          {this.renderSlideBar()}
          <div className="job-container">
            {this.renderSearchBar()}
            {/* <h1> naga </h1> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
