import { AuthForm } from './form';
import { Modal, Button } from 'react-bootstrap';
import React from 'react'
import ReactJson from 'react-json-view'


export class AuthModal extends React.Component {
  state = {show: true}

  componentDidMount() {
    console.log('auth did mount')
    this.setState({show: true})
  }

  handleHide= () => {
    this.setState({show: false})
  }

  restoreUrl = (e) => {
    if (!this.state.show)
      this.props.history.replace(`/`)
  }

  saveToken = (token) => {
    console.log(token)
    this.setState({auth_data: token.auth_data, auth_token: token.auth_token})
  }

  render() {
    // return(
    //   <Modal
    //     show={this.state.show}
    //     onHide={this.handleHide}
    //     onExited={this.restoreUrl}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>
    //         Login
    //       </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <Auth/>
    //     </Modal.Body>
    //   </Modal>
    // )

    return(
      <Modal
        show={this.state.show}
        onHide={this.handleHide}
        onExited={this.restoreUrl}>
        <Modal.Header closeButton>
          <Modal.Title>
            Login
          </Modal.Title>
        </Modal.Header>

        {this.state.auth_data ?
          <React.Fragment>
            <Modal.Body>
              <div className='row'>
                <div className='col-sm-3'>
                  <img className="avatar" src={`https://avatars.wdf.sap.corp/avatar/${this.state.auth_data['user']['name']}?size=100x100`}/>
                </div>
                <div className='col-sm-9'>
                  User: {this.state.auth_data['user']['name']}
                  <br/>
                  Roles: {this.state.auth_data['roles'].map(r => r.name).join(', ')}/>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => {e.preventDefault(); this.handleHide()}}>Close</button>
            </Modal.Footer>
          </React.Fragment>
          :
          <AuthForm
            onLoggedIn={this.saveToken}
            domain={process.env.AUTH_SCOPE_DOMAIN}
            scopeDomainName={process.env.AUTH_SCOPE_DOMAIN}
            scopeProjectName={process.env.AUTH_SCOPE_PROJECT}>
            {({values, error, handleLogin, handleChange}) => {
              console.log('values',values)
              return <React.Fragment>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="loginUser">User</label>
                    <input
                      type="text"
                      className="form-control"
                      id="loginUser"
                      name='user'
                      value={values.user || ''}
                      placeholder="D/C/I ID"
                      onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      name='password'
                      placeholder="Password"
                      value={values.password || ''}
                      onChange={handleChange}/>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => {e.preventDefault(); this.handleHide()}}>Close</button>
                  <button type="submit" className="btn btn-primary">Login</button>
                </Modal.Footer>
              </React.Fragment>
            }
            }
          </AuthForm>
        }
      </Modal>
    )
  }
}
