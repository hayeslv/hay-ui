import { render } from "@testing-library/vue";
import Card from "../src/card";

describe("card test", () => {
  test("card init render", async() => {
    const { getByRole } = render(Card);
    getByRole("card");
  });
});
