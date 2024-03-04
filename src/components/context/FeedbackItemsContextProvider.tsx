import React, { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/type/type";
import { exampleFeedbackItem } from "../../lib/constants/constants";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

type FFeedbackItemsContext = {
  isLoading: boolean;
  errMsg: string;
  companyListWithAll: string[];
  filteredFeedbackItemsByCompany: TFeedbackItem[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const feedbackItemsContext = createContext<FFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const feedbackItemsToDisplay = exampleFeedbackItem.slice(0, 1);

  const [feedbackItem, setFeedbackItem] = useState<TFeedbackItem[]>(
    feedbackItemsToDisplay
  );
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  const companyListWithAll = ["All", ...companyList];

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))! //(#COMPANY)    here we told typescript that we accept the risk of the word that include the hashtage might bot be a string
      .slice(1); //(COMPANY)    so the .substring(1) wont work if its not string

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.slice(0, 1).toUpperCase(), //(C)
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

  const filteredFeedbackItemsByCompany = useMemo(
    () =>
      selectedCompany
        ? feedbackItem.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItem,
    [feedbackItem, selectedCompany]
  );

  const handleSelectCompany = (company: string) => {
    company === "All"
      ? setSelectedCompany("") // Set selectedCompany to empty string for "All"
      : setSelectedCompany(company); // Set selectedCompany to the company name
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
    <feedbackItemsContext.Provider
      value={{
        isLoading,
        errMsg,
        companyListWithAll,
        filteredFeedbackItemsByCompany,
        handleSelectCompany,
        handleAddToList,
      }}
    >
      {children}
    </feedbackItemsContext.Provider>
  );
}
