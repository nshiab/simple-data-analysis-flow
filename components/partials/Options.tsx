import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";

export default function Options({ children }: { children: any }) {
  return (
    <Accordion type="single" collapsible className="mt-3">
      <AccordionItem value="item-1">
        <AccordionTrigger>Options</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
