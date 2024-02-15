import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-matrix";
import { twoSum } from "./two-sum";
import { Problem } from "./types/types";
import { validParentheses } from "./valid-parenthese";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
};

