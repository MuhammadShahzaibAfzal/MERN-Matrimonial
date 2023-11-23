import React from "react";
import { Navbar } from "../components";
import MembershipCard from "../components/MembershipCard";

const Membership = () => {
  return (
    <div>
      <Navbar />
      <div className="heading textCenter my-6">
        <h1>Welcome to Our Membership Plans</h1>
        <h2 className="my-8" style={{ fontWeight: "normal" }}>
          Choose the Plan That Fits Your Needs
        </h2>
        <p className="tagline my-4">
          Unlock premium features and exclusive benefits with our membership
          plans.
        </p>
      </div>

      <div className="cardsWrapper">
        <MembershipCard plan="Silver" price="₹1000 for 1 months" />
        <MembershipCard plan="Gold" price="₹3000 for 3 months" />
        <MembershipCard plan="Platinum" price="₹6000 for 6 months" />
      </div>
    </div>
  );
};

export default Membership;
