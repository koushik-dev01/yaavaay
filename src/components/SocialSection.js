import CountdownComponent from "./countdown/Countdown";
import ShareButton from "./ShareButton";
import ContactForm from "./ContactForm";
import Footer from './footer/footer';


export default function SocialSection({ targetDate, backgroundImage }) {
  return (
    <section className="text-section"
      style={{
        background: `rgba(0,0,0,.8) url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: "unset"
      }}
    >
      <CountdownComponent targetDate={targetDate} />
      <ShareButton />
      <ContactForm />
      {/* <div className="section-container"> */}
        {/* <Footer /> */}
      {/* </div> */}
    </section>
  )
}