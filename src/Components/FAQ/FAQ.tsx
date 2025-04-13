import { FC, useState } from "react";
import "./FAQ.css";
interface FAQItem {
  question: string;
  answer: string;
}
interface FAQCategory {
  title: string;
  questions: FAQItem[];
}
export const FAQ: FC = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(0);
  const categories: FAQCategory[] = [
    {
      title: "Shopping",
      questions: [
        { question: "What types of payment do you accept?", answer: "We accept Visa, MasterCard, PayPal, and more." },
        { question: "Do you offer gift wrapping?", answer: "Yes, gift wrapping is available during checkout." },
        { question: "How do I know which size to order?", answer: "Check our size guide available on each product page." },
        { question: "What is your exchange policy?", answer: "Exchanges are accepted within 30 days of purchase." },
      ],
    },
    {
      title: "Receiving shipment",
      questions: [
        { question: "How long does delivery take?", answer: "Standard shipping takes 3-5 business days." },
        { question: "Can I track my order?", answer: "Yes, tracking information is emailed after shipping." },
      ],
    },
    {
      title: "Return of goods",
      questions: [
        { question: "How do I return an item?", answer: "Use the return portal on our website." },
        { question: "Is return shipping free?", answer: "Yes, we provide free return shipping labels." },
      ],
    },
    {
      title: "Complaint",
      questions: [
        { question: "How do I file a complaint?", answer: "Contact our support via the help center." },
        { question: "What’s the complaint resolution time?", answer: "Usually within 5-7 business days." },
      ],
    },
  ];
  const handleTabClick = (index: number) => {
    setOpenCategoryIndex(index);
  };
  return (
    <div className="faq-container">
      <div className="faq-tabs">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`faq-tab ${openCategoryIndex === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </div>
      {openCategoryIndex !== null && (
        <div className="faq-content">
          <h2>{categories[openCategoryIndex].title}</h2>
          {categories[openCategoryIndex].questions.map((item, i) => (
            <div key={i} className="faq-question-block">
              <details>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};