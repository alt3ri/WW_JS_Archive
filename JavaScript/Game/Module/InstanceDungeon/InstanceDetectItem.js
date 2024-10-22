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
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDetectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.qai = void 0),
      (this.Gai = void 0),
      (this.Nai = void 0),
      (this.Oai = void 0),
      (this.kai = void 0),
      (this.Fai = void 0),
      (this.Vai = void 0);
  }
  async Init(i) {
    await super.CreateByActorAsync(i.GetOwner(), void 0, !0), await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async WZt() {
    (this.qai = new InstanceSeriesItem()),
      (this.Gai = new InstanceItem()),
      (this.Nai = new InstanceSeriesItem()),
      (this.Oai = new InstanceItem()),
      this.AddChild(this.Gai),
      this.AddChild(this.qai),
      this.AddChild(this.Nai),
      this.AddChild(this.Oai),
      await Promise.all([
        this.qai.CreateByActorAsync(this.GetItem(0).GetOwner()),
        this.Gai.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(),
        this.Nai.CreateByActorAsync(this.GetItem(2).GetOwner()),
        this.Oai.CreateByActorAsync(this.GetItem(3).GetOwner()).finally(),
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
    let e = this.qai,
      h = this.Gai;
    this.qai.SetUiActive(!s),
      this.Gai.SetUiActive(!s),
      this.Nai.SetUiActive(s),
      this.Oai.SetUiActive(s),
      s && ((h = this.Oai), (e = this.Nai)),
      i.InstanceSeriesTitle
        ? (h.SetUiActive(!1),
          e.SetUiActive(!0),
          (e.CurrentData = i).IsOnlyOneGrid
            ? (e.BindClickCallbackOnlyOneGrid(this.Fai),
              e.Update(i.InstanceGirdId, i.IsSelect, !0))
            : (e.BindClickCallback(this.kai),
              e.Update(i.InstanceSeriesTitle, i.IsSelect)))
        : (e.SetUiActive(!1),
          h.SetUiActive(!0),
          h.BindClickCallback(this.Fai),
          h.BindCanExecuteChange(this.Vai),
          h.Update(i.InstanceGirdId, i.IsSelect, i.IsShow));
  }
  GetActiveNameText() {
    return (
      this.qai.IsUiActiveInHierarchy()
        ? this.qai
        : this.Gai.IsUiActiveInHierarchy()
          ? this.Gai
          : this.Nai.IsUiActiveInHierarchy()
            ? this.Nai
            : this.Oai
    ).GetTitleText();
  }
  BindClickSeriesCallback(i) {
    this.kai = i;
  }
  BindClickInstanceCallback(i) {
    this.Fai = i;
  }
  BindCanExecuteChange(i) {
    this.Vai = i;
  }
  ClearItem() {
    this.Destroy();
  }
  GetExtendToggleForGuide() {
    if (this.Gai.GetActive()) return this.Gai.ExtendToggle;
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
      (this.$Ve = void 0),
      (this.Zqe = void 0),
      (this.Hai = void 0),
      (this.TDe = void 0),
      (this.jai = 0),
      (this.Wai = !1),
      (this.Kai = !1),
      (this.Qai = void 0),
      (this.Xai = !1),
      (this.CurrentData = void 0),
      (this.$ai = () => {
        var i =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        i &&
          ((i = i.GetActivityLevelCountdownText(this.jai)),
          this.GetText(8).SetText(i),
          StringUtils_1.StringUtils.IsEmpty(i)) &&
          ((this.Xai = !1), this.Update(this.jai, this.Wai, this.Kai));
      }),
      (this.OnClickExtendToggle = (i) => {
        1 === i &&
          ((this.Wai = !0),
          this.Zqe && this.Zqe(this.jai, this.$Ve, this.Wai),
          this.Hai) &&
          this.Hai(this.jai, this.$Ve, this.CurrentData);
      }),
      (this.Yai = (i) => {
        i = 1 === i;
        (this.Wai = i), this.GetItem(5)?.SetUIActive(i);
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
    (this.$Ve = this.GetExtendToggle(0)),
      this.$Ve.SetToggleState(0),
      this.$Ve.OnStateChange.Add(this.Yai),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.q7e();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  OnBeforeDestroy() {
    void 0 !== this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  q7e() {
    this.Xai && this.Qai?.();
  }
  GetTitleText() {
    return this.GetText(3);
  }
  Update(i, s, t = !1) {
    if (
      ((this.jai = i),
      (this.Wai = s),
      (this.Kai = t),
      this.$Ve.SetToggleStateForce(s ? 1 : 0),
      this.GetItem(5)?.SetUIActive(s),
      this.GetSprite(2)?.SetUIActive(!1),
      this.GetItem(1)?.SetUIActive(!1),
      t)
    ) {
      var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          this.jai,
        ),
        s =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.MapName),
          s && this.Hai && this.Hai(this.jai, this.$Ve, this.CurrentData),
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
                this.jai,
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RecommendLevel",
              s,
            ));
      } else
        TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()
          ? TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
              this.jai,
            )
            ? ((s =
                TowerDefenceController_1.TowerDefenseController.GetRecordByInstanceId(
                  this.jai,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                "TowerDefence_GPint",
                s,
              ))
            : ((s =
                TowerDefenceController_1.TowerDefenseController.GetTotalScoreLimitByInstanceId(
                  this.jai,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                "TowerDefence_PintOnlyMore",
                s,
              ))
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              i.SubInstanceTitle,
            );
    } else {
      (s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
        this.jai,
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
    (this.Xai = this.Jai(this.jai)), this.Xai && this.Qai?.(), this.zai(t);
  }
  Jai(i) {
    if (
      ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
        i,
      )
    ) {
      var t =
        ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (!t) return !1;
      this.Qai = this.$ai;
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
    this.Hai = i;
  }
  zai(i) {
    var t =
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        this.jai,
      );
    this.GetItem(4).SetUIActive(!i),
      i &&
        (t
          ? (this.GetItem(7).SetUIActive(!0), this.GetItem(6).SetUIActive(!1))
          : ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                this.jai,
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
      (this.Vai = void 0),
      (this.NUe = 0),
      (this.Lke = () => !this.Vai || this.Vai(this.NUe)),
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
      this.ExtendToggle.CanExecuteChange.Bind(this.Lke),
      t && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0),
      s && (this.zai(), this.Zai(), this.ehi());
  }
  zai() {
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
  Zai() {
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
  ehi() {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.NUe,
    ).DifficultyIcon;
    i && this.SetTextureByPath(i, this.GetTexture(1));
  }
  BindClickCallback(i) {
    this.Zqe = i;
  }
  BindCanExecuteChange(i) {
    this.Vai = i;
  }
}
exports.InstanceItem = InstanceItem;
//# sourceMappingURL=InstanceDetectItem.js.map
