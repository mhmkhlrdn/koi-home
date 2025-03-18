import { useEffect } from 'react';

const page = () => {
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
            <section className="sectionTest">
                <div className="wave" id="wave1" style={{ '--i': 1 }}></div>
                <div className="wave" id="wave2" style={{ '--i': 2 }}></div>
                <div className="wave" id="wave3" style={{ '--i': 3 }}></div>
                <div className="wave" id="wave4" style={{ '--i': 4 }}></div>
            </section>
            <div className="sec">
                <h2>Animated Parallax Water Wave Effects</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi eos
                    ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi eos
                    ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi eos
                    ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi
                    eos ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi eos
                    ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nostrum laudantium eveniet dolorem, cumque rerum error nisi eos
                    ratione id quasi illo animi sint magni? Praesentium aperiam incidunt facere officia?
                    <br />
                </p>
            </div>
        </>
    );
};

export default page;
