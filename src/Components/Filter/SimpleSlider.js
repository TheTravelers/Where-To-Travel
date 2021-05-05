import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'

export default function SimpleSlider(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function addedToast(){
    toast.success('Destination removed from your list', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true
    })
  }

  function addToList(e) {
    axios.post(`/userDestList/${this.props.user.user.user.user_id}`)
  }

  
  return (
      <div>
          <Slider {...settings}>
              {props.defaultDestinations.map((element, index) => {
                  return (
                      <div key={index}>
                          <h3>{element.city_name}</h3>
                          <button onClick={(e) => addToList(e.target)}>+ My List</button>
                          <img src={element.city_img} alt={element.city_name}/>
                      </div>
                  )
              })}
          </Slider>
          <ToastContainer/>
      </div>
  );
}