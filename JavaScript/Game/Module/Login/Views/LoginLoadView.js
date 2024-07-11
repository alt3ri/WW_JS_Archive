"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginLoadView = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class LoginLoadView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.xvi = void 0),
      (this.FEi = void 0),
      this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    (this.xvi = this.GetText(1)), (this.FEi = this.GetText(2));
  }
  SetDownLoadTipsTextActive(e) {
    this.FEi.SetUIActive(e);
  }
  SetDownLoadTipsText(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.FEi, e);
  }
  SetProgressSprite(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
  SetProgressText(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.xvi, e, i);
  }
}
exports.LoginLoadView = LoginLoadView;
//# sourceMappingURL=LoginLoadView.js.map
