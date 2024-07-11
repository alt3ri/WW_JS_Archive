"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionChooseMainPanelHandle = void 0);
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.aBo = void 0);
  }
  OnGetSuitableNavigationListenerList(i) {
    return !i ||
      UiNavigationGlobalData_1.UiNavigationGlobalData
        .VisionReplaceViewFindDefault
      ? this.DefaultNavigationListener
      : (this.aBo ||
          ((this.aBo = [...this.DefaultNavigationListener]),
          2 <= this.aBo.length &&
            ((i = this.aBo[0]),
            (this.aBo[0] = this.aBo[1]),
            (this.aBo[1] = i))),
        this.aBo);
  }
  OnNotifyFindResult(i) {
    i.IsInLoopingProcess() ||
      (UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
        !0);
  }
}
exports.VisionChooseMainPanelHandle = VisionChooseMainPanelHandle;
//# sourceMappingURL=VisionChooseMainPanelHandle.js.map
