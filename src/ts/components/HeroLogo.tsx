import { ReactComponent as Logo } from '@/assets/logo-main.svg';
import { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroLogo = () => {
    const wrapper = useRef(null);

    useEffect(() => {
        const [elements] = wrapper.current?.children;

        // Pobranie elementów z SVG
        const bottomLine = elements.getElementById('bottom_line');
        const leftPerson = elements.getElementById('left_person');
        const rightPerson = elements.getElementById('right_person');
        const verticalLine = elements.getElementById('vertical_line');
        const horizontalLine = elements.getElementById('horizontal_line');
        const Paper_1 = elements.getElementById('1_paper');
        const Paper_2 = elements.getElementById('2_paper');
        const Paper_3 = elements.getElementById('3_paper');
        const Paper_4 = elements.getElementById('4_paper');
        const Paper_5 = elements.getElementById('5_paper');
        const square = elements.getElementById('square');

        const v_14 = elements.getElementById('Vector_14');
        const v_15 = elements.getElementById('Vector_15');
        const v_16 = elements.getElementById('Vector_16');
        const v_17 = elements.getElementById('Vector_17');

        // Ustawienie początkowej widoczności dla elementów
        gsap.set([bottomLine, leftPerson, rightPerson, verticalLine, horizontalLine, Paper_1, Paper_2, Paper_3, Paper_4, Paper_5, v_14, v_15, v_16, v_17, square], { autoAlpha: 0 });

        const squareLength = square.getTotalLength();

        // Ustawienie strokeDasharray i strokeDashoffset
        gsap.set(square, {
            strokeDasharray: squareLength,
            strokeDashoffset: squareLength,
            stroke: '#000', // Kolor konturu
            strokeWidth: 1, // Grubość konturu
            fill: 'transparent' // Przezroczyste wypełnienie
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

        // Animacje dla głównych elementów
        tl.fromTo(bottomLine, { x: '-800' }, { duration: 1, x: '+=800', autoAlpha: 1 })
            .fromTo(leftPerson, { scale: 0 }, { duration: 0.7, scale: 1, autoAlpha: 1 }, "-=0.5")
            .fromTo(rightPerson, { scale: 0 }, { duration: 0.7, scale: 1, autoAlpha: 1 }, "-=0.5")
            .fromTo(Paper_2, { y: '-100' }, { duration: 0.8, y: '0', autoAlpha: 1 }, "-=0.4")
            .fromTo(Paper_1, { y: '-100' }, { duration: 0.8, y: '0', autoAlpha: 1 }, "-=0.4")
            .fromTo(verticalLine, { y: '-500' }, { duration: 0.8, y: '+=500', autoAlpha: 1 }, "-=0.8")
            .fromTo(horizontalLine, { x: '-500' }, { duration: 0.8, x: '+=500', autoAlpha: 1 }, "-=0.8")
            .fromTo(Paper_3, { y: '-100' }, { duration: 0.8, y: '0', autoAlpha: 1 }, "-=0.4")
            .fromTo(Paper_4, { y: '-100' }, { duration: 0.8, y: '0', autoAlpha: 1 }, "-=0.4")
            .fromTo(Paper_5, { y: '-100' }, { duration: 0.8, y: '0', autoAlpha: 1 }, "-=0.4")

            // Animacja rysowania konturu
            .fromTo(square,
                { strokeDashoffset: squareLength }, // Początkowy stan: niewidoczny kontur
                { duration: 4, strokeDashoffset: 0, autoAlpha: 1 }, // Końcowy stan: widoczny kontur
                "-=1" // Przesunięcie o 1 sekundę w stosunku do poprzednich animacji
            )

            // Animacja z użyciem stagger
            .fromTo([v_14, v_15, v_16, v_17],
                { scale: 0 },
                { duration: 0.6, scale: 1, autoAlpha: 1, stagger: 0.2, ease: 'power2.out' },
                "-=2.2" // Przesunięcie o 2.2 sekundy w stosunku do poprzednich animacji
            );

    }, []);

    return (
        <div className="box" ref={wrapper}>
            <Logo />
        </div>
    );
};

export default HeroLogo;
