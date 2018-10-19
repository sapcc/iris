import identityClient from '../../actions/identity_client'
import React from 'react'

let identity = identityClient(process.env.IDENTITY_ENDPOINT)

export class AuthForm extends React.Component {
  state = {
    auth: {
      domain: '',
      user: '',
      password: '',
      scopeProjectName: null,
      scopeDomainName: null,
      scopeProjectId: null,
      scopeDomainId: null
    }
  }

  static defaultProps = {
    showDomainInput: true
  }

  componentDidMount() {
    let defaultValues = {}
    Object.keys(this.state.auth).forEach(key => defaultValues[key] = this.props[key])
    this.setState({auth: defaultValues})
  }

  onChange = (e) => {
    e.preventDefault()
    let auth = {...this.state.auth, [e.target.name]: e.target.value}

    this.setState({auth})
  }

  login = (e) => {
    e.preventDefault()
    this.setState({error: null})

    identity.createTokenByPassword(this.state.auth).then((response) => {
      if(this.props.onLoggedIn) {
        this.props.onLoggedIn({auth_data: response.data.token, auth_token: response.headers['x-subject-token']})
      }

    }).catch(error => {
      this.setState({error: error.message})
    })
  }

  render(){
    if(this.props.children) {
      return(
        <form onSubmit={this.login}>
          {React.createElement(this.props.children, {
             handleLogin: this.login,
             values: this.state.auth,
             error: this.state.error,
             handleChange: this.onChange
           }
         )}
        </form>
      )
    }

    return(
      <form onSubmit={this.login}>
        {this.state.error &&
          <p className='alert alert-danger'>{this.state.error}</p>
        }
        {this.props.showDomainInput &&
          <div className="form-group">
            <label htmlFor="loginDomain">Domain</label>
            <input
              type="text"
              className="form-control"
              id="loginDomain"
              name="domain"
              placeholder="Domain"
              value={this.state.domain}
              onChange={this.onChange}/>
          </div>
        }
        <div className="form-group">
          <label htmlFor="loginUser">User</label>
          <input
            type="text"
            className="form-control"
            id="loginUser"
            name="user"
            placeholder="User"
            value={this.state.password}
            onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            name="password"
            placeholder="Password"
            onChange={this.onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
          {this.state.token &&
            <div className='alert alert-notice'>
              <ReactJson src={this.state.token}/>
            </div>
          }
      </form>
    )
  }
}
