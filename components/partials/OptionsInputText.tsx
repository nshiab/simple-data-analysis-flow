import { SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import OptionsItem from "./OptionsItem";

export default function OptionsInputText({
  label,
  defaultValue,
  set,
}: {
  label: string;
  defaultValue: string;
  set: (value: SetStateAction<string | undefined>) => void;
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input
        type="text"
        className="w-50"
        defaultValue={defaultValue}
        onChange={(e) => set(e.target.value)}
      />
    </OptionsItem>
  );
}
