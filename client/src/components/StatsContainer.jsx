/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {FaSuitcaseRolling, FaCalendarCheck, FaBug} from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer"
import StatItem from "./StatItem"

const StatsContainer = ({defaultStats}) => {
  const stats = [
    {
      title: "pending application",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#f3f3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#2aa1fc",
      bcg: "#f3f3c7",
    },

    {
      title: "job declined",
      count: defaultStats?.declined || 0,
      icon: <FaSuitcaseRolling />,
      color: "#fc5959",
      bcg: "#f3f3c7",
    },
  ]

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
