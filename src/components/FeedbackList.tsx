import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrMessage from "./ErrMessage";

const exampleFeedbackItem = [
  {
    id: 558797987656,
    upvoteCount: 598,
    badgeLetter: "D",
    companyName: "ismail",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 2,
  },
  {
    id: 79895656877,
    upvoteCount: 589,
    badgeLetter: "J",
    companyName: "SKHFS",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 7,
  },
];

export default function FeedbackList() {
  // Extract only the first two items from the feedbackItem array
  const feedbackItemsToDisplay = exampleFeedbackItem.slice(0, 1);

  const [feedbackItem, setFeedbackItem] = useState(feedbackItemsToDisplay);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setFeedbackItem((prev) => [...prev, ...data.feedbacks]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrMsg(`Error fetching data: ${error}`);
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errMsg && <ErrMessage message={errMsg} />}

      {feedbackItem.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
      {/*       {feedbackItemsToDisplay.map((item) => {
        return <FeedbackItem feedbackItem={item} />;
      })} */}
    </ol>
  );
}
