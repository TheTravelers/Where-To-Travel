import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.scss';

const Header = (props) => {
    const history = useHistory()

    function logout() {
        axios.post('/auth/logout')
        .then(() => {
            props.logoutUser()
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <header className='header-container'>
                <h1 className="header-h1">Where to Travel?</h1>
                <nav className="header-nav">
                    { history.location.pathname === '/main' ? <Link to="/my-list"><button className='header-button' >My List</button></Link> : <Link to="/main"><button className='header-button' >Find Destinations</button></Link>}
                    <div className='header-image'>
                        { props.user.user.user.profile_pic ? <Link to="/profile"><img className="header-image-inside" src={props.user.user.user.profile_pic} alt={props.user.user.user.name}/></Link> : <Link to="/profile"><button className='profile-no-img'>User Profile</button></Link>}
                    </div>
                    <Link to="/"><button className="header-button" onClick={logout}>Logout</button></Link>
                </nav>
            </header>
        </div>
    )
}
const mapStateToProps = reduxState => {
    return {
        user: reduxState.userReducer
    }
}
export default connect(mapStateToProps, { logoutUser })(Header)