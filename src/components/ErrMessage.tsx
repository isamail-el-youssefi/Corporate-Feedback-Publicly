type FeedbackFormProps = { message: string };

export default function ErrMessage({ message }: FeedbackFormProps) {
  return <div>{message}</div>;
}
