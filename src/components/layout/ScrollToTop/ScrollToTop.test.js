import ScrollToTop from "./ScrollToTop";
import { renderWithRoute } from "../../../services/testUtils";

describe("<ScrollToTop/>", () => {
  test("should scroll to top", () => {
    global.window.scrollTo = jest.fn();

    renderWithRoute(<ScrollToTop />);

    expect(global.window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
