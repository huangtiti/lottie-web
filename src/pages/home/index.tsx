import React from "react";
import LottieList from "../../components/lottieList";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <span className="headerText">lottie-web-demo</span>
        </div>
        <div className="content">
          <LottieList />
        </div>
      </div>
    );
  }
}
export default Home;
