import cardImg from "../assets/cardImg.jpg";


const Card = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-32 h-48 flex flex-col justify-between">
            <img className="my-auto" src={cardImg} alt="" />
    </div>
  )
}

export default Card
