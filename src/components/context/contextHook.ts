import { useContext } from "react";
import { feedbackItemsContext } from "./FeedbackItemsContextProvider";

export function useFeedbackItemsContext() {
  const context = useContext(feedbackItemsContext);

  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not defined in FeedbackList component"
    );
  }
  return context;
}
