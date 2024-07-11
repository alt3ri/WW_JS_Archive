"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionChooseMainPanelHandle = void 0);
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.lwo = void 0);
  }
  OnGetSuitableNavigationListenerList(i) {
    return !i ||
      UiNavigationGlobalData_1.UiNavigationGlobalData
        .VisionReplaceViewFindDefault
      ? this.DefaultNavigationListener
      : (this.lwo ||
          ((this.lwo = [...this.DefaultNavigationListener]),
          2 <= this.lwo.length &&
            ((i = this.lwo[0]),
            (this.lwo[0] = this.lwo[1]),
            (this.lwo[1] = i))),
        this.lwo);
  }
  OnNotifyFindResult(i) {
    i.IsInLoopingProcess() ||
      (UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
        !0);
  }
}
exports.VisionChooseMainPanelHandle = VisionChooseMainPanelHandle;
//# sourceMappingURL=VisionChooseMainPanelHandle.js.map
