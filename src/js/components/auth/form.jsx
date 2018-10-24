import React from 'react'

export class AuthForm extends React.Component {
  state = {
    auth: {
      user: '',
      password: ''
    },
    valid: false
  }

  componentDidMount() {
    let defaultValues = {}
    Object.keys(this.state.auth).forEach(key => defaultValues[key] = this.props[key])
    this.setState({auth: defaultValues, valid: this.isValid(defaultValues)})
  }

  onChange = (e) => {
    e.preventDefault()
    let auth = {...this.state.auth, [e.target.name]: e.target.value}

    this.setState({auth, valid: this.isValid(auth)},() => console.log(this.state))
  }

  isValid = (params) => {
    console.log('validate',params, params.user && params.password && true)
    return params.user && params.password && true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state.auth)
  }

  render(){
    if(this.props.children) {
      return(
        <form onSubmit={this.handleSubmit}>
          {React.createElement(this.props.children, {
             handleSubmit: this.handleSubmit,
             values: this.state.auth,
             isValid: this.state.valid,
             handleChange: this.onChange
           }
         )}
        </form>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
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
      </form>
    )
  }
}
