import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import {useAllJobsContext} from "../pages/AllJobs"
import PageBtnContainer from "./PageBtnContainer"

const JobsContainer = () => {
  const {data} = useAllJobsContext()
  const {jobs, totalJobs, numsOfPages} = data

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 ? "s" : ""}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numsOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
