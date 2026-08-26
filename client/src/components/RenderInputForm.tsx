import { FormEvent, useEffect, useMemo, useState } from "react";

import type { TemplateData, TemplateNode } from "@/functions/docxProcessor";

interface RenderInputFormProps {
  schema: TemplateNode[];
  onSubmitValues: (values: TemplateData) => Promise<void> | void;
}

interface ConditionValue {
  mode: "condition";
  enabled: boolean;
  fields: FormValues;
}

interface LoopValue {
  mode: "loop";
  items: FormValues[];
}

type FormValue = string | ConditionValue | LoopValue;
type FormValues = Record<string, FormValue>;

function labelFromTag(tag: string) {
  const label = tag.replace(/[_-]+/g, " ").trim();
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function createValues(schema: TemplateNode[]): FormValues {
  return schema.reduce<FormValues>((values, node) => {
    if (node.kind === "field") {
      values[node.name] = "";
    } else if (node.inverted || node.children.length === 0) {
      values[node.name] = { mode: "condition", enabled: false, fields: {} };
    } else {
      values[node.name] = { mode: "loop", items: [createValues(node.children)] };
    }
    return values;
  }, {});
}

function isComplete(schema: TemplateNode[], values: FormValues): boolean {
  return schema.every((node) => {
    const value = values[node.name];
    if (node.kind === "field") {
      return typeof value === "string" && value.trim().length > 0;
    }
    if (!value || typeof value === "string") return false;
    if (value.mode === "condition") {
      return !value.enabled || isComplete(node.children, value.fields);
    }
    return value.items.every((item) => isComplete(node.children, item));
  });
}

function toTemplateData(schema: TemplateNode[], values: FormValues): TemplateData {
  return schema.reduce<TemplateData>((data, node) => {
    const value = values[node.name];

    if (node.kind === "field") {
      data[node.name] = typeof value === "string" ? value : "";
      return data;
    }

    if (!value || typeof value === "string") return data;

    if (value.mode === "loop") {
      data[node.name] = value.items.map((item) => toTemplateData(node.children, item));
      return data;
    }

    if (node.inverted) {
      data[node.name] = !value.enabled;
      if (value.enabled) Object.assign(data, toTemplateData(node.children, value.fields));
    } else {
      data[node.name] = value.enabled
        ? node.children.length > 0
          ? toTemplateData(node.children, value.fields)
          : true
        : false;
    }

    return data;
  }, {});
}

interface NodeFieldsProps {
  schema: TemplateNode[];
  values: FormValues;
  onChange: (values: FormValues) => void;
  path?: string;
}

function NodeFields({ schema, values, onChange, path = "root" }: NodeFieldsProps) {
  const updateValue = (name: string, value: FormValue) => {
    onChange({ ...values, [name]: value });
  };

  return (
    <div className="fields-stack">
      {schema.map((node) => {
        const value = values[node.name];
        const nodePath = `${path}.${node.name}`;

        if (node.kind === "field") {
          return (
            <label className="field" key={nodePath}>
              <span>{labelFromTag(node.name)}</span>
              <input
                type="text"
                value={typeof value === "string" ? value : ""}
                onChange={(event) => updateValue(node.name, event.target.value)}
                placeholder={`Digite ${labelFromTag(node.name).toLowerCase()}`}
              />
            </label>
          );
        }

        const sectionValue: ConditionValue | LoopValue =
          value && typeof value !== "string"
            ? value
            : node.inverted
              ? { mode: "condition", enabled: false, fields: createValues(node.children) }
              : { mode: "loop", items: [createValues(node.children)] };

        const changeMode = (mode: "loop" | "condition") => {
          updateValue(
            node.name,
            mode === "loop"
              ? { mode, items: [createValues(node.children)] }
              : { mode, enabled: false, fields: createValues(node.children) },
          );
        };

        return (
          <section className="section-field" key={nodePath}>
            <div className="section-heading">
              <div>
                <strong>{labelFromTag(node.name)}</strong>
                <small>
                  Bloco {`{${node.inverted ? "^" : "#"}${node.name}} ... {/${node.name}}`}
                </small>
              </div>
              <select
                aria-label={`Tipo do bloco ${node.name}`}
                value={sectionValue.mode}
                onChange={(event) => changeMode(event.target.value as "loop" | "condition")}
              >
                {!node.inverted && <option value="loop">Lista (loop)</option>}
                <option value="condition">Condição</option>
              </select>
            </div>

            {sectionValue.mode === "condition" ? (
              <div className="condition-content">
                <label className="switch-row">
                  <input
                    type="checkbox"
                    checked={sectionValue.enabled}
                    onChange={(event) =>
                      updateValue(node.name, { ...sectionValue, enabled: event.target.checked })
                    }
                  />
                  <span>Exibir este bloco no documento</span>
                </label>
                {sectionValue.enabled && node.children.length > 0 && (
                  <NodeFields
                    schema={node.children}
                    values={sectionValue.fields}
                    path={`${nodePath}.condition`}
                    onChange={(fields) => updateValue(node.name, { ...sectionValue, fields })}
                  />
                )}
              </div>
            ) : (
              <div className="loop-content">
                {sectionValue.items.map((item, index) => (
                  <div className="loop-item" key={`${nodePath}.${index}`}>
                    <div className="loop-item-heading">
                      <span>Item {index + 1}</span>
                      <button
                        className="text-button danger"
                        type="button"
                        onClick={() =>
                          updateValue(node.name, {
                            ...sectionValue,
                            items: sectionValue.items.filter((_, itemIndex) => itemIndex !== index),
                          })
                        }
                      >
                        Remover
                      </button>
                    </div>
                    {node.children.length > 0 ? (
                      <NodeFields
                        schema={node.children}
                        values={item}
                        path={`${nodePath}.${index}`}
                        onChange={(nextItem) => {
                          const items = [...sectionValue.items];
                          items[index] = nextItem;
                          updateValue(node.name, { ...sectionValue, items });
                        }}
                      />
                    ) : (
                      <p className="empty-item">Este item repete apenas o conteúdo fixo do bloco.</p>
                    )}
                  </div>
                ))}
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() =>
                    updateValue(node.name, {
                      ...sectionValue,
                      items: [...sectionValue.items, createValues(node.children)],
                    })
                  }
                >
                  + Adicionar item
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default function RenderInputForm({ schema, onSubmitValues }: RenderInputFormProps) {
  const [values, setValues] = useState<FormValues>(() => createValues(schema));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(createValues(schema));
  }, [schema]);

  const complete = useMemo(() => isComplete(schema, values), [schema, values]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!complete || submitting) return;
    setSubmitting(true);
    try {
      await onSubmitValues(toTemplateData(schema, values));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="template-form" onSubmit={handleSubmit}>
      <NodeFields schema={schema} values={values} onChange={setValues} />
      <div className="form-footer">
        {!complete && schema.length > 0 && <span>Preencha os campos visíveis para continuar.</span>}
        <button className="primary-button" type="submit" disabled={!complete || submitting}>
          {submitting ? "Gerando…" : "Gerar documento"}
        </button>
      </div>
    </form>
  );
}
