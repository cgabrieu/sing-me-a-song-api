import joi from 'joi';
import getYouTubeID from 'get-youtube-id';

const postRecommendation = joi.object({
  name: joi.string().required(),
  youtubeLink: joi
    .string()
    .custom((value) => !getYouTubeID(value) && true)
    .required(),
});

// eslint-disable-next-line import/prefer-default-export
export { postRecommendation };
