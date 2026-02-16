import { Block } from '@models/block';
import { Stream } from '@models/stream';

export interface Task {
    Stream?: string;
    InactivityTimeout?: number;
    DefaultStream?: Stream;
    Blocks: Block[];
}