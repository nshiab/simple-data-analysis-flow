export default function Error({ error }: { error: null | string }) {
  return (
    error && (
      <div>
        <p className={`my-4 text-red-500`}>{error}</p>
      </div>
    )
  );
}
