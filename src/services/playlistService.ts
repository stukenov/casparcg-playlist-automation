import { readFileSync } from 'fs';
import { PlaylistData } from '@models/playlistData';
import { BlockItem } from '@models/block';

export function readPlaylistFile(filePath: string): PlaylistData | null {
    try {
        const fileContent = readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as PlaylistData;
    } catch (error) {
        console.error('Error reading playlist file:', error);
        return null;
    }
}

export function generateBlockSequence(playlistData: PlaylistData): BlockItem[] {
    const blockSequence: BlockItem[] = [];

    for (const task of playlistData.Tasks) {
        blockSequence.push(...task.Blocks);
    }

    return blockSequence.sort((a, b) => new Date(a.Start).getTime() - new Date(b.Start).getTime());
}

export async function playBlock(channel: number, layer: number, block: BlockItem): Promise<void> {
    console.log(`Playing block: ${block.Name}`);
    // Здесь должна быть логика воспроизведения блока
    // Так как playClipSequence не найден, мы просто выводим сообщение в консоль
    console.log(`Simulating playback of block ${block.Id} on channel ${channel}, layer ${layer}`);
}

// Если функция playDefaultStream нужна, можно добавить её заглушку:
export async function playDefaultStream(channel: number, layer: number, defaultStream: string): Promise<void> {
    console.log(`Playing default stream: ${defaultStream} on channel ${channel}, layer ${layer}`);
    // Здесь должна быть логика воспроизведения дефолтного потока
}