"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymUnlockTipView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymUnlockTipView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    const e = this.OpenParam;
    this._Ei(e);
  }
  _Ei(e) {
    (e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e)),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.GymTitle));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "LordGymUnLock", e);
  }
  OnAfterPlayStartSequence() {
    this.CloseMe();
  }
}
exports.LordGymUnlockTipView = LordGymUnlockTipView;
// # sourceMappingURL=LordGymUnlockTipView.js.map
