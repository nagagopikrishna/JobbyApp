import {TiStarFullOutline} from 'react-icons/ti'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobs} = props
  const {
    title,
    jobDescription,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
  } = jobs

  return (
    <li className="job-list">
      <div className="job-title-container">
        <img src={companyLogoUrl} alt={title} className="company-logo" />
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
              <p className="job-description"> {location}</p>
            </div>
            <div className="job-type-container">
              <BsFillBriefcaseFill className="icon" />
              <p className="job-description">{employmentType}</p>
            </div>
          </div>
        </div>
        <p className="job-description"> {packagePerAnnum}</p>
      </div>
      <hr className="job-list-line" />
      <div>
        <h1 className="job-description-heading"> Description </h1>
        <p className="job-description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobCard
