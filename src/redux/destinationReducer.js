const initialState = {
    userSavedDestinations: []
 }
  
 const GET_SAVED_DESTINATIONS = 'GET_SAVED_DESTINATIONS'
 const UPDATE_SAVED_DESTINATIONS = 'UPDATE_SAVED_DESTINATIONS'
  
 export function getSavedDestinations(itemObj){
    return {
        type: GET_SAVED_DESTINATIONS,
        payload: itemObj
    }
 }
 export function updateSavedDestinations(itemObj){
    return{
        type: UPDATE_SAVED_DESTINATIONS,
        payload: itemObj
    }
 }
  
 export default function reducer(state= initialState, action){
    switch(action.type){
        case GET_SAVED_DESTINATIONS:
            return{
                ...state,
                userSavedDestinations: action.payload
            }
        case UPDATE_SAVED_DESTINATIONS:
            return{
                ...state, userSavedDestinations: [...state.userSavedDestinations, action.payload]
            }
        default: return state;
    }
 }
 