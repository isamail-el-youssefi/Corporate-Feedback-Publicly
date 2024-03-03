import Hashtagitem from "./Hashtagitem";

type HashtagListProps = {
  companyList: string[];
  feedbackItemsByCompany: (company: string) => void;
};

export default function HashtagList({
  companyList,
  feedbackItemsByCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company: string) => {
        return (
          <Hashtagitem
            feedbackItemsByCompany={feedbackItemsByCompany}
            company={company}
          />
        );
      })}
    </ul>
  );
}
