import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";

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

  useEffect(() => {
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFeedbackItem((prev) => [...prev, ...data.feedbacks]);
        console.log(data);
      });
  }, []);

  return (
    <ol className="feedback-list">
      {feedbackItem.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
      {/*       {feedbackItemsToDisplay.map((item) => {
        return <FeedbackItem feedbackItem={item} />;
      })} */}
    </ol>
  );
}
