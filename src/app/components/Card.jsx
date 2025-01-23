import { MdDeleteForever } from "react-icons/md";

export default function Card(props) {
  return (
    <div className="card bg-[#bc2b48] w-80 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-white">{props.typo}</h2>
        <p className="text-white">{props.context}</p>
        <p className="text-white">{props.id}</p>
        <div className="card-actions justify-end">
          <button
            onClick={props.onDelete} // Call the onDelete function
          >
            <MdDeleteForever color="white"/>
          </button>
        </div>
      </div>
    </div>
  );
}
