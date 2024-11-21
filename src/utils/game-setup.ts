export const groupedPoints: Array<[string[], number]> = [
  [["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"], 1],
  [["D", "G"], 2],
  [["B", "C", "M", "P"], 3],
  [["F", "H", "V", "W", "Y"], 4],
  [["K"], 5],
  [["J", "X"], 8],
  [["Q", "Z"], 10],
];

export const pointMap = new Map<string, number>(
  groupedPoints.flatMap(([letters, points]) =>
    (letters as string[]).map(
      (letter) => [letter.toUpperCase(), points] as [string, number]
    )
  )
);

export const groupedDistribution: Array<[string[], number]> = [
  [["E"], 12],
  [["A", "I"], 9],
  [["O"], 8],
  [["N", "R", "T"], 6],
  [["L", "S", "U", "D"], 4],
  [["G"], 3],
  [["B", "C", "M", "P", "F", "H", "V", "W", "Y"], 2],
  [["K", "J", "X", "Q", "Z"], 1],
];

export const distributionMap = new Map<string, number>(
  groupedPoints.flatMap(([letters, distribution]) =>
    (letters as string[]).map(
      (letter) => [letter.toUpperCase(), distribution] as [string, number]
    )
  )
);

export const tileBag = (): Array<[string, number]> => {
  return Array.from(distributionMap.entries()).flatMap(([letter, count]) => {
    const points = pointMap.get(letter);
    if (points === undefined) {
      throw new Error(`Point value not found for letter: ${letter}`);
    }
    return Array(count).fill([letter, points]);
  });
};
