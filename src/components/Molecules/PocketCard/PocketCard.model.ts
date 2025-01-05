export interface PocketCardModel{
    title: string;
    amount: number;        
    url?: string;
    id: string;
    setPocketId: (id: string) => void;
    setEditPocket: (editPocket: boolean) => void;
}