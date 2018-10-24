import { AuthForm } from './form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react'
import ReactJson from 'react-json-view'


export class AuthModal extends React.Component {
  state = { show: true}

  componentDidMount() {
    this.setState({show:true})
  }

  handleHide= () => {
    this.setState({show: false})
  }

  restoreUrl = (e) => {
    if (!this.state.show)
      this.props.history.replace(`/`)
  }

  render() {
    let {profile} = this.props
    return(
      <Modal
        isOpen={this.state.show}
        onClose={this.handleHide}
        onClosed={this.restoreUrl}>
        <ModalHeader toggle={this.handleHide}>Login</ModalHeader>

        {this.props.profile.user ?
          <React.Fragment>
            <ModalBody>
              <div className='row'>
                <div className='col-sm-3'>
                  <img className="avatar" src={`https://avatars.wdf.sap.corp/avatar/${profile.user.name}?size=100x100`}/>
                </div>
                <div className='col-sm-9'>
                  <span className='text-success'>You have been successfully logged in!</span>
                  <br/>
                  Welcome {profile.user.description}
                  <p className='small'>
                    Your session expires at {(new Date(profile.user.expires_at)).toLocaleString()}
                  </p>
                </div>
              </div>

            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleHide}>Close</Button>
            </ModalFooter>
          </React.Fragment>
          :
          <AuthForm handleSubmit={this.props.login}>
            {({values, handleChange, isValid}) => {
              return <React.Fragment>
                <ModalBody>
                  {profile.loginError &&
                    <p className='alert alert-danger'>{profile.loginError}</p>
                  }
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
                </ModalBody>
                <ModalFooter>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid || profile.isBeingLoggedOn}>
                    {profile.isBeingLoggedOn ? 'Please wait...' : 'Login'}
                  </button>
                </ModalFooter>
              </React.Fragment>
            }}
          </AuthForm>
        }
      </Modal>
    )
  }
}
