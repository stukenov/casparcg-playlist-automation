import { Clip } from '@models/clip';

describe('Clip Model', () => {
  it('should create a Clip object', () => {
    const clip: Clip = {
      type: 'vod',
      source: 'test.mp4',
      start: 0,
      maxIterations: 1,
    };

    expect(clip).toBeDefined();
    expect(clip.type).toBe('vod');
    expect(clip.source).toBe('test.mp4');
    expect(clip.start).toBe(0);
    expect(clip.maxIterations).toBe(1);
  });
});