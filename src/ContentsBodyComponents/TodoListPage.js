import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTodoList, postTodo, updateTodoStatus, getTodoOne } from '../Redux/Action/todoAction';
import { useDispatch } from 'react-redux';

const TodoListPage = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const result = await dispatch(getTodoList());
      if (result.success) {
        setTodoList(result.data);
      }
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, ); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoPopupOpen, setIsAddTodoPopupOpen] = useState(false);
  const [isRecentTodoPopupOpen, setIsRecentTodoPopupOpen] = useState(false);
  const [isRecentTodo, setIsRecentTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  console.log(todoList);

  const addTodo = async () => {
    const result = await dispatch(postTodo(newTodo));
    if (result.success) {
      alert('할 일이 저장되었습니다.');
      fetchData();
      setIsAddTodoPopupOpen(false);
      setNewTodo('');
    } else {
      alert('유효하지 않은 정보입니다.');
    }
  };

  const updateStatus = async (info) => {
    const result = await dispatch(updateTodoStatus(info));
    if (result.success) {
      fetchData();
    } else {
      alert('유효하지 않은 정보입니다.');
    }
  };

  const getTodoLatest = async (info) => {
    try {
      const result = await dispatch(getTodoOne());
      console.log(result.data)
      if (result.success && result.data) {
        setIsRecentTodoPopupOpen(true)
        setIsRecentTodo(result.data.contents)
      }else{
        alert("최근 할 일이 없습니다.")
      }
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };
  return (
    <WrapperDiv>
      <TodoListContainer>
        <TodoHeader>
          <h1>Todo List</h1>
          <ButtonContainer>
            <AddTodoButton onClick={() => setIsAddTodoPopupOpen(true)}>할 일 추가</AddTodoButton>
            <RecentTodoButton onClick={() => getTodoLatest()}>최근 할 일 보기</RecentTodoButton>
          </ButtonContainer>
        </TodoHeader>
        <TodoList>
          {todoList.length === 0 ? (
            <NoDataMessage>데이터가 없습니다.</NoDataMessage>
          ) : (
            todoList.map((todo, index) => (
              <TodoItem key={index}>
                {todo.contents}
                <ButtonContainer>
                  <Button
                    style={{ backgroundColor: `${todo.status === '할 일' ? 'pink' : 'white'}` }}
                    onClick={() => updateStatus({ todoId: Number(todo.todoId), status: '할 일' })}
                  >
                    할 일
                  </Button>
                  <Button
                    style={{ backgroundColor: `${todo.status === '진행중' ? 'pink' : 'white'}` }}
                    onClick={() => updateStatus({ todoId: Number(todo.todoId), status: '진행중' })}
                  >
                    진행중
                  </Button>
                  <Button
                    style={{ backgroundColor: `${todo.status === '완료됨' ? 'pink' : 'white'}` }}
                    onClick={() => updateStatus({ todoId: Number(todo.todoId), status: '완료됨' })}
                  >
                    완료됨
                  </Button>
                </ButtonContainer>
              </TodoItem>
            ))
          )}
        </TodoList>
      </TodoListContainer>
      {isAddTodoPopupOpen && (
        <PopupOverlay>
          <AddTodoPopup>
            <h2>할일 추가</h2>
            <InputContainer>
              <input
                type="text"
                placeholder="할일을 입력하세요"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                style={{
                  width: '900px',
                  height: '50px',
                }}
              />
              <AddTodoButton style={{ width: '910px', height: '50px' }} onClick={addTodo}>
                추가
              </AddTodoButton>
            </InputContainer>
            <CloseButton onClick={() => setIsAddTodoPopupOpen(false)}>X</CloseButton>
          </AddTodoPopup>
        </PopupOverlay>
      )}
        {isRecentTodoPopupOpen && (
          <PopupOverlay>
            <RecentTodoPopup>
              <PopupTitle>최근 할 일</PopupTitle>
              <PopupContent>{isRecentTodo}</PopupContent>
              <CloseButton onClick={() => setIsRecentTodoPopupOpen(false)}>X</CloseButton>
            </RecentTodoPopup>
          </PopupOverlay>
        )}
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`

const TodoListContainer = styled.div`
  width: 70%;
  padding: 20px;
`

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const AddTodoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`

const TodoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: end;
`

const Button = styled.button`
  color: black;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 900;
`

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddTodoPopup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const NoDataMessage = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: #888;
  margin-top: 10%;
  font-weight: 900;
`

const RecentTodoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const RecentTodoPopup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const PopupTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const PopupContent = styled.div`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: left;
  line-height: 1.5;
`;

  export default TodoListPage