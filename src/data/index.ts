import type { Question } from '../types.js';
import { CODE_PREDICTOR_QUESTIONS } from './codePredictor.js';
import { VARIABLE_TRACKER_QUESTIONS } from './variableTracker.js';
import { BUG_HUNTER_QUESTIONS } from './bugHunter.js';
import { IF_MAZE_QUESTIONS } from './ifMaze.js';
import { CODE_BUILDER_QUESTIONS } from './codeBuilder.js';

export const ALL_QUESTIONS: Question[] = [
  ...CODE_PREDICTOR_QUESTIONS,
  ...VARIABLE_TRACKER_QUESTIONS,
  ...BUG_HUNTER_QUESTIONS,
  ...IF_MAZE_QUESTIONS,
  ...CODE_BUILDER_QUESTIONS,
];

export {
  CODE_PREDICTOR_QUESTIONS,
  VARIABLE_TRACKER_QUESTIONS,
  BUG_HUNTER_QUESTIONS,
  IF_MAZE_QUESTIONS,
  CODE_BUILDER_QUESTIONS,
};
