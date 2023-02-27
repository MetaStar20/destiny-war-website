import { useEffect, useState } from 'react';
import './Characters.scss';
import './Fighter.scss';

const teamPath = require.context('../../assets/img/team', true);
const teamLogos = [];
const teams = [];

for( let i = 1; i <= 7; i++ ) {
    const image = teamPath(`./team${i}.png`);
    const image1 = teamPath(`./team${i}logo.png`);

    teams.push(image);
    teamLogos.push(image1);
}

const imageCount = 14;
const images = require.context('../../assets/img/characters', true);
const slideImages = [ [], [] ];

for( let i = 1; i <= imageCount ; i ++ ) {
    const image = images(`./${i}.png`);
    i < 8 ? slideImages[0].push(image) : slideImages[1].push(image);
}

const info = [
    {
        team_logo: teamLogos[0],
        team_img: teams[0],
        title: 'FIGHTER',
        desc: `In the distant past a warrior named Kuang Tu Nha helped the Chou dynasty defeat Tru, a dangerous warrior that had threatened everything.  The legend of this battle has drawn hundreds of the greatest Taoists to study his hand to hand style, hoping to become as great as the legendary warrior. </br></br>Fighters are warriors who focus on close combat. They use their fists to make rapid attacks to wear down their enemies.`
    },
    {
        team_logo: teamLogos[1],
        team_img: teams[1],
        title: 'SWORDSMAN',
        desc: `Swordsman have travelled the world for centuries, gathering in places of power to study and hone their abilities.  A true swordsman spends decades honing their craft until their sword is almost a third limb.  They are some of the most deadly and feared warriors in the world. </br></br>Swordsman focus on close combat using blades. They can deal massive damage with their blades.  They keep their enemies from attacking the weaker members of their party. `
    },
    {
        team_logo: teamLogos[2],
        team_img: teams[2],
        title: 'MAGE',
        desc: `Mages have focused their power into the summoning of demons and manipulation of the three realms; Heaven, Earth and Human.  Their powers made the people considered evil spirits and they withdrew from the world for a time. Recently they finally  revealed themselves again.  </br></br>They focused on helping others and soon people began to see them as allies rather than enemies. A mage keeps his foes at a distance, using staves to launch magical attacks at their enemies.  While weak physically their powers can cause massive damage.
        `
    },
    {
        team_logo: teamLogos[3],
        team_img: teams[3],
        title: 'NINJA',
        desc: `Ninjas are a mysterious organization that has existed hidden in the shadows for centuries. Long ago they served under the Zhou dynasty, striking down their foes. They are feared by the people who know of them, as one can never know when or where they may strike.  Their hidden blades and clever poisons have killed hundreds of heroes and knights.
        </br></br>Ninjas focus on close combat against their foes.  They are far more flexible than other warriors, using a variety of different weapons to cause a variety of effects.`
    },
    {
        team_logo: teamLogos[4],
        team_img: teams[4],
        title: 'PRIEST',
        desc: `During the warring states period the priests went deep into the Mon Vong swamp away from the fighting to focus on peace rather than war.  For 50 years he meditated and studied the local plants and herbs.  As time passed he unlocked the secrets of hundreds of potions, becoming an expert in pharmacology.  They also learned many magical spells of great power.
        </br></br>
        The priest is a great healer, his powers keeping people alive in the most dangerous situations.  When forced to fight the priest uses his staff to send magical attacks at his foes from a great distance.
        `
    },
    {
        team_logo: teamLogos[5],
        team_img: teams[5],
        title: 'TAOIST',
        desc: `There are many places of power across the world but the Taoists have gathered at the peak of Kun Lun.  Here they can focus on the heavens, contacting demons and other celestial creatures, making deals with them to call on their abilities in the future.  When not communing with the universe they study their skill with the blade.
        </br></br>Taoists are ranged warriors who use a staff to summon allies to fight for them.  When not calling on allies they use a sword to attack their foes.`
    },
    {
        team_logo: teamLogos[6],
        team_img: teams[6],
        title: 'KNIGHT',
        desc: `Knight who follow the teaching of an unknown warrior in the past.  His teachings are considered some of the most difficult and beautiful of all the warriors in the world.  Warrior are part of a strong military tradition and they expect their warriors to train constantly to maintain peak physical health.
        </br></br>
        Knight are close quarter sword/Spear wielders focused on attacking many enemies.
        `
    }
]

export const Characters = () => {
    const [val, setValue] = useState(0);
    const [inter, setInter] = useState(0);
    const [teamNumber, setTeamNumber] = useState(0); 

    useEffect(() => {
        if( inter > 0) {
            return;
        }

        const timeInterval = setInterval(() => {
            setValue(prev => prev === 0 ? prev + 1 : prev -1);
        }, 1000);

        setInter(timeInterval);
    }, [inter]);

    return (
        <div>
            <section className="characters container">
                <div className="characters__title">
                    CHOOSE YOUR CLASS
                </div>

                <div className="characters__view">
                    {
                        slideImages[val].map((item, index) => (
                            <div className="characters__view__item" key={index} onClick={() => setTeamNumber(index)}>
                                <img alt="pic" src={item.default}></img>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="fighter container">
                <div className="fighter__desc">
                    <div className="fighter__desc__title">
                        <img alt="pic" src={info[teamNumber].team_logo.default}></img>
                        <span>{info[teamNumber].title}</span>
                    </div>
                    <div className="fighter__desc__content">
                        <p dangerouslySetInnerHTML={{
                            __html: info[teamNumber].desc
                        }}>
                        </p>
                    </div>
                </div>

                <div className="fighter__pic">
                    <img alt="pic" src={info[teamNumber].team_img.default}></img>
                </div>
            </section>
        </div>
    )
}

export default Characters;