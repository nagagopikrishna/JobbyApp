import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-items-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-item-lg">
              Home
            </Link>
            <Link to="/" className="nav-item-sm">
              <AiFillHome className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-item-lg">
              Jobs
            </Link>
            <Link to="/jobs" className="nav-item-sm">
              <BsBriefcaseFill className="icon" />
            </Link>
          </li>
          <li
            type="button"
            className="logout-button-sm"
            onClick={onClickLogout}
          >
            <FiLogOut className="icon" />
          </li>
        </ul>
        <button
          type="button"
          className="logout-button-lg"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
