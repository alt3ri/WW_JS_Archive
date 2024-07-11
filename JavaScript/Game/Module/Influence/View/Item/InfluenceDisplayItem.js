"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceDisplayItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class InfluenceDisplayItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.yGe = void 0),
      (this.Ini = 0),
      (this.Tni = 0),
      (this.U4e = void 0),
      (this.Xy = 0),
      (this.T7e = () => {
        var t = this.IsUnLock();
        return (
          t ||
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "InfluenceLockTips",
            ),
          t
        );
      }),
      (this.Lni = (t) => {
        1 === t ? this.SetActiveToggleState() : this.Dni(),
          this.U4e?.(t, this.Xy);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIExtendToggle],
      [5, UE.UIItem],
      [4, UE.UISprite],
      [3, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIItem],
      [9, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[2, this.Lni]]);
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.T7e),
      (this.yGe = new ContentItem(this.GetItem(8))),
      this.yGe.SetActive(!1);
  }
  OnBeforeDestroy() {
    var t = this.GetExtendToggle(2);
    t.SetToggleState(0),
      t.CanExecuteChange.Unbind(),
      this.Dpt(),
      this.yGe.Destroy(),
      (this.yGe = void 0);
  }
  UpdateItem(t, i) {
    this.Tni = t;
    var e =
      ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
        t,
      );
    e && (this.Ini = e.Relation), this.Rni(t, i), this.x6e();
  }
  SetToggleState(t, i = !1) {
    this.GetExtendToggle(2).SetToggleState(t, i);
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetIndex(t) {
    this.Xy = t;
  }
  SetActiveToggleState() {
    this.yGe.SetActive(!0),
      this.yGe.BindRedDot(),
      this.GetItem(10).SetUIActive(!1);
  }
  SetDisActiveToggleState() {
    this.SetToggleState(0), this.Dni();
  }
  Dni() {
    this.yGe.SetActive(!1), this.x6e();
  }
  Rni(t, i) {
    var e = this.GetText(0),
      s = this.GetText(1),
      n = this.GetTexture(9);
    this.GetItem(5).SetUIActive(1 === this.Ini),
      this.GetItem(3).SetUIActive(2 === this.Ini),
      this.GetItem(6).SetUIActive(3 === this.Ini),
      this.GetItem(7).SetUIActive(0 === this.Ini),
      0 === this.Ini
        ? (e.SetUIActive(!1),
          n.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalText(s, "InfluenceLockName"))
        : ((e =
            ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
              t,
            )),
          (s = this.GetText(0)),
          e.ExtraDesc
            ? (s.SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalTextNew(s, e.ExtraDesc))
            : s.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
          this.yGe.UpdateItem(t, i, this.Ini),
          2 === this.Ini &&
            ((s =
              ModelManager_1.ModelManager.InfluenceReputationModel.GetReputationProgress(
                t,
              )),
            this.GetSprite(4).SetFillAmount(s.Current / s.Max)),
          n.SetUIActive(!0),
          this.SetTextureByPath(e.Logo, n));
  }
  x6e() {
    RedDotController_1.RedDotController.BindRedDot(
      "InfluenceReward",
      this.GetItem(10),
      void 0,
      this.Tni,
    );
  }
  Dpt() {
    RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
  }
  IsUnLock() {
    return 0 !== this.Ini;
  }
}
exports.InfluenceDisplayItem = InfluenceDisplayItem;
class ContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Tni = 0),
      (this.z4t = 0),
      (this.xUt = () => {
        var t = { InfluenceId: this.Tni, CountryId: this.z4t };
        UiManager_1.UiManager.OpenView("ReputationDetailsView", t);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.xUt]]);
  }
  UpdateItem(t, i, e) {
    (this.Tni = t), (this.z4t = i), this.Uni(), this.Rni(e);
  }
  Rni(t) {
    var i = this.GetButton(1),
      e = this.GetText(3);
    1 === t
      ? (i.RootUIComp.SetUIActive(!1),
        e.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(e, "InfluenceBelongTips"))
      : 3 === t
        ? (i.RootUIComp.SetUIActive(!1),
          e.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalText(e, "InfluenceHostilityTips"))
        : 2 === t
          ? (i.RootUIComp.SetUIActive(!0), e.SetUIActive(!1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("InfluenceReputation", 11, "出现未知关系类型", [
              "Relation",
              t,
            ]);
  }
  Uni() {
    var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      this.Tni,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Introduction);
  }
  BindRedDot() {
    RedDotController_1.RedDotController.BindRedDot(
      "InfluenceReward",
      this.GetItem(2),
      void 0,
      this.Tni,
    );
  }
}
//# sourceMappingURL=InfluenceDisplayItem.js.map
