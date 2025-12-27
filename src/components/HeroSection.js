import Logo from "./Logo";
import './textStyle.css';
import PlayVideo from "./PlayVideo";

export default function HeroSection({ textObject, backgroundImage }) {
  return (
    <section id="hero" className="hero"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Logo />
      <h1>{textObject.top}</h1>
      <PlayVideo />
      <p className="mid">{textObject.mid}</p>
      <p className="bot">{textObject.bot}</p>
    </section>
  )
}
