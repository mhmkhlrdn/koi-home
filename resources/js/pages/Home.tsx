import { useEffect } from 'react';
import HomeHeader from '../components/HomeHeader';

export default function Home() {
    useEffect(() => {
        let wave1 = document.getElementById('wave1');
        let wave2 = document.getElementById('wave2');
        let wave3 = document.getElementById('wave3');
        let wave4 = document.getElementById('wave4');
        window.addEventListener('scroll', function () {
            let value = window.scrollY;
            wave1.style.backgroundPositionX = 400 + value + 'px';
            wave2.style.backgroundPositionX = 300 + value + 'px';
            wave3.style.backgroundPositionX = 200 + value + 'px';
            wave4.style.backgroundPositionX = 100 + value + 'px';
        });
    });
    return (
        <>
            <HomeHeader />
            <section className="sectionTest">
                <div className="wave" id="wave1" style={{ '--i': 1 }}></div>
                <div className="wave" id="wave2" style={{ '--i': 2 }}></div>
                <div className="wave" id="wave3" style={{ '--i': 3 }}></div>
                <div className="wave" id="wave4" style={{ '--i': 4 }}></div>
            </section>
            <div className="sec">
                <h2></h2>
            </div>
        </>
    );
}
