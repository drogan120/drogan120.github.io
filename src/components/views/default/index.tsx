"use client";

import { useTemplate } from "@/components/providers/TemplateProvider";
import AuroraTemplate from "./templates/aurora";
import MinimalTemplate from "./templates/minimal";
import PlayfulTemplate from "./templates/playful";
import ClassicTemplate from "./templates/classic";
import BrutalistTemplate from "./templates/brutalist";
import FashionTemplate from "./templates/fashion";
import PastelTemplate from "./templates/pastel";
import GlassTemplate from "./templates/glass";

export default function DefaultView() {
  const { template } = useTemplate();

  switch (template) {
    case "minimal":
      return <MinimalTemplate />;
    case "playful":
      return <PlayfulTemplate />;
    case "classic":
      return <ClassicTemplate />;
    case "brutalist":
      return <BrutalistTemplate />;
    case "fashion":
      return <FashionTemplate />;
    case "pastel":
      return <PastelTemplate />;
    case "glass":
      return <GlassTemplate />;
    // Aurora is the default template, so it also catches apiDocs/terminal —
    // those are standalone views handled higher up and never reach this switch.
    default:
      return <AuroraTemplate />;
  }
}
