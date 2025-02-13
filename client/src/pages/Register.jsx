/* eslint-disable react-refresh/only-export-components */
import {Form, redirect, Link} from "react-router-dom"

import Wrapper from "../assets/wrappers/RegisterAndLoginPage"

import {FormRow, Logo, SubmitBtn} from "../components"

import {toast} from "react-toastify"

import customFetch from "../utils/customFetch.js"

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // console.log(data)
  try {
    await customFetch.post("/auth/register", data)

    toast.success("Registration Successfully")

    return redirect(`/login`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" name="name" defaultValue="admin" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="admin"
        />
        <FormRow type="text" name="location" defaultValue="Toronto" />
        <FormRow type="email" name="email" defaultValue="123@gmail.com" />

        <FormRow type="password" name="password" defaultValue="test1234" />

        <SubmitBtn formBtn />

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
        <p>For login testing</p>
        <p>email: test1234@gmail.com</p>
        <p>password: test1234</p>
      </Form>
    </Wrapper>
  )
}

export default Register
