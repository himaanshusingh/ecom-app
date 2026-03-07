import back1 from "../assets/pictures/back1.jpg";
import back2 from "../assets/pictures/back2.jpg";
import back3 from "../assets/pictures/back3.jpg";
import back4 from "../assets/pictures/back4.jpg";

const Background = ({ heroCount }) => {
  const className = "w-[100%] h-[100%] float-left overflow-auto object-cover";
  if (heroCount === 0) {
    return <img src={back2} alt="" className={className} />;
  } else if (heroCount === 1) {
    return <img src={back1} alt="" className={className} />;
  } else if (heroCount === 2) {
    return <img src={back3} alt="" className={className} />;
  } else if (heroCount === 3) {
    return <img src={back4} alt="" className={className} />;
  }
};

export default Background;
