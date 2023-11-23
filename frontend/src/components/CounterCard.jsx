import React from "react";
import { Link } from "react-router-dom";

const CounterCard = ({ heading, count, link }) => {
  return (
    <div className="count__card">
      <h4>{heading}</h4>
      <h2>{count}</h2>
      <Link className="link" to={link}>
        View All
      </Link>
    </div>
  );
};

export default CounterCard;
