import React from "react";
import { useNavigate } from "react-router-dom";

const MembershipCard = ({ plan, price }) => {
  const navigate = useNavigate();
  return (
    <div className="membershipCard">
      <h3>{plan}</h3>
      <p className="price my-4">{price}</p>
      <button
        className="btn btnPrimary my-4"
        onClick={() => {
          navigate(`/protected/payment/${plan}`);
        }}
      >
        Select Plan
      </button>
    </div>
  );
};

export default MembershipCard;
