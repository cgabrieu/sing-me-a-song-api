import joi from 'joi';

const postGenre = joi.object({
  name: joi.string().min(1).max(50).required(),
});

// eslint-disable-next-line import/prefer-default-export
export { postGenre };
