
import { useDispatch, useSelector } from "react-redux";
import { changeLeaderBoard, changeUserRegistered } from "../utils/gameSlice";

const Header = () => {
  const isRegistered = useSelector((store) => store.game.userRegistered);
  const dispatch = useDispatch();
 

  const handleHomepageClick = () => {
    dispatch(changeUserRegistered(null));
  }

  const handleLeaderBoardClick = () => {
    dispatch(changeLeaderBoard());
  }

  return (
    <div className="flex justify-between m-4">
      <div className="inline-flex text-2xl">
        <p className="">😺</p>
        <h1 className="font-bold">Exploding Kitten</h1>
      </div>
      <div>
        <button className="ml-2 border-2 border-[#74AA9C] rounded-lg px-1.5 py-1 text-[#74AA9C] cursor-pointer hover:bg-[#74AA9C] hover:text-[#d0e2dd]" onClick={handleLeaderBoardClick}>
          {"Leaderboard"}
        </button>
        {
           isRegistered && 
          <button className="ml-2 border-2 border-[#74AA9C] rounded-lg px-1.5 py-1 text-[#74AA9C] cursor-pointer hover:bg-[#74AA9C] hover:text-[#d0e2dd]" onClick={handleHomepageClick}>
            {"Homepage"}
          </button>
        }
      </div>
    </div>
  );
};

export default Header;
