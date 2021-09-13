import axios from "axios";

//BASE_URL
const url = "http://localhost:3000/data.json";

//DATA_API_REQUEST
export const fetchData = () => axios.get(url);
