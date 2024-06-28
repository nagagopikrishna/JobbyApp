import './index.css'

const ProfileDetails = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="profile-section-container">
      <img src={profileImageUrl} alt="profile" />
      <h1 className="profile-name"> {name} </h1>
      <p className="profile-bio"> {shortBio}</p>
    </div>
  )
}

export default ProfileDetails
