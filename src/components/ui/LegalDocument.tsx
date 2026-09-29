import type { LegalBlock, LegalChapter, LegalDocumentSection } from "../../types/legal";

const LegalTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => {
  return (
    <>
      <div className="my-6 hidden overflow-x-auto md:block">
        <table className="w-full min-w-160 border-collapse text-start text-sm">
          <thead>
            <tr className="bg-surface-muted">
              {headers.map((header) => (
                <th
                  key={header}
                  className="border border-border px-4 py-3 font-heading font-semibold text-brand"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")} className="align-top">
                {row.map((cell, index) => (
                  <td
                    key={`${row[0]}-${index}`}
                    className="border border-border px-4 py-3 font-body text-text-secondary"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-6 space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.join("|")}
            className="rounded-lg border border-border bg-surface-subtle p-4"
          >
            {row.map((cell, index) => (
              <div
                key={`${row[0]}-${headers[index]}`}
                className={
                  index > 0 ? "mt-3 border-t border-border pt-3" : ""
                }
              >
                <p className="font-body text-xs font-semibold text-brand">
                  {headers[index]}
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-text-secondary">
                  {cell}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const Block = ({ block }: { block: LegalBlock }) => {
  if (block.type === "paragraph") {
    return (
      <p className="font-body text-base leading-relaxed text-text-secondary">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 ps-5 font-body text-base leading-relaxed text-text-secondary">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <LegalTable headers={block.headers} rows={block.rows} />;
};

const Chapter = ({ chapter }: { chapter: LegalChapter }) => {
  const Heading = chapter.level === 3 ? "h3" : "h2";

  return (
    <section id={`section-${chapter.id}`}>
      <Heading
        className={
          chapter.level === 3
            ? "mb-3 font-heading text-lg font-semibold text-text"
            : "mb-4 font-heading text-2xl font-bold text-text sm:text-3xl"
        }
      >
        {chapter.heading}
      </Heading>
      <div className="space-y-4">
        {chapter.blocks.map((block, index) => (
          <Block
            key={`${chapter.id}-${block.type}-${index}`}
            block={block}
          />
        ))}
      </div>
    </section>
  );
};

const LegalDocument = ({ document }: { document: LegalDocumentSection }) => {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <h1 className="font-heading text-4xl font-bold leading-tight text-text sm:text-5xl">
        {document.title}
      </h1>
      <div className="mt-4 space-y-1 font-body text-sm text-text-muted">
        {document.effectiveDate ? <p>{document.effectiveDate}</p> : null}
        {document.lastUpdated ? <p>{document.lastUpdated}</p> : null}
      </div>
      <div className="mt-8 h-1 w-16 bg-brand" />

      <div className="mt-10 space-y-10">
        {(document.chapters ?? []).map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </article>
  );
};

export default LegalDocument;
