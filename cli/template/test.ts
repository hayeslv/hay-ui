import { upperFirst } from "./utils";

export default function genTestTemplate(name: string) {
  const compName = upperFirst(name);
  return `\
import { render } from "@testing-library/vue";
import ${compName} from "../src/${name}";

describe("${name} test", () => {
  test("${name} init render", async () => {
    const { getByRole } = render(${compName});
    getByRole("${name}");
  });
});
`;
}
