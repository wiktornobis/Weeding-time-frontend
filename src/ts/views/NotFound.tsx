import { useRef, useEffect } from "react";
import gsap from "gsap";

const NotFound = () => {
    const wrapper = useRef(null);

    useEffect(() => {
        if (!wrapper.current) return;

        const letters = wrapper.current.querySelectorAll('.letter');

        // Ustawienie początkowe dla liter
        gsap.set(letters, { autoAlpha: 0, y: 50 });

        // Utworzenie animacji GSAP
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

        // Animacja liter
        tl.staggerFrom(
            letters,
            0.8, // czas trwania dla pojedynczej litery
            { autoAlpha: 0, y: 50 },
            0.1
        )
            .staggerTo(
                letters,
                1, // czas trwania dla pojedynczej litery
                { autoAlpha: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.3)" },
                0.1
            );
    }, []);

    return (
        <section className="general-container">
            <div className="not-found" ref={wrapper}>
                <span className="letter">N</span>
                <span className="letter">o</span>
                <span className="letter">t</span>
                <span className="letter"> </span>
                <span className="letter">F</span>
                <span className="letter">o</span>
                <span className="letter">u</span>
                <span className="letter">n</span>
                <span className="letter">d</span>
            </div>
        </section>
    );
};

export default NotFound;
