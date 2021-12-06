/* eslint-disable no-undef */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import Conflict from '../../src/errors/Conflict.js';
import NotFound from '../../src/errors/NotFound.js';

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
  it('should return a object with score +1 when up vote', async () => {
    mockRecommendationRepository.findId(() => mockSong);
    mockRecommendationRepository.vote(() => ({ ...mockSong, score: mockSong.score + 1 }));
    const result = await sut.vote(mockSong.id, 'up');
    expect(result.score).toBe(mockSong.score + 1);
  });

  it('should return a object with score -1 when down vote', async () => {
    mockRecommendationRepository.findId(() => mockSong);
    mockRecommendationRepository.vote(() => ({ ...mockSong, score: mockSong.score - 1 }));
    const result = await sut.vote(mockSong.id, 'down');
    expect(result.score).toBe(mockSong.score - 1);
  });

  it('should return a removed object with score -6 when down vote', async () => {
    mockRecommendationRepository.findId(() => mockSong);
    mockRecommendationRepository.vote(() => ({ ...mockSong, score: -6 }));
    mockRecommendationRepository.remove(() => null);
    const result = await sut.vote(mockSong.id, 'down');
    expect(result.score).toBe(-6);
  });

  it('should return a not found error when id doesnt exist', async () => {
    mockRecommendationRepository.findId(() => null);
    const promise = sut.vote();
    await expect(promise).rejects.toThrow(NotFound);
  });
});

describe('Unit Tests - Get Random Recommendation', () => {
  it('should return a popular recommendation (score > 10)', async () => {
    mockRecommendationRepository.getFilterRandom(() => ({ ...mockSong, score: 15 }));
    const result = await sut.getRandom();
    expect(result.score).toBeGreaterThan(10);
  });

  it('should return a unpopular recommendation (score <= 10)', async () => {
    mockRecommendationRepository.getFilterRandom(() => ({ ...mockSong, score: 5 }));
    const result = await sut.getRandom();
    expect(result.score).toBeLessThanOrEqual(10);
  });

  it('should return any recommendation', async () => {
    mockRecommendationRepository.getFilterRandom(() => null);
    mockRecommendationRepository.getRandom(() => mockSong);
    const result = await sut.getRandom();
    expect(result).toMatchObject(mockSong);
  });

  it('should return a not found error when no recommendation exists', async () => {
    mockRecommendationRepository.getFilterRandom(() => null);
    mockRecommendationRepository.getRandom(() => null);
    const promise = sut.getRandom();
    await expect(promise).rejects.toThrow(NotFound);
  });
});

describe('Unit Tests - Get Top Recommendations', () => {
  it('should return a not found error when limit < 1', async () => {
    const limit = 0;
    mockRecommendationRepository.getByLimit(() => []);
    const promise = sut.getTop(limit);
    await expect(promise).rejects.toThrow(NotFound);
  });

  it('should return an array of recommendations when limit >= 1', async () => {
    const limit = 1;
    mockRecommendationRepository.getByLimit(() => [mockSong]);
    const result = await sut.getTop(limit);
    expect(result.length).toBe(limit);
  });

  it('should return an array with all recommendations when limit > num recommendations', async () => {
    const limit = 999;
    const mockArray = [mockSong, mockSong, mockSong];
    mockRecommendationRepository.getByLimit(() => mockArray);
    const result = await sut.getTop(limit);
    expect(result.length).toEqual(mockArray.length);
  });
});
