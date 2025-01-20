"use client";
import Modal from "../app/components/Modal";
import Card from "../app/components/Card";
import { useEffect, useState } from "react";

export default function App() {
  const [records, setRecords] = useState([]);

  // Function to load records from localStorage
  const loadRecords = () => {
    const storedRecords = JSON.parse(localStorage.getItem("records") || "[]");
    setRecords(storedRecords);
  };

  // Function to delete a record by index
  const deleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
  };

  // Load records when the component mounts
  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-8 sm:p-20">
      <h1 className="text-2xl font-bold">Notes for my Typos</h1>
      <h1 className="text-sm font-serif">Cuz Yassou would LOVE to point out my mistakes</h1>
      {/* Pass loadRecords as a prop to Modal */}
      <Modal reloadRecords={loadRecords} />
      <div className="flex flex-wrap gap-4 justify-center">
        {records.map((record, index) => (
          <Card
            key={index}
            typo={record.typo}
            context={record.context}
            onDelete={() => deleteRecord(index)} // Pass deleteRecord as a prop
          />
        ))}
      </div>
    </div>
  );
}
