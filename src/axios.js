import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/marketplace-react-291a9/us-central1/api'
     // the API URL (cloud function)
});

export default instance;
