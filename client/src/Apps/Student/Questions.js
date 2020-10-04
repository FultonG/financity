import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import CareerCard from './Components/CareerCard';
import { Title } from '../../Components/Text';
import API from './utils/API';
import QuestionContainer from '../../Components/QuestionContainer';

import Card from '../../Components/Card';
import spinner from '../../icons/spinner.svg';

import Check from '../../images/check.gif'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal';
import { Bold, Text } from '../../Components/Text';
import {useHistory} from 'react-router-dom';

const Questions = ({ user }) => {
        
    let history = useHistory();
    const [question, setQuestion] = useState(null);
    const [userInfo, setUser] = useState(null);

    const [success, setSuccess] = useState(false);
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('user'));

        const fetchQuestion = async () => {
            
            let newUser = await API.getUserInformation(userInfo.username).then(res => res.data);
            console.log(newUser);
            // localStorage.setItem('user', JSON.stringify(user));
            setUser(newUser);
            
            if(newUser.job && newUser.job.question) {

                let res = await API.getQuestion(newUser.job.question).then(res => res.data);
                console.log(res);
                setQuestion(res);
            }
        }

            fetchQuestion();

    }, []);

    function submitAnswer() {
        console.log(userInfo);
        return API.submitAnswer({
            username: userInfo.username,
            question_id: userInfo.job.question 
        }).then(res => {
            console.log(res.data);
            setSuccess(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    const handleRedirect = () => {
        history.push('/');
      }
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Questions</Title>
      <Container justify="space-evenly" padding="40px">
        {question == null ?
            <Card padding="30px" align="center" justify="center">
                {userInfo == null ? <img src={spinner} alt="" style={{background: 'none' }}/>: <h3>You have no questions left!</h3>}
            </Card> 
            :
            <QuestionContainer onComplete={submitAnswer} question={question.question} options={question.options} correct={question.answer}></QuestionContainer>
        }
        </Container>
        <Modal show={success}>
                <Card height="60%" width="50%" direction="column" justify="space-evenly">
                <img src={Check} />
                <Text>You answered correctly!</Text>
                <Button onClick={handleRedirect}>Go to Dashboard</Button>
            </Card>
        </Modal>
    </Container>
  )
}

export default Questions;