export type ActionStyle = "fighting" | "heroic" | "dramatic" | "comedy";

const STYLE_BASE = "comic book art style, bold black ink outlines, dynamic composition, vibrant colors, professional illustration, high quality";

const BNB_CHARACTER = "a superhero character with a golden diamond-shaped head (the Binance BNB logo rotated 45 degrees), angry determined eyes, muscular green body with purple cape, golden boots";

const ACTION_STYLES: Record<ActionStyle, string> = {
  fighting: "intense action scene, dynamic punch, speed lines, impact explosion effects, debris flying, KA-POW text effect",
  heroic: "heroic dramatic pose, cape flowing in wind, standing tall, power aura glowing, dramatic lighting from below",
  dramatic: "dramatic cinematic close-up, intense expression, dark moody atmosphere, rain or storm, emotional tension",
  comedy: "funny comedic scene, exaggerated cartoon expressions, chibi moment, sweat drops, comedic timing",
};

export function buildPanelPrompt(params: {
  theme: string;
  action: ActionStyle;
  panelIndex: number;
  totalPanels: number;
  dialogue?: string;
}): string {
  const { theme, action, panelIndex, totalPanels, dialogue } = params;

  // Create narrative progression for multi-panel stories
  const narrativePhase = getNarrativePhase(panelIndex, totalPanels);

  const parts = [
    STYLE_BASE,
    BNB_CHARACTER,
    ACTION_STYLES[action],
    `scene: ${theme}`,
    narrativePhase,
  ];

  if (dialogue) {
    parts.push(`with speech bubble saying: "${dialogue}"`);
  }

  return parts.join(", ");
}

function getNarrativePhase(index: number, total: number): string {
  if (total === 1) return "single dramatic splash page, full scene";

  const ratio = index / (total - 1);

  if (ratio === 0) {
    return "opening establishing shot, wide angle, setting the scene, calm before action";
  } else if (ratio < 0.5) {
    return "tension building, medium shot, confrontation begins, anticipation";
  } else if (ratio < 1) {
    return "climax action moment, extreme close-up or dynamic angle, peak intensity";
  } else {
    return "resolution finale shot, aftermath, triumphant or dramatic conclusion";
  }
}

export function buildNegativePrompt(): string {
  return "photorealistic, 3d render, photograph, blurry, low quality, deformed, ugly, bad anatomy, watermark, text, words, letters, poorly drawn, amateur";
}
