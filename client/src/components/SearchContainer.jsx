import {FormRow, FormRowSelect} from "."
import Wrapper from "../assets/wrappers/DashboardFormPage"
import {Form, Link, useSubmit} from "react-router-dom"
import {JOB_STYPE, JOB_STATUS, JOB_SORT_BY} from "../../../utils/constants"
import {useAllJobsContext} from "../pages/AllJobs"

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext()

  const {search, jobStatus, jobType, sort} = searchValues

  const submit = useSubmit()

  const debounce = (onChange) => {
    let timeout

    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_STYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />

          {/* send request with no params */}
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
