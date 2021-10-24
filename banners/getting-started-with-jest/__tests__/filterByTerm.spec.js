

const filterByTerm = require("../filterURL");

describe("Filter function", () => {
    
    // describe wraps the test stuff
    test("it should filter by a search term (link)", () => {

    // the actual test
            // test inputs
            const input = [
                { id: 1, url: "https://www.url1.dev" },
                { id: 2, url: "https://www.url2.dev" },
                { id: 3, url: "https://www.link3.dev" }
            ];
            
            // the expected result from the test
            const output = [{ id: 3, url: "https://www.link3.dev" }];

            // Jest test 
            expect(filterByTerm(input, "link")).toEqual(output);

            // 2nd Jest test -> looking at UPPERCASE
            expect(filterByTerm(input, "LINK")).toEqual(output);

            // 3rd Jest test -> make the test fail
            expect(filterByTerm(input, "uRl")).toEqual(output);

            // 4th Jest test -> make the test fail
            expect(filterByTerm(input, "")).toEqual(output);

        });
    });