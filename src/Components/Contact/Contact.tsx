import { FC } from "react"
import "./Contact.css";

export const Contact: FC=()=>{
    return <>
    <div className="contact-container">
      <h1>Contact Us Directly</h1>
      <form className="contact-form">
        <label>
          Full name
          <input type="text" placeholder="Your full name" required />
        </label>
        <label>
          Email address
          <input type="email" placeholder="Your email" required />
        </label>
        <label>
          Subject
          <input type="text" placeholder="Subject" required />
        </label>
        <label>
          Message
          <textarea rows={5} placeholder="Write your message..." required></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
    </>
}
