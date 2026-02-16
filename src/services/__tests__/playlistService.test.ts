import { readPlaylistFile, generateBlockSequence } from '@services/playlistService';
import { PlaylistData } from '@models/playlistData';
import { BlockItem } from '@models/block';

jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue(JSON.stringify({
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
  })),
}));

describe('PlaylistService', () => {
  it('should read playlist file', () => {
    const playlistData = readPlaylistFile('playlist.json');
    expect(playlistData).toBeDefined();
    expect(playlistData?.Tasks).toHaveLength(1);
  });

  it('should generate block sequence', () => {
    const playlistData: PlaylistData = {
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
    };

    const blockSequence: BlockItem[] = generateBlockSequence(playlistData);
    expect(blockSequence).toHaveLength(1);
    expect(blockSequence[0].Id).toBe('1');
  });
});