import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../lib/type/type";

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
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
