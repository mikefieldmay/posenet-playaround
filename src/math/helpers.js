export const add = (a, b) => a + b;

export const getLongSide = (distanceX, distanceY) => {
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};

export const getAngleFromPoint = (distanceX, distanceY) => {
  var angleRad = Math.atan(distanceY / distanceX);
  var angleDeg = (angleRad * 180) / Math.PI;

  return Math.round(angleDeg * 10) / 10;
};

export const cartesianToPolar = (distanceX, distanceY) => {
  const r = getLongSide(distanceX, distanceY);
  const angle = getAngleFromPoint(distanceX, distanceY);
  return {
    r,
    angle
  };
};

export const polarToCartesian = (r, angle) => {
  const angleInRadians = angle * (180 / Math.PI);
  const angleX = Math.cos(angleInRadians);
  const angleY = Math.sin(angleInRadians);
  const distanceX = Math.round(r * angleX);
  const distanceY = Math.round(r * angleY);
  return {
    distanceX,
    distanceY
  };
};

export const getDistanceXandY = (positionA, positionB) => {
  const distanceX = positionA.x - positionB.x;
  const distanceY = positionA.y - positionB.y;
  return {
    distanceX,
    distanceY
  };
};

export const getCartesianOfPoints = (pointOne, pointTwo) => {
  const { distanceX, distanceY } = getDistanceXandY(pointOne, pointTwo);
  const { r, angle } = cartesianToPolar(distanceX, distanceY);
  return {
    angle,
    distance: r
  };
};
/**
 * Nose To Right Eye
 */

// TURN RIGHT increases distance marginally, decreases angle marginally
// TURN LEFT increases distance marginally, increases angle greatly

/**
 * Nose To Left Eye
 */

// TURN LEFT increases distance marginally, decreases angle marginally
// TURN RIGHT increases distance marginally, increases angle greatly

//
