import "./BuyCharacter.scss";

import title from "../../assets/img/buy/dwarcharbutton.png";
import character from "../../assets/img/buy/character2.gif";
import description from '../../assets/img/buy/description.png';
import buyButton from "../../assets/img/buy/buybutton.png";
import mountBtn from "../../assets/img/buy/mountbutton.png";
import mount_gif from "../../assets/img/buy/Egg.gif";
import petBtn from "../../assets/img/buy/petbutton.png";
import pet_gif from "../../assets/img/buy/pet.gif";
import one from "../../assets/img/buy/onebutton.png";
import priceLabel from '../../assets/img/buy/pricelabel.png';
import total_title from '../../assets/img/buy/total/title.png';
import eggLeft from "../../assets/img/buy/total/egg_left.png";
import eggRight from "../../assets/img/buy/total/egg_right.png";
import total_minted from '../../assets/img/buy/total/minted.png';
import progressBack from '../../assets/img/buy/bar1.png';
import progressBar from '../../assets/img/buy/bar2.png';
import progressHead from '../../assets/img/buy/head.png';
import nextPrice from '../../assets/img/next_price.png';

export const BuyCharacter = ({
  mintLoading,
  onMintCharacterHandler,
  onMintMountHandler,
  onMintPetHandler,
  totalSupply,
}) => {
	return (
		<section className="buyCharacter container">
			<div className="buyCharacter__top">
				<div className="buyCharacter__top__character">
					<div className="buyCharacter__top__character__title">
						<img alt="pic" src={title}></img>
					</div>
					<div className="buyCharacter__top__character__pic">
						<img alt="pic" src={character}></img>
					</div>
				</div>

				<div className="buyCharacter__top__one">
					<div className="buyCharacter__top__one__back">
						<img alt="pic" src={description}></img>
					</div>

					<button className="buyCharacter__top__one__oneBtn">
						<img alt="pic" src={one}></img>
					</button>

					<button 
						className="buyCharacter__top__one__buyBtn"
						onClick={() => {
							if (!mintLoading) onMintCharacterHandler(1);
						}}
					>
						<img alt="pic" src={buyButton}></img>
					</button>
				</div>
			</div>

			<div className="buyCharacter__special">
				<div className="buyCharacter__special__item">
					<button className="buyCharacter__special__item__title">
						<img alt="pic" src={petBtn}></img>
					</button>

					<div className="buyCharacter__special__item__gif">
						<img alt="pic" src={pet_gif}></img>
					</div>

					<div className="buyCharacter__special__item__price">
						<img alt="pic" src={priceLabel}></img>
					</div>

					<button 
						className="buyCharacter__special__item__buyBtn"
						onClick={() => {
							if (!mintLoading) onMintPetHandler(1);
						}}
					>
						<img alt="pic" src={buyButton}></img>
					</button>
				</div>

				<div className="buyCharacter__special__item">
					<button className="buyCharacter__special__item__title">
						<img alt="pic" src={mountBtn}></img>
					</button>

					<div className="buyCharacter__special__item__gif">
						<img alt="pic" src={mount_gif}></img>
					</div>

					<div className="buyCharacter__special__item__price">
						<img alt="pic" src={priceLabel}></img>
					</div>

					<button 
						className="buyCharacter__special__item__buyBtn"
						onClick={() => {
							if (!mintLoading) onMintMountHandler(1);
						}}
					>
						<img alt="pic" src={buyButton}></img>
					</button>
				</div>
			</div>

			<div className="buyCharacter__total">
				<div className="buyCharacter__total__title">
					<img src={total_title} alt="pic"></img>
				</div>

				<div className="buyCharacter__total__progress">
					<div className="buyCharacter__total__progress__left">
						<span className="value">50K</span>

						<img src={eggLeft} alt="pic"></img>
					</div>

					<div className="buyCharacter__total__progress__bar">
						<div className="buyCharacter__total__progress__bar__desc">
							<img alt="pic" src={total_minted}></img>
							<span className="value">{totalSupply}</span>
						</div>

						<div className="buyCharacter__total__progress__bar__main">
							<div className="buyCharacter__total__progress__bar__main__back">
								<img alt="pic" src={progressBack}></img>
							</div>
							<div className="buyCharacter__total__progress__bar__main__progress" style={{ width: `${totalSupply/50000}%` }}>
								<img alt="pic" src={progressBar}></img>
							</div>
							<div className="buyCharacter__total__progress__bar__main__head" style={{ left: `${totalSupply/50000}%` }}>
								<img alt="pic" src={progressHead}></img>
							</div>
							<div className="buyCharacter__total__progress__bar__main__next" style={{ left: "30%" }}>
								<img alt="pic" src={nextPrice}></img>
							</div>
						</div>
					</div>

					<div className="buyCharacter__total__progress__right">
						<span className="value">{50000 - totalSupply}</span>

						<img src={eggRight} alt="pic"></img>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BuyCharacter;
