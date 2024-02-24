import axios from "axios";

import { apiBaseUrl, token } from "../constant";
import { getLocalStorage } from "../shared/Common";

export const httpBaseUtils = () => {

    return axios.create({
        baseURL: 'https://thefutsalpro-backend.onrender.com',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${getLocalStorage(token)}`
        }
      });
}
