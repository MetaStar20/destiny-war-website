import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import TopMenu from "./components/TopMenu/TopMenu";
import NavBar from "./components/NavBar/NavBar";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import Home from "./views/Home/Home";
import Inventory from "./components/Inventory/Inventory";
import Wikipedia from "./views/Wikipedia/Wikipedia";
import MarketPlace from "./views/MarketPlace/MarketPlace";

import back from "./assets/img/bg.png";

import { useState, useEffect } from "react";
import { mintNFT, mintFreeNFT } from "./helpers/interact";
import { getCurrentTotalSupply, getIsWhiteList } from "./helpers/contract";
import { connectWallet, getCurrentWalletConnected } from "./helpers/wallet";
import { NotificationManager } from "react-notifications";

function App() {
  const [mintLoading, setMintLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    const initDatas = async () => {
      if (window.ethereum) {
        const { address, status } = await getCurrentWalletConnected();
        setWalletAddress(address);
        onChangeWalletListener();
        onConnectWalletHandler();
        onLoadTotalSupply();
      }
    };

    initDatas();
  }, []);

  const onLoadTotalSupply = async () => {
    const amnt = await getCurrentTotalSupply();
    setTotalSupply(amnt);
  };

  const onConnectWalletHandler = async () => {
    if (window.ethereum) {
      const walletResponse = await connectWallet();
      setWalletAddress(walletResponse.address);
    } else {
      NotificationManager.success(
        "🦊 You must install Metamask in your browser"
      );
    }
  };

  const onChangeWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        onConnectWalletHandler();
      });
    } else {
    }
  };

  const onMintCharacterHandler = async (amount) => {
    if (!!walletAddress) {
      setMintLoading(true);
      console.log("onMintCharacter...");
      const { success, status } = await mintNFT(
        walletAddress,
        setMintLoading,
        amount,
        1
      );

      if (success) {
        NotificationManager.success(
          "Congratulations. Character is successfully minted!"
        );
      } else if (status.indexOf("insufficient fund") >= 0) {
        NotificationManager.info(
          "You don't have enough eths to mint a Character!"
        );
      } else if (status.indexOf("presale is not open") >= 0) {
        NotificationManager.info("Presale is not open!");
      } else if (
        status.indexOf("this address is not whitelisted for the presale") >= 0
      ) {
        NotificationManager.info(
          "This address is not whitelisted for the presale!"
        );
      } else if (
        status.indexOf(
          "this address is not allowed to mint that many during the presale"
        ) >= 0
      ) {
        NotificationManager.info(
          "This address is not allowed to mint that many during the presale!"
        );
      } else if (status.indexOf("already minted") > 0) {
        NotificationManager.info("You already have a Character !");
      } else {
        NotificationManager.info("Transaction is failed!");
      }
    }
  };

  const onMintMountHandler = async (amount) => {
    if (!!walletAddress) {
      setMintLoading(true);
      const { success, status } = await mintNFT(
        walletAddress,
        setMintLoading,
        amount,
        2
      );
      if (success) {
        NotificationManager.success(
          "Congratulations. Mount is successfully minted!"
        );
      } else if (status.indexOf("insufficient fund") >= 0) {
        NotificationManager.info("You don't have enough eths to mint a Mount!");
      } else if (status.indexOf("presale is not open") >= 0) {
        NotificationManager.info("Presale is not open!");
      } else if (
        status.indexOf("this address is not whitelisted for the presale") >= 0
      ) {
        NotificationManager.info(
          "This address is not whitelisted for the presale!"
        );
      } else if (
        status.indexOf(
          "this address is not allowed to mint that many during the presale"
        ) >= 0
      ) {
        NotificationManager.info(
          "This address is not allowed to mint that many during the presale!"
        );
      } else if (status.indexOf("already minted") > 0) {
        NotificationManager.info("You already have a Mount !");
      } else {
        NotificationManager.info("Transaction is failed!");
      }
    }
  };

  const onMintPetHandler = async (amount) => {
    if (!!walletAddress) {
      setMintLoading(true);
      let isHolder = await getIsWhiteList(walletAddress);
      if (isHolder > 0) {
        const { success, status } = await mintFreeNFT(
          walletAddress,
          setMintLoading,
          amount,
          3
        );
        if (success) {
          NotificationManager.success(
            "Congratulations. Pet is successfully minted!"
          );
        } else if (status.indexOf("insufficient fund") >= 0) {
          NotificationManager.info("You don't have enough eths to mint a Pet!");
        } else if (status.indexOf("presale is not open") >= 0) {
          NotificationManager.info("Presale is not open!");
        } else if (
          status.indexOf("this address is not whitelisted for the presale") >= 0
        ) {
          NotificationManager.info(
            "This address is not whitelisted for the presale!"
          );
        } else if (
          status.indexOf(
            "this address is not allowed to mint that many during the presale"
          ) >= 0
        ) {
          NotificationManager.info(
            "This address is not allowed to mint that many during the presale!"
          );
        } else if (status.indexOf("already minted") > 0) {
          NotificationManager.info("You already have a Pet !");
        } else {
          NotificationManager.info("Transaction is failed!");
        }
      } else {
        const { success, status } = await mintNFT(
          walletAddress,
          setMintLoading,
          amount,
          3
        );

        if (success) {
          NotificationManager.success(
            "Congratulations. Pet is successfully minted!"
          );
        } else if (status.indexOf("insufficient fund") >= 0) {
          NotificationManager.info("You don't have enough eths to mint a Pet!");
        } else if (status.indexOf("presale is not open") >= 0) {
          NotificationManager.info("Presale is not open!");
        } else if (
          status.indexOf("this address is not whitelisted for the presale") >= 0
        ) {
          NotificationManager.info(
            "This address is not whitelisted for the presale!"
          );
        } else if (
          status.indexOf(
            "this address is not allowed to mint that many during the presale"
          ) >= 0
        ) {
          NotificationManager.info(
            "This address is not allowed to mint that many during the presale!"
          );
        } else if (status.indexOf("already minted") > 0) {
          NotificationManager.info("You already have a Pet !");
        } else {
          NotificationManager.info("Transaction is failed!");
        }
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url('${back}')` }}>
        <TopMenu
          walletAddress={walletAddress}
          onConnectWalletHandler={onConnectWalletHandler}
        />{" "}
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                totalSupply={totalSupply}
                mintLoading={mintLoading}
                onMintCharacterHandler={onMintCharacterHandler}
                onMintMountHandler={onMintMountHandler}
                onMintPetHandler={onMintPetHandler}
              />
            }
          />{" "}
          <Route
            path="/inventory"
            element={
              <Inventory
                totalSupply={totalSupply}
                walletAddress={walletAddress}
              />
            }
          />{" "}
          <Route path="/wikipedia" element={<Wikipedia />} />{" "}
          <Route path="/marketplace" element={<MarketPlace />} />{" "}
        </Routes>
        <FooterComponent />
        <NotificationContainer />
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
