import { Subtitle, Scte35Marker } from '@models/stream';

export interface Clip {
    type: 'vod' | 'live';
    source: string;
    duration?: number;
    start: number;
    maxIterations: number;
    subtitles?: Subtitle[];
    scte35Markers?: Scte35Marker[];
}