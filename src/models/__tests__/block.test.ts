import { Block } from '@models/block';
import { Stream } from '@models/stream';

describe('Block Model', () => {
  it('should create a Block object', () => {
    const stream: Stream = {
      Type: 'vod',
      Source: 'test.mp4',
    };

    const block: Block = {
      Id: '1',
      Name: 'Test Block',
      Start: '2023-01-01T00:00:00Z',
      Streams: [stream],
    };

    expect(block).toBeDefined();
    expect(block.Id).toBe('1');
    expect(block.Name).toBe('Test Block');
    expect(block.Start).toBe('2023-01-01T00:00:00Z');
    expect(block.Streams).toHaveLength(1);
  });
});