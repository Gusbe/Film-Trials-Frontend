import axios from 'axios';

class LocationService {

  constructor() {

    this.location = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    })

  }

  view(id) {
    return this.location.get('/location/' + id)
      .then(({ data }) => data)
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