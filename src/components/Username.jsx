import{ useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, changeUserRegistered } from "../utils/gameSlice";

const Username = () => {
    const username = useRef();
    const registeredUsers = useSelector((store) => store.game.registeredUsers);
    const dispatch = useDispatch();
  
    const handleClick = () => {
      const userName = username.current.value.trim();
      if(userName.length === 0) return ;

      if (registeredUsers.some(user => user.name === userName)) {
          // Username exists, continue to next page
          dispatch(changeUserRegistered(userName));
        } else {
          // Username doesn't exist, add to store and navigate
          //console.log('New entry');
          dispatch(addNewUser(userName));
          dispatch(changeUserRegistered(userName));
      }
  
    }
  
    return (
      <div>
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-transparent bg-opacity-80 rounded-lg text-white"
            action=""
          >
            <h1>Enter username to start game</h1>
            <input
              ref={username}
              className="p-3 my-4 w-full rounded-sm bg-gray-800"
              type="text"
              placeholder="Username"
            />
            <button className="px-4 py-2 text-white bg-blue-500 rounded" onClick={handleClick}>
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
}

export default Username;
