"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingLevelUpView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../../../../Ui/Base/UiSequencePlayer"),
  UiTickViewBase_1 = require("../../../../../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  BuildingLevelUpViewController_1 = require("./BuildingLevelUpViewController");
class BuildingLevelUpView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Hwt = void 0),
      (this.qIa = void 0),
      (this.GIa = !1),
      (this.aOn =
        new BuildingLevelUpViewController_1.BuildingLevelUpViewController());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISliderComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UITexture],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.aOn.CloseSelf]]);
  }
  OnStart() {
    this.aOn.RegisterView(this),
      this.aOn.Start(),
      (this.Hwt = this.GetSlider(0)),
      (this.qIa = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(13))),
      this.SetFillAmount(0);
  }
  OnTick(i) {
    this.aOn.Tick(i);
  }
  InitUnlock(i) {
    var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i),
      i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        i.AssociateRole,
      ),
      t =
        (this.GetSlider(0)?.RootUIComp.SetUIActive(!0),
        this.GetItem(2)?.SetUIActive(!1),
        this.GetButton(6)?.RootUIComp.SetUIActive(!1),
        this.GetButton(5));
    t?.OnPointDownCallBack.Bind(this.aOn.UnlockPress),
      t?.OnPointUpCallBack.Bind(this.aOn.UnlockRelease),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Moonfiesta_StartBuild",
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(9),
        i.BuildSuccessDialog,
      ),
      this.SetTextureByPath(i.SmallHeadIcon, this.GetTexture(8)),
      this.GetItem(10)?.SetUIActive(!0),
      this.GetItem(11)?.SetUIActive(!1),
      this.GetItem(12)?.SetUIActive(!1);
  }
  ShowUnlock() {
    this.GetText(1)?.SetUIActive(!1),
      this.GetButton(5)?.RootUIComp.SetUIActive(!1);
  }
  FinishUnlock(i) {
    var t =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          i,
        ),
      i =
        (this.GetSlider(0)?.RootUIComp.SetUIActive(!1),
        this.GetItem(2)?.SetUIActive(!0),
        this.GetText(1)?.SetUIActive(!0),
        this.GetButton(6)?.RootUIComp.SetUIActive(!0),
        ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i)),
      i =
        (this.SetTextureByPath(i.BuildingTexture, this.GetTexture(7)),
        t.GetLevelUpIncreaseDesc());
    this.GetText(4)?.SetText(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Moonfiesta_BuildingTips_Built",
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Moonfiesta_ClickContinue",
      ),
      this.GetItem(10)?.SetUIActive(!1),
      this.GetItem(11)?.SetUIActive(!0),
      this.GetItem(12)?.SetUIActive(!0);
  }
  InitLevelUp(i) {
    this.GetSlider(0)?.RootUIComp.SetUIActive(!1),
      this.GetItem(2)?.SetUIActive(!1),
      this.GetButton(5)?.RootUIComp.SetUIActive(!1),
      this.GetButton(6)?.RootUIComp.SetUIActive(!1);
    i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    this.SetTextureByPath(i.BuildingTexture, this.GetTexture(7)),
      this.GetItem(10)?.SetUIActive(!1),
      this.GetItem(11)?.SetUIActive(!0),
      this.GetItem(12)?.SetUIActive(!0);
  }
  ShowLevelUp() {
    this.GetText(1)?.SetUIActive(!1);
  }
  FinishLevelUp(i) {
    (i =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        i,
      )),
      this.GetItem(2)?.SetUIActive(!0),
      this.GetText(1)?.SetUIActive(!0),
      this.GetButton(6)?.RootUIComp.SetUIActive(!0),
      (i = i.GetLevelUpIncreaseDesc());
    this.GetText(4)?.SetText(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Moonfiesta_BuildingTips_Built",
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Moonfiesta_ClickContinue",
      );
  }
  SetFillAmount(i) {
    this.Hwt.SetValue(i);
  }
  PlayBuildingLoopSequence(i) {
    this.GIa !== i &&
      ((this.GIa = i)
        ? this.qIa.PlaySequence("Loop")
        : this.qIa.StopPrevSequence(!1, !0));
  }
}
exports.BuildingLevelUpView = BuildingLevelUpView;
//# sourceMappingURL=BuildingLevelUpView.js.map
