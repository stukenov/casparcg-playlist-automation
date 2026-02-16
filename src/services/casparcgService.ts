import { CasparCG } from 'casparcg-connection';
import { BlockItem } from '@models/block';

const connection = new CasparCG();

export async function playClip(channel: number, layer: number, clip: any, transition: any = null): Promise<void> {
    try {
        const playParams: any = { channel, layer };

        // Определяем источник в зависимости от типа клипа
        if (clip.type === 'live' || clip.type === 'vod') {
            playParams.clip = clip.source;
        } else {
            console.warn('Неизвестный тип клипа:', clip.type);
            return;
        }

        // Добавляем параметры старта
        if (clip.start) {
            playParams.seek = clip.start / 1000; // Конвертируем миллисекунды в секунды
        }

        // Добавляем субтитры, если есть
        if (clip.subtitles && Array.isArray(clip.subtitles)) {
            // CasparCG не поддерживает прямую загрузку субтитров через AMCP
            // Нужно реализовать это с помощью шаблонов или дополнительных решений
            console.warn(
                'Субтитры не поддерживаются напрямую, требуется дополнительная реализация.'
            );
        }

        // Обработка SCTE-35 маркеров (не поддерживается напрямую в CasparCG)
        if (clip.scte35Markers && Array.isArray(clip.scte35Markers)) {
            // Нужно реализовать отправку SCTE-35 маркеров через отдельные команды или использовать вставку метаданных
            console.warn(
                'SCTE-35 маркеры не поддерживаются напрямую, требуется дополнительная реализация.'
            );
        }

        if (transition) {
            playParams.transition = transition;
        }

        const { request } = await connection.play(playParams);
        await request;
        console.log('Playing:', clip.source);
    } catch (error) {
        console.log('Error when playing clip', error);
    }
}

export async function loadClipAuto(channel: number, layer: number, clip: any, transition: any = null): Promise<void> {
    try {
        const loadbgParams: any = { channel, layer, auto: true };

        // Определяем источник в зависимости от типа клипа
        if (clip.type === 'live' || clip.type === 'vod') {
            loadbgParams.clip = clip.source;
        } else {
            console.warn('Неизвестный тип клипа:', clip.type);
            return;
        }

        // Добавляем параметры старта
        if (clip.start) {
            loadbgParams.seek = clip.start / 1000; // Конвертируем миллисекунды в секунды
        }

        if (transition) {
            loadbgParams.transition = transition;
        }

        const { request } = await connection.loadbg(loadbgParams);
        await request;
        console.log('Loaded next clip:', clip.source);
    } catch (error) {
        console.log('Error when loading clip', error);
    }
}

export async function stopClip(channel: number, layer: number): Promise<void> {
    try {
        const { request } = await connection.stop({ channel, layer });
        await request;
        console.log('Stopped playback on channel', channel, 'layer', layer);
    } catch (error) {
        console.log('Error when stopping clip', error);
    }
}

export async function playClipSequence(channel: number, layer: number, block: BlockItem): Promise<void> {
    // Реализация воспроизведения последовательности клипов
}

export async function playDefaultStream(channel: number, layer: number, defaultStream: string): Promise<void> {
    // Реализация воспроизведения дефолтного потока
}