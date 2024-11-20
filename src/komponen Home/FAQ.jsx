import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-main-heading">
        <h2 className="main-toggle">FAQ</h2>
      </div>
      
      <div className="faq-content">
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(0)}>
            <span>Question 1</span>
            <span className="faq-toggle">{activeIndex === 0 ? '▲' : '▼'}</span>
          </div>
          {activeIndex === 0 && (
            <div className="faq-answer">
              Lorem ipsum Lorem ipsum Lorem What Should I Do In This Situation.
            </div>
          )}
        </div>
        
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(1)}>
            <span>Question 2</span>
            <span className="faq-toggle">{activeIndex === 1 ? '▲' : '▼'}</span>
          </div>
          {activeIndex === 1 && (
            <div className="faq-answer">
              Lorem ipsum Lorem ipsum Lorem What Should I Do In This Situation.
            </div>
          )}
        </div>
        
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(2)}>
            <span>Question 3</span>
            <span className="faq-toggle">{activeIndex === 2 ? '▲' : '▼'}</span>
          </div>
          {activeIndex === 2 && (
            <div className="faq-answer">
              Lorem ipsum Lorem ipsum Lorem What Should I Do In This Situation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
