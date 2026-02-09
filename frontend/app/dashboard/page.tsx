import KnowledgeList from "./knowledgeList"

async function getKnowledge() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function DashboardPage() {
  const items = await getKnowledge();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Your Second Brain</h1>

      <KnowledgeList items={items} />
    </div>
  );
}
