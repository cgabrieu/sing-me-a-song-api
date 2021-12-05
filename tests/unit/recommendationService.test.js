/* eslint-disable no-undef */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';

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

describe('Unit Tests - Post Recommendation', () => {
  it('should return the added object', async () => {
    const mockSong = {
      name: 'Louis Armstrong - What a Wonderful World',
      youtubeLink: 'https://www.youtube.com/watch?v=CWzrABouyeE',
    };

    mockRecommendationRepository.findYoutubeLink(() => null);
    mockRecommendationRepository.add(() => (mockSong));
    const result = await sut.post();
    expect(result).toMatchObject(mockSong);
  });
});
