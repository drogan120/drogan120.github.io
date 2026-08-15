"use client";

import { useTemplate } from "@/components/providers/TemplateProvider";
import MinimalTemplate from "./templates/minimal";
import PlayfulTemplate from "./templates/playful";
import ClassicTemplate from "./templates/classic";
import BrutalistTemplate from "./templates/brutalist";
import FashionTemplate from "./templates/fashion";
import PastelTemplate from "./templates/pastel";

export default function DefaultView() {
  const { template } = useTemplate();

  switch (template) {
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
    default:
      return <MinimalTemplate />;
  }
}
