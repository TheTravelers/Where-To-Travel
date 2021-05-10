import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import zipcodes from 'zipcodes-nrviens'
import Results from '../Results/Results'
import {connect} from 'react-redux'
import { geolocated } from 'react-geolocated'
import { gsap } from 'gsap'
import './Filter.scss'
import SimpleSlider from "./SimpleSlider";

class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {
            coordinates: undefined,
            adultFriendly: false,
            waterFront: false,
            inState: false,
            rangeValue: 100,
            rangeValueInMeters: 300000,
            // populationDivider: '',
            zipCode: '',
            citiesToDisplay: undefined,
            defaultDestinations: [],
            slideShow: true,
        }
    }

    // componentWillMount(){
      
            
    // }
    

    componentDidMount () {
        //  gsap.from('.filter-component', {y: -500, opacity: 0, duration: .5})
        
        axios.get("/api/defaultDestinations")
        .then((response) => {
            this.setState({ defaultDestinations: response.data });
            console.log(this.state.defaultDestinations, "destinations");
            
        })
        .catch(err => console.log(err))
    }
   

    handleZipCodeChange = (e) => {
        this.setState({zipCode: e})
    }
    

    // hello 
    // handleUrbanButton = () => {
    //     //Want cities only if they have a population more than a certain number
    //     this.setState({populationDivider: '>'})
    // }
    // handleRuralButton = () => {
    //     //Want cities only if they have a population less than a certain number
    //     this.setState({populationDivider: '<'})

    // }
    handleSearchButton = async () => {
        let zipCodeInfo = zipcodes.lookup(this.state.zipCode)
        console.log(zipCodeInfo)
    }

  handleAdultFriendlyChange = () => {
    this.setState((prevState) => ({
      adultFriendly: !prevState.adultFriendly,
    }));
  };
  handleWaterFrontChange = () => {
    this.setState((prevState) => ({
      waterFront: !prevState.waterFront,
    }));
  };
  handleInStateChange = () => {
    this.setState((prevState) => ({
      inState: !prevState.inState,
    }));
  };
//   handleUrbanButton = () => {
//     //Want cities only if they have a population more than a certain number
//     this.setState({ populationDivider: ">" });
//   };
//   handleRuralButton = () => {
//     //Want cities only if they have a population less than a certain number
//     this.setState({ populationDivider: "<" });
//   };
  handleSearchButton = async () => {
    this.setState({ slideShow: false,  });
    let zipCodeInfo = zipcodes.lookup(this.state.zipCode);
    console.log(zipCodeInfo);

    if (this.state.zipCode) {
      await this.setState(
        {
          coordinates: [zipCodeInfo.longitude, zipCodeInfo.latitude],
          rangeValueInMeters: this.state.rangeValue * 1609.34,
        },
        async () => {
          console.log(this.state.coordinates);
          await axios
            .post(
              "/api/filters",
              {
                actualLocation: this.state.coordinates,
                distance: this.state.rangeValueInMeters,
                adultOnly: this.state.adultFriendly,
                waterFront: this.state.waterFront,
                inState: this.state.inState,
                winterSports: false,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              this.setState({ citiesToDisplay: res.data }, () => {});
            });
        }
      );
    }
    // } else {
    //   this.setState(
    //     {
    //       coordinates: [
    //         this.props.coords.longitude,
    //         this.props.coords.latitude,
    //       ],
    //       rangeValueInMeters: this.state.rangeValue * 1609.34,
    //     },
    //     async () => {
    //       console.log(this.state.coordinates);
    //       await axios
    //         .post(
    //           "/api/filters",
    //           {
    //             actualLocation: this.state.coordinates,
    //             distance: this.state.rangeValueInMeters,
    //             adultOnly: this.state.adultFriendly,
    //             waterFront: this.state.waterFront,
    //             inState: this.state.inState,
    //             winterSports: false,
    //           },
    //           {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           }
    //         )
    //         .then((res) => {
    //           this.setState({ citiesToDisplay: res.data });
    //         });
    //     }
    //   );
    // }
  };



    render(){
        return(
            <div className='filter-component'>
                <Header />
                <div className='filter-element'>
                    <input 
                        className="filter-zipcode"
                        placeholder="Current Zipcode"
                        type= 'text'
                        onChange= { e => this.handleZipCodeChange(e.target.value) }/>
                    

                        <div className='proximity-slider'>
                            proximity
                            <input 
                                type="range" 
                                min="50" 
                                max="3500" 
                                step="50"
                                value={this.state.rangeValue}
                                onChange={e => this.setState({rangeValue: e.target.value})}
                                />
                                <span>{this.state.rangeValue} miles</span>
                        </div>
                    <div className='filter-checkboxes'>
                        <label>
                            Adult Friendly:
                            <input
                                name="adultFriendly" 
                                type="checkbox"
                                checked={this.state.adultFriendly}
                                onChange={this.handleAdultFriendlyChange}/>
                        </label>
                        <label>
                            Waterfront: 
                            <input
                                name="waterFront"
                                type="checkbox"
                                checked={this.state.waterFront}
                                onChange={this.handleWaterFrontChange}/>
                        </label>
                        <label>
                            In State:
                            <input
                                name="inState"
                                type="checkbox"
                                checked={this.state.inState}
                                onChange={this.handleInStateChange}/>
                        </label>
                    </div>
                    {/* <div>
                        <h3>Population:</h3>
                        <button onClick={this.handleUrbanButton}>Urban</button>
                        <button onClick={this.handleRuralButton}>Rural</button>
                    </div> */}
                
                <div>
                    <button onClick={this.handleSearchButton} className='filter-search-button'>Search</button>
                    </div>
              </div>
            {/* result component  */}

                
                
                {/* result component  */}
                    {this.state.slideShow ? (
                <div id="default-destinations-slider">
                    <SimpleSlider userId={this.props.user.user.user.user_id}defaultDestinations={this.state.defaultDestinations}
                    />
                </div>
                ) : (
                  <div id="results-comp" className="">
                    <Results
                      coordinates={this.state.coordinates}
                      userId={this.props.user.user.user.user_id}
                      citiesToDisplay={this.state.citiesToDisplay}
                    />
                  </div>
                )}             
          </div>
        )
    }
    
}

const mapStateToProps = reduxState => {
    return {
    user: reduxState.userReducer
    }
}

export default connect(mapStateToProps)(Filter);

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(Filter);
