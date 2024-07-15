import { Dispatch, SetStateAction, useRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import OptionsItem from "./OptionsItem";
import { Button } from "../ui/button";

export default function OptionsTextArea({
  label,
  set,
}: {
  label: string;
  set: Dispatch<SetStateAction<string | undefined>>;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <OptionsItem>
      <Label>{label}</Label>
      <div className="grid w-full gap-2">
        <Textarea ref={ref} />
        <Button
          onClick={() => {
            set(ref.current?.value);
          }}
        >
          Run
        </Button>
      </div>
    </OptionsItem>
  );
}
