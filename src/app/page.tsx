"use client";
import Modal from "../app/components/Modal";
import Card from "../app/components/Card";
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function App() {
  interface Record {
    id:number;
    typo: string;
    context: string;
  }
  const [records, setRecords] = useState<Record[]>([]);

   // Function to load records from the database
   const loadRecords = async () => {
    try {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) throw error;

      setRecords(data || []);
    } catch (error) {
      if (error instanceof Error){
        console.error("Error loading records:", error.message);
      }
      
    }
  };

  // Function to delete a record by index
  const deleteRecord = async (id: number) => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      // Refresh records after deletion
      loadRecords();
    } catch (error) {
      if(error instanceof Error){
        console.error("Error deleting record:", error.message);
      }
    }
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
        {records.map((record, index:number) => (
          <Card
            id={record.id}
            key={index}
            typo={record.typo}
            context={record.context}
            onDelete={() => deleteRecord(record.id)} // Pass deleteRecord as a prop
          />
        ))}
      </div>
    </div>
  );
}
