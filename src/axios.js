// axios
import axios from "axios";

const baseURL = "http://ec2-54-179-165-184.ap-southeast-1.compute.amazonaws.com:3000";

export default axios.create({
  baseURL: baseURL,
  // You can add your headers here
});
