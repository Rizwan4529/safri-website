import { Navigate } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import type { LegalDocumentSection } from "../../types/legal";
import LegalDocument from "../ui/LegalDocument";

type LegalPageProps = {
  pageId: "privacy" | "terms";
};

const LegalPage = ({ pageId }: LegalPageProps) => {
  const { getSection } = useContent();
  const document = getSection<LegalDocumentSection>(pageId, "document");

  if (!document?.title || !(document.chapters?.length ?? 0)) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-surface">
      <LegalDocument document={document} />
    </main>
  );
};

export default LegalPage;
