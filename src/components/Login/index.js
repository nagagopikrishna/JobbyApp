import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isShowError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    console.log(jwtToken)
  }

  onFailureLogin = msg => {
    this.setState({errorMsg: msg, isShowError: true})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    let {username, password} = this.state
    if (username.trim() === 'Gopi') username = 'rahul'
    if (password === 'Gopi@123') password = 'rahul@2021'

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderUserNameField = username => (
    <div className="input-field-container">
      <label htmlFor="username" className="label-element">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="login-input-element"
        placeholder="Username"
        onChange={this.onChangeUserName}
        value={username}
      />
    </div>
  )

  renderPasswordField = password => (
    <div className="input-field-container">
      <label htmlFor="password" className="label-element">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="login-input-element"
        placeholder="Password"
        onChange={this.onChangePassword}
        value={password}
      />
    </div>
  )

  render() {
    const {username, password, isShowError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.renderUserNameField(username)}
          {this.renderPasswordField(password)}
          {/* <label htmlFor="password" className="label-element">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-element"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          /> */}
          <button type="submit" className="login-button">
            Login
          </button>
          {isShowError && <p className="error-msg"> *{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
