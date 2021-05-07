import axios from "axios";
import React, { Component } from "react";

// import Header from "../Header/Header";
// import { updateSavedDestinations } from "../../redux/destinationReducer";
import Loading from '../Loading/Loading'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Results.scss";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      cityNames: [],
      filterResults: [],
    };
  }

  componentDidUpdate(prevProps) {
    //   console.log(this.props.citiesToDisplay)
    //   console.log(this.props.coordinates)
    console.log(this.props.citiesToDisplay);
    if (
      this.props.citiesToDisplay &&
      JSON.stringify(prevProps.citiesToDisplay) !==
        JSON.stringify(this.props.citiesToDisplay)
    ) {
      console.log("first hit");
      if (this.props.citiesToDisplay.length <= 10) {
        console.log("minus 10");
        this.setState({ filterResults: this.props.citiesToDisplay }, () =>
          makeRequest()
        );
      } else {
        console.log("more than 10");
        const citiesFilter = this.props.citiesToDisplay.slice(0, 10);
        this.setState({ filterResults: citiesFilter }, () => makeRequest());
      }

      const makeRequest = async () => {
        axios
          .all(
            this.state.filterResults.map((e) => {
              // console.log(e.cityName.replace(/ /g,'+'))
              return axios.get(
                `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(
                  / /g,
                  "+"
                )}&image_type=photo&per_page=3`
              );
            })
          )
          .then((response) => {
            console.log(this.state.filterResults);
            response.forEach((e, i) => {
              console.log(e.data.hits);
              if (e.data.hits[0]) {
                console.log(e.data.hits[0]);

                // this.state.filterResults[i].img = e.data.hits[0].largeImageURL;
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
//   async componentDidMount() {
//     ///this is the popular places and the default
//     console.log(this.props.citiesToDisplay);

//     if (!this.props.citiesToDisplay) {
//       console.log(this.props);
//       await axios
//         .post(
//           "/api/filters",
//           {
//             actualLocation: [-119.417931, 36.778259], // change this for this.props.coordinates
//             distance: 500000000000,
//             adultOnly: true,
//             waterFront: false,
//             inState: false,
//             winterSports: false,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           if (res.data.length > 2) {
//             const filterTenCities = res.data.slice(0, 2);
//             this.setState({ results: filterTenCities });
//           } else {
//             this.setState({ results: res.data });
//           }
//         });
//       console.log(this.state.results);
//       await axios
//         .all(
//           this.state.results.map((e) => {
//             // console.log(e.cityName.replace(/ /g,'+'))
//             return axios.get(
//               `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(
//                 / /g,
//                 "+"
//               )}&image_type=photo&category=travel&per_page=3`
//             );
//           })
//         )
//         .then((response) => {
//           console.log(response);
//           response.forEach((e, i) => {
//             let stateHolder = [...this.state.results];
//             stateHolder[i].img = e.data.hits[0].largeImageURL;
//             this.setState({ results: stateHolder });
//             // this.state.results[i].img = e.data.hits[0].largeImageURL;
//           });
//         })
//         .catch((err) => console.log(err));
//     } else {
//       this.setState({ results: this.props.citiesToDisplay }, async () => {
//         await axios
//           .all(
//             this.state.results.map((e) => {
//               // console.log(e.cityName.replace(/ /g,'+'))
//               return axios.get(
//                 `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(
//                   / /g,
//                   "+"
//                 )}&image_type=photo&category=travel&per_page=3`
//               );
//             })
//           )
//           .then((response) => {
//             console.log(response);
//             response.forEach((e, i) => {
//               let stateHolder = [...this.state.results];
//               stateHolder[i].img = e.data.hits[0].largeImageURL;
//               this.setState({ results: stateHolder });
//               //   this.state.results[i].img = e.data.hits[0].largeImageURL;
//             });
//           })
//           .catch((err) => console.log(err));
//       });
//     }
//   }

  addToUserList = (
    cityName,
    distance,
    population,
    waterFront,
    adultFriendly
  ) => {
    axios
      .post(`/userDestList/${this.props.user.user.user.user_id}`, {
        cityName,
        distance,
        population,
        waterFront,
        adultFriendly,
      })
      .then((res) => {
        this.props.updateSavedDestinations(res.data);
      });
  };

  notifySuccess = () => {
    toast.success("Destination added to your list", {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
    });
  };
  //  need to render this somewhere <ToastContainer />

  render() {
    console.log(this.props.coordinates);
    console.log(this.state.results);
    console.log(this.state.filterResults.length, 'results length');
    let { results, filterResults } = this.state;

    if (filterResults.length === 0) {
    //   if (results.length === 0) {
    //     return (
    //       <p>Please Wait for your info</p>
    //     )
    //   } else {
    //     return results.map((e, i) => {
    //       return (
    //         <div key={i}>
    //           <div>
    //             <h2>{e.cityName}</h2>
    //             <h3>{e.state}</h3>
    //           </div>
    //           {e.img ? <img src={e.img} alt={e.img} /> : <h1>No image to display</h1>}
    //           <li>
    //             <ul>Dinstance from you: {e.distance / 0.000621371}</ul>
    //             <ul>
    //               Near Waterfront: {e.kinds.includes("beach") ? "YES" : "NO"}
    //             </ul>
    //             <ul>
    //               Adult Friendly: {e.kinds.includes("adult") ? "YES" : "NO"}
    //             </ul>
    //             <ul>population is comming </ul>
    //           </li>
    //           <button>Save</button>
    //         </div>
    //       );
    //     });
    //   }

    return (<Loading/>)
    } else {
      return filterResults.map((e, i) => {
        return (
          <div className="search-destination-single" key={i}>
            <div>
              <h2>{e.cityName}</h2>
              <h3>{e.state}</h3>
            </div>
            {e.img ? <img src={e.img} alt={e.img} /> : <h1>No image to display</h1>}
            <li>
              <ul>Distance from you: Approximately {Math.round(e.distance / 1609.34)} Miles</ul>
              <ul>
                Near Waterfront: {e.kinds.includes("beach") ? "YES" : "NO"}
              </ul>
              <ul>
                Adult Friendly: {e.kinds.includes("adult") ? "YES" : "NO"}
              </ul>
              <ul>population is comming </ul>
            </li>
            <button className='save-destinations-button'>Save</button>
          </div>
        );
      });
    }
    
  }
}
export default Results;
