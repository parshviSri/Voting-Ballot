This is a Dapp for voting ballot. It is developed for voting of Mister of magic using Solidity, Next.js and styled by tailswind.
There are two profile the chairperson - who is conducting the election in our case current misiter of magic and he has responsibilties like adding voter counting votes and calling winner. the chair person is th one who deploy the application.
The other account is the Voter who can just vote if he is resgistered.

Installtion process:
1. npm i 
2. npm i hardhat
3. npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
4. npm i tailswind

Run the application
1. Configure Metamask Wallet
2. npm hardhat run scripts/deploy.js --network localhost
3. npm hardhat node
4. npm run dev
![Screenshot of app in local environment](https://user-images.githubusercontent.com/71806138/165582866-425e74f6-b3d4-444f-993f-21a19f3c28d3.png)

