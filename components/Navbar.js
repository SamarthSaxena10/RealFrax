// components/Navbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Logo } from ".";
import { Fade } from "react-awesome-reveal";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [account, setAccount] = useState(null);

  const toggleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  const refMenu = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (refMenu.current) {
        if (refMenu.current.contains(e.target)) {
          return;
        }
      }
      closeMenu();
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = async () => {
    const chainId = "mantra"; // Replace with your chain ID
    const rpcEndpoint = "https://rpc.hongbai.mantrachain.io"; // Replace with your RPC endpoint

    const chainConfig = {
      chainId: chainId,
      chainName: "Mantra Chain",
      rpc: rpcEndpoint,
      rest: "https://api.hongbai.mantrachain.io", // Replace with your REST endpoint if available
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "mantra",
        bech32PrefixAccPub: "mantrapub",
        bech32PrefixValAddr: "mantravaloper",
        bech32PrefixValPub: "mantravaloperpub",
        bech32PrefixConsAddr: "mantravalcons",
        bech32PrefixConsPub: "mantravalconspub",
      },
      currencies: [
        {
          coinDenom: "MANTRA",
          coinMinimalDenom: "uom",
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "MANTRA",
          coinMinimalDenom: "uom",
          coinDecimals: 6,
        },
      ],
      stakeCurrency: {
        coinDenom: "MANTRA",
        coinMinimalDenom: "uom",
        coinDecimals: 6,
      },
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    };

    try {
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain(chainConfig);
        await window.keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        setAccount(shortenAddress(accounts[0].address));
      } else {
        alert("Please install the Keplr extension");
      }
    } catch (error) {
      console.error("Failed to connect Keplr:", error);
      alert(
        "Failed to connect Keplr. Please check the console for more details."
      );
    }
  };

  return (
    <div className="py-4 relative">
      <Container className={"flex justify-between items-center"}>
        <Logo />
        <div className="hidden sm:block">
          <ContentSidebar
            toggleMenu={toggleMenu}
            handleConnectWallet={handleConnectWallet}
            account={account}
          />
        </div>
        <div className="block sm:hidden cursor-pointer">
          <Image
            onClick={toggleMenu}
            src="/icons/menu.svg"
            alt="menu"
            width={30}
            height={30}
          />
        </div>
        {menu && width < 640 && (
          <Fade
            duration={300}
            delay={100}
            className="rounded-b-3xl absolute py-20 top-0 flex justify-center items-center  left-0 right-0 bg-[#000000E6] z-20"
          >
            <div ref={refMenu}>
              <ContentSidebar
                toggleMenu={toggleMenu}
                handleConnectWallet={handleConnectWallet}
                account={account}
              />
            </div>
          </Fade>
        )}
      </Container>
    </div>
  );
};

const ContentSidebar = ({ toggleMenu, handleConnectWallet, account }) => {
  return (
    <div className="items-center flex-col sm:flex-row flex">
      <Link href="/#home">
        <a
          onClick={toggleMenu}
          className="mb-3 sm:mb-0 mt-4 sm:mt-0 ml-0 sm:ml-7"
        >
          Home
        </a>
      </Link>
      <Link href="https://fractionalize-nft.vercel.app/deposit-nft">
        <a onClick={toggleMenu} className="mb-3 sm:mb-0 ml-0 sm:ml-7">
          Deposit NFT
        </a>
      </Link>
      <Link href="https://fractionalize-nft.vercel.app/fraction">
        <a
          onClick={toggleMenu}
          className="mb-3 sm:mb-0 ml-0 sm:ml-7 mr-0 sm:mr-7"
        >
          Fractionalize NFT
        </a>
      </Link>
      <Link href="https://fractionalize-nft.vercel.app/distribute">
        <a
          onClick={toggleMenu}
          className="mb-3 sm:mb-0 ml-0 sm:ml-7 mr-0 sm:mr-7"
        >
          Distribute
        </a>
      </Link>
      <Link href="https://fractionalize-nft.vercel.app/withdraw">
        <a
          onClick={toggleMenu}
          className="mb-3 sm:mb-0 ml-0 sm:ml-7 mr-0 sm:mr-7"
        >
          Withdraw NFT
        </a>
      </Link>
      <Link href="https://fractionalize-nft.vercel.app/claim">
        <a
          onClick={toggleMenu}
          className="mb-3 sm:mb-0 ml-0 sm:ml-7 mr-0 sm:mr-7"
        >
          Claim Rewards
        </a>
      </Link>
      <Button variant={"primary"} onClick={handleConnectWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default Navbar;
