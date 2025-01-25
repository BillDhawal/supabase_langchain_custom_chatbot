"use client";

import { useState, useEffect } from "react";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createRetriever } from "@/utils/retriever";
import { combineDocuments } from "@/utils/combineDocuments";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

import { formatConvHistory } from "../utils/formatConvHistory";

const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
conversation history: {conv_history}
question: {question} 
standalone question:`;
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about Scrimba based on the context provided and the conversation history. Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@kapaAI.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
context: {context}
conversation history: {conv_history}
question: {question}
answer (in detail): `;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

export default function Chatbot({
  apiKey,
  supabaseUrl,
  supabaseApiKey,
}: {
  apiKey: string;
  supabaseUrl: string;
  supabaseApiKey: string;
}) {
  const [convHistory, setConvHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chatbotConversation = document.getElementById(
      "chatbot-conversation-container"
    );
    const question = userInput;
    setUserInput("");

    // add human message
    const newHumanSpeechBubble = document.createElement("div");
    newHumanSpeechBubble.classList.add("speech", "speech-human");
    chatbotConversation.appendChild(newHumanSpeechBubble);
    newHumanSpeechBubble.textContent = question;
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

    const llm = new ChatOpenAI({
      openAIApiKey: apiKey,
      maxTokens: 1500,
      temperature: 0.5,
    });
    const retriever = createRetriever(apiKey, supabaseUrl, supabaseApiKey);

    const standaloneQuestionChain = standaloneQuestionPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
    ]);

    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history,
      },
      answerChain,
    ]);

    const response = await chain.invoke({
      question: question,
      conv_history: formatConvHistory(convHistory),
    });

    setConvHistory([...convHistory, question, response]);

    // add AI message
    const newAiSpeechBubble = document.createElement("div");
    newAiSpeechBubble.classList.add("speech", "speech-ai");
    chatbotConversation.appendChild(newAiSpeechBubble);
    newAiSpeechBubble.textContent = response;
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
  };

  return (
    <section className="chatbot-container">
      <div className="chatbot-header"></div>
      <div
        className="chatbot-conversation-container"
        id="chatbot-conversation-container"
      ></div>
      <form
        id="form"
        className="chatbot-input-container"
        onSubmit={handleSubmit}
      >
        <input
          name="user-input"
          type="text"
          id="user-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-4 text-lg border rounded-md"
          required
        />
        <button id="submit-btn" className="submit-btn">
          Send
        </button>
      </form>
    </section>
  );
}