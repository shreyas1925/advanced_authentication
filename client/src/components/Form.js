import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
const baseUrl = "http://localhost:8000/api/user";

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inValidUser, setInValidUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: ""
  })

  const { token, id } = queryString.parse(location.search);

  const verifyToken = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${baseUrl}/verify-token?token=${token}&id=${id}`
      );
      setLoading(false);
      console.log(data);

    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response
        if (!data.success) return setInValidUser(data.error)
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setNewPassword({ ...newPassword, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, confirmPassword } = newPassword
    if (password.trim().length < 8 || password.trim().length > 20) {
      return setError("Password must be between 8 and 20 characters")
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${baseUrl}/reset-password?token=${token}&id=${id}`, { password }
      );
      setLoading(false);


      if (data.success) {
        navigate("/reset-password")
        setSuccess(true)
      } else {
        console.log("no no")
      }

    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        const { data } = error.response
        if (!data.success) return setError(data.error)
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };



  if (inValidUser) return <div className="max-w-screen-sm m-auto pt-40">
    <h1 className="text-center text-2xl text-gray-500 font-bold">{inValidUser}</h1>
  </div>
  if (loading) return <div className="max-w-screen-sm m-auto pt-40">
    <h1 className="text-center text-2xl text-gray-500 font-bold">Loading...please wait for a moment</h1>
  </div>
  if (success) return <div className="max-w-screen-sm m-auto pt-40">
    <h1 className="text-center text-2xl text-gray-500 font-bold">Password reset successfully</h1>
  </div>
  return (
    <div className="max-w-screen-sm m-auto pt-40">
      <h1 className="text-center text-4xl text-blue-500 mb-3">
        Reset Password
      </h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <form className="shadow w-full rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="space-y-10">
          <input
            type="password"
            placeholder="*********"
            name="password"
            onChange={handleOnChange}
            className="px-3 text-lg h-10 w-full
          border-gray-500 border-2 rounded"
          />
          <input
            type="password"
            placeholder="*********"
            onChange={handleOnChange}
            name="confirmPassword"
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
