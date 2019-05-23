import axios from 'axios';

class LocationService {

  constructor() {

    this.location = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    })

  }


  add(location) {
    return this.location.post('/location/add', location)
      .then(({ data }) => data)
  }


  imageUpload(file) {
    return this.location.post('/location/add/picture', file)
      .then(({ data }) => data)
  }
}

const locationService = new LocationService();

export default locationService;