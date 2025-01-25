import { useState } from "react";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";

export default function ChatbotPage() {
  const [apiKey, setApiKey] = useState("");
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseApiKey, setSupabaseApiKey] = useState("");

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSupabaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupabaseUrl(e.target.value);
  };

  const handleSupabaseApiKeyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupabaseApiKey(e.target.value);
  };

  return (
    <main className="container mx-auto p-4">
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-blue-500 hover:underline">Knowledge Base</a>
            </Link>
          </li>
          <li>
            <Link href="/chatbot" legacyBehavior>
              <a className="text-blue-500 hover:underline">Chatbot</a>
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-2xl font-bold mb-4">Chatbot Page</h1>
      <div className="mb-4">
        <label
          htmlFor="apiKey"
          className="block text-sm font-medium text-gray-700"
        >
          OpenAI API Key
        </label>
        <input
          type="password"
          id="apiKey"
          name="apiKey"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={apiKey}
          onChange={handleApiKeyChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="supabaseUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Supabase URL
        </label>
        <input
          type="text"
          id="supabaseUrl"
          name="supabaseUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={supabaseUrl}
          onChange={handleSupabaseUrlChange}
          required
        />
      </div>
      <div className="mb-4">
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
          value={supabaseApiKey}
          onChange={handleSupabaseApiKeyChange}
          required
        />
      </div>
      <Chatbot
        apiKey={apiKey}
        supabaseUrl={supabaseUrl}
        supabaseApiKey={supabaseApiKey}
      />
    </main>
  );
}
