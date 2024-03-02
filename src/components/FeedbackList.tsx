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
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong 404 ");
        }
        return res.json(); //parsing as json
      })
      .then((data) => {
        setFeedbackItem((prev) => [...prev, ...data.feedbacks]);
        setIsLoading(false);
        console.log(data);
      })
      .catch(() => {
        //network err,not 200 response,json parsing error
        setErrMsg("something went wrong");
        setIsLoading(false);
      });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}

      {errMsg ? <ErrMessage message={errMsg} /> : null}

      {feedbackItem.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
      {/*       {feedbackItemsToDisplay.map((item) => {
        return <FeedbackItem feedbackItem={item} />;
      })} */}
    </ol>
  );
}
