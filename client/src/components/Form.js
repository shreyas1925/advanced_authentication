import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
const baseUrl = "http://localhost:8000/api/user";

const Form = () => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const { token, id } = queryString.parse(location.search);

      const { data } = await axios(
        `${baseUrl}/verify-token?token=${token}&id=${id}`
      );
      console.log(data);
    } catch (error) {
      if (error?.response?.data) {
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-sm m-auto pt-40">
      <h1 className="text-center text-4xl text-blue-500 mb-3">
        Reset Password
      </h1>
      <form className="shadow w-full rounded-lg p-10">
        <div className="space-y-10">
          <input
            type="password"
            placeholder="*********"
            className="px-3 text-lg h-10 w-full
          border-gray-500 border-2 rounded"
          />
          <input
            type="password"
            placeholder="*********"
            className="px-3 text-lg h-10 w-full
          border-gray-500 border-2 rounded"
          />

          <input
            type="submit"
            value="Reset Password"
            className="submit bg-gray-500 w-full 
          py-3 text-white rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
