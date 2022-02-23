const minContentLength = 10;
const maxContentLength = 120;

export const CONSTANTS = {
  ITEMS: {
    MIN_CONTENT_LENGTH: minContentLength,
    MAX_CONTENT_LENGTH: maxContentLength
  },
  ERRORS: {
    MIN_CONTENT_LENGTH: `Provided content needs to be at least ${minContentLength} characters long.`,
    MAX_CONTENT_LENGTH: `Provided content can't be over ${maxContentLength} characters long.`,
  }
};
