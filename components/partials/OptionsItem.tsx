export default function OptionsItem({
  smallMargin,
  children,
}: {
  smallMargin: boolean;
  children: any;
}) {
  return (
    <div
      className={`flex items-center space-x-2 ${smallMargin ? "my-2" : "my-4"}`}
    >
      {children}
    </div>
  );
}
