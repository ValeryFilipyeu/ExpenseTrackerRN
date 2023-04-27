import { getFormattedDate, getDateMinusDays } from "./date";

describe("getFormattedDate", () => {
  it("should return a formatted date string", () => {
    const date = new Date("2022-01-01");

    expect(getFormattedDate(date)).toEqual("2022-01-01");
  });
});

describe("getDateMinusDays", () => {
  it("should return a date object with the correct number of days subtracted", () => {
    const date = new Date("2022-01-01");
    const days = 5;
    const expectedDate = new Date("2021-12-27T21:00:00.000Z");

    expect(getDateMinusDays(date, days)).toEqual(expectedDate);
  });
});
