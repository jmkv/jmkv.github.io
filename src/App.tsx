import type { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';
import { comment } from './data';

const OPTIONS: EmblaOptionsType = {};
const comments = comment.split(/\s+/g).filter(Boolean);

export default function () {
  return <EmblaCarousel options={OPTIONS} slides={comments} />;
}
