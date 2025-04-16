"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionLevelUpSettingPopView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class VisionLevelUpSettingPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.c1l = 0),
      (this.tBt = 0),
      (this.m1l = () => {
        this.SetPutInMode(0);
      }),
      (this.d1l = () => {
        this.SetPutInMode(1);
      }),
      (this.C1l = () => {
        this.SetUseType(0);
      }),
      (this.g1l = () => {
        this.SetUseType(1);
      }),
      (this.p1l = () => {
        this.CloseMe();
      }),
      (this.xco = () => {
        this.SaveSetting(), this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.m1l],
        [1, this.d1l],
        [2, this.C1l],
        [3, this.g1l],
        [4, this.p1l],
        [5, this.xco],
      ]);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PhantomBattleModel;
    (this.c1l = i.GetVisionLevelUpMaterialPutInMode()),
      (this.tBt = i.GetVisionLevelUpMaterialUseType()),
      this.Refresh();
  }
  Refresh() {
    this.RefreshPutInModeToggle(), this.RefreshUseTypeToggle();
  }
  RefreshPutInModeToggle() {
    let i = void 0,
      t = void 0;
    (t = 0 === this.c1l ? ((i = 1), 0) : ((i = 0), 1)),
      this.GetExtendToggle(0)?.SetToggleState(i),
      this.GetExtendToggle(1)?.SetToggleState(t);
  }
  RefreshUseTypeToggle() {
    let i = void 0,
      t = void 0;
    (t = 0 === this.tBt ? ((i = 1), 0) : ((i = 0), 1)),
      this.GetExtendToggle(2)?.SetToggleState(i),
      this.GetExtendToggle(3)?.SetToggleState(t);
  }
  SetPutInMode(i) {
    (this.c1l = i), this.RefreshPutInModeToggle();
  }
  SetUseType(i) {
    (this.tBt = i), this.RefreshUseTypeToggle();
  }
  SaveSetting() {
    var i = ModelManager_1.ModelManager.PhantomBattleModel;
    i.SetVisionLevelUpMaterialPutInMode(this.c1l),
      i.SetVisionLevelUpMaterialUseType(this.tBt);
  }
}
exports.VisionLevelUpSettingPopView = VisionLevelUpSettingPopView;
//# sourceMappingURL=VisionLevelUpSettingPopView.js.map
