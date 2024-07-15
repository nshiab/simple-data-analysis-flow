import { CardTitle } from "../ui/card"
import Spinner from "./Spinner"

export default function CardTitleWithLoader({
  loader,
  children,
}: {
  loader: boolean
  children: any
}) {
  return (
    <div className="flex gap-x-2 items-center">
      <CardTitle>{children}</CardTitle>
      <Spinner show={loader} />
    </div>
  )
}
