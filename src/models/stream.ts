export interface Stream {
    Type?: 'vod' | 'live';
    Source: string;
    Duration?: number;
    Start?: number;
    MaxIterations?: number;
    Subtitles?: Subtitle[];
    Scte35Markers?: Scte35Marker[];
}

export interface Subtitle {
    Code: string;
    Name: string;
    Path: string;
}

export interface Scte35Marker {
    Start: string;
    Type: 'In' | 'Out';
    Duration?: number;
}