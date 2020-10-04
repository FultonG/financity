import React, { useState, useEffect } from 'react';
import Card from './Card';
import Answer from './Answer';
import Button from './Button';
import checkIcon from '../icons/checkmark.svg';
import AnimatedIcon from '../Components/AnimatedIcon'

const QuestionContainer = ({ question, options, correct, onComplete }) => {

    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    function submitQuestion() {
        setSubmitted(true);
        console.log(correct, selected, submitted)
        if(correct == selected) {
            //show complete animation and move on to next question if finished
            onComplete();
            
        }
        else {
            
        }
    }
    return (
        <form>
            <Card padding="30px" align="unset" justify="space-between">
                
                <h3 style={{marginTop: 0}}>Are you ready to earn some coins? Let's get started.</h3>
                <div style={{width: '100%', height: '90%', display: 'flex', flexDirection: 'column' ,justifyContent: "center" }}>
                    <div style={{ width: '100%', height: '50%', display: 'grid', placeItems: 'center'}}>
                        
                        <h3>{question}</h3>
                    </div>
                    <div style={{width: '100%'}}>
                        {options.map((opt, index) => (
                            <Answer key={index} hover cursor="pointer" 
                            selected={opt == selected} 
                            onClick={() => setSelected(opt)}>
                                <div>{alphabet[index]}: {opt}</div>
                                
                                <AnimatedIcon id={"check" + index} file={checkIcon} duration={300} backwards={true} show={submitted && opt == selected && selected == correct}/>
                                
                            </Answer>
                        ))}
                    </div>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <Button type="button" onClick={submitQuestion}>Next</Button>
                    </div> 
                </div>
            </Card>
        </form>
    )
}

export default QuestionContainer;