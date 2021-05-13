import axios from "axios";
import React, { Component } from "react";

// import Header from "../Header/Header";
// import { updateSavedDestinations } from "../../redux/destinationReducer";
import Loading from '../Loading/Loading'
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Results.scss";



class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      cityNames: [],
      filterResults: undefined,
      urban: true,
      rural: true,
    };
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.citiesToDisplay)
    
    if (
      this.props.citiesToDisplay &&
      JSON.stringify(prevProps.citiesToDisplay) !==
        JSON.stringify(this.props.citiesToDisplay)
    ) {
      
      if (this.props.citiesToDisplay.length <= 10) {
        
        this.setState({ filterResults: this.props.citiesToDisplay }, () =>
          makeRequest()
        );
      } else {
        
        const citiesFilter = this.props.citiesToDisplay.slice(0, 10);
        this.setState({ filterResults: citiesFilter }, () => makeRequest());
      }

      const makeRequest = async () => {
        axios
          .all(
            this.state.filterResults.map((e) => {
              
              return axios.get(
                `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(
                  / /g,
                  "+"
                )}&image_type=photo&per_page=3`
              );
            })
          )
          .then((response) => {
            
            response.forEach((e, i) => {
              
              if (e.data.hits[0]) {
                
                let stateHolder = [...this.state.filterResults];
                stateHolder[i].img = e.data.hits[0].largeImageURL;
                this.setState({ filterResults: stateHolder });
              }
            });
          })
          .catch((err) => console.log(err));
      };
    }
  }


  addToUserList = (val) => {
    const { cityName, kinds, img, stateShort } = val
    const adult_friendly = kinds.includes('adult')
    const waterFront = kinds.includes('beach')
    const family_friendly = kinds.includes('family')
    axios.post(`/userDestList/${this.props.userId}`, {
      city_name: cityName, 
      population:0, 
      waterfront:waterFront, 
      adult_friendly: adult_friendly, 
      family_friendly:family_friendly, 
      city_img: img, 
      state: stateShort
  })
  .then(res => {
    this.addedToCityToast(cityName)
  })
  .catch(err => console.log(err))
  };
  handleRuralChange = () => {
    this.setState((prevState) => ({
      rural: !prevState.rural,
    }));
  };
  handleUrbanChange = () => {
    this.setState((prevState) => ({
      urban: !prevState.urban,
    }));
  };

  addedToCityToast(cityName) {
    toast.success(`${cityName} added to your list`, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
    });
  };
  

  render() {
    let { results, filterResults } = this.state;

    let x = undefined

    if (this.state.rural && this.state.urban){
      x = filterResults
    }
    else if (this.state.rural){
      x = filterResults.filter( e => e.population<=50000)
    }
    else if(this.state.urban){
      x = filterResults.filter ( e => e.population > 50000)
    }

    if (!this.props.citiesToDisplay) {
    return (<Loading/>)
    } else {
      return (
        <div className='results'>
          <ToastContainer/>
          <div className='instant-filter'>
              <h3>Instant Filter</h3>
                         <label>
                           Rural:
                           <input 
                              
                               name="rural"
                               type="checkbox"
                               checked={this.state.rural}
                               onChange={this.handleRuralChange}/>
                         </label>
                         <label>
                           Urban:
                           <input
                               name="urban"
                               type="checkbox"
                               checked={this.state.urban}
                               onChange={this.handleUrbanChange}/>
                         </label>
                       </div>
        <div className="results-comp">
          {x ? x.map((e, i) => {
            return (
              <div className="search-destination-single" key={i}>
              
              <div className="city-header">
                <h2>{e.cityName}</h2>
                <h3>{e.state}</h3>
              </div>
              <div className='image-container'>
                {e.img ? <img src={e.img} alt={e.img} /> : <h1>No image to display</h1>}
              </div>
              <div className='under-image'>
                <li>
                  <ul>Distance from you: Approximately {Math.round(e.distance / 1609.34)} Miles</ul>
                  <ul>
                    Near Waterfront:
                    <span className="checkbox-answers">{e.kinds.includes("beach") ? "YES" : "NO"}</span>
                  </ul>
                  <ul>
                    Adult Friendly:
                    <span className="checkbox-answers">{e.kinds.includes("adult") ? "YES" : "NO"}</span>
                  </ul>
                  <ul>Area:
                  <span className="checkbox-answers">{e.population > 50000 ? 'Urban' : e.population <= 50000 ? 'Rural' : 'Unavailable'} </span>
                  </ul>
                </li>
                <button className='save-destinations-button'onClick = { () => this.addToUserList(e) }>Save to My List</button>
              </div>
             
              
            </div>
            )
          }) : <p className='no-results'>No Results to Display</p> }
      </div>
      </div>
      )
    }
    
  }
}
export default Results;
