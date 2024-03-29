import axios from "axios";

import {jwtDecode} from "jwt-decode";
// import jwt_decode from 'jwt-decode';

type LoginData = {
  username: string;
  password: string;
};

type LoginCallback = (success: boolean, token?: string) => void;

export const login = (data: LoginData, callback: LoginCallback) => {
  axios
    .post("https://fakestoreapi.com/auth/login", data)
    .then(res => {
      callback(true, res.data.token);
    })
    .catch(error => {
      if (error.response) {
        callback(false, error.response.data);
      } else {
        callback(false, error.message);
      }
      // callback(false, error);
    });
};

// type Token = {
//   token: string;
//   username: string;
// };

export const getUsername = (token: string): string => {
  const decodedToken: {user: string} = jwtDecode(token);
  const username: string = decodedToken.user;
  return username;
};
