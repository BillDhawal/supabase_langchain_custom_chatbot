"use client";

import { useState } from "react";
import { submitKnowledgeBase } from "@/utils/submitKnowledgeBase";

export default function KnowledgeBaseForm() {
  const [formData, setFormData] = useState({
    knowledgeBase: "",
    supabaseUrl: "",
    supabaseApiKey: "",
    openAiApiKey: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    localStorage.setItem("openAiApiKey", formData.openAiApiKey); // Save API key to localStorage
    await submitKnowledgeBase(formData);
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
          The knowledge base is submitted successfully.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="knowledgeBase"
            className="block text-sm font-medium text-gray-700"
          >
            Knowledge Base
          </label>
          <textarea
            id="knowledgeBase"
            name="knowledgeBase"
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.knowledgeBase}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="supabaseUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Supabase URL
          </label>
          <input
            type="password"
            id="supabaseUrl"
            name="supabaseUrl"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.supabaseUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="supabaseApiKey"
            className="block text-sm font-medium text-gray-700"
          >
            Supabase API Key
          </label>
          <input
            type="password"
            id="supabaseApiKey"
            name="supabaseApiKey"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.supabaseApiKey}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="openAiApiKey"
            className="block text-sm font-medium text-gray-700"
          >
            OpenAI API Key
          </label>
          <input
            type="password"
            id="openAiApiKey"
            name="openAiApiKey"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={formData.openAiApiKey}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Knowledge Base
          </button>
        </div>
      </form>
    </div>
  );
}