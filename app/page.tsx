import Link from "next/link";
import ClientKnowledgeBaseForm from "@/components/ClientKnowledgeBaseForm";

export default function Home() {
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
      <h1 className="text-2xl font-bold mb-4">Knowledge Base Submission</h1>
      <ClientKnowledgeBaseForm />
    </main>
  );
}
