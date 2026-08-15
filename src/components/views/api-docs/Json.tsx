import { Fragment } from "react";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const Q = String.fromCharCode(34);

function StringVal({ value }: { value: string }) {
  return (
    <span className="text-json-string">
      {Q}
      {value}
      {Q}
    </span>
  );
}

function NumberVal({ value }: { value: number }) {
  return <span className="text-json-number">{value}</span>;
}

function BoolVal({ value }: { value: boolean }) {
  return <span className="text-json-number">{String(value)}</span>;
}

function NullVal() {
  return <span className="text-muted">null</span>;
}

function Val({ value }: { value: JsonValue }) {
  if (typeof value === "string") return <StringVal value={value} />;
  if (typeof value === "number") return <NumberVal value={value} />;
  if (typeof value === "boolean") return <BoolVal value={value} />;
  if (value === null) return <NullVal />;
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-muted">[]</span>;
    return (
      <>
        <span className="text-muted">[</span>
        {value.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="text-muted">,</span>}
            <span className="block pl-4">
              <Val value={item} />
            </span>
          </Fragment>
        ))}
        <span className="text-muted">]</span>
      </>
    );
  }
  const keys = Object.keys(value);
  if (keys.length === 0) return <span className="text-muted">{"{}"}</span>;
  return (
    <>
      <span className="text-muted">{"{"}</span>
      {keys.map((key, i) => (
        <Fragment key={key}>
          {i > 0 && <span className="text-muted">,</span>}
          <span className="block pl-4">
            <span className="text-json-key">
              {Q}
              {key}
              {Q}
            </span>
            <span className="text-muted">: </span>
            <Val value={value[key]} />
          </span>
        </Fragment>
      ))}
      <span className="text-muted">{"}"}</span>
    </>
  );
}

export default function Json({ data }: { data: JsonValue }) {
  return (
    <pre className="overflow-x-auto code-scroll p-4 font-mono text-sm leading-relaxed">
      <Val value={data} />
    </pre>
  );
}
