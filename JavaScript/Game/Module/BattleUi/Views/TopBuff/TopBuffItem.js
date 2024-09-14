"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopBuffItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisibleStateUtil_1 = require("../../VisibleStateUtil");
class TopBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.InnerVisibleState = 0);
  }
  SetActive(e) {
    this.GetVisible() !== e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 18, "不要直接调用SetActive, 请调用SetVisible")
      : super.SetActive(e);
  }
  SetVisible(e, t) {
    var i = this.GetVisible(),
      e = (this.rJe(e, t), this.GetVisible());
    i !== e && this.SetActive(e);
  }
  rJe(e, t) {
    this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
      this.InnerVisibleState,
      t,
      e,
    );
  }
  GetVisible() {
    return 0 === this.InnerVisibleState;
  }
}
exports.TopBuffItem = TopBuffItem;
//# sourceMappingURL=TopBuffItem.js.map
