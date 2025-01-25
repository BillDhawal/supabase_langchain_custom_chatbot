import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

const createRetriever = (openAIApiKey: string, supabaseUrl: string, supabaseApiKey: string) => {
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  const client = createClient(supabaseUrl, supabaseApiKey);

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  return vectorStore.asRetriever();
};

export { createRetriever };