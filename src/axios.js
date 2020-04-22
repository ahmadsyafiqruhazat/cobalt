// axios
import axios from "axios";

const baseURL = "https://us-central1-cs5224-cobalt.cloudfunctions.net/api";

export default axios.create({
  baseURL: baseURL,
  // You can add your headers here
});
