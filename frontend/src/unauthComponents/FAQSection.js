import React, { useState } from 'react';

const FAQSection = () => {
    const [isOpen, setIsOpen] = useState(Array(4).fill(false));

    const toggleAnswer = (index) => {
        const updatedIsOpen = [...isOpen];
        updatedIsOpen[index] = !updatedIsOpen[index];
        setIsOpen(updatedIsOpen);
    };

    return (
        <section id="faq" className="bg-white py-16">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Frequently Asked Questions</h2>
                <div className=" flex flex-col justify-center items-center">
                    {[
                        { question: 'How do I sign up ?', answer: 'Click on login from top right then click on sign up' },
                        { question: 'Can I add any product ?', answer: 'Yes, you can add any product in customizable catagory' },
                        { question: 'How can I get report ?', answer: 'From your dashboard you can get sale report. ' },
                        { question: 'How can I contact customer support?', answer: 'Use contact part.' }
                    ].map((faq, index) => (
                        <div key={index} className='border p-4 px-8 rounded m-2 w-2/3'>
                            <h3
                                className="text-2xl font-semibold mb-4 cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                            >
                                {faq.question}
                            </h3>
                            {isOpen[index] && <p className="text-gray-600 mb-4">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
