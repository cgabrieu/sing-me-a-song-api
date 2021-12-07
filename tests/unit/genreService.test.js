/* eslint-disable no-undef */
import * as genreService from '../../src/services/genreService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as genreRepository from '../../src/repositories/genreRepository.js';
import Conflict from '../../src/errors/Conflict.js';
import NotFound from '../../src/errors/NotFound.js';

const sut = genreService;

const mockGenreRepository = {
  findName: (f) => jest.spyOn(genreRepository, 'findName').mockImplementationOnce(f),
  add: (f) => jest.spyOn(genreRepository, 'add').mockImplementationOnce(f),
  get: (f) => jest.spyOn(genreRepository, 'get').mockImplementationOnce(f),
  getById: (f) => jest.spyOn(genreRepository, 'getById').mockImplementationOnce(f),
  getGenresByRecommendation: (f) => jest.spyOn(genreRepository, 'getGenresByRecommendation').mockImplementation(f),
};

const mockRecommendationRepository = {
  getRecommedationsByGenre: (f) => jest.spyOn(recommendationRepository, 'getRecommedationsByGenre').mockImplementationOnce(f),
};

const mockGenre = {
  id: 1,
  name: 'Pop Rock',
};

describe('Unit Tests - Post Genre', () => {
  it('should return the added object', async () => {
    mockGenreRepository.findName(() => null);
    mockGenreRepository.add(() => mockGenre);
    const result = await sut.post();
    expect(result).toMatchObject(mockGenre);
  });

  it('should return a conflict error when the genre already exists', async () => {
    mockGenreRepository.findName(() => mockGenre);
    const promise = sut.post();
    await expect(promise).rejects.toThrow(Conflict);
  });
});

describe('Unit Tests - Get All Genres', () => {
  it('should return a not found error when no genres exists ', async () => {
    mockGenreRepository.get(() => []);
    const promise = sut.getAll();
    await expect(promise).rejects.toThrow(NotFound);
  });

  it('should return an array of genres', async () => {
    mockGenreRepository.get(() => [mockGenre]);
    const result = await sut.getAll();
    expect(result).toMatchObject([mockGenre]);
  });
});

describe('Unit Tests - Get Genre By Id', () => {
  it('should return a not found error when no genre exists', async () => {
    const id = 99999999;
    mockGenreRepository.getById(() => null);
    const promise = sut.getById(id);
    await expect(promise).rejects.toThrow(NotFound);
  });

  it('should return an genre with recommendations when genre id exists', async () => {
    const id = 1;
    mockGenreRepository.getById(() => mockGenre);
    mockRecommendationRepository.getRecommedationsByGenre(() => [{}]);
    mockGenreRepository.getGenresByRecommendation(() => [{}]);
    const result = await sut.getById(id);
    expect(result).toMatchObject(mockGenre);
  });
});
