

import Web3 from 'web3';
import Crud from '../../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi, 
    Crud
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $create=document.getElementById("create");
  const $createResult=document.getElementById("create-result");
 let accounts =[];
 web3.ethereum.getAccounts()
 .then(_accounts=>{
  accounts=_accounts;
 })


$create.addEventListener('submit',(e) =>{
  e.preventDefault();
  crud.methods.createUser(e.target.elements[0].value).send({from:accounts[0]})
  .then( ()=>$createResult.innerHTML= ` User ${e.target.elements[0].value} created!`)
}).catch (()=>{
  $createResult.innerHTML= ` Error!`
})
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
})


}; 