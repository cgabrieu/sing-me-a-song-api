import * as recommendationRepository from '../repositories/recommendationRepository.js';

// eslint-disable-next-line import/prefer-default-export
export async function post(name, youtubeLink) {
  const linkExists = recommendationRepository.findYoutubeLink(youtubeLink);
}
