const ContentLoading = () => {
  return (
    <div className="flex min-h-svh items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
        <p className="font-body text-sm text-text-secondary">Loading Safri…</p>
      </div>
    </div>
  );
};

export default ContentLoading;
