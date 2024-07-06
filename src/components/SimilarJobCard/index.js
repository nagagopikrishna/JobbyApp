import {TiStarFullOutline} from 'react-icons/ti'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    title,
    rating,
    companyLogoUrl,
    jobDescription,
    location,
    employmentType,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
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
      <div>
        <h1 className="job-description-heading"> Description </h1>
        <p className="job-description">{jobDescription}</p>
      </div>
      <div className="similar-job-details">
        <div className="location-container">
          <IoLocationSharp className="icon" />
          <p className="job-description"> {location}</p>
        </div>
        <div className="location-container">
          <BsFillBriefcaseFill className="icon" />
          <p className="job-description">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
