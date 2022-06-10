export const getDistance = (point1, point2) => {
  return Math.sqrt(
    (point1.position.x - point2.position.x) *
      (point1.position.x - point2.position.x) +
      (point1.position.y - point2.position.y) *
        (point1.position.y - point2.position.y)
  );
};
