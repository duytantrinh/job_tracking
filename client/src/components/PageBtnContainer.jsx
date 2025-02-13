import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer"
import {useLocation, useNavigate} from "react-router-dom"
import {useAllJobsContext} from "../pages/AllJobs"

const PageBtnContainer = () => {
  const {
    data: {numsOfPages, currentPage},
  } = useAllJobsContext()

  const {search, pathname} = useLocation()
  const navigate = useNavigate()
  console.log(search, pathname)

  // Pagination Function
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set("page", pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({pageNumber, activeClass}) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${activeClass && "active"}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    // page 1
    pageButtons.push(
      addPageButton({pageNumber: 1, activeClass: currentPage === 1})
    )

    // display ...
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      )
    }

    // display one page before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      )
    }

    // current page
    if (currentPage !== 1 && currentPage !== numsOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      )
    }

    // display one page after current page
    if (currentPage !== numsOfPages && currentPage !== numsOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      )
    }

    // display ...
    if (currentPage < numsOfPages - 2) {
      pageButtons.push(
        <span className=" page-btn dots" key="dots+1">
          ....
        </span>
      )
    }

    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numsOfPages,
        activeClass: currentPage === numsOfPages,
      })
    )

    return pageButtons
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = 1
          handlePageChange(prevPage)
        }}
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numsOfPages) nextPage = numsOfPages
          handlePageChange(nextPage)
        }}
      >
        <HiChevronDoubleRight /> next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
