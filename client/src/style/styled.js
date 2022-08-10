import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const CenteredTwoColumns = styled.div`
  background-color: hsl(0, 0%, 97%);
  min-height: ${window.innerHeight - 76}px;
  padding: 10px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const Column = styled.div`
  width: 520px;
`
export const AddButton = styled(Button)`
  width: 500px;
  margin: 30px 10px 10px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`
export const CardButton = styled(Button)`
  width: 500px;
  margin: 5px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`
export const EditButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`
export const EditCard = styled.div`
  width: 500px;
  height: auto;
  margin: 10px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: .25rem;
  border: 1px solid #6c757d;
`