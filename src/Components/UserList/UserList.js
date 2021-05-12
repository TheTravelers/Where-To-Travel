import axios from 'axios'
import React, { Component } from 'react'
import Header from '../Header/Header'
import {getSavedDestinations} from '../../redux/destinationReducer'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { gsap } from 'gsap'
import 'react-toastify/dist/ReactToastify.css'
import './UserList.scss'


class UserList extends Component{
    constructor(){
        super()
        this.state ={
            emailTo: '',
            message: '',
            title: '',
            messageObj: '',
            confirmRemoveID: ''
        }
    }

    newPhoto = (res) => {

            const userDestinations = res.data
            for(let i = 0 ; i < userDestinations.length; i++){
                 axios.get(`https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${userDestinations[i].city_name.replace(
                    / /g,
                    "+"
                  )}&image_type=photo&per_page=3`)
                    .then(( res ) => {
                        userDestinations[i].city_img = res.data.hits[0].largeImageURL
                        this.props.getSavedDestinations(userDestinations)
                    })
            }
            
    }

    componentWillMount () {
        // console.log(this.props.user.user.user, 'this.props.user')
        axios.get(`/userDestList/${this.props.user.user.user.user_id}`)
        .then(res => this.newPhoto(res))
    }

    componentDidMount(){
        gsap.from('.container', {x: 2000, opacity: 0, duration: .5})
        gsap.from('.header', {x: -2000, opacity: 0, duration: .5})
    }

    showEmailForm = () => {
        // Get the snackbar DIV
        var x = document.getElementById("email-form-comp");
        // Add the "show" class to DIV
        x.className = "show";
        // console.log(this.props.dest.userSavedDestinations, 'setting to message')

        // const messageN = this.props.dest.userSavedDestinations.map((element, index) => {
        //     return `${element.city_name} ${element.city_img} ------ ${element.population}`
            
        // }).join(' ')
        // console.log(messageN, 'messageN')

        this.setState({messageObj: this.props.dest.userSavedDestinations})
    }

    hideEmailForm = () => {
        var x = document.getElementById("email-form-comp");
        x.className = x.className.replace("show", "")
        this.setState({emailTo: ''})
    }

    notifyRemoval = () => {
        toast.success('Destination removed from your list', {
            position: 'top-center',
            autoClose: 2000,
            closeOnClick: true
        })
    }

    notifyEmailSent = () => {
        toast.success('Email sent!', {
            position: 'top-center',
            autoClose: 3000,
            closeOnClick: true
        })
    }

    shareList = (e) => {
        // add nodemailer functionality here.
        this.setState({title: `${this.props.user.user.user.name} would like to share this travel destination list with you!`})
        const {name} = this.props.user.user.user
        let {message, title, messageObj} = this.state
        let email = this.state.emailTo
        
        axios.post('/api/send-email', {name, email, title, message, messageObj})
        .then(
            this.notifyEmailSent(),
            this.hideEmailForm()
        )
    }

    handleTitleChange = (val) => {
        this.setState({emailTo: val})
    }

    handleMessageChange = (val) => {
        let newVal = val;
        this.setState({message: newVal})
        // console.log(this.state.message, 'MESSAGE')
    }

    showConfirmation = (id) => {
        var x = document.getElementById("remove-confirmation");
        // Add the "show" class to DIV
        x.className = "show";
        this.setState({confirmRemoveID: id})
        // console.log(this.state.confirmRemoveID)
    }

    hideConfirmation =() => {
        var x = document.getElementById("remove-confirmation");
        x.className = x.className.replace("show", "")
    }

    removeFromList = () => {
        // console.log(val)
        // let saved_dest_id = val
        // console.log(saved_dest_id)
        axios.delete(`/userDestList/${this.props.user.user.user.user_id}/${this.state.confirmRemoveID}`)
        .then(res => {
            this.newPhoto(res)
            this.notifyRemoval()
            this.hideConfirmation()
        })

    }


    render(){
        // console.log(this.props.dest, 'this.props.dest')
        if (this.props.dest.userSavedDestinations.length < 1) {
            return (
              <section className='userlist-container'>
                  <Header />
                <header className="no-destinations">
                  <h2>You have no saved destinations</h2>
                </header>
              </section>
            );
          } return (
            <div  className="userlist-container">  
                <div className='header'>
                    <Header />
                </div>
                <ToastContainer />
                <button className='user-list-share-button' onClick={this.showEmailForm}>SHARE LIST</button>
                <div className="container">
                    <h1 className='user-list-title'>{this.props.user.user.user.name}'s Saved Destinations</h1>
                    <div className='user-destination-container'>
                        {this.props.dest.userSavedDestinations.map((element, index) => {
                            return (
                                <div className='user-destination-single' key={index}>
                                    <div className='city-name-row'>
                                        <h2>{element.city_name}, {element.state}</h2>                                 
                                        <button className="remove-from-share-list" 
                                        // onClick={() => this.removeFromList(element.saved_dest_id)}
                                        onClick={() => this.showConfirmation(element.saved_dest_id)}>-<span className="tooltiptext">Remove from list</span></button> 
                                        {/* this.removeFromList(element) */}  
                                    </div>
                                    <div className='image-container'>
                                        {element.city_img ? <img src={element.city_img} alt={element.city_name} /> : <h1>No image to display</h1>}
                                    </div>
                                    <div className='under-image'>
                                        <li>
                                            <ul>Area:
                                                <span className='city-answer'>
                                                    {element.population > 20000 ? 'Urban' : 'Rural'}
                                                </span>
                                            </ul>
                                            <ul>Near Waterfront: 
                                                <span className='city-answer'>
                                                    {element.waterfront === true ? 'Yes' : 'No'}
                                                </span>
                                            </ul>
                                            <ul>Adult Activities Nearby: 
                                                <span className='city-answer'>
                                                    {element.adult_friendly === true ? 'Yes' : 'No'}
                                                </span>
                                            </ul>
                                            <ul>Family Activities Nearby: 
                                                <span className='city-answer'> 
                                                    {element.family_friendly === true ? 'Yes' : 'No'}
                                                </span>
                                            </ul> 
                                        </li>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                    <div id='email-form-comp' className=''>
                        <div className='email-message-container'>
                            
                            <div className='email-message'>
                                <span>Email To:</span>
                                <input value={this.state.emailTo} onChange={e => this.handleTitleChange(e.target.value)} />
                            </div>
                            <div className='message'>
                                <span>Personal Message: </span>
                                <textarea type='text-area' className='text-box' value={this.state.message} onChange={e => this.handleMessageChange(e.target.value)}/>
                            </div>
                        </div>
                        <div className='email-button-section'>
                            <button className='email-button' onClick={this.hideEmailForm}>CANCEL</button>
                            <button className='email-button' onClick={e => this.shareList(e)}>SEND</button>
                        </div>      
                    </div>
                    <div id='remove-confirmation' className=''>
                        <p>Remove this destination from your saved list?</p>
                        <div className='confirm-buttons'>
                            <button onClick={this.removeFromList}>Yes</button>
                            <button onClick={this.hideConfirmation}>No</button>
                        </div>
                    </div> 
            </div>
        )
    }
    
}

const mapStateToProps = reduxState => {
    return {
    user: reduxState.userReducer,
    dest: reduxState.destinationReducer
    }
  }
  export default connect(mapStateToProps, {getSavedDestinations})(UserList);