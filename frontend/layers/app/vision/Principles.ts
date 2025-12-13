import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdGroups3, MdCode, MdColorLens } from 'react-icons/md';
import { GiShakingHands } from 'react-icons/gi';
import { SiCodementor } from 'react-icons/si';
import { PiStrategy } from 'react-icons/pi';
import { RiGraduationCapFill } from 'react-icons/ri';
import { IconType } from 'react-icons';

// Icons for princple cards
export const iconsMap: Record<string, IconType> = {
  Groups: MdGroups3,
  Growth: FaArrowTrendUp,
  Collaboration: GiShakingHands,
  Technical: MdCode,
  UX: MdColorLens,
  Leadership: SiCodementor,
  Strategic: PiStrategy,
  Learning: RiGraduationCapFill
};
