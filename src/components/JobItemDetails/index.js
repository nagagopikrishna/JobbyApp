import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {TiStarFullOutline} from 'react-icons/ti'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    jobDetailsApiStatus: apiStatus.initial,
  }

  getCamelCaseData = data => {
    const updatedJobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      id: data.job_details.id,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      rating: data.job_details.rating,
      packagePerAnnum: data.job_details.package_per_annum,
      title: data.job_details.title,
      //   lifeAtCompany: {
      //       description: data.job_details.life_at_company.description,
      //       imageUrl: data.job_details.life_at_company.image_url
      //   }
      //   skills: data.job_details.skills.map(eachSkill => ({
      //     name: eachSkill.name,
      //     imageUrl: eachSkill.image_url,
      //   })),
    }

    const lifeAtCompany = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }

    const updatedSkillsData = data.job_details.skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    }))

    const updatedSimilarJobDetails = data.similar_jobs.map(eachJob => ({
      id: eachJob.id,
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    return {
      updatedJobDetails,
      updatedSimilarJobDetails,
      updatedSkillsData,
      lifeAtCompany,
    }
  }

  getJobItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data.job_details.skills)

      const {
        updatedJobDetails,
        updatedSimilarJobDetails,
        updatedSkillsData,
        lifeAtCompany,
      } = this.getCamelCaseData(data)

      // console.log(updatedJobDetails.skills)
      // console.log(updatedJobDetails)
      // console.log(updatedSimilarJobDetails)
      // console.log(updatedSkillsData)

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobDetails,
        skills: updatedSkillsData,
        lifeAtCompany,
        jobDetailsApiStatus: apiStatus.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatus.failure})
    }
  }

  componentDidMount = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsLoader = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="TailSpin" color="#ffff" width={50} height={50} />
    </div>
  )

  renderJobDetailsFailure = () => (
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
        onClick={() => this.getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {
      jobDetails,
      similarJobs,
      skills,
      lifeAtCompany,
      jobDetailsApiStatus,
    } = this.state
    // console.log(similarJobs)
    console.log(jobDetailsApiStatus)
    const {
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails
    console.log(lifeAtCompany)

    return (
      <>
        <div className="job-item-card">
          <div className="job-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-container">
              <h1 className="title"> {title}</h1>
              <div className="rating-container">
                <TiStarFullOutline className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details">
            <div>
              <div className="sub-job-details">
                <div className="location-container">
                  <IoLocationSharp className="icon" />
                  <p className="job-information"> {location}</p>
                </div>
                <div className="location-container">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="job-information">{employmentType}</p>
                </div>
              </div>
            </div>
            <p className="job-information-pack"> {packagePerAnnum}</p>
          </div>
          <hr className="job-list-line" />
          <div>
            <div className="description-visit-container">
              <h1 className="job-description-heading"> Description </h1>
              <a href={companyWebsiteUrl} className="company-link">
                Visit
                <FiExternalLink className="external-link" />
              </a>
            </div>
            <p className="job-description-details">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills </h1>
            <ul className="skills-list">
              {skills.map(eachSkill => {
                const {imageUrl, name} = eachSkill
                return (
                  <li className="skill-item" key={name}>
                    <img src={imageUrl} alt={name} className="skill-image" />
                    <p className="skill-name">{name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <h1 className="skills-heading"> Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-description-details">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="job details company logo"
              className="company-life-image"
            />
          </div>
        </div>
        <h1 className="similar-job-heading"> Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobs.map(each => (
            <SimilarJobCard similarJobDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailApiStatus = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case apiStatus.success:
        return this.renderJobDetails()
      case apiStatus.failure:
        return this.renderJobDetailsFailure()
      case apiStatus.inProgress:
        return this.renderJobDetailsLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-container">
          {/* {this.renderJobDetails()} */}
          {this.renderJobDetailApiStatus()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
