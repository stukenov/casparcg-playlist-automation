import { readPlaylistFile, generateBlockSequence, playBlock, playDefaultStream } from '@services/playlistService';
import { BlockItem } from '@models/block';

export async function main(): Promise<void> {
    const playlistData = readPlaylistFile('playlist.json');
    if (!playlistData) {
        console.error('Не удалось прочитать плейлист');
        return;
    }

    const blockSequence: BlockItem[] = generateBlockSequence(playlistData);

    if (blockSequence.length === 0) {
        console.error('Последовательность блоков пуста');
        return;
    }

    for (let i = 0; i < blockSequence.length; i++) {
        const block: BlockItem = blockSequence[i];

        // Вычисляем время до начала следующего блока
        let nextBlockStartTime: Date | null = null;
        if (i < blockSequence.length - 1) {
            nextBlockStartTime = new Date(blockSequence[i + 1].Start);
        }

        // Запускаем воспроизведение блока
        await playBlock(1, 1, block);

        // Если задан InactivityTimeout и DefaultStream
        if (block.InactivityTimeout && block.DefaultStream) {
            const currentTime = new Date();
            let waitTime: number | null = null;

            if (nextBlockStartTime) {
                waitTime = nextBlockStartTime.getTime() - currentTime.getTime();
            }

            if (waitTime === null || waitTime > block.InactivityTimeout * 1000) {
                console.log(
                    `Ожидание ${block.InactivityTimeout} секунд перед воспроизведением DefaultStream`
                );
                await new Promise((resolve) =>
                    setTimeout(resolve, block.InactivityTimeout * 1000)
                );
                await playDefaultStream(1, 1, block.DefaultStream);
            } else {
                console.log(
                    'Время до следующего блока меньше InactivityTimeout, продолжаем ожидание.'
                );
            }
        }
    }

    console.log('Все блоки завершены');
}