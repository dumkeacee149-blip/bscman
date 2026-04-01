import { buildPanelPrompt, type ActionStyle } from "./prompts";

const API_KEY = process.env.DASHSCOPE_API_KEY;
const BASE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis";
const POLL_URL = "https://dashscope.aliyuncs.com/api/v1/tasks";

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
}

async function submitTask(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("DASHSCOPE_API_KEY not configured");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "X-DashScope-Async": "enable",
    },
    body: JSON.stringify({
      model: "wanx2.1-t2i-turbo",
      input: { prompt },
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

async function pollTask(taskId: string, maxRetries = 30): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const response = await fetch(`${POLL_URL}/${taskId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    if (!response.ok) continue;

    const data: TaskResponse = await response.json();
    const status = data.output.task_status;

    if (status === "SUCCEEDED" && data.output.results) {
      return data.output.results[0].url;
    }
    if (status === "FAILED") {
      throw new Error("Image generation failed");
    }
  }

  throw new Error("Generation timed out");
}

export async function generateComic(params: GenerateParams): Promise<string[]> {
  const { theme, panels, action, dialogue } = params;

  // Generate each panel individually in parallel
  const panelPromises = Array.from({ length: panels }, (_, i) => {
    const prompt = buildPanelPrompt({
      theme,
      action,
      panelIndex: i,
      totalPanels: panels,
      dialogue: i === Math.floor(panels / 2) ? dialogue : undefined,
    });

    return submitTask(prompt).then((taskId) => pollTask(taskId));
  });

  const urls = await Promise.all(panelPromises);
  return urls;
}
