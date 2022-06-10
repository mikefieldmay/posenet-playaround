import {
  getLongSide,
  getAngleFromPoint,
  cartesianToPolar,
  polarToCartesian,
  getDistanceXandY
} from "./helpers";

describe("Math Helpers", () => {
  describe("getLongSide", () => {
    it("returns the long side of a triangle", () => {
      expect(getLongSide(3, 4)).toEqual(5);
      expect(getLongSide(12, 5)).toEqual(13);
    });
  });
  describe("getAngleFromPoint", () => {
    it("returns the the angle from a point", () => {
      expect(getAngleFromPoint(12, 5)).toEqual(22.6);
    });
  });
  describe("cartesianToPolar", () => {
    it("returns polar coordinate of a cartesian value", () => {
      expect(cartesianToPolar(12, 5)).toEqual({
        r: 13,
        angle: 22.6
      });
    });
  });
  describe("polarToCartesian", () => {
    it("returns cartesian coordinate of a polar value (close enough)", () => {
      expect(polarToCartesian(13, 22.6)).toEqual({
        distanceX: 11,
        distanceY: 7
      });
    });
  });
  describe("getDistanceXandY", () => {
    it("returns cartesian coordinate of a polar value (close enough)", () => {
      const positionA = {
        x: 5,
        y: 5
      };

      const positionB = {
        x: 10,
        y: 20
      };
      expect(getDistanceXandY(positionA, positionB)).toEqual({
        distanceX: -5,
        distanceY: -15
      });
    });
  });
});
