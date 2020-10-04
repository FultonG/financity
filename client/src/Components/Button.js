import styled from 'styled-components';

const Button = styled.button`
  color: white;
  background: #003362;
  border-radius: 10px;
  width: 150px;
  height: 35px;
  border: 0;
  font-size: 14px;

  &:hover {
    background: #003362e0;
  }
  &:hover {
    border: none;
    cursor: pointer;
  }
  &:disabled {
    background: #012e3b4a;
  }
`;

export default Button;