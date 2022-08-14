const Crud = artifacts.require ("Crud");
let crud;

contract ("Crud", () =>{
    beforeEach(async ()=>{
        crud = await Crud.deployed();
    })

    it ("creates a new user", async()=>{
         await crud.createUser("Pete");
         let result = await crud.read(1);                             // Since I defined the nextId ar in the contract as 1, the indexing of the users array starts at 1 , not at 0
        
         assert(result[0].toNumber()===1, "the user created mathces the one ,saved in the contract");
         assert(result[1]==="Pete");
    })

    it ("Returns the selected user", async()=>{
        await crud.createUser("Pete");
        let result = await crud.read(1);                             
       
        assert(result[0].toNumber()===1, "User match the required one");
        assert(result[1]==="Pete");
   })

   it ("Updates the selected user", async()=>{
    await crud.createUser("Pete");
    let update = await crud.update(1,"Mike"); 
    let comparison = await crud.read(1);                            

    assert(comparison[1]==="Mike", "User property got updated");
})

   it ("removes the selected user", async () =>{
    
    await crud.createUser("Pete");
    await crud.deleteUser(1);
    try{
    await crud.read(1);
    }
    catch (error) {
        assert(error.message.includes("User does not exist"))
        return;
    }
    assert (false);
   

   })

   it ("should not update non-existing user", async() =>{
     try {
        await crud.update(5,"Sam");
     }
     catch(e){
        assert(e.message.includes("User does not exist"))
        return;
     }
     assert(false)
   })
})