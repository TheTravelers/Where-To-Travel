import axios from 'axios'
import React, { Component } from 'react'
import Header from '../Header/Header'
import {getSavedDestinations} from '../../redux/destinationReducer'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './UserList.scss'
import EmailForm from './EmailForm'


class UserList extends Component{
    constructor(){
        super()
        this.state ={
            title: '',
            message: ''
        }
    }

    componentWillMount(){
        console.log(this.props.user.user.user, 'this.props.user')
        axios.get(`/userDestList/${this.props.user.user.user.user_id}`)
        .then(res => {
            console.log(res.data, 'res data')
            this.props.getSavedDestinations(res.data)
            

        })

        //
    }

    // componentDidMount(){
    //     this.setState({showEmailForm: false})
    // }

    showEmailForm = () => {
        // Get the snackbar DIV
        var x = document.getElementById("email-form-comp");
        // Add the "show" class to DIV
        x.className = "show";

        this.setState({message: this.props.dest})
    }

    hideEmailForm(){
        var x = document.getElementById("email-form-comp");
        x.className = x.className.replace("show", "")
    }

    notifyRemoval = () => {
        toast.warning('Destination removed from your list', {
            position: 'top-center',
            autoClose: 4000,
            closeOnClick: true
        })
    }
    //    need to render this somewhere <ToastContainer />


    shareList = () => {
        // add nodemailer functionality here.
        const {name, email} = this.props.user.user.user
        let {title} = this.state.title
        const message = this.props.dest.userSavedDestinations;
        axios.post('/api/send-email', {name, email, title, message})
        .then(res => {
            console.log(res.data, 'shareList Response')

        })
    }

    handleTitleChange = (val) => {
        this.setState({title: val})
    }

    handleMessageChange = (val) => {
        this.setState({message: val})
    }


    render(){
        console.log(this.props.dest, 'this.props.dest')
        if (this.props.dest.userSavedDestinations.length < 1) {
            return (
              <section>
                  <Header />
                <header>
                  <h2>You have no saved destinations</h2>
                </header>
              </section>
            );
          }
        return(
            <div>
                <Header />
                <div>

                    <h1 className='user-list-title'>{this.props.user.user.user.name}'s Saved Destinations</h1>
                    <div className='user-destination-container'>
                    {this.props.dest.userSavedDestinations.map((element, index) => {
                        return (
                            <div className='user-destination-single' key={index}>
                                <h2 className='city-name-row'>
                                    <span>{element.city_name}, {element.state}</span>
                                    <button className="add-to-share-list">-</button>
                                </h2>
                                <img src={element.city_img}/>
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
                        )
                    })}
                    </div>
                    <button className='user-list-share-button' onClick={this.showEmailForm}>SHARE LIST</button>
                    <div id='email-form-comp' className=''>
                            EMAIL FORM
                        <div>
                            
                            <div>

                                <span>Title: </span>
                                <input value={this.state.title} onChange={e => this.handleTitleChange(e.target.value)} />
                            </div>
                            <div>
                                <span>Message: </span>
                                <input className='text-box' value={this.props.dest.userSavedDestinations} onChange={e => this.handleMessageChange(e.target.value)}/>
                            </div>
                        </div>
                        <div className='email-button-section'>
                            <button className='email-button' onClick={this.hideEmailForm}>CANCEL</button>
                            <button className='email-button'>SEND</button>
                        </div>
                                {/* < EmailForm /> */}
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