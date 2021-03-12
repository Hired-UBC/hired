import { MainContent, OuterContainer } from "./SharedComponents";

const ErrorPage = () => {
  return (
    <OuterContainer>
      <MainContent>
        <h2>Oops!</h2>
        <p>This page doesn't seem to exist.</p>
      </MainContent>
    </OuterContainer>
  );
};

export default ErrorPage;
