import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

type HeaderProps = { handleAddToList: (text: string) => void }; //we do void when the function do not return anything

export default function Header({ handleAddToList }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddToList={handleAddToList} />
    </header>
  );
}
