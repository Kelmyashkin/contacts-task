export interface Contact {
  id: number;
  team_id: number;
  name: string;
  phone: string;
  email: string;
  sticky_phone_number_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
