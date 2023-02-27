import './NavBar.scss';

import icon1 from '../../assets/icon/facebook.png';
import icon2 from '../../assets/icon/discord.png';
import icon3 from '../../assets/icon/instagram.png';
import icon4 from '../../assets/icon/twitter.png';
import icon5 from '../../assets/icon/youtube.png';
import icon6 from '../../assets/icon/telegram.png';

const info = [
    {
        icon: icon1,
        title: 'Facebook',
        url : 'https://www.facebook.com/gaming/DestinyWarNFTGame'
    }, 
    {
        icon: icon2,
        title: 'Discord',
        url: 'https://discord.gg/v3SbRprrnP'
    },
    {
        icon: icon3,
        title: 'Instagram',
        url: '#javascript'
    },
    {
        icon: icon6,
        title: 'Telegram',
        url:'https://t.me/destinywarnftgame'
    }, 
    {
        icon: icon5,
        title: 'Youtube',
        url: '#javascript'
    }
]

export const NavBar = () => {
    return (
        <section className="navBar">
            <div className="navBar__iconWrapper">
                {
                    info.map((item, index) => (
                        <a className="navBar__iconWrapper__item" key={index} href={item.url} target="_blank">
                            <div className="navBar__iconWrapper__item__icon">
                                <img src={item.icon} alt="pic"></img>
                            </div>

                            <div className="navBar__iconWrapper__item__title">
                                {item.title}
                            </div>
                        </a>
                    ))
                }
            </div>
        </section>
    )
}

export default NavBar;