import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PromptGenerator() {
  const [goal, setGoal] = useState("");
  const [taskType, setTaskType] = useState([]);
  const [outputFormat, setOutputFormat] = useState("");
  const [tone, setTone] = useState("");
  const [context, setContext] = useState("");
  const [examples, setExamples] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");

  const taskOptions = ["Writing", "Analysis", "Coding", "Design", "Education", "Business", "Research"];
  const toneOptions = ["Professional", "Academic", "Friendly", "Persuasive", "Concise", "Creative", "Technical", "Humorous"]

  const toggleTaskType = (task) => {
    setTaskType((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const generatePrompt = () => {
    const taskList = taskType.join(", ");
    const prompt = `You are a [role/expert] helping with: ${goal}. I need you to perform the following task(s): ${taskList}. Present the output as: ${outputFormat}, in a ${tone} tone.\n\nHere’s the context: ${context}.\n\nIf helpful, use this example or format as reference: ${examples}`;
    setFinalPrompt(prompt);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧠 Prompt Generator</h1>

      <Input placeholder="Goal (e.g., Create a piano lesson plan)" value={goal} onChange={(e) => setGoal(e.target.value)} />

      <div>
        <label className="font-semibold">Task Type(s):</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {taskOptions.map((task) => (
            <label key={task} className="flex items-center space-x-2">
              <Checkbox checked={taskType.includes(task)} onChange={() => toggleTaskType(task)} />
              <span>{task}</span>
            </label>
          ))}
        </div>
      </div>

      <Input placeholder="Output Format (e.g., Bullet points, Paragraph)" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} />

      <Input placeholder="Style/Tone (e.g., Friendly, Technical)" value={tone} onChange={(e) => setTone(e.target.value)} />

      <Textarea placeholder="Context (e.g., target audience, reference material)" value={context} onChange={(e) => setContext(e.target.value)} />

      <Textarea placeholder="Example (optional format/sample)" value={examples} onChange={(e) => setExamples(e.target.value)} />

      <Button onClick={generatePrompt}>Generate Prompt</Button>

      {finalPrompt && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">🎯 Generated Prompt:</h2>
          <pre className="whitespace-pre-wrap text-sm">{finalPrompt}</pre>
        </div>
      )}
    </div>
  );
}