import * as ffmpeg from 'fluent-ffmpeg';
import * as ffprobeStatic from 'ffprobe-static';
import * as path from 'path';
import { Clip } from '@models/clip';

export async function getClipDuration(clip: Clip): Promise<number | null> {
    if (clip.duration) {
        // Если длительность задана в плейлисте, используем её
        return clip.duration / 1000; // Конвертируем миллисекунды в секунды
    }

    // Проверяем, является ли клип live-потоком по наличию протокола в URL
    if (
        clip.source.startsWith('rtmp://') ||
        clip.source.startsWith('rtsp://') ||
        clip.source.startsWith('http://') ||
        clip.source.startsWith('https://')
    ) {
        // Для live-потоков возвращаем предустановленную длительность или бесконечность
        return defaultLiveStreamDuration;
    } else {
        return new Promise<number | null>((resolve) => {
            const clipPath = path.isAbsolute(clip.source)
                ? clip.source
                : path.join(dotenv.config().parsed?.MEDIA_PATH || '', clip.source); // Замените на ваш путь к медиафайлам
            ffmpeg.ffprobe(
                clipPath,
                (err: any, metadata: any) => {
                    if (err) {
                        console.log('Error when getting clip duration', err);
                        resolve(null);
                    } else {
                        const durationSeconds = metadata.format.duration;
                        resolve(durationSeconds);
                    }
                }
            );
        });
    }
}