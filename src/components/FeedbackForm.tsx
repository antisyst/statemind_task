import React, { useState } from 'react';
import styled from '@emotion/styled';

const TextAreaSection = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`
const TextAreItem = styled.textarea `
  resize: none;
  outline: none;
  padding: 15px;
  font-family: 'General Sans', sans-serif;
  margin: 10px 0;
  font-size: 17px;
  border-radius: 16px;
  background: var(--color-black);
  font-weight: 500;
  border: 2px solid var(--color-main);
  color: var(--color-white);
`
const LivePrev = styled.div `
  margin-top: 20px;
`
const AddButton = styled.button `
  color: var(--color-white);
  padding: 12px 18px;
  background: var(--color-main);
  transition: all .3s ease-in-out;
  margin-top: 8px;
  cursor: pointer;
  font-family: 'General Sans', sans-serif;
  border-radius: 8px;
  font-weight: 600;
  font-size: 17px;
  outline: none;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`
const FeedbacItem = styled.div `
  padding: 20px;
  margin-top: 17px;
  border: 2px solid var(--color-main);
  border-radius: 20px;
`
const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<string[]>([]);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleAddFeedback = () => {
    setFeedbackList([...feedbackList, feedback]);
    setFeedback('');
  };


  return (
    <TextAreaSection>
      <h2>Provide Feedback</h2>
      <TextAreItem
        rows={4}
        cols={50}
        placeholder="Type your feedback here..."
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <AddButton onClick={handleAddFeedback}>Add Feedback</AddButton>
      <LivePrev>
        <h2>Live Preview</h2>
        <FeedbacItem>
        {feedbackList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </FeedbacItem>
      </LivePrev>
    </TextAreaSection>
  );
};

export default FeedbackForm;
