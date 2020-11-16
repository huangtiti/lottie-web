import React, { FC } from "react";
import { lottieJsonList } from "../config";
import { Link } from "react-router-dom";

const LottieList: FC = () => {
  return (
    <div>
      {lottieJsonList.slice(1).map((jsonData) => (
        <div key={jsonData.id} className="item">
          <Link
            to={{
              pathname: `/detail`,
              search: jsonData.id,
            }}
          >
            <span className="jsonName">{jsonData.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LottieList;
