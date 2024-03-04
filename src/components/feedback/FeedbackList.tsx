import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrMessage from "../ErrMessage";
import { useFeedbackItemsContext } from "../context/contextHook";

export default function FeedbackList() {
  const { isLoading, errMsg, filteredFeedbackItemsByCompany } = useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errMsg && <ErrMessage message={errMsg} />}

      {/*       {feedbackItem.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))} */}
      {filteredFeedbackItemsByCompany.map((item) => {
        //console.log(item);

        return <FeedbackItem feedbackItem={item} />;
      })}
    </ol>
  );
}
