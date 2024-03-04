type HashtagitemProps = {
  company: string;
  handleSelectCompany: (company: string) => void;
};

export default function Hashtagitem({
  company,
  handleSelectCompany,
}: HashtagitemProps) {
  return (
    <li key={company}>
      <button onClick={() => handleSelectCompany(company)}>
        #{company}
      </button>
    </li>
  );
}
