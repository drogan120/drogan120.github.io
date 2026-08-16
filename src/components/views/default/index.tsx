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
import AnimeTemplate from "./templates/anime";
import NihonTemplate from "./templates/nihon";
import NeonTemplate from "./templates/neon";
import PaperTemplate from "./templates/paper";
import RetroTemplate from "./templates/retro";
import PixelTemplate from "./templates/pixel";
import ToonTemplate from "./templates/toon";
import Ff7Template from "./templates/ff7";

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
    case "anime":
      return <AnimeTemplate />;
    case "nihon":
      return <NihonTemplate />;
    case "neon":
      return <NeonTemplate />;
    case "paper":
      return <PaperTemplate />;
    case "retro":
      return <RetroTemplate />;
    case "pixel":
      return <PixelTemplate />;
    case "toon":
      return <ToonTemplate />;
    case "ff7":
      return <Ff7Template />;
    case "aurora":
      return <AuroraTemplate />;
    // Aurora is the default template, so it also catches apiDocs/terminal —
    // those are standalone views handled higher up and never reach this switch.
    default:
      return <AnimeTemplate />;
  }
}
