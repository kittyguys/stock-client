import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { openDeleteModal } from "@src/features/stocks/actions";
import { deleteStockAsync } from "@src/features/stocks/operations";

export const DeleteStockModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStockId = useSelector(
    ({ stocks }: any) => stocks.selectedStockId
  );
  const closeModal = (e: any) => {
    dispatch(openDeleteModal());
  };
  const handleDeleteStock = (e: any) => {
    e.stopPropagation();
    dispatch(deleteStockAsync(selectedStockId));
  };
  return (
    <Modal onClick={closeModal}>
      <Notification>
        <BaseButton>キャンセル</BaseButton>
        <DeleteButton onClick={handleDeleteStock}>削除</DeleteButton>
      </Notification>
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Notification = styled.div`
  width: 160px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  right: 50%;
  z-index: 2;
  transform: translate(50%, -50%);
`;

const BaseButton = styled.span`
  cursor: pointer;
  font-size: 1.6rem;
  background-color: #fff;
  border-radius: 2px;
  padding: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const DeleteButton = styled(BaseButton)`
  color: red;
`;
