// figmaApi.ts
export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  document: FigmaNode;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: FigmaFill[];
  strokes?: FigmaFill[];
  effects?: FigmaEffect[];
  cornerRadius?: number;
  characters?: string;
  style?: FigmaTextStyle;
}

export interface FigmaFill {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
}

export interface FigmaEffect {
  type: string;
  radius?: number;
}

export interface FigmaTextStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
}

export async function getFigmaFile(fileKey: string, accessToken: string): Promise<FigmaFile> {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': accessToken,
    },
  });

  if (!response.ok) {
    throw new Error('Figma API 요청 실패. Access Token 및 File Key를 확인하세요.');
  }

  return await response.json();
}

export function extractColors(node: FigmaNode, colors: Set<string> = new Set()): string[] {
  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
        colors.add(hex);
      }
    });
  }
  if (node.children) {
    node.children.forEach(child => extractColors(child, colors));
  }
  return Array.from(colors);
}

export function extractTextStyles(node: FigmaNode, styles: Map<string, FigmaTextStyle> = new Map()): FigmaTextStyle[] {
  if (node.type === 'TEXT' && node.style) {
    const key = `${node.style.fontFamily}-${node.style.fontSize}-${node.style.fontWeight}`;
    if (!styles.has(key)) {
      styles.set(key, node.style);
    }
  }
  if (node.children) {
    node.children.forEach(child => extractTextStyles(child, styles));
  }
  return Array.from(styles.values());
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
