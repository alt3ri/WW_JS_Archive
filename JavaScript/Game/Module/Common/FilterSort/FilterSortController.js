"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterSortController = void 0);
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
class FilterSortController extends UiControllerBase_1.UiControllerBase {
  static OpenFilterView(e) {
    e.ConfigId === 2 || e.ConfigId === 4
      ? UiManager_1.UiManager.OpenView("VisionFilterView", e)
      : UiManager_1.UiManager.OpenView("FilterView", e);
  }
  static OpenSortView(e) {
    UiManager_1.UiManager.OpenView("SortView", e);
  }
}
exports.FilterSortController = FilterSortController;
// # sourceMappingURL=FilterSortController.js.map
