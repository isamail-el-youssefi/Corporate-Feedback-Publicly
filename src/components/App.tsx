import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/type/type";

const exampleFeedbackItem = [
  {
    id: 558797987656,
    upvoteCount: 598,
    badgeLetter: "D",
    companyName: "ismail",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing ejgd khdjah fkhkhfa skhkfsk skhkfs sjfjsf sfjbfs ",
    daysAgo: 2,
  },
  {
    id: 79895656877,
    upvoteCount: 589,
    badgeLetter: "J",
    companyName: "SKHFS",
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

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))! //here we told typescript that we accept the risk of the word that include the hashtage might bot be a string
      .substring(1); //so the .substring(1) wont work if its not string

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItem([...feedbackItem, newItem]);
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
        feedbackItem={feedbackItem}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
