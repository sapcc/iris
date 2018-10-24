import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react'
import ReactJson from 'react-json-view'

export default class Profile extends React.Component {
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

  handleLogout = () => {
    this.props.logout()
    this.handleHide()
  }

  render() {
    let {profile} = this.props
    return(
      <Modal
        isOpen={this.state.show}
        onClose={this.handleHide}
        onClosed={this.restoreUrl}
        size='lg'>
        <ModalHeader toggle={this.handleHide}>Profile</ModalHeader>
        <ModalBody>
          {profile.isFetching ?
            <React.Fragment><span className='spinner'></span> Loading...</React.Fragment>
          : profile.user &&
            <div className='row'>
              <div className='col-sm-2'>
                <img className="avatar" src={`https://avatars.wdf.sap.corp/avatar/${profile.user.name}?size=100x100`}/>
              </div>
              <div className='col-sm-10'>
                <dl className="row">
                  <dt className="col-sm-2">Full Name</dt>
                  <dd className="col-sm-10">{profile.user.description}</dd>

                  <dt className="col-sm-2">Name</dt>
                  <dd className="col-sm-10">{profile.user.name}</dd>

                  <dt className="col-sm-2">Email</dt>
                  <dd className="col-sm-10">{profile.user.email}</dd>

                  <dt className="col-sm-2">ID</dt>
                  <dd className="col-sm-10">
                    {
                      profile.user.id.length>50
                      ? profile.user.id.substring(0,50)+'...'
                      : profile.user.id
                    }
                  </dd>
                  <dt className="col-sm-2"></dt>
                  <dd className="col-sm-10">
                    <small>Your session expires at {(new Date(profile.user.expires_at)).toLocaleString()}</small>
                  </dd>
                </dl>
              </div>
          </div>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.handleLogout}>Logout</Button>
          <Button onClick={this.handleHide}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
