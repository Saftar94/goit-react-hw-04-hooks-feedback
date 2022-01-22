import Section from "./components/Section/Section";
import React, { useMemo } from "react";
import FeedbackList from "./components/FeedBack/FeedBack";
import Notification from "./components/Notification/Notification";
import Statistics from "./components/Statistics/Statistics";
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment good":
      return { ...state, good: state.good + 1 };
    case "increment neutral":
      return { ...state, neutral: state.neutral + 1 };
    case "increment bad":
      return { ...state, bad: state.bad + 1 };

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const plusIncrement = (feedback) => {
    dispatch({ type: `increment ${feedback}` });
  };

  const totalFeedBack = useMemo(() => {
    const sum = state.good + state.neutral + state.bad;
    const PositiveProcent = (state.good / sum) * 100;
    return { sum, PositiveProcent };
  }, [state.good, state.neutral, state.bad]);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackList
          options={["good", "neutral", "bad"]}
          Feedback={plusIncrement}
        />
      </Section>
      <Section title="Statistics">
        {!totalFeedBack.sum ? (
          <Notification nofeed="There is no feedback" />
        ) : (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedBack.sum}
            PostitveFeedBack={totalFeedBack.PositiveProcent}
          />
        )}
      </Section>
    </>
  );
}

export default App;
