import axios from "axios";

export const BASE_URL = "https://test.behiryperfume.com/"
const axiosApp = axios.create({
    baseURL: `${BASE_URL}api`
});

export default axiosApp;