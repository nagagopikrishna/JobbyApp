import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileDetails = props => {
  const {profileApiStatus} = props

  const renderProfile = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-section-container">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="profile-name"> {name} </h1>
        <p className="profile-bio"> {shortBio}</p>
      </div>
    )
  }

  const renderProfileLoader = () => (
    <div className="profile-loader">
      <Loader type="ThreeDots" width={50} height={50} color="#ffff" />
    </div>
  )

  const renderProfileFailure = () => {
    const {getUserProfileDetails} = props
    return (
      <div className="profile-failure">
        <button
          className="retry-button"
          type="button"
          onClick={getUserProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  console.log(profileApiStatus)

  switch (profileApiStatus) {
    case apiStatus.success:
      return renderProfile()
    case apiStatus.inProgress:
      return renderProfileLoader()
    case apiStatus.failure:
      return renderProfileFailure()
    default:
      return null
  }
}

export default ProfileDetails
