export interface Entry {
    _id?: string;
    title: string;
    description: string;
    deadline: string;
    finished?: boolean;
    categories?: string[] 
    status: EntryStatus;
    createdAt?: string;
  }
  
  export type EntryStatus = "pending" | "in-progress" | "finished";