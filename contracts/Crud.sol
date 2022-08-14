pragma solidity 0.8.15;


contract Crud {
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId=0;

    function createUser (string memory _name) public {
      User memory user =User(nextId,_name);
      users.push(user);
      nextId++;

    }

    function read (uint _id)  view external  returns (uint, string memory)  {
     uint i = find (_id);
    return (users[i].id, users[i].name);
        
     }
    
    function update (uint _id, string memory _name)  external  {
     uint i = find (_id);
     users[i].name = _name;
                    
     
    }

   
   function deleteUser (uint _id) external  {
    uint i = find (_id);
    delete users[i];
   }


  function find (uint id) internal view returns (uint){
         for (uint i=0; i<users.length;i++){
        if (users[i].id==id){
            return i;
        }
        revert ("User does not exist");
     }
  }
}