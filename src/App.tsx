import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Navbar from "./components/Navbar.tsx";
import Features from "./components/Features.tsx";
import Story from "./components/Story.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
            <Footer />
        </main>
    )
}