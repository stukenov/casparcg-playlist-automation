import { Stream } from '@models/stream';

export interface BlockItem {
    Id: string;
    Name: string;
    Start: string;
    Streams: Stream[];
    InactivityTimeout?: number;
    DefaultStream?: string;
}

interface Stream {
    Type: string;
    Source: string;
}