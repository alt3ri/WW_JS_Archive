"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponResonanceSuccessView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qAt = () => {
        UiManager_1.UiManager.CloseView("WeaponResonanceSuccessView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.qAt]]);
  }
  OnBeforeShow() {
    var e = this.OpenParam,
      i = e.WeaponIncId,
      e = e.LastLevel,
      i =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          i,
        ).GetResonanceLevel();
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(1),
      "WeaponResonanceLevelText",
      e,
    ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "WeaponResonanceLevelText",
        i,
      );
  }
}
exports.WeaponResonanceSuccessView = WeaponResonanceSuccessView;
//# sourceMappingURL=WeaponResonanceSuccessView.js.map
