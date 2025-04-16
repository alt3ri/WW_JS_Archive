"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymUnlockTipView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LordGymController_1 = require("../LordGymController");
class LordGymUnlockTipView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this._yi(e);
  }
  _yi(e) {
    var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    r.IsNew
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "Text_LordGymNewDifficultyUnlock_Text",
        )
      : ((r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.GymTitle)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "LordGymUnLock",
          r,
        )),
      ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) ||
        LordGymController_1.LordGymController.ReadLordGym(e);
  }
  OnAfterPlayStartSequence() {
    this.CloseMe();
  }
}
exports.LordGymUnlockTipView = LordGymUnlockTipView;
//# sourceMappingURL=LordGymUnlockTipView.js.map
