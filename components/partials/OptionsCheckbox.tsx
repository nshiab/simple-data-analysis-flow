import { SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";
import OptionsItem from "./OptionsItem";
import { Label } from "../ui/label";

export default function OptionsCheckbox({
  label,
  defaultChecked,
  set,
}: {
  label: string;
  defaultChecked: boolean;
  set: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <OptionsItem>
      <Checkbox
        defaultChecked={defaultChecked}
        onCheckedChange={(e: boolean) => set(e)}
      />
      <Label>{label}</Label>
    </OptionsItem>
  );
}
