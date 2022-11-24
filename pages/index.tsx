import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Chain, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { id } from "ethers/lib/utils.js";

const binanceChain: Chain = {
  id: 97,
  name: "Binance",
  network: "binance",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BinanceTestnet",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [binanceChain],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Home: NextPage = () => {
  const [BUSD, setBUSD] = useState<any>();
  const [NEP, setNEP] = useState<any>();

  const handleChange = (e: any) => {
    const nep: any = e.target.value;
    setBUSD(e.target.value);
    setNEP(Number(nep) / 3);
  };

  const handle = (e: any) => {
    const busd = e.target.value;
    setNEP(e.target.value);
    setBUSD(Number(busd) * 3);
  };

  const getChain = async () => {
    const chainId = ethers.providers.getDefaultProvider();
    console.log(chainId);
  };

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <h1>Welcome to React Task</h1>
          <ConnectButton />
          <form>
            <br></br>
            <br></br>
            <label>
              Enter your amount in BUSD:
              <input type="number" value={BUSD} onChange={handleChange} />
            </label>

            <br></br>
            <br></br>
            <label>
              Enter your amount in NEP:
              <input type="number" value={NEP} onChange={handle} />
            </label>
          </form>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Home;
