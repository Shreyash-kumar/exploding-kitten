import { useDispatch, useSelector } from "react-redux";
import { changeLeaderBoard } from "../utils/gameSlice";

const LeaderBoard = () => {
  const openLeaderBoard = useSelector((store) => store.game.openLeaderBoard);
  const dispatch = useDispatch();

  let leaderboard = useSelector((state) => state.game.registeredUsers);

  //leaderboard.sort((a, b) => b.score - a.score);
  let topFive = leaderboard.slice(0, 5);

  if (!openLeaderBoard) return null;
  return (
    <div className="fixed h-screen w-screen z-10">
      <div className="fixed z-15 w-[50%] top-[30%] left-[25%] bg-[#242424] shadow-2xl border-[2px] border-black">
        <div className="flex justify-between mt-4 ml-4 mr-4">
          <div className="text-xl font-bold">LeaderBoard</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              dispatch(changeLeaderBoard());
            }}
          >
            X
          </div>
        </div>
        <div className="mt-4 ml-4 mr-4 mb-4">
          <h2 className="text-lg mb-2">Scores</h2>
          <ul>
            {topFive.map((entry, index) => (
              <li key={index} className="mb-1">
                {entry.name}: {entry.score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
