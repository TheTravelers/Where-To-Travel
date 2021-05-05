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
        if(name !== ''){
            axios.put(`auth/register/name/${props.user.user.user.user_id}`, {name})
            .then(res => {
                props.registerUser({user: res.data})
                setName('')
            })
            .catch(err=>console.log(err))
        }
        else{
            //INSERT TOASTIFY WARNING HERE
            window.alert('Name cannot be blank!')
        }
    }

    return (
        <section>
            <Header />
            <div className='profile-back'>
                <div className='profile-container'>

                    <img className="profile-picture" src={props.user.user.user.profile_pic} alt={props.user.user.user.name} />
                    {edit ? 
                    <div className='editor'>
                        <div>
                            <input value={name} placeholder="enter name" onChange={e=>setName(e.target.value)} />
                            <button onClick={editName}>Update Name</button>
                        </div>
                        <div>
                            <input value={profile_pic} placeholder="enter URL" onChange={e=>setProfilePic(e.target.value)} /> 
                            <button onClick={addProfilePicture}>Update Profile Pic</button>
                        </div>
                        <div>
                            <button className='edit-button' onClick={() => setEdit(!edit)}>Close Editor</button>
                        </div>
                    </div>
                    : 
                    <div>
                        <h2>{props.user.user.user.name}</h2>
                        <button className='edit-button' onClick={() => setEdit(!edit)}>Edit</button>
                    </div>
                    }
                </div>

                
            </div>
            
        </section>
    )
}

const mapStateToProps = reduxState => {
    return {
    user: reduxState.userReducer
    }
  }

export default connect(mapStateToProps, { registerUser })(Profile)
