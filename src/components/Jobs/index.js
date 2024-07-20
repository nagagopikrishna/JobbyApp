import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import Filters from '../Filters'
import JobCard from '../JobCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    userSearch: '',
    activeSalary: '',
    jobTypeCheck: [],
    jobApiStatus: apiStatus.failure,
    profileApiStatus: apiStatus.initial,
  }

  updatedSalaryId = id => {
    this.setState({activeSalary: id}, this.getJobs)
  }

  updateJobTypeCheck = id => {
    const {jobTypeCheck} = this.state
    let updatedList = jobTypeCheck
    if (jobTypeCheck.includes(id)) {
      updatedList = jobTypeCheck.filter(each => each !== id)
    } else {
      updatedList = [...updatedList, id]
    }

    this.setState({jobTypeCheck: updatedList}, this.getJobs)
  }

  getUserProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatus.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data.profile_details)
      const profileDetails = data.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: apiStatus.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatus.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobApiStatus: apiStatus.inProgress})
    const {userSearch, activeSalary, jobTypeCheck} = this.state
    const jobType = jobTypeCheck.join(',')
    const jwtToken = Cookies.get('jwt_token')
    // const url = 'https://apis.ccbp.in/jobs'
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${activeSalary}&search=${userSearch}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
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
      this.setState({jobsList: updatedData, jobApiStatus: apiStatus.success})
    } else {
      this.setState({jobApiStatus: apiStatus.failure})
    }
  }

  componentDidMount = () => {
    this.getUserProfileDetails()
    this.getJobs()
  }

  onChangeUserSearch = event => {
    this.setState({userSearch: event.target.value})
  }

  renderSearchBar = searchId => {
    const {userSearch} = this.state

    return (
      <div className="search-container" id={searchId}>
        <input
          type="search"
          className="search-jobs"
          placeholder="Search"
          onChange={this.onChangeUserSearch}
          value={userSearch}
        />
        {/* <button
          type="button"
          
        > */}
        <BsSearch
          className="search-icon"
          data-testid="searchButton"
          onClick={() => this.getJobs()}
        />
        {/* </button> */}
      </div>
    )
  }

  renderSlideBar = () => {
    const {profileDetails, activeSalary, profileApiStatus} = this.state
    // console.log(profileApiStatus)
    return (
      <div className="slider-bar-container">
        {this.renderSearchBar('search-container-sm')}
        <ProfileDetails
          profileDetails={profileDetails}
          profileApiStatus={profileApiStatus}
          getUserProfileDetails={this.getUserProfileDetails}
        />
        <hr className="line" />
        <Filters
          updatedSalaryId={this.updatedSalaryId}
          activeSalary={activeSalary}
          updateJobTypeCheck={this.updateJobTypeCheck}
        />
      </div>
    )
  }

  renderJobView = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs-list-container">
            {jobsList.map(each => (
              <JobCard jobs={each} key={each.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobView()
        )}
      </>
    )
  }

  renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobView = () => (
    <div className="no-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-image"
      />
      <h1 className="no-job-heading"> No Jobs Found</h1>
      <p className="no-job-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobApiFailureView = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We Cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobs()}
      >
        Retry
      </button>
    </div>
  )

  renderJobApiStatus = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case apiStatus.inProgress:
        return this.renderJobsLoaderView()
      case apiStatus.success:
        return this.renderJobView()
      case apiStatus.failure:
        return this.renderJobApiFailureView()

      default:
        return null
    }
  }

  renderProfileApiStatus = () => {
    const {profileApiStatus} = this.state
    console.log(profileApiStatus)
    return <h1> naga</h1>
  }

  render() {
    const {jobsList} = this.state
    console.log(jobsList)
    // console.log(userSearch)
    // console.log(jobTypeCheck)

    return (
      <div className="jobs-main-container">
        <Header />
        <div className="job-sub-container">
          {this.renderSlideBar()}
          <div className="job-container">
            {this.renderSearchBar('search-container-lg')}
            {this.renderJobApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
