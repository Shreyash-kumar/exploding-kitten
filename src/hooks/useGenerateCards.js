import { cards } from "../constants/constant";


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
  }

const useGenerateCards = () => {
    const weights = [10, 5, 0.5, 3];  

    const newDeck = [];
    for (let i = 0; i < 5; i++) {
    newDeck.push(weightedRandom(cards, weights));
    }

    return newDeck;
};

export default useGenerateCards;
