"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymDifficultyItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymDifficultyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.syi = -1),
      (this.OnToggleClick = void 0),
      (this.CanExecuteChangeCallBack = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      this.OnToggleClick &&
        (this.BtnBindInfo = [
          [
            0,
            () => {
              this.OnToggleClick?.(this.GridIndex);
            },
          ],
        ]);
  }
  OnStart() {
    this.CanExecuteChangeCallBack &&
      this.GetExtendToggle(0)?.CanExecuteChange.Bind(
        () => this.CanExecuteChangeCallBack?.(this.GridIndex) ?? !0,
      );
  }
  Refresh(t, i, e) {
    this.syi = t;
    var t =
        !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(
          this.syi,
        ) ||
        !ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.syi),
      t =
        (this.GetItem(2).SetUIActive(t),
        ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.syi)),
      r = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(this.syi),
      r =
        (this.GetItem(3).SetUIActive(r),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.GymTitle),
        i ? 1 : 0);
    this.GetExtendToggle(0).SetToggleState(r, !1);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
}
exports.LordGymDifficultyItem = LordGymDifficultyItem;
//# sourceMappingURL=LordGymDifficultyItem.js.map
