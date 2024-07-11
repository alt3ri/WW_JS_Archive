"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DifficultUnlockTipView = exports.DifficultUnlockTipsData = void 0);
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class DifficultUnlockTipsData {
  constructor() {
    (this.Text = ""), (this.Params = []);
  }
}
exports.DifficultUnlockTipsData = DifficultUnlockTipsData;
class DifficultUnlockTipView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    const i = this.OpenParam;
    this.bl(i);
  }
  bl(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Text, i.Params);
  }
  OnAfterPlayStartSequence() {
    this.CloseMe();
  }
}
exports.DifficultUnlockTipView = DifficultUnlockTipView;
// # sourceMappingURL=DifficultUnlockTipView.js.map
