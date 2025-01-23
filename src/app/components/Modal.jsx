import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../lib/supabaseClient";

export default function Modal({ reloadRecords }) {
  const Typo = useRef(null);
  const Context = useRef(null);

  const addTypo = async () => {
    const typo = Typo.current.value.trim();
    const context = Context.current.value.trim();

    if (!typo || !context) {
      // Show a toast notification
      toast.error("Fill both fields.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      // Insert the typo and context into the Supabase database
      const { error } = await supabase.from("blogs").insert([{ typo, content: context }]);

      if (error) {
        throw new Error(error.message);
      }

      // Clear input fields
      Typo.current.value = "";
      Context.current.value = "";

      // Close the modal and reload records
      closeModal();
      reloadRecords();

      // Show a success toast notification
      toast.success("Typo added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      // Show an error toast notification
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
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
