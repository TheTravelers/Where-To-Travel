import { Component } from "react";
import {connect} from 'react-redux'
import {getSavedDestinations} from '../../redux/destinationReducer'
import './EmailForm.scss'


class EmailForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: ''
        }
    }


    handleTitleChange = (val) => {
        this.setState({title: val})
    }


    render(){
        return (
            <div className='email-form-container'>
                EMAIL FORM
                <div>
                <span>Title: </span>
                
                </div>

                <button>CANCEL</button>
                <button>SEND</button>

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

export default connect(mapStateToProps, {getSavedDestinations})(EmailForm);