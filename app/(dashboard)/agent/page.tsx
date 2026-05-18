import { AgentTester } from "@/components/AgentTester";

export const metadata = {
  title: "Shadow IT Agent Test",
  description: "Test the autonomous Shadow IT Detection Agent pipeline.",
};

export default function AgentPage() {
  return (
    <div className="flex flex-col gap-6 p-6 h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Shadow IT Agent</h1>
        <p className="text-zinc-400">
          Simulate the autonomous agent analyzing signal events from email, OAuth, and DNS.
        </p>
      </div>
      
      <div className="flex-1">
        <AgentTester />
      </div>
    </div>
  );
}
