export interface TimeSlot {
  date: string;
  start: string;
  end: string;
}

export interface MatchModalProps {
  teams: string[];

  onCancel?: () => void;
  icon?: ModalIconEnum;
  title: string;
  message: string;
  accept: {
    title: string;
  };
  reject?: {
    title: string;
    action: () => any;
  };
}

export interface MatchFormData {
  selectedTeam: string;
  floorMaterial: string;
  wallMaterial: string;
  roofed: string;
  timeSlots: TimeSlot[];
}

export enum ModalIconEnum {
  ok = 'ok',
  error = 'error',
  warning = 'warning',
}
