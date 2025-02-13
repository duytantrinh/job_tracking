/* eslint-disable react-refresh/only-export-components */
import {FormRow, FormRowSelect, SubmitBtn} from "../components"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import {useOutletContext} from "react-router-dom"
import {JOB_STATUS, JOB_STYPE} from "../../../utils/constants"
import {Form, redirect} from "react-router-dom"
import {toast} from "react-toastify"
import customFetch from "../utils/customFetch"

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // console.log(data)
  try {
    await customFetch.post("/jobs", data)

    toast.success("Add new job successfully")

    return redirect("all-jobs")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AddJob = () => {
  const {user} = useOutletContext()

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />

          <FormRowSelect
            list={Object.values(JOB_STYPE)}
            labelText="job type"
            name="jobType"
            defaultValue={JOB_STYPE.FULL_TIME}
          />

          <FormRowSelect
            list={Object.values(JOB_STATUS)}
            labelText="job Status"
            name="jobStatus"
            defaultValue={JOB_STATUS.INTERVIEW}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
