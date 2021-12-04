import joi from 'joi';
import getYouTubeID from 'get-youtube-id';

const postRecommendation = joi.object({
  name: joi.string().required(),
  youtubeLink: joi
    .string()
    .custom((value, helper) => ((getYouTubeID(value)) ? true : helper.error('Invalid Youtube Link')))
    .required(),
});

// eslint-disable-next-line import/prefer-default-export
export { postRecommendation };
