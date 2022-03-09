import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ContractABI from './utils/WavePortal.json';
import './App.css';

export default function App() {
    /*
     * Just a state variable we use to store our user's public wallet.
     */
    const [currentAccount, setCurrentAccount] = useState('');
    const contractABI = ContractABI.abi;
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = typeof window !== undefined && window;

            if (!ethereum) {
                console.log('Make sure you have metamask Installed!');
                return;
            } else {
                console.log('We have the ethereum object', ethereum);
            }

            /*
             * Check if we're authorized to access the user's wallet
             */
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorized account:', account);
                setCurrentAccount(account);
            } else {
                console.log('No authorized account found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    /* 
    Implement your connect wallet logic here
    */
    const connectWallet = async () => {
        try {
            const { ethereum } = typeof window !== undefined && window;
            if (!ethereum) {
                console.log('Make sure you have Metamask Installed');
                return;
            }

            const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected', account);
            setCurrentAccount(account);
        } catch (error) {
            console.error(error);
        }
    };

    const wave = async () => {
        try {
            const { ethereum } = typeof window !== undefined && window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const waveTxn = await wavePortalContract.wave();
                console.log('Mining ---> ', waveTxn.hash);

                await waveTxn.wait();
                console.log('Mined --->', waveTxn.hash);

                let count = await wavePortalContract.getTotalWaves();
                console.log('Retrieved total wave count...', count.toNumber());
            } else {
                console.log('Ethereum Object does not exist!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                    <span role="img" aria-label="wave">
                        👋{' '}
                    </span>
                    Hey there!
                </div>
                <div className="bio">I am Yuhcee and I am learning about blockchain and cryptocurrencies. That's pretty cool right? Connect your Ethereum(Metamask) wallet and wave at me!</div>
                <button className="waveButton" onClick={wave}>
                    Wave at Me
                </button>
                {!currentAccount && (
                    <button className="waveButton" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    );
}
