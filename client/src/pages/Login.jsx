/* eslint-disable react-refresh/only-export-components */
import {Link, Form, redirect, useNavigate} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"

import customFetch from "../utils/customFetch"
import {toast} from "react-toastify"

import {FormRow, Logo, SubmitBtn} from "../components"

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/auth/login", data)
    toast.success("Login successful")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  // lấy giá trị email, password đc truyền trên url từ Register.js
  // const [searchParams] = useSearchParams()
  // const emailR = searchParams.get("e")
  // const passwordR = searchParams.get("p")

  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: "test1234@gmail.com",
      password: "test1234",
    }
    try {
      await customFetch.post("/auth/login", data)
      toast.success("take a test drive")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Link to="/">
          <Logo />
        </Link>
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="test1234@gmail.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />

        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        <p>For testing, Please !!!</p>
        <p>Register a new user for functions</p>
        <p>Or click to `explore the app` for Read only</p>
      </Form>
    </Wrapper>
  )
}

export default Login
