

import Web3 from 'web3';
import Crud from '../../build/contracts/Crud.json';

let web3;
let crud;
let accounts =[];

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

  //--------------------------------------------------------------- 
  //connecting the createUser fn() to the frontend.
  const $create=document.getElementById("create");
  const $createResult=document.getElementById("create-result");
 web3.eth.getAccounts()
 .then(_accounts=>{
  accounts=_accounts;
 })

$create.addEventListener('submit',(e) =>{
  e.preventDefault();
  crud.methods.createUser(e.target.elements[0].value).send({from:accounts[0]})
  .then( ()=>$createResult.innerHTML= ` User ${e.target.elements[0].value} created!`)
.catch (()=>{
  $createResult.innerHTML= ` Error!`
})
})

//----------------------------------------------------------------------------
//connecting the read fn() ot the frontend.

const $read = document.getElementById("read");
const $readResult = document.getElementById("read-result");

$read.addEventListener('submit', (e) =>{
  e.preventDefault();
  let result = e.target.elements[0].value;
  crud.methods.read(result).call()
  .then(receipt=>$readResult.innerHTML=` id:${receipt[0]} name: ${receipt[1]}`)
  .catch(() => {
     $readResult.innerHTML= "Error, enter a valid id!!"
  })

})
//----------------------------------------------------------------------------
//connecting the update fn() ot the frontend.

const $update = document.getElementById("edit");
const $updateResult = document.getElementById("edit-result");

$update.addEventListener('submit', (e) =>{
  e.preventDefault();
  let id=e.target.elements[0].value;
  let name=e.target.elements[1].value;
    crud.methods.update(id,name).send({from:accounts[0]})
    .then(()=>$updateResult.innerHTML=`id ${id} updated to ${name}`)
    .catch(()=>{
      console.log (` Error while updating the selected id`)
    })
})

//----------------------------------------------------------------------------
//connecting the update fn() ot the frontend.
const $delete = document.getElementById("delete");
const $deleteResult = document.getElementById("delete-result");

$delete.addEventListener('submit', (e) =>{
  e.preventDefault();
  let result = e.target.elements[0].value;
  crud.methods.deleteUser(result).send({from:accounts[0]})
  .then(()=>$deleteResult.innerHTML=` user: deleted!`)
  .catch(() => {
     $deleteResult.innerHTML= "Error, enter a valid id!!"
  })

})

//----------------------------------------------------------------------------
//connecting the getCount fn() ot the frontend.

const $count = document.getElementById("count");
const $countButton = document.getElementById("press");

$countButton.addEventListener('click',() =>{

crud.methods.getCount().call()
.then (receipt =>$count.innerHTML=`${receipt[0]}`)

})















}

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
})


