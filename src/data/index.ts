import { Question } from '../types';
import { CODE_PREDICTOR_QUESTIONS } from './codePredictor';
import { VARIABLE_TRACKER_QUESTIONS } from './variableTracker';
import { BUG_HUNTER_QUESTIONS } from './bugHunter';
import { IF_MAZE_QUESTIONS } from './ifMaze';
import { CODE_BUILDER_QUESTIONS } from './codeBuilder';

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
