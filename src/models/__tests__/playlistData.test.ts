import { PlaylistData } from '@models/playlistData';
import { Task } from '@models/task';

describe('PlaylistData Model', () => {
  it('should create a PlaylistData object', () => {
    const task: Task = {
      Blocks: [],
    };

    const playlistData: PlaylistData = {
      Tasks: [task],
    };

    expect(playlistData).toBeDefined();
    expect(playlistData.Tasks).toHaveLength(1);
  });
});