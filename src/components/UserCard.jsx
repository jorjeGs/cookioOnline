import { FaHeart } from "react-icons/fa";

const UserCard = ({ name, imgSrc, likes }) => {
    return (
        <div className="user-card w-3/4 flex bg-[#584022] max-h-72 rounded-2xl mx-auto justify-between items-center p-5">
            <div className="w-1/2">
                <img src={imgSrc} alt="user" className=" w-3/4 max-h-44 mx-auto rounded-full" />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center gap-8">
                <h1 className="text-white text-5xl font-bold">{name}</h1>
                <div className="flex flex-row justify-center items-center text-5xl">
                    <FaHeart className="text-yellow-500" />
                    <p className="text-white mx-4">{likes}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard;