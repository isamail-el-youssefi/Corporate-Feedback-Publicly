import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/type/type";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

/* type FeedbackItemProps = {
  feedbackItem: {
    upvoteCount: number;
    badgeLetter: string;
    companyName: string;
    text: string;
    daysAgo: number;
  };
}; */

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpVoteCount(upVoteCount + 1);
    e.currentTarget.disabled = true; //disable the button after upvoting
    e.stopPropagation();
  };

  return (
    <li
      onClick={() => setOpen(!open)}
      className={`feedback ${open === true ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpVote}>
        <TriangleUpIcon />
        <span>{upVoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
