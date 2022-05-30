import Head from 'next/head';
import Image from 'next/image'
// import theme from './theme.mp3'
import styles from '../styles/Home.module.css'
import {ethers} from 'ethers';
import { useEffect, useState,useRef } from 'react';
import ballot from '../artifacts/contracts/Ballot.sol/Ballot.json';
import Confetti from 'react-confetti';
const candidates=[{
  name: "Harry Potter",
  qualification:"Head Auror,Department of Magical Law Enforcement",
  description:"Harry potter, also known as The Chosen One ",
  image:'/Harrypotter.jpeg'
},
{
  name: "Ron",
  qualification:"Auror,Department of Magical Law Enforcement",
  description:"Ron Weasley, also known as the Side One",
  image:'/RonWs.jpeg'

},
{
  name: "Hermione",
  qualification:"Department for the Regulation and Control of Magical Creatures and  Magical Law Enforcement",
  description:"Hermione Granger, also known as the brightest witch of the century",
  image:'/Hermione.jpeg'
},
{
  name: "Luna",
  qualification:"Department for the Regulation and Control of Magical Creatures",
  description:"Luna Lovegood, also known as the traveller or weird one",
  image:'/Luna.jpeg'
}
]
export default function Home() {
  const ref = useRef([]);
  const chairpersonAddress= "0x7Fe0E7Fe50dBDF687d9568843A92E874c0C4Eda5";
  const[voterAccount,setVoterAccount] = useState('');
  const[errorMessage,setErrorMessage] = useState('');
  const [successMessage,setSuccessmessage] =useState('');
  const[succ,setSucc]= useState(false);
  const[isOwner,setOwner] = useState(false);
  const voterList=["0xE37E815ccB1708b95FE8314c996A52f6b02A478c","0x56DDDb6D9cDcC9F0B313cB9EeE54647e8c53F13a"]
  useEffect(()=>{
    
    connectWallet();

  },[]);
  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
        

      });
    }
  });
 
  
  const connectWallet = async() =>{
    if(window.ethereum){
      const accounts = await window.ethereum.request({method:"eth_accounts"});
      if(accounts.length>0){
        setVoterAccount(accounts[0]+'')

      }
      else{
        let account = await window.ethereum.request({method:"eth_requestAccounts"});
        setVoterAccount(account[0]+'')

        

      }
      //  checkVotingRights();
    }
    else{
      console.log("Connect Your wand!!")
    }
  }
  const checkVotingRights = async() =>{
    try{
      const accounts = await window.ethereum.request({method:"eth_accounts"});

      const contractAddress="0x922a7B066a9F0682e48f8108e728AaB8C0e2b8dE";
     
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer  = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,ballot.abi,signer);
    let voterRight =await contract.rightToVote(voterList[0]);
     voterRight =await contract.rightToVote(voterList[1]);

    console.log(voterRight);
    }
    catch(error){
      setSuccessmessage('');
      if(error.data){
        setErrorMessage(error.data.message.split('string')[1]);

      }
    }

    

  }
  const vote = async(id) =>{
    try{
      const contractAddress="0x922a7B066a9F0682e48f8108e728AaB8C0e2b8dE";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer  = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,ballot.abi,signer);
    await contract.vote(id);
    setErrorMessage('');
    setSucc(true)
    setSuccessmessage("You voted !!")
    }
    catch(error){
      setSuccessmessage('');

      if(error.data){
        setErrorMessage(error.data.message.split('string')[1]);

      }
    }
    
  }
  const winner = async() =>{
    try{
      const contractAddress="0x922a7B066a9F0682e48f8108e728AaB8C0e2b8dE";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer  = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,ballot.abi,signer);
    await contract._winingProposal();
    console.log('in _winner');
    callWinner();
    }
    catch(error){
      setSuccessmessage('');

      if(error.data){
        setErrorMessage(error.data.message.split('string')[1]);

      }
    }
    
    
  }
  const callWinner = async() =>{
    try{
      const contractAddress="0x922a7B066a9F0682e48f8108e728AaB8C0e2b8dE";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer  = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,ballot.abi,signer);
    let win = await contract.winner();
    console.log(win);
    // party.confetti(ref.main)
    setSucc(true)
     
    setSuccessmessage(win[0]);

    }
    catch(error){
      setSuccessmessage('');
      setSucc(false)

      if(error.data){
        setErrorMessage(error.data.message.split('string')[1]);

      }
    }
    
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ministry of magic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mm.png" />
             </Head>

     {!isOwner&& <main >
       {succ&&<Confetti
      width={1200}
      height={1200}
    />}

      {!succ&&<div className='flex justify-center border-b bg-yellow-500 p-6 text-red-500 text-2xl'>{errorMessage}</div>}
        {succ&& <div className='flex justify-center border-b bg-yellow-500 p-6 text-green-500 text-2xl'>{successMessage} won !!</div>}
        <button onClick={winner}className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded' >Winner</button>

      

        <div className='h-14 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 mt-6'>
        <marquee> <h1 className='flex justify-center text-2xl'>
          Vote for Your Next Minister of Magic !!
        </h1></marquee>
        
        </div>
        <div className='container outline-black'>
          <div className="border bg-white grid grid-row-1 grid-flow-col gap-1 m-2 p-6  shadow-2xl rounded">
        {candidates.map((candidate,index)=>{
          return(
            <div key ={index} className="outline-pink-700">
              <div className="outline-pink-700">
                <Image src={candidate.image} width={200} height={200} className="object-cover"></Image>
              </div>
              <div className='justify-center font-mono text-2xl hover:italic text-orange-400'>
              <p className='p-6'>{candidate.name}</p>
              <p className='p-6 text-orange-500'>{candidate.qualification}</p>
              <p className='p-6 text-orange-700'>{candidate.description}</p>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{vote(index)}}>Vote</button>
              </div>
              

            </div>
            
          )
        })}
        </div>
        </div>

        

       </main>}
       {isOwner&&<main>
        <canvas id="my-canvas"></canvas>
       <div className='h-14 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 mt-6'>
        <marquee> <h1 className='flex justify-center text-2xl'>
          Welcome chairpersonAddress Hagrid !!
        </h1></marquee>
        
        </div>
        <div>
          Do you want to know who is winning right now?
          <button onClick={winner}className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded'>Winner</button>
        </div>
         </main>}
      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}
