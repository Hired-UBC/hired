import { Modal } from "@material-ui/core";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 5px;
  padding: 30px;
  max-width: 600px;
`;

export const FullScreenModal = (props) => {
  return (
    <Modal {...props}>
      <div className='d-flex align-items-center justify-content-center w-100 h-100'>
        <ModalContainer>
          <div>{props.children}</div>
        </ModalContainer>
      </div>
    </Modal>
  );
};

const DropDownContainer = styled.div`
  background: white;
`;

// export const Dropdown = () => {
//   return(
//   )
// }
