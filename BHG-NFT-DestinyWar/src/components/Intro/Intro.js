import './Intro.scss';
import logo from '../../assets/img/logo.png';

export const Intro = () => {
    return (
        <section className="intro container">
            <div className="intro__logo">
                <img alt="pic" src={ logo }></img>
            </div>

            <div className="intro__desc">
                <p>
                    Destiny War is bringing back the classic MMORPG gameplay, Interact to many players, friends, and family to enjoy the excitement and intensity of being a warrior. Explore the new virtual world do your daily quest to collect rewards and grind digital assets and turn them into REAL MONEY!
                </p>
                <p>
                We will be selling a total of 50000 Warriors in our pre-sale, Every warrior will get a random wing, random costume, and Destiny box. Our minimum target is to sell 20000 and after that we will be releasing the beta game after 1 month.
                </p>
            </div>

            <br/>
        </section>
    )
}

export default Intro;