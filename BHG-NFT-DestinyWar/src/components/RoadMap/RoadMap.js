import './RoadMap.scss';

const imageCount = 9;
const images = require.context('../../assets/img', true);
const roadMapImages = [];

for( let i = 1; i <= imageCount ; i ++ ) {
    const image = images(`./roadmap${i}.png`);
    roadMapImages.push(image);
}

export const RoadMap = () => {
    return (
        <section className="roadMap">
            <div className="roadMap__title">
                ROADMAP
            </div>

            <div className="roadMap__content">
                {
                    roadMapImages.map((item, index) => (
                        <div className={`roadMap__content__item ${ index % 2 === 0 ? 'toLeft' : 'toRight' }`} key={index}>
                            <div>
                                <img alt="pic" src={item.default}></img>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default RoadMap;