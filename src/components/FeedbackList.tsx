import FeedbackItem from "./FeedbackItem";

const feedbackItem = [
  {
    upvoteCount: 598,
    badgeLetter: "D",
    companyName: "ismail",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 2,
  },
  {
    upvoteCount: 589,
    badgeLetter: "J",
    companyName: "SKHFS",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 7,
  },
  {
    upvoteCount: 285,
    badgeLetter: "K",
    companyName: "HGDL",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 5,
  },
  {
    upvoteCount: 285,
    badgeLetter: "K",
    companyName: "HGDL",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 5,
  },
  {
    upvoteCount: 285,
    badgeLetter: "K",
    companyName: "HGDL",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 5,
  },
];

export default function FeedbackList() {
  // Extract only the first two items from the feedbackItem array
  const feedbackItemsToDisplay = feedbackItem.slice(0, 2);

  return (
    <ol className="feedback-list">
      {feedbackItemsToDisplay.map((item) => {
        return <FeedbackItem feedbackItem={item} />;
      })}
    </ol>
  );
}
