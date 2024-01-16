import React, { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items:center;
  flex-direction: column;
  margin: 20px;
  font-family: 'Times New Roman', Times, serif;
  
`;

const MultiSelectContainer = styled.div`
//   background:yellow;

width:min(900px, 90vw);
  border-bottom:5px solid blue;
`;

const SearchInput = styled.div`
diplay:flex;
align-items:center;
position:relative;
input{
  padding: 5px;
  margin-bottom: 5px;
  outline:none;
  border:none;
  font-size:1.2rem;
  padding:.5rem 1rem;
}
`;

const SelectedUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
  min-height: 30px;
`;

const UserChip = styled.div`
  background-color: #e0e0e0;
  display: flex;
  justify-content:space-around;
  align-items:center;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius:2rem;
  border-width: 2px;
border-style: solid;
  border-color: ${(props) => (props.highlite==='highlite' ? 'blue' : 'transparent')};
  img{
    width:2.4rem;
    height:2.4rem;
    border-radius:2rem;
    margin-right:.5rem;
  }
  span{
    padding:0px .5rem;
  }
`;

const RemoveIcon = styled.span`
  margin: .5rem;
  cursor: pointer;
`;

const Dropdown = styled.div`
border-radius:5px;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  max-height: min(80vw,45vh);
  overflow-y: auto;
  box-shadow:2px 2px 10px black;
`;

const DropdownItem = styled.div`
  padding: .5rem 0rem;
  cursor: pointer;
  display:flex;
  justify-content:space-around;
  align-items:center;
  width:min(90vw,400px);
  img{
    width:3rem;
    height:3rem;
    border-radius:2.5rem;
    margin-right:.5rem;
  }
  span{
    padding-left:1rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserSelectionComponent = () => {
  const [allUsers,setAllUsers]=useState([{name:'username1',imgurl:'./images/user1.jpg',email:'user1@email.com'},
  {name:'username2',imgurl:'./images/user2.jpg',email:'user2@email.com'},{name:'username3',imgurl:'./images/user3.jpg',email:'user3@email.com'},
  {name:'username4',imgurl:'./images/user4.jpg',email:'user4@email.com'},{name:'username5',imgurl:'./images/user5.jpg',email:'user5@email.com'},
  {name:'username6',imgurl:'./images/user6.jpg',email:'user6@email.com'}]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isHighlited,setHighlite]=useState(false);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setIsDropdownVisible(true);
    setHighlite(false);
  };

  const handleUserClick = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchInput('');
      setIsDropdownVisible(false);
      setHighlite(false);
    }
  };

  const handleRemoveUser = (userToRemove) => {
    const updatedUsers = selectedUsers.filter((user) => user.name !== userToRemove);
    setSelectedUsers(updatedUsers);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 8 || event.key === 'Backspace') {
      if(isHighlited===true){
        setHighlite(!isHighlited);
          setSelectedUsers(selectedUsers.slice(0, -1));
      }
        else
        setHighlite(!isHighlited);
    }
  };

  return (
    <Container>
        <h1>Pick Users</h1>
      <MultiSelectContainer>
      <SelectedUsersContainer>
          {selectedUsers.map((user,ind) => (
            <UserChip key={ind} highlite={(ind===selectedUsers.length - 1 )&& isHighlited ? 'highlite':'no-highlite'}>
              <img src={user.imgurl}/>
             <span> {user.name} </span>
              <RemoveIcon onClick={() => handleRemoveUser(user.name)}>x</RemoveIcon>
            </UserChip>
          ))}

        <SearchInput>
        <input
          type="text"
          placeholder="Add new user..."
          value={searchInput}
          onKeyDown={handleKeyPress}
          onFocus={()=>setIsDropdownVisible(true)}
          onChange={handleSearchChange}
        />
       
        {isDropdownVisible && (
          <Dropdown>
            {allUsers
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchInput.toLowerCase()) &&
                  !selectedUsers.includes(user)
              )
              .map((user,ind) => (
                <DropdownItem key={ind} onClick={() => handleUserClick(user)}>
                    <span>
              <img src={user.imgurl}/>
                  <span> {user.name} </span>
                  </span>
              <span>{user.email}</span>
                </DropdownItem>
              ))}
          </Dropdown>
        )}
         </SearchInput>
        </SelectedUsersContainer>
      </MultiSelectContainer>
    </Container>
  );
};

export default  UserSelectionComponent;