import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import OptionsInputText from "./OptionsInputText";

export default function OptionsMultipleInputText({
  items,
  setValues,
}: {
  items: {
    label: string;
    defaultValue: string;
  }[];
  setValues: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}) {
  const [inputValues, setInputValues] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setValues(inputValues);
  }, [inputValues, setValues]);

  return (
    <>
      {items.map((d, i) => (
        <OptionsInputText
          key={i}
          label={d.label}
          defaultValue={d.defaultValue}
          onChange={(e) => {
            const newInputValues = { ...inputValues };
            newInputValues[d.label] = e.target.value;
            setInputValues(newInputValues);
          }}
        />
      ))}
    </>
  );
}
