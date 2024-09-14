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
      (this.Vai = void 0),
      (this.D9a = void 0),
      (this.R9a = void 0);
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
      const e = t ? this.GetItem(0) : this.GetItem(2);
      return e.GetOwner();
    }
    const e = t ? this.GetItem(1) : this.GetItem(3);
    return e.GetOwner();
  }
  Update(i, t) {
    this.Data = i;
    var e =
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        i.InstanceGirdId,
      );
    let s = this.qai,
      h = this.Gai;
    this.qai.SetUiActive(!e),
      this.Gai.SetUiActive(!e),
      this.Nai.SetUiActive(e),
      this.Oai.SetUiActive(e),
      e && ((h = this.Oai), (s = this.Nai)),
      i.InstanceSeriesTitle
        ? (h.SetUiActive(!1),
          s.SetUiActive(!0),
          (s.CurrentData = i),
          this.D9a && (s.SubtitleTextId = this.D9a(i.InstanceGirdId)),
          this.R9a && (s.SubtitleTextArgs = this.R9a(i.InstanceGirdId)),
          i.IsOnlyOneGrid
            ? (s.BindClickCallbackOnlyOneGrid(this.Fai),
              s.Update(i.InstanceGirdId, i.IsSelect, !0))
            : (s.BindClickCallback(this.kai),
              s.Update(i.InstanceSeriesTitle, i.IsSelect)))
        : (s.SetUiActive(!1),
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
  BindSubtitleTextIdGetter(i) {
    this.D9a = i;
  }
  BindSubtitleArgsGetter(i) {
    this.R9a = i;
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
      (this.SubtitleTextId = void 0),
      (this.SubtitleTextArgs = void 0),
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
  Update(i, e, t = !1) {
    if (
      ((this.jai = i),
      (this.Wai = e),
      (this.Kai = t),
      this.$Ve.SetToggleStateForce(e ? 1 : 0),
      this.GetItem(5)?.SetUIActive(e),
      this.GetSprite(2)?.SetUIActive(!1),
      this.GetItem(1)?.SetUIActive(!1),
      t)
    ) {
      var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          this.jai,
        ),
        e =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.MapName),
          e && this.Hai && this.Hai(this.jai, this.$Ve, this.CurrentData),
          i.DifficultyIcon),
        e =
          (this.GetSprite(2)?.SetUIActive(!0),
          this.GetItem(1)?.SetUIActive(!0),
          this.SetTextureByPath(e, this.GetTexture(2)),
          this.GetText(8)?.SetUIActive(!0),
          i.SubTitle);
      if (0 < e?.size) {
        let i = void 0,
          t = void 0;
        for (var [s, h] of e) (i = s), (t = h);
        1 === i
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t)
          : 2 === i
            ? ((e =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                  this.jai,
                  ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                "RecommendLevel",
                e,
              ))
            : 3 === i &&
              this.SubtitleTextId &&
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                this.SubtitleTextId,
                this.SubtitleTextArgs,
              );
      } else {
        if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow())
          return void (
            TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
              this.jai,
            )
              ? ((e =
                  TowerDefenceController_1.TowerDefenseController.CheckInstancePassedByInstanceId(
                    this.jai,
                  )),
                TowerDefenceController_1.TowerDefenseController.CheckIsChallengeInstanceByInstanceId(
                  this.jai,
                )
                  ? ((r =
                      TowerDefenceController_1.TowerDefenseController.GetPassTimeContentByInstanceId(
                        this.jai,
                      )),
                    e
                      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                          this.GetText(8),
                          "TowerDefenceBestTime",
                          r,
                        )
                      : LguiUtil_1.LguiUtil.SetLocalTextNew(
                          this.GetText(8),
                          "Text_NotFinished_Text",
                        ))
                  : ((r =
                      TowerDefenceController_1.TowerDefenseController.GetRecordByInstanceId(
                        this.jai,
                      )),
                    LguiUtil_1.LguiUtil.SetLocalTextNew(
                      this.GetText(8),
                      "TowerDefence_GPint",
                      r,
                    )),
                this.GetItem(6).SetUIActive(e),
                this.GetItem(7))
              : ((r =
                  TowerDefenceController_1.TowerDefenseController.GetTotalScoreLimitByInstanceId(
                    this.jai,
                  )),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(8),
                  "TowerDefence_PintOnlyMore",
                  r,
                ),
                this.GetItem(7).SetUIActive(!0),
                this.GetItem(6))
          ).SetUIActive(!1);
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(8),
          i.SubInstanceTitle,
        );
      }
    } else {
      var e =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
            this.jai,
          ),
        r =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.CommonText),
          this.GetText(8)?.SetUIActive(!1),
          e.IconTexture);
      r &&
        (this.GetSprite(2)?.SetUIActive(!0),
        this.GetItem(1)?.SetUIActive(!0),
        this.SetTextureByPath(r, this.GetTexture(2)));
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
      var e = t.GetActivityLevelUnlockState(i);
      return (
        e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            "ActivityMowing_Point",
            t.GetLevelMaxPoint(i),
          ),
        !e
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
  Update(i, t, e) {
    (this.NUe = i),
      this.ExtendToggle.SetToggleStateForce(t ? 1 : 0),
      this.ExtendToggle.CanExecuteChange.Unbind(),
      this.ExtendToggle.CanExecuteChange.Bind(this.Lke),
      t && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0),
      e && (this.zai(), this.Zai(), this.ehi());
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
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        this.NUe,
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      ),
      e = e.SubTitle;
    if (0 < e?.size) {
      let i = void 0,
        t = void 0;
      for (var [h, r] of e) (i = h), (t = r);
      void (1 === i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t)
        : 2 === i &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "RecommendLevel",
            s,
          ));
    } else
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "InstanceDungeonRecommendLevel",
        s,
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
