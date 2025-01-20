import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({ reloadRecords }) {
  const Typo = useRef(null);
  const Context = useRef(null);

  const addTypo = () => {
    const typo = Typo.current.value.trim();
    const context = Context.current.value.trim();
  
    if (!typo || !context) {
      // Show a toast notification
      toast.error("Fill both fields.", {
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className:"toast",
        theme: "colored", // Optional: Choose between "colored", "light", or "dark"
      });
      return;
    }
  
    const newRecord = { typo, context };
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    storedRecords.push(newRecord);
    localStorage.setItem("records", JSON.stringify(storedRecords));
  
    Typo.current.value = "";
    Context.current.value = "";
  
    closeModal();
    reloadRecords();
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.close();
  };

  return (
    <div>
    <button className="btn bg-[#fd2d57] text-white" onClick={openModal}>
      Add
    </button>

    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-xl">
        <h3 className="font-bold text-lg">Add a Typo</h3>
        <input
          type="text"
          ref={Typo}
          placeholder="Typo goes here"
          className="input input-bordered input-primary w-full max-w-lg h-11 my-2"
        />
        <input
          type="text"
          ref={Context}
          placeholder="Context goes here"
          className="input input-bordered input-primary w-full max-w-lg h-11 my-2"
        />
        <div className="modal-action">
          <button className="btn " onClick={addTypo}>
            Add Typo
          </button>
        </div>
      </div>
    </dialog>

    {/* Add the ToastContainer */}
    <ToastContainer />
  </div>
  );
}
