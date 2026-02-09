import KnowledgeList from "./knowledgeList"

async function getKnowledge() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,
      { cache: "no-store" }
    );
    
    if (!res.ok) {
      console.error('Failed to fetch knowledge items');
      return { items: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    return { items: [] };
  }
}

export default async function DashboardPage() {
  const data = await getKnowledge();
  const items = data.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Second Brain
          </h1>
          <p className="text-xl text-slate-600">
            Explore your collection of knowledge, insights, and saved links
          </p>
        </div>

        <KnowledgeList items={items} />
      </div>
    </div>
  );
}
