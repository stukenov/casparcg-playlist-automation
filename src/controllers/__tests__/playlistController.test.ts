import { main } from '@controllers/playlistController';
import { readPlaylistFile, generateBlockSequence, playBlock } from '@services/playlistService';

jest.mock('@services/playlistService', () => ({
  readPlaylistFile: jest.fn().mockReturnValue({
    Tasks: [
      {
        Blocks: [
          {
            Id: '1',
            Name: 'Test Block',
            Start: '2023-01-01T00:00:00Z',
            Streams: [
              {
                Type: 'vod',
                Source: 'test.mp4',
              },
            ],
          },
        ],
      },
    ],
  }),
  generateBlockSequence: jest.fn().mockReturnValue([
    {
      id: '1',
      name: 'Test Block',
      startTime: '2023-01-01T00:00:00Z',
      streams: [
        {
          Type: 'vod',
          Source: 'test.mp4',
        },
      ],
    },
  ]),
  playBlock: jest.fn(),
}));

describe('PlaylistController', () => {
  it('should run main function', async () => {
    await main();
    expect(readPlaylistFile).toHaveBeenCalled();
    expect(generateBlockSequence).toHaveBeenCalled();
    expect(playBlock).toHaveBeenCalled();
  });
});