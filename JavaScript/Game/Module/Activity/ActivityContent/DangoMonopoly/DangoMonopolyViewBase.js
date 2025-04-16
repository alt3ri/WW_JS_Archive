"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyViewBase = void 0);
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ActivityDangoMonopolyController_1 = require("./ActivityDangoMonopolyController");
class DangoMonopolyViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.ActivityData = void 0);
  }
  OnBeforeCreate() {
    this.UpdateActivityData();
  }
  UpdateActivityData() {
    return (
      (this.ActivityData =
        ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()),
      !!this.ActivityData
    );
  }
}
exports.DangoMonopolyViewBase = DangoMonopolyViewBase;
//# sourceMappingURL=DangoMonopolyViewBase.js.map
