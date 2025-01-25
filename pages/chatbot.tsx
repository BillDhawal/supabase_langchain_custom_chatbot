import { useState } from "react";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";

export default function ChatbotPage() {
  const [apiKey, setApiKey] = useState("");

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <main className="container mx-auto p-4 min-h-screen bg-background">
      <nav className="mb-4 p-4 border border-accent bg-primary text-white rounded-md">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="hover:underline border border-accent px-2 py-1 rounded-md">
                Knowledge Base
              </a>
            </Link>
          </li>
          <li>
            <Link href="/chatbot" legacyBehavior>
              <a className="hover:underline border border-accent px-2 py-1 rounded-md">
                Chatbot
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-2xl font-bold mb-4 text-center font-sans">Chatbot</h1>
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
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={apiKey}
          onChange={handleApiKeyChange}
          required
        />
      </div>
      <Chatbot apiKey={apiKey} />
    </main>
  );
}
