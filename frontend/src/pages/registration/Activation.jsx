import React, { useState } from "react";
import {
  DesiredProfileDetails,
  EducationDetails,
  FamilyDetails,
  OccupationalDetails,
} from "..";
import PersonalTraits from "./PersonalTraits";
import { useSelector } from "react-redux";

const Activation = () => {
  const { user } = useSelector((state) => state.auth);
  const [step, setStep] = useState(user.activationStep);

  const onNext = () => {
    setStep(step + 1);
  };

  console.log(step);

  const map = {
    1: EducationDetails,
    2: OccupationalDetails,
    3: FamilyDetails,
    4: PersonalTraits,
    5: DesiredProfileDetails,
  };

  const Component = map[step];
  return (
    <div>
      <Component onNext={onNext} />
    </div>
  );
};

export default Activation;
