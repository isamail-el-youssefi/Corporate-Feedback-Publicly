import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrMessage from "./ErrMessage";
import { TFeedbackItem } from "../lib/type/type";

type FeedbackListProps = {
  isLoading: boolean;
  errMsg: string;
  feedbackItem: TFeedbackItem[];
};

export default function FeedbackList({
  errMsg,
  isLoading,
  feedbackItem,
}: FeedbackListProps) {
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
