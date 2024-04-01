import {  useSelector } from "react-redux";
import Body from "./components/Body";
import Header from "./components/Header";
import Username from "./components/Username";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  const isRegistered = useSelector((store) => store.game.userRegistered);
  return (
    <>
      <Header />
      <LeaderBoard />
      {
        !isRegistered ? <Username /> : <Body />
      }
    </>
  );
}

export default App;
