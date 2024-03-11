import React, { useState } from "react";
export const steps = [
  {
    name: "step1",
    comp: <>This is comp 1</>,
  },
  {
    name: "step2",
    comp: <>This is comp 2</>,
  },
  {
    name: "step3",
    comp: <>This is comp 3</>,
  },
  {
    name: "step4",
    comp: <>This is comp 4</>,
  },
];
const Stepper = () => {
  const [stepper, setStepper] = useState(0);
  return (
    <>
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div className="step-info" key={step.name}>
            <div
              className={`steps-icon ${index === stepper && "active-step"} ${
                index < stepper && "completed-step"
              }`}
            >
              {index + 1}
            </div>
            <h4>{step.name}</h4>
          </div>
        ))}
      </div>
      <button onClick={() => setStepper(stepper + 1)} disabled={stepper === steps.length}>
        {stepper === steps.length ? "Done" : stepper === steps.length - 1 ? "Finish" : "Next"}
      </button>
      {stepper !== 0 && (
        <div className="progress-bar-container">
          {Array(stepper < steps.length ? stepper : stepper - 1)
            .fill(0)
            .map(() => (
              <div className="progress-bar" key={Math.random()}></div>
            ))}
        </div>
      )}
      {stepper < steps.length && steps[stepper].comp}
    </>
  );
};
export default Stepper;
