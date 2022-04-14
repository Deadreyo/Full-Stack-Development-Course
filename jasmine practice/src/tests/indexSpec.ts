import countries from "../index";

// it("should get basic data on the country canada", async () => {
//   const data = await countries.getCountry('canada');
//   expect(data).toEqual({
//     capital: 'Ottawa',
//     region: 'Americas',
//     numericCode: '124'
//   });
// });

// /** Add test for getRegionCountries function here */
// it("should get names of AL counties", async () => {
//   const data = await countries.getRegionCountries('AL');
//   expect(data).toContain('Egypt')
// })

// it("should get capitals of NAFTA countries", async () => {
//   const data = await countries.getRegionCapitals('nafta');
//   expect(data).toEqual([
//     'Ottawa', 'Mexico City', 'Washington, D.C.'
//   ]);
// });
let sumConst = 4;
describe("some random things", () => {
    beforeAll(() => {
        sumConst = 0
    })

    it("should sumFunc be equal to 20", () => {
        sumConst += 20
        expect(sumConst).toBe(20);
    })

    it("should sumFunc be equal to 40", () => {
        sumConst += 40
        expect(sumConst).toBe(60);
    })
})