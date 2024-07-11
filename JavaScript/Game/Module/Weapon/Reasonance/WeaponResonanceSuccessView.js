"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponResonanceSuccessView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xUt = () => {
        UiManager_1.UiManager.CloseView("WeaponResonanceSuccessView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.xUt]]);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var i = e.WeaponIncId;
    var e = e.LastLevel;
    var i =
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
// # sourceMappingURL=WeaponResonanceSuccessView.js.map
