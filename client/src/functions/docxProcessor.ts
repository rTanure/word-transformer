import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module";
import PizZip from "pizzip";

export interface TemplateField {
  kind: "field";
  name: string;
}

export interface TemplateSection {
  kind: "section";
  name: string;
  inverted: boolean;
  children: TemplateNode[];
}

export type TemplateNode = TemplateField | TemplateSection;
export type TemplateData = Record<string, unknown>;

interface StructuredTag {
  type?: string;
  value?: string;
  module?: string;
  inverted?: boolean;
  dataBound?: boolean;
  subparsed?: StructuredTag[];
}

function mergeNodes(target: TemplateNode[], additions: TemplateNode[]): TemplateNode[] {
  const merged = [...target];

  additions.forEach((addition) => {
    const existingIndex = merged.findIndex((node) => node.name === addition.name);

    if (existingIndex === -1) {
      merged.push(addition);
      return;
    }

    const existing = merged[existingIndex];
    if (existing.kind === "section" && addition.kind === "section") {
      merged[existingIndex] = {
        ...existing,
        children: mergeNodes(existing.children, addition.children),
      };
    } else if (addition.kind === "section") {
      merged[existingIndex] = addition;
    }
  });

  return merged;
}

function tagsToNodes(tags: StructuredTag[]): TemplateNode[] {
  return tags.reduce<TemplateNode[]>((nodes, tag) => {
    if (tag.type !== "placeholder" || tag.dataBound === false || !tag.value) {
      return nodes;
    }

    const node: TemplateNode =
      tag.module === "loop"
        ? {
            kind: "section",
            name: tag.value,
            inverted: Boolean(tag.inverted),
            children: tagsToNodes(tag.subparsed ?? []),
          }
        : { kind: "field", name: tag.value };

    return mergeNodes(nodes, [node]);
  }, []);
}

export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}

export async function getTemplateSchema(template?: File | null): Promise<TemplateNode[]> {
  if (!template) return [];

  const templateBuffer = await template.arrayBuffer();
  const inspectModule = new InspectModule();
  const zip = new PizZip(templateBuffer);

  new Docxtemplater(zip, {
    modules: [inspectModule],
    paragraphLoop: true,
    linebreaks: true,
  });

  const tags = inspectModule.getAllStructuredTags() as StructuredTag[];
  return tagsToNodes(tags);
}

export async function jsonToDocx(data: TemplateData, template: File): Promise<Blob> {
  const templateBuffer = await template.arrayBuffer();
  const zip = new PizZip(templateBuffer);
  const document = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  document.render(data);
  return document.getZip().generate({ type: "blob" });
}
