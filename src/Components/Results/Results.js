import axios from "axios";
import React, { Component } from "react";
import Header from "../Header/Header";
import { updateSavedDestinations } from "../../redux/destinationReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Results.scss";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      cityNames: []
    };
  }
  async componentDidMount() {
    ///this is the popular places and the default

    if(!this.props.citiesToDisplay){
        console.log(this.props);
    await axios
      .post(
        "/api/filters",
        {
          actualLocation: [-119.417931, 36.778259], // change this for this.props.coordinates
          distance: 500000000000,
          adultOnly: true,
          waterFront: false,
          inState: false,
          winterSports: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.length > 10) {
          const filterTenCities = res.data.slice(0, 10);
          this.setState({ results: filterTenCities });
        } else {
          this.setState({ results: res.data });
        }
      });
      console.log(this.state.results)
    await axios.all(
        this.state.results.map( e => {
            // console.log(e.cityName.replace(/ /g,'+'))
            return (
                axios.get(
                    `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(/ /g,'+')}&image_type=photo&category=travel&per_page=3`
                ) 
            )
        })
    ).then(response => {
        console.log(response)
        response.forEach( (e,i) => {
            this.state.results[i].img = e.data.hits[0].largeImageURL
        })
        
    })
    .catch(err => console.log(err))
    }else{
        this.setState({results: this.props.citiesToDisplay}, async () => {
            await axios.all(
                this.state.results.map( e => {
                    // console.log(e.cityName.replace(/ /g,'+'))
                    return (
                        axios.get(
                            `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(/ /g,'+')}&image_type=photo&category=travel&per_page=3`
                        ) 
                    )
                })
            ).then(response => {
                console.log(response)
                response.forEach( (e,i) => {
                    this.state.results[i].img = e.data.hits[0].largeImageURL
                })
                
            })
            .catch(err => console.log(err))
        })
    }

  }

  //    searchButton = () => {
  //        axios.get('api/destinations')
  //        .then(res => {
  //            this.setState({ results: res.data })
  //        }).catch(err => console.log(err))
  //    }

  //    addToUserList = (cityName, distance, population, waterFront, adultFriendly) => {
  //        axios.post(`/userDestList/${this.props.user.user.user.user_id}`, {cityName, distance, population, waterFront, adultFriendly})
  //        .then(res => {
  //            this.props.updateSavedDestinations(res.data)
  //        })
  //    }

  //    notifySuccess = () => {
  //     toast.success('Destination added to your list', {
  //         position: 'top-center',
  //         autoClose: 4000,
  //         closeOnClick: true
  //         })
  //     }
  //    need to render this somewhere <ToastContainer />

  render() {
    //    console.log(this.props.coordinates)
    console.log(this.state.results);
    return (
      <div>
        <div>
          <h1>this is the result component</h1>
          {/* {this.state.results.map((element, index) => {
                       const {cityName, distance, population, waterFront, adultFriendly} = element
                       return(
                           <div key={index}>
                               <h2>{cityName}</h2>
                               <li>
                                   <ul>{distance} miles from your current destination</ul>
                                   <ul>Area: {population > 20000 ? 'Urban' : 'Rural'}</ul>
                                   <ul>Near Waterfront: {waterFront === true ? 'Yes' : 'No'}</ul>
                                   <ul>Adult Activities Nearby: {adultFriendly > 4 ? 'Yes' : 'No'}</ul>
                               </li>
                               <button onClick={this.addToUserList(cityName, distance, population, waterFront, adultFriendly)}>Add</button>
                           </div>
                       )
                   })} */}
        </div>
      </div>
    );
  }
}
export default Results;
