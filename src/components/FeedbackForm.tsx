import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants/constants";

type FeedbackFormProps = { handleAddToList: (text: string) => void };

export default function FeedbackForm({ handleAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const maxChar = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    //GUARD STATEMENT
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToList(text);
    setText('')
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtage the company name
      </label>
      {/*  */}
      <div>
        <p className="u-italic">
          {maxChar === 0 ? (
            <p style={{ color: "darkred" }}>
              0 {" you''ve reached the max characters"}
            </p>
          ) : (
            <p>{maxChar}</p>
          )}
        </p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
