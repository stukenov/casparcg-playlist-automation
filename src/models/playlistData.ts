import { BlockItem } from './block';

export interface PlaylistData {
    Tasks: Task[];
}

interface Task {
    Blocks: BlockItem[];
}