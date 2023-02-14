import TitleThreejs from '../components/3D-title/esummit_title'
import Events from '../components/Events/Events'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar'
import Sponsors from '../components/Sponsors/Sponsors'

export default function Home() {
  return (
    <div>
      <Navbar />
      <TitleThreejs />
      <Hero />
      <Events />
      <Sponsors />
    </div>
  )
}
