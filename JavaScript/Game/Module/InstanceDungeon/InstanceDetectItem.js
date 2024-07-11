"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceItem =
    exports.InstanceSeriesItem =
    exports.InstanceDetectItem =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController"),
  LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDetectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.qsi = void 0),
      (this.Gsi = void 0),
      (this.Nsi = void 0),
      (this.Osi = void 0),
      (this.ksi = void 0),
      (this.Fsi = void 0),
      (this.Vsi = void 0);
  }
  async Init(i) {
    await super.CreateByActorAsync(i.GetOwner(), void 0, !0), await this.Wzt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async Wzt() {
    (this.qsi = new InstanceSeriesItem()),
      (this.Gsi = new InstanceItem()),
      (this.Nsi = new InstanceSeriesItem()),
      (this.Osi = new InstanceItem()),
      this.AddChild(this.Gsi),
      this.AddChild(this.qsi),
      this.AddChild(this.Nsi),
      this.AddChild(this.Osi),
      await Promise.all([
        this.qsi.CreateByActorAsync(this.GetItem(0).GetOwner()),
        this.Gsi.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(),
        this.Nsi.CreateByActorAsync(this.GetItem(2).GetOwner()),
        this.Osi.CreateByActorAsync(this.GetItem(3).GetOwner()).finally(),
      ]);
  }
  GetUsingItem(i) {
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        i.InstanceGirdId,
      );
    if (i.InstanceSeriesTitle) {
      const s = t ? this.GetItem(0) : this.GetItem(2);
      return s.GetOwner();
    }
    const s = t ? this.GetItem(1) : this.GetItem(3);
    return s.GetOwner();
  }
  Update(i, t) {
    this.Data = i;
    var s =
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        i.InstanceGirdId,
      );
    let e = this.qsi,
      h = this.Gsi;
    this.qsi.SetUiActive(!s),
      this.Gsi.SetUiActive(!s),
      this.Nsi.SetUiActive(s),
      this.Osi.SetUiActive(s),
      s && ((h = this.Osi), (e = this.Nsi)),
      i.InstanceSeriesTitle
        ? (h.SetUiActive(!1),
          e.SetUiActive(!0),
          (e.CurrentData = i).IsOnlyOneGrid
            ? (e.BindClickCallbackOnlyOneGrid(this.Fsi),
              e.Update(i.InstanceGirdId, i.IsSelect, !0))
            : (e.BindClickCallback(this.ksi),
              e.Update(i.InstanceSeriesTitle, i.IsSelect)))
        : (e.SetUiActive(!1),
          h.SetUiActive(!0),
          h.BindClickCallback(this.Fsi),
          h.BindCanExecuteChange(this.Vsi),
          h.Update(i.InstanceGirdId, i.IsSelect, i.IsShow));
  }
  GetActiveNameText() {
    return (
      this.qsi.IsUiActiveInHierarchy()
        ? this.qsi
        : this.Gsi.IsUiActiveInHierarchy()
          ? this.Gsi
          : this.Nsi.IsUiActiveInHierarchy()
            ? this.Nsi
            : this.Osi
    ).GetTitleText();
  }
  BindClickSeriesCallback(i) {
    this.ksi = i;
  }
  BindClickInstanceCallback(i) {
    this.Fsi = i;
  }
  BindCanExecuteChange(i) {
    this.Vsi = i;
  }
  ClearItem() {
    this.Destroy();
  }
  GetExtendToggleForGuide() {
    if (this.Gsi.GetActive()) return this.Gsi.ExtendToggle;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Guide",
        17,
        "聚焦引导索引到了副本标题, 检查extraParam字段是否配置错误",
      );
  }
}
exports.InstanceDetectItem = InstanceDetectItem;
class InstanceSeriesItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.b5e = void 0),
      (this.Zqe = void 0),
      (this.Hsi = void 0),
      (this.TDe = void 0),
      (this.jsi = 0),
      (this.Wsi = !1),
      (this.Ksi = !1),
      (this.Qsi = void 0),
      (this.Xsi = !1),
      (this.CurrentData = void 0),
      (this.$si = () => {
        var i =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        i &&
          ((i = i.GetActivityLevelCountdownText(this.jsi)),
          this.GetText(8).SetText(i),
          StringUtils_1.StringUtils.IsEmpty(i)) &&
          ((this.Xsi = !1), this.Update(this.jsi, this.Wsi, this.Ksi));
      }),
      (this.OnClickExtendToggle = (i) => {
        1 === i &&
          ((this.Wsi = !0),
          this.Zqe && this.Zqe(this.jsi, this.b5e, this.Wsi),
          this.Hsi) &&
          this.Hsi(this.jsi, this.b5e, this.CurrentData);
      }),
      (this.Ysi = (i) => {
        i = 1 === i;
        (this.Wsi = i), this.GetItem(5)?.SetUIActive(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [6, UE.UIItem],
      [4, UE.UIItem],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.b5e = this.GetExtendToggle(0)),
      this.b5e.SetToggleState(0),
      this.b5e.OnStateChange.Add(this.Ysi),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.E9e();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  OnBeforeDestroy() {
    void 0 !== this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  E9e() {
    this.Xsi && this.Qsi?.();
  }
  GetTitleText() {
    return this.GetText(3);
  }
  Update(i, s, t = !1) {
    if (
      ((this.jsi = i),
      (this.Wsi = s),
      (this.Ksi = t),
      this.b5e.SetToggleStateForce(s ? 1 : 0),
      this.GetItem(5)?.SetUIActive(s),
      this.GetSprite(2)?.SetUIActive(!1),
      this.GetItem(1)?.SetUIActive(!1),
      t)
    ) {
      var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          this.jsi,
        ),
        s =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.MapName),
          s && this.Hsi && this.Hsi(this.jsi, this.b5e, this.CurrentData),
          i.DifficultyIcon),
        s =
          (this.GetSprite(2)?.SetUIActive(!0),
          this.GetItem(1)?.SetUIActive(!0),
          this.SetTextureByPath(s, this.GetTexture(2)),
          this.GetText(8)?.SetUIActive(!0),
          i.SubTitle);
      if (0 < s?.size) {
        let i = void 0,
          t = void 0;
        for (var [e, h] of s) (i = e), (t = h);
        1 === i
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t)
          : 2 === i &&
            ((s =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                this.jsi,
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RecommendLevel",
              s,
            ));
      } else
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(8),
          i.SubInstanceTitle,
        );
    } else {
      (s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
        this.jsi,
      )),
        (i =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s.CommonText),
          this.GetText(8)?.SetUIActive(!1),
          s.IconTexture));
      i &&
        (this.GetSprite(2)?.SetUIActive(!0),
        this.GetItem(1)?.SetUIActive(!0),
        this.SetTextureByPath(i, this.GetTexture(2)));
    }
    (this.Xsi = this.Jsi(this.jsi)), this.Xsi && this.Qsi?.(), this.zsi(t);
  }
  Jsi(i) {
    if (
      ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
        i,
      )
    ) {
      var t =
        ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (!t) return !1;
      this.Qsi = this.$si;
      var s = t.GetActivityLevelUnlockState(i);
      return (
        s &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            "ActivityMowing_Point",
            t.GetLevelMaxPoint(i),
          ),
        !s
      );
    }
    return !1;
  }
  BindClickCallback(i) {
    this.Zqe = i;
  }
  BindClickCallbackOnlyOneGrid(i) {
    this.Hsi = i;
  }
  zsi(i) {
    var t =
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        this.jsi,
      );
    this.GetItem(4).SetUIActive(!i),
      i &&
        (t
          ? (this.GetItem(7).SetUIActive(!0), this.GetItem(6).SetUIActive(!1))
          : ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                this.jsi,
              )
            ? (this.GetItem(7).SetUIActive(!1), this.GetItem(6).SetUIActive(!0))
            : (this.GetItem(7).SetUIActive(!1),
              this.GetItem(6).SetUIActive(!1)));
  }
}
exports.InstanceSeriesItem = InstanceSeriesItem;
class InstanceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.ExtendToggle = void 0),
      (this.Zqe = void 0),
      (this.Vsi = void 0),
      (this.NUe = 0),
      (this.T7e = () => !this.Vsi || this.Vsi(this.NUe)),
      (this.OnClickExtendToggle = (i) => {
        1 === i && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [2, UE.UIText],
      [1, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.ExtendToggle = this.GetExtendToggle(0)),
      this.ExtendToggle.SetToggleState(0);
  }
  GetTitleText() {
    return this.GetText(2);
  }
  Update(i, t, s) {
    (this.NUe = i),
      this.ExtendToggle.SetToggleStateForce(t ? 1 : 0),
      this.ExtendToggle.CanExecuteChange.Unbind(),
      this.ExtendToggle.CanExecuteChange.Bind(this.T7e),
      t && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0),
      s && (this.zsi(), this.Zsi(), this.eai());
  }
  zsi() {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
      this.NUe,
    )
      ? ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
          this.NUe,
        )
        ? (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0))
        : (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!1))
      : (this.GetItem(3).SetUIActive(!0), this.GetItem(4).SetUIActive(!1));
  }
  Zsi() {
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        this.NUe,
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      ),
      s = s.SubTitle;
    if (0 < s?.size) {
      let i = void 0,
        t = void 0;
      for (var [h, r] of s) (i = h), (t = r);
      void (1 === i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t)
        : 2 === i &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "RecommendLevel",
            e,
          ));
    } else
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "InstanceDungeonRecommendLevel",
        e,
      );
  }
  eai() {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    ).DifficultyIcon;
    i && this.SetTextureByPath(i, this.GetTexture(1));
  }
  BindClickCallback(i) {
    this.Zqe = i;
  }
  BindCanExecuteChange(i) {
    this.Vsi = i;
  }
}
exports.InstanceItem = InstanceItem;
//# sourceMappingURL=InstanceDetectItem.js.map
