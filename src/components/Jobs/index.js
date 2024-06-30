import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import Filters from '../Filters'
import JobCard from '../JobCard'
import './index.css'

class Jobs extends Component {
  state = {profileDetails: {}, jobsList: []}

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
    const updatedData = data.jobs.map(eachJob => ({
      id: eachJob.id,
      title: eachJob.title,
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      packagePerAnnum: eachJob.package_per_annum,
    }))
    this.setState({jobsList: updatedData})
  }

  componentDidMount = () => {
    this.getUserProfileDetails()
    this.getJobs()
  }

  renderSearchBar = searchId => (
    <div className="search-container" id={searchId}>
      <input type="search" className="search-jobs" placeholder="Search" />
      <BsSearch className="search-icon" />
    </div>
  )

  renderSlideBar = () => {
    const {profileDetails} = this.state
    return (
      <div className="slider-bar-container">
        {this.renderSearchBar('search-container-sm')}
        <ProfileDetails profileDetails={profileDetails} />
        <hr className="line" />
        <Filters />
      </div>
    )
  }

  render() {
    const {jobsList} = this.state
    console.log(jobsList)

    return (
      <div className="jobs-main-container">
        <Header />
        <div className="job-sub-container">
          {this.renderSlideBar()}
          <div className="job-container">
            {this.renderSearchBar('search-container-lg')}
            <ul className="jobs-list-container">
              {jobsList.map(each => (
                <JobCard jobs={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
