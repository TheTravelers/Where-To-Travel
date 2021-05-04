import React, { useState } from 'react'
import { registerUser} from '../../redux/userReducer'
import { ToastContainer, toast } from 'react-toastify'
import {connect} from 'react-redux'
import axios from 'axios'
import { uploadFile } from 'react-s3'
import { S3_BUCKET, REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './S3env'
const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
}

 const UploadImg = (props) => {
     const [ selectedFile, setSelectedFile ] = useState(null)

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const notifySuccess = () => {
        toast.success('Image Uploaded', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) 
    }

    const addProfilePicture = (profile_pic) => {
        axios.put(`/auth/register/picture/${props.user.user.user.user_id}`, { profile_pic })
        .then(res => {
            props.registerUser({user: res.data})
        })
        .catch(err=>console.log(err))
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
        .then(data => {
            console.log(data)
            notifySuccess()
            addProfilePicture(data.location)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={()=>handleUpload(selectedFile)}>Upload</button>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
    user: reduxState.userReducer
    }
  }
export default connect(mapStateToProps, { registerUser })(UploadImg)