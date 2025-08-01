"use client";

import { Concept } from "@/lib/mongodb/schema";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  updateConceptExplanation,
  addConceptExample,
  updateConceptExample,
  deleteConceptExample,
} from "@/lib/subjects/actions";

export default function List({
  concepts,
  teacher,
}: {
  concepts: Concept[];
  teacher: string;
}) {
  const [selected, setSelected] = useState<ObjectId>();
  const [localConcepts, setLocalConcepts] = useState<Concept[]>(concepts);
  const [editingExplanation, setEditingExplanation] = useState(false);
  const [editingExample, setEditingExample] = useState<string | null>(null);
  const [addingExample, setAddingExample] = useState(false);
  const [explanationText, setExplanationText] = useState("");
  const [exampleText, setExampleText] = useState("");

  const selectedConcept = localConcepts.find((c) => c._id == selected);

  const handleUpdateExplanation = async () => {
    if (!selectedConcept) return;

    try {
      await updateConceptExplanation(selectedConcept._id.toString(), explanationText);
      setLocalConcepts((prev) =>
        prev.map((concept) =>
          concept._id == selected
            ? { ...concept, explanation: explanationText }
            : concept
        )
      );
      setEditingExplanation(false);
    } catch (error) {
      console.error("Failed to update explanation:", error);
    }
  };

  const handleAddExample = async () => {
    if (!selectedConcept || !exampleText.trim()) return;

    try {
      await addConceptExample(selectedConcept._id.toString(), exampleText);
      setLocalConcepts((prev) =>
        prev.map((concept) =>
          concept._id == selected
            ? { ...concept, examples: [...(concept.examples || []), exampleText] }
            : concept
        )
      );
      setAddingExample(false);
      setExampleText("");
    } catch (error) {
      console.error("Failed to add example:", error);
    }
  };

  const handleUpdateExample = async (oldExample: string) => {
    if (!selectedConcept || !exampleText.trim()) return;

    try {
      await updateConceptExample(selectedConcept._id.toString(), oldExample, exampleText);
      setLocalConcepts((prev) =>
        prev.map((concept) =>
          concept._id == selected
            ? {
                ...concept,
                examples: concept.examples?.map((ex) =>
                  ex === oldExample ? exampleText : ex
                ) || []
              }
            : concept
        )
      );
      setEditingExample(null);
      setExampleText("");
    } catch (error) {
      console.error("Failed to update example:", error);
    }
  };

  const handleDeleteExample = async (example: string) => {
    if (!selectedConcept) return;

    try {
      await deleteConceptExample(selectedConcept._id.toString(), example);
      setLocalConcepts((prev) =>
        prev.map((concept) =>
          concept._id == selected
            ? {
                ...concept,
                examples: concept.examples?.filter((ex) => ex !== example) || []
              }
            : concept
        )
      );
    } catch (error) {
      console.error("Failed to delete example:", error);
    }
  };

  const startEditingExplanation = () => {
    setExplanationText(selectedConcept?.explanation || "");
    setEditingExplanation(true);
  };

  const startEditingExample = (example: string) => {
    setExampleText(example);
    setEditingExample(example);
  };

  const startAddingExample = () => {
    setExampleText("");
    setAddingExample(true);
  };

  return (
    <div className="px-[5%] pb-[10%] flex">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">Concepts</h1>
        <div className="grid grid-cols-3 gap-4">
          {localConcepts?.map((concept) => (
            <div
              key={concept._id.toString()}
              onClick={() => setSelected(concept._id)}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{concept.name}</h2>
              <p className="text-sm text-gray-600">{concept.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky top-3 w-px bg-gray-300 mx-8 my-3"></div>

      <div className=" w-1/3 gap-y-4">
        <h1 className="text-2xl font-bold mb-4">Details</h1>
        {selectedConcept ? (
          <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{selectedConcept.name}</h2>
            <div className="flex gap-x-4 opacity-60">
              <div className="flex flex-col mb-2">
                <p>{selectedConcept.examples?.length || 0} examples</p>
              </div>
              <div className="flex mb-1">
                <p>{selectedConcept.explanation?.length || 0} characters</p>
              </div>
            </div>
            <hr className="my-2" />

            <div className="flex flex-col mb-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-l font-bold">Explanation</h2>
                {!editingExplanation && (
                  <button
                    onClick={startEditingExplanation}
                    className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                    title="Edit explanation"
                  >
                    <FontAwesomeIcon icon={faEdit} size="sm" />
                  </button>
                )}
              </div>
              {editingExplanation ? (
                <div className="space-y-2">
                  <textarea
                    value={explanationText}
                    onChange={(e) => setExplanationText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded resize-none"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateExplanation}
                      className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                      title="Save"
                    >
                      <FontAwesomeIcon icon={faSave} size="sm" />
                    </button>
                    <button
                      onClick={() => setEditingExplanation(false)}
                      className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                      title="Cancel"
                    >
                      <FontAwesomeIcon icon={faTimes} size="sm" />
                    </button>
                  </div>
                </div>
              ) : (
                <p>{selectedConcept.explanation}</p>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-l font-bold">Examples</h2>
                <button
                  onClick={startAddingExample}
                  className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                  title="Add example"
                >
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </button>
              </div>
              {selectedConcept.examples?.map((example) => (
                <div key={example} className="group flex items-center justify-between mb-1">
                  {editingExample === example ? (
                    <div className="flex-1 space-y-2">
                      <input
                        value={exampleText}
                        onChange={(e) => setExampleText(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateExample(example)}
                          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                          title="Save"
                        >
                          <FontAwesomeIcon icon={faSave} size="xs" />
                        </button>
                        <button
                          onClick={() => setEditingExample(null)}
                          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                          title="Cancel"
                        >
                          <FontAwesomeIcon icon={faTimes} size="xs" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="flex-1">{example}</p>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditingExample(example)}
                          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} size="xs" />
                        </button>
                        <button
                          onClick={() => handleDeleteExample(example)}
                          className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} size="xs" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {addingExample && (
                <div className="space-y-2">
                  <input
                    value={exampleText}
                    onChange={(e) => setExampleText(e.target.value)}
                    placeholder="Enter new example..."
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddExample}
                      className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                      title="Add"
                    >
                      <FontAwesomeIcon icon={faSave} size="xs" />
                    </button>
                    <button
                      onClick={() => setAddingExample(false)}
                      className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer"
                      title="Cancel"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <hr className="my-2" />
          </div>
        ) : (
          <p>Click a concept from the left side to view</p>
        )}
      </div>
      <Link
        href={`${teacher}/new`}
        className="fixed bottom-0 right-0 m-4 inline-block bg-primary text-white px-4 py-2 rounded-full"
      >
        +
      </Link>
    </div>
  );
}

