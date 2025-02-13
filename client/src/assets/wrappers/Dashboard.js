import styled from "styled-components"

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    // only one column for small screen
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  // for big screen
  @media (min-width: 992px) {
    .dashboard {
      // multiple columns for big screen : auto device columns base on width view
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`
export default Wrapper
