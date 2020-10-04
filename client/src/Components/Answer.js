import styled from 'styled-components';

const Answer = styled.div(({ hover, cursor, selected }) =>`
  background: #FFFFFF;
  border: 1px solid #D1D1D1;
  box-sizing: border-box;
  border-radius: 5px;
  min-height: 30px;
  width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  
  transform: ${selected ? 'scale(1.01)' : 'scale(1)'};
  background: ${selected ? '#003362e0' : 'inherit'};
  color: ${selected ? 'white' : '#011F3B'};

  display: flex;
  justify-content: space-between;
  
  &:hover {
    cursor: ${cursor};
    ${hover && 'box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);'}
  }

  &.fade-enter {
    opacity: 0.01;
  }
  
  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  
  &.fade-leave {
    opacity: 1;
  }
  
  &.fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`);

export default Answer;