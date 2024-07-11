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
      (this.Tsi = 0),
      (this.Lsi = 0),
      (this.j5e = void 0),
      (this.Xy = 0),
      (this.Lke = () => {
        var t = this.IsUnLock();
        return (
          t ||
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "InfluenceLockTips",
            ),
          t
        );
      }),
      (this.Dsi = (t) => {
        1 === t ? this.SetActiveToggleState() : this.Rsi(),
          this.j5e?.(t, this.Xy);
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
      (this.BtnBindInfo = [[2, this.Dsi]]);
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.Lke),
      (this.yGe = new ContentItem(this.GetItem(8))),
      this.yGe.SetActive(!1);
  }
  OnBeforeDestroy() {
    var t = this.GetExtendToggle(2);
    t.SetToggleState(0),
      t.CanExecuteChange.Unbind(),
      this.Ovt(),
      this.yGe.Destroy(),
      (this.yGe = void 0);
  }
  UpdateItem(t, i) {
    this.Lsi = t;
    var e =
      ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
        t,
      );
    e && (this.Tsi = e.Relation), this.Usi(t, i), this.K8e();
  }
  SetToggleState(t, i = !1) {
    this.GetExtendToggle(2).SetToggleState(t, i);
  }
  SetToggleFunction(t) {
    this.j5e = t;
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
    this.SetToggleState(0), this.Rsi();
  }
  Rsi() {
    this.yGe.SetActive(!1), this.K8e();
  }
  Usi(t, i) {
    var e = this.GetText(0),
      s = this.GetText(1),
      n = this.GetTexture(9);
    this.GetItem(5).SetUIActive(1 === this.Tsi),
      this.GetItem(3).SetUIActive(2 === this.Tsi),
      this.GetItem(6).SetUIActive(3 === this.Tsi),
      this.GetItem(7).SetUIActive(0 === this.Tsi),
      0 === this.Tsi
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
          this.yGe.UpdateItem(t, i, this.Tsi),
          2 === this.Tsi &&
            ((s =
              ModelManager_1.ModelManager.InfluenceReputationModel.GetReputationProgress(
                t,
              )),
            this.GetSprite(4).SetFillAmount(s.Current / s.Max)),
          n.SetUIActive(!0),
          this.SetTextureByPath(e.Logo, n));
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "InfluenceReward",
      this.GetItem(10),
      void 0,
      this.Lsi,
    );
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
  }
  IsUnLock() {
    return 0 !== this.Tsi;
  }
}
exports.InfluenceDisplayItem = InfluenceDisplayItem;
class ContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Lsi = 0),
      (this.z5t = 0),
      (this.qAt = () => {
        var t = { InfluenceId: this.Lsi, CountryId: this.z5t };
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
      (this.BtnBindInfo = [[1, this.qAt]]);
  }
  UpdateItem(t, i, e) {
    (this.Lsi = t), (this.z5t = i), this.Asi(), this.Usi(e);
  }
  Usi(t) {
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
  Asi() {
    var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      this.Lsi,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Introduction);
  }
  BindRedDot() {
    RedDotController_1.RedDotController.BindRedDot(
      "InfluenceReward",
      this.GetItem(2),
      void 0,
      this.Lsi,
    );
  }
}
//# sourceMappingURL=InfluenceDisplayItem.js.map
