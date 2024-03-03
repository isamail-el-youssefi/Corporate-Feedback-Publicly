import { TFeedbackItem } from "../../lib/type/type";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean;
  errMsg: string;
  feedbackItem: TFeedbackItem[];
  handleAddToList: (text: string) => void;
};

export default function Container({
  errMsg,
  isLoading,
  feedbackItem,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItem={feedbackItem}
        errMsg={errMsg}
        isLoading={isLoading}
      />
    </main>
  );
}
