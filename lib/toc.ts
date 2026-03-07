// lib/toc.ts

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
  children: TocItem[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractToc(content: string): TocItem[] {
  if (!content) return [];

  const regex = /^(#{2,4})\s+(.+)$/gm;
  const flat: TocItem[] = [];
  let m: RegExpExecArray | null;

  while ((m = regex.exec(content)) !== null) {
    const level = m[1].length as 2 | 3 | 4;
    const text = m[2].replace(/[*_`[\]]/g, "").trim();
    if (!text) continue;
    flat.push({ id: slugify(text), text, level, children: [] });
  }

  const root: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const item of flat) {
    item.children = [];
    while (stack.length && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }
    if (!stack.length) {
      root.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }
    stack.push(item);
  }

  return root;
}