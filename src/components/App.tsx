import { useEffect, useMemo, useState } from "react";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtags/HashtagList";
import { TFeedbackItem } from "../lib/type/type";

const exampleFeedbackItem = [
  {
    id: 558797987656,
    upvoteCount: 598,
    badgeLetter: "D",
    company: "ismail",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 2,
  },
  {
    id: 79895656877,
    upvoteCount: 589,
    badgeLetter: "J",
    company: "SKHFS",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 7,
  },
];

function App() {
  // Extract only the first item from the feedbackItem array
  const feedbackItemsToDisplay = exampleFeedbackItem.slice(0, 1);

  const [feedbackItem, setFeedbackItem] = useState<TFeedbackItem[]>(
    feedbackItemsToDisplay
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  //2ND METHODE
  //const companyList = feedbackItem
  //  .map((item) => item.company)
  //  .filter((company, index, array) => {
  //    return array.indexOf(company) === index;
  //  });
  const companyList = [
    ...new Set(
      useMemo(() => feedbackItem.map((item) => item.company), [feedbackItem])
    ),
  ]; // The Set object automatically removes duplicate values. By wrapping the mapped array with new Set(), we create a set of unique company names. The spread operator (...) then converts the set back into an array.
  console.log(companyList);

  const companyListWithAll = ["All", ...companyList];
  console.log(companyListWithAll);

  const filteredFeedbackItemsByCompany = useMemo(
    () =>
      selectedCompany
        ? feedbackItem.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItem,
    [feedbackItem, selectedCompany]
  );

  const feedbackItemsByCompany = (company: string) => {
    company === "All"
      ? setSelectedCompany("") // Set selectedCompany to empty string for "All"
      : setSelectedCompany(company); // Set selectedCompany to the company name
  };

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))! //here we told typescript that we accept the risk of the word that include the hashtage might bot be a string
      .substring(1); //so the .substring(1) wont work if its not string

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItem([...feedbackItem, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setFeedbackItem((prev) => [...prev, ...data.feedbacks]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrMsg(`Error fetching data: ${error}`);
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);
  return (
    <div className="app">
      <Footer />
      <Container
        errMsg={errMsg}
        isLoading={isLoading}
        feedbackItem={filteredFeedbackItemsByCompany}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyListWithAll}
        feedbackItemsByCompany={feedbackItemsByCompany}
      />
    </div>
  );
}

export default App;
