const STYLE_PREFIX = `a full comic book page with multiple panels arranged in grid layout, traditional hand-painted watercolor and india ink on paper, visible wet watercolor washes and brush strokes texture, thick bold black ink outlines, cross-hatching shading, large bold colorful hand-lettered onomatopoeia sound effects (KA-POW WHAM CRASH), round speech bubbles with handwritten dialogue text, ink splatter and drip effects, gritty underground indie comic zine art style, vibrant saturated watercolors, dark black panel borders dividing the page into sequential panels, similar style to ScubaSteve comic art`;

const BNB_CHARACTER = `the main character is a cartoon mascot that looks exactly like this: imagine the Binance BNB diamond logo (a golden yellow square rotated 45 degrees to look like a diamond) but ALIVE as a character - this single large diamond shape IS both the head AND body, with an angry cartoon face painted on it (narrow angry eyes with a frown), two buff muscular GREEN-colored arms with fists coming out of the left and right sides of the diamond, two muscular GREEN-colored legs with black boots coming from the bottom, the diamond body is GOLDEN YELLOW colored, the character wears no clothes just has a gold diamond body with green limbs, similar to how SpongeBob is a sponge with limbs or how the Solana logo was turned into a cartoon character with arms and legs in crypto comics`;

export type ActionStyle = "fighting" | "heroic" | "dramatic" | "comedy";

const ACTION_PROMPTS: Record<ActionStyle, string> = {
  fighting: "intense combat scene, punching, action lines, impact effects, VA-POW text effects, debris flying",
  heroic: "heroic pose, cape flowing, standing on mountain peak, dramatic lighting, power aura",
  dramatic: "dramatic close-up, intense expression, rain falling, dark stormy background, emotional scene",
  comedy: "funny situation, exaggerated expressions, comedic timing, chibi style moments, sweat drops",
};

export function buildComicPrompt(params: {
  theme: string;
  panels: number;
  action: ActionStyle;
  dialogue?: string;
}): string {
  const { theme, panels, action, dialogue } = params;

  const parts = [
    STYLE_PREFIX,
    BNB_CHARACTER,
    ACTION_PROMPTS[action],
    `${panels}-panel comic page layout`,
    `scene theme: ${theme}`,
  ];

  if (dialogue) {
    parts.push(`speech bubbles with text: "${dialogue}"`);
  }

  parts.push("black background border between panels, professional comic book page");

  return parts.join(", ");
}

export function buildNegativePrompt(): string {
  return "photorealistic, 3d render, photograph, blurry, low quality, deformed, ugly, bad anatomy, watermark, signature, jpeg artifacts, poorly drawn";
}
