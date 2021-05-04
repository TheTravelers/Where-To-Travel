import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../redux/userReducer'
import Header from '../Header/Header'
import axios from 'axios'
import UploadingImg from './UploadImg'
import './Profile.scss'

const Profile = (props) => {
    const [ edit, setEdit ] = useState(false)
    const [ name, setName ] = useState('')

    function editName() {
        axios.put(`auth/register/name/${props.user.user.user.user_id}`, {name})
        .then(res => {
            props.registerUser({user: res.data})
            setName('')
        })
        .catch(err=>console.log(err))
    }

    return (
        <section>
            <Header />
            <img className="profile-picture" src={props.user.user.user.profile_pic} alt={props.user.user.user.name} />
            {edit ? 
            <div>
                <input value={name} placeholder="enter name" onChange={e=>setName(e.target.value)} />
                <button onClick={editName}>Update Name</button> 
                < UploadingImg />
            </div>
            : 
            <h2>{props.user.user.user.name}</h2>}

            <button onClick={() => setEdit(!edit)}>Edit</button>
            <br />
            <Link to="/my-list">My Saved Destinations</Link>
        </section>
    )
}

const mapStateToProps = reduxState => {
    return {
    user: reduxState.userReducer
    }
  }

export default connect(mapStateToProps, { registerUser })(Profile)
