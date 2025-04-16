"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedDollTipItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  LguiUtil_1 = require("../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedDollTipItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  ShowTips(e, i) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e),
      this.ShowAsync(),
      TimerSystem_1.TimerSystem.Delay(() => {
        this.HideAsync();
      }, i);
  }
}
exports.BigStuffedDollTipItem = BigStuffedDollTipItem;
//# sourceMappingURL=BigStuffedDollTipItem.js.map
