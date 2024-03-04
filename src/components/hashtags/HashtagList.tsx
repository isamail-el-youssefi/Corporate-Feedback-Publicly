import { useFeedbackItemsContext } from "../context/contextHook";
import Hashtagitem from "./Hashtagitem";

export default function HashtagList() {
  const { companyListWithAll, handleSelectCompany } = useFeedbackItemsContext();
  return (
    <ul className="hashtags">
      {companyListWithAll.map((company: string) => {
        return (
          <Hashtagitem
          handleSelectCompany={handleSelectCompany}
            company={company}
          />
        );
      })}
    </ul>
  );
}
