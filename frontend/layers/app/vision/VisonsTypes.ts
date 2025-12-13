export interface Principle {
    id: number;
    key: string;
    title: string;
    content: string;
}

export interface LongTerm {
    id: number;
    year: string;
    plan: string;
    description: string;
}

export interface VisionsType {
  id: number;
  title: string;
  sub_title: string;
  vision_intro: string;
  principles_title: string;
  longterm_title: string;
  principles_list: Principle[];
  long_term_list: LongTerm[];
}

export interface VisionData {
    visions: VisionsType[];
}