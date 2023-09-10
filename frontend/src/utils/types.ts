export interface RowData {
  name: string;
  email: string;
  phone: string;
  id?: string;
  created_at?: string;
}

export interface ContactTableProps {
  data: RowData[];
}

export interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}
