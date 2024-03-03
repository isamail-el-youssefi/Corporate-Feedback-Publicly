type HashtagitemProps = {
  company: string;
  feedbackItemsByCompany: (company: string) => void;
};

export default function Hashtagitem({
  company,
  feedbackItemsByCompany,
}: HashtagitemProps) {
  return (
    <li key={company}>
      <button onClick={() => feedbackItemsByCompany(company)}>
        #{company}
      </button>
    </li>
  );
}
