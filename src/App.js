import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

export default function App() {
    /*
     * Just a state variable we use to store our user's public wallet.
     */
    const [currentAccount, setCurrentAccount] = useState('');

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
                <button className="waveButton" onClick={''}>
                    Wave at Me
                </button>
            </div>
        </div>
    );
}
