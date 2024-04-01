import { useEffect, useState } from "react";
import Card from "./Card";
import { cards } from "../constants/constant";
import useGenerateCards from "../hooks/useGenerateCards";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../utils/gameSlice";

const Body = () => {
  const currentUser = useSelector((store) => store.game.currentUser);
  const allUsers = useSelector((store) => store.game.registeredUsers);
  const dispatch = useDispatch();
  

  const [cardNum, setCardNum] = useState(5);
  const [resultText, setResultText] = useState(null);
  const [cardArray, setCardArray] = useState(useGenerateCards());
  const [gameScore, setGameScore] = useState(0);
  const [noOfDifuse, setNoOfDifuse] = useState(0);


  const getCurrentUserScore = () =>{
    const user = allUsers.find(user => user.name === currentUser);
    return user ? user.score : null;
  }




  const currentUserScore = getCurrentUserScore();

  const weightedRandom = (choices, weights) => {
    let totalWeight = 0;
    for (const weight of weights) {
      totalWeight += weight;
    }

    const randomNumber = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    for (let i = 0; i < choices.length; i++) {
      accumulatedWeight += weights[i];
      if (randomNumber <= accumulatedWeight) {
        return choices[i];
      }
    }
  };

  const generateCards = () => {
    const weights = [10, 5, 0.5, 3];

    const newDeck = [];
    for (let i = 0; i < 5; i++) {
      newDeck.push(weightedRandom(cards, weights));
    }
    //console.log(newDeck);

    return newDeck;
  };

  const handleButtonClick = () => {
    let firstElement = cardArray[cardNum - 1];
    cardArray.pop();
    //console.log(firstElement + cardArray.length);
    setCardArray(cardArray);
    //console.log("card array is-" + cardArray);

    if (firstElement === cards[1]) {
      //Difuse
      setNoOfDifuse(noOfDifuse + 1);
    } else if (firstElement === cards[3]) {
      // Exploding kitten
      if (noOfDifuse > 0) {
        setNoOfDifuse(noOfDifuse - 1);
      } else {
        setResultText("You drew " + firstElement + " you lose😞");
        setCardNum(5);
        setCardArray(generateCards());
        return;
      }
    } else if (firstElement === cards[2]) {
      // Shuffle
      setResultText("You drew " + firstElement + "you have to start again");
      setNoOfDifuse(0);
      setCardNum(5);
      setCardArray(generateCards());
      return;
    }

    if (cardNum > 1) {
      setResultText("You drew " + firstElement);
      setCardNum(cardNum - 1);
    } else {
      setResultText("You drew " + firstElement + ". Yay!! you won🥳");
      setCardArray(generateCards());
      setNoOfDifuse(0);
      setGameScore(gameScore + 1);
      dispatch(updateUserScore({"userName": currentUser, "score": currentUserScore + 1}));
      setCardNum(5);
    }
  };

  useEffect(() => {
    //console.log(cardArray);
    //console.log(currentUser);
    //console.log("score is " + currentUserScore);
    setGameScore(currentUserScore);
  }, []);

  return (
    <div>
      <div className="ml-[85%] text-lg font-semibold">
        <h1>{`No of Difuse available: ${noOfDifuse}`}</h1>
        <h1>{`Score :  ${gameScore}`}</h1>
      </div>
      <div className="flex justify-evenly mt-10">
        {cardArray.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
      <div className="mt-60 flex justify-around">
        <h1>{resultText}</h1>
      </div>
      <div className="mt-5 flex justify-around">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleButtonClick}
        >
          Draw a Card!!
        </button>
      </div>
    </div>
  );
};

export default Body;
