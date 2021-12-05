/* eslint-disable no-undef */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import Conflict from '../../src/errors/Conflict.js';

const sut = recommendationService;

const mockRecommendationRepository = {
  findYoutubeLink: (f) => jest.spyOn(recommendationRepository, 'findYoutubeLink').mockImplementationOnce(f),
  findId: (f) => jest.spyOn(recommendationRepository, 'findId').mockImplementationOnce(f),
  add: (f) => jest.spyOn(recommendationRepository, 'add').mockImplementationOnce(f),
  vote: (f) => jest.spyOn(recommendationRepository, 'vote').mockImplementationOnce(f),
  getFilterRandom: (f) => jest.spyOn(recommendationRepository, 'getFilterRandom').mockImplementationOnce(f),
  getRandom: (f) => jest.spyOn(recommendationRepository, 'getRandom').mockImplementationOnce(f),
  getByLimit: (f) => jest.spyOn(recommendationRepository, 'getByLimit').mockImplementationOnce(f),
  remove: (f) => jest.spyOn(recommendationRepository, 'remove').mockImplementationOnce(f),
};

const mockSong = {
  id: 1,
  name: 'Louis Armstrong - What a Wonderful World',
  youtubeLink: 'https://www.youtube.com/watch?v=CWzrABouyeE',
  score: 0,
};

describe('Unit Tests - Post Recommendation', () => {
  it('should return the added object', async () => {
    mockRecommendationRepository.findYoutubeLink(() => null);
    mockRecommendationRepository.add(() => mockSong);
    const result = await sut.post();
    expect(result).toMatchObject(mockSong);
  });

  it('should return a conflict error when the youtube link already exists', async () => {
    mockRecommendationRepository.findYoutubeLink(() => mockSong);
    const promise = sut.post();
    await expect(promise).rejects.toThrow(Conflict);
  });
});

describe('Unit Tests - Vote Recommendation', () => {
  it('should return the added object with score +1 when up vote', async () => {
    mockRecommendationRepository.findId(() => mockSong);
    mockRecommendationRepository.vote(() => ({ ...mockSong, score: mockSong.score + 1 }));
    const result = await sut.vote(mockSong.id, 'up');
    console.log(result);
    expect(result.score).toBe(mockSong.score + 1);
  });
});
