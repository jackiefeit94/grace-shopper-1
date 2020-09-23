import React from 'react'
import {fetchUsers} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllUsers extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    //dispatch the redux thunk
    this.props.getUsers()
  }

  render() {
    //store products in usersArr
    const usersArr = this.props.users

    return (
      <div>
        {/* render the users created from the redux thunk */}
        {usersArr.map(user => {
          return (
            // added link to single user view--do we need single user?? can admin add/delete single users?
            <div key={user.id}>
              <h2>{user.email}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
