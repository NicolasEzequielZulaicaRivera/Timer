import { getTime } from "./time";

describe("getTime", () => {
  it("should return a string", () => {
    expect(typeof getTime()).toBe("string");
  });
  it("should handle dates", () => {
    const date = new Date("2020-01-01 11:10:5");
    expect(getTime(date)).toBe("11:10");
  });
  it("should handle timestamps", () => {
    const time = new Date("2020-01-01 11:33:5").getTime();
    expect(getTime(time)).toBe("11:33");
  });
  it("should handle strings", () => {
    const time = "2020-01-01 9:33:5";
    expect(getTime(time, "HH:mm")).toBe("09:33");
  });
  it("should output correct format", () => {
    const time = "2020-01-01 9:33:5";
    expect(getTime(time, "HH:mm:ss")).toBe("09:33:05");
  });
});
