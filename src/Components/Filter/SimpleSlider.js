import React, { useState } from "react";
import Slider from "react-slick";
// import { useSTate } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import './SimpleSlider.scss'

export default function SimpleSlider(props) {
  const [index , setIndex] = useState(0)
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:true,
    afterChange: current => {
      // console.log(current)
      setIndex(current)
      
    }
    
  };


  function addedToast  (val) {
    toast.success(`${props.defaultDestinations[val].city_name} added to your list`, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
    });
  }

  //working on add to list button. -Chad
  let addToList = (val) => {
    const {city_name, population, waterfront, adult_friendly, family_friendly, city_img, state} = props.defaultDestinations[val]
    
    axios.post(`/userDestList/${props.userId}`, {
        city_name, population, waterfront, adult_friendly, family_friendly, city_img, state
    })
    .then(res => {
      // console.log(res)
      addedToast(val)
    })
    .catch(err => console.log(err))
  }

  // console.log(props, 'PROPS')

  return (
    <div className='default-destinations-container'>
      {/* {console.log(index)} */}
      {/* {console.log(props.defaultDestinations, 'first props.dest')} */}
      
      {/* DO NOT MOVE THIS BUTTON, IT WILL BREAK */}
      <button onClick={() => addToList(index)} >Save {props.defaultDestinations[index] ? props.defaultDestinations[index].city_name : ''} To My List</button>

      
      <Slider {...settings}>
        {/* {console.log(props.defaultDestinations, 'props inside SLID')} */}
        {props.defaultDestinations.map((element, index) => {
          // console.log(element.default_dest_id)
          return (
            <div key={index}>
              <h3>{element.city_name}</h3>
              {/* <button onClick={(e) => addToList(e.target)}>+ My List</button> */}
              <img src={element.city_img} alt={element.city_name} />
              
            </div>
          );
        })}
      </Slider>
      {/* <ToastContainer /> */}
    </div>
  );
}
