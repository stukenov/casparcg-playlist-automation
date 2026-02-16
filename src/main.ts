import '@config/dotenv';
import { main } from '@controllers/playlistController';

main()
    .then(() => {
        console.log('Плейлист завершён');
    })
    .catch((error) => {
        console.error('Ошибка при выполнении плейлиста:', error);
    });