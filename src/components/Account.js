import { MainContent, OuterContainer } from "./SharedComponents";

const Account = ({ user }) => {
  return (
    <OuterContainer>
      <MainContent>
        <h2>Account Settings</h2>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </MainContent>
    </OuterContainer>
  );
};

export default Account;
