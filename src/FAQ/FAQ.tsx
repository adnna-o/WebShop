// FAQ.tsx
import { FC, useState } from "react";
import "./FAQ.css";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { question: "Šta je React?", answer: "React je biblioteka za izradu korisničkih interfejsa." },
    { question: "Kako koristiti useState?", answer: "useState je React Hook koji omogućava dodavanje stanja u funkcionalne komponente." },
    { question: "Šta je JSX?", answer: "JSX je sintaksni ekstenzija za JavaScript koja omogućava pisanje HTML-a unutar JavaScript koda." },
  ];

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Ako je kartica već otvorena, zatvori je
    } else {
      setActiveIndex(index); // Otvori karticu
    }
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-cards">
        {faqs.map((faq, index) => (
          <div
            className={`faq-card ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)} // Klikom na karticu se menja stanje
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
