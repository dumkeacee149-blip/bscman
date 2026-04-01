import { buildComicPrompt, buildNegativePrompt, type ActionStyle } from "./prompts";

const API_KEY = process.env.DASHSCOPE_API_KEY;
const BASE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis";

interface GenerateParams {
  theme: string;
  panels: number;
  action: ActionStyle;
  dialogue?: string;
}

interface TaskResponse {
  output: {
    task_id: string;
    task_status: string;
    results?: Array<{ url: string }>;
  };
  request_id: string;
}

// Submit image generation task
async function submitTask(prompt: string, negativePrompt: string): Promise<string> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "X-DashScope-Async": "enable",
    },
    body: JSON.stringify({
      model: "wanx-v1",
      input: {
        prompt,
        negative_prompt: negativePrompt,
      },
      parameters: {
        size: "1024*1024",
        n: 1,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error: ${response.status} - ${errText}`);
  }

  const data: TaskResponse = await response.json();
  return data.output.task_id;
}

// Poll for task result
async function pollTask(taskId: string, maxRetries = 60): Promise<string[]> {
  const pollUrl = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`;

  for (let i = 0; i < maxRetries; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const response = await fetch(pollUrl, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    if (!response.ok) continue;

    const data: TaskResponse = await response.json();
    const status = data.output.task_status;

    if (status === "SUCCEEDED" && data.output.results) {
      return data.output.results.map((r) => r.url);
    }
    if (status === "FAILED") {
      throw new Error("Image generation failed");
    }
  }

  throw new Error("Generation timed out");
}

export async function generateComic(params: GenerateParams): Promise<string[]> {
  const prompt = buildComicPrompt(params);
  const negativePrompt = buildNegativePrompt();

  const taskId = await submitTask(prompt, negativePrompt);
  const urls = await pollTask(taskId);

  return urls;
}
