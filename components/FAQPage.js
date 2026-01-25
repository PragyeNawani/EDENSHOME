"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Hotel vs Short-Term Rental Apartment – What's the Difference?",
      answer: (
        <>
          <span className="font-semibold">Hotels</span> offer a standard room with limited space and fixed services.
          <br />
          <span className="font-semibold">Short-term rental apartments</span> give you a full private home, more space and a more comfortable, flexible stay.
        </>
      )
    },
    {
      question: "Will I get privacy in a short-term rental apartment?",
      answer: "Absolutely. Unlike hotels with shared corridors and constant staff interaction, short-term rentals provide complete privacy with your own entrance and personal space."
    },
    {
      question: "Are short-term rental apartments suitable for families or groups?",
      answer: "Yes. They are perfect for families and groups, offering multiple rooms, shared living areas, and the freedom to stay together comfortably under one roof."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-[#241705] flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className='w-[200px] h-[200px] bg-[#FCE8CA] absolute bottom-0 left-0 z-3 blur-[100px]'></div>
        <div className='w-[200px] h-[200px] bg-[#FCE8CA] absolute top-0 right-0 z-3 blur-[100px]'></div>
        <h2 className="text-[#FCE8CA] text-6xl tracking-widest text-center mb-12 uppercase heromainheading">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-6 text-left group"
              >
                <span className={`text-lg pr-8 transition-colors ${openIndex === index ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500'
                  }`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${openIndex === index
                      ? 'rotate-180 text-yellow-500'
                      : 'text-gray-400 group-hover:text-yellow-500'
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
              >
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}