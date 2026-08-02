export type NoteStage = 'seed' | 'growing' | 'evergreen';
export type ZettelkastenStage = 'fleeting' | 'literature' | 'permanent';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme_preference: string;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
  children?: Folder[];
}

export interface Note {
  id: string;
  user_id: string;
  folder_id: string | null;
  title: string;
  slug: string;
  content: string;
  stage: NoteStage;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface NoteLink {
  id: string;
  source_note_id: string;
  target_note_id: string;
  created_at: string;
}

export interface GraphNode {
  id: string;
  title: string;
  slug: string;
  stage: NoteStage;
  is_public?: boolean;
  folder?: string;
  val: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/**
 * Zettelkasten metadata mapping helper
 */
export const ZETTELKASTEN_MAP = {
  seed: {
    label: 'Nota Efímera (Fleeting)',
    shortLabel: 'Efímera',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    desc: 'Ideas rápidas y fragmentos capturados al instante.'
  },
  growing: {
    label: 'Nota de Literatura (Literature)',
    shortLabel: 'Literatura',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    desc: 'Resúmenes de lecturas y citas organizadas.'
  },
  evergreen: {
    label: 'Nota Permanente (Permanent)',
    shortLabel: 'Permanente',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    desc: 'Síntesis atómicas y conceptos interconectados.'
  }
};
