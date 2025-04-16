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
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  InstanceDungeonMapDefine_1 = require("./Define/InstanceDungeonMapDefine");
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
      (this.Rja = void 0),
      (this.Uja = void 0),
      (this.KD_ = void 0),
      (this.N3_ = void 0),
      (this.c_l = void 0),
      (this.R$l = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  OnRegisterComponent() {
    (this.R$l = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
        [2, UE.UIItem],
        [3, UE.UIItem],
      ]);
  }
  async WZt() {
    (this.qai = new InstanceSeriesItem()),
      (this.qai.OpenParam = this.R$l),
      (this.Gai = new InstanceItem()),
      (this.Gai.OpenParam = this.R$l),
      (this.Nai = new InstanceSeriesItem()),
      (this.Nai.OpenParam = this.R$l),
      (this.Oai = new InstanceItem()),
      (this.Oai.OpenParam = this.R$l),
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
  GetUsingItem(t) {
    var i =
      !ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
        t.InstanceGirdId,
      );
    if (t.InstanceSeriesTitle) {
      const e = i ? this.GetItem(0) : this.GetItem(2);
      return e.GetOwner();
    }
    const e = i ? this.GetItem(1) : this.GetItem(3);
    return e.GetOwner();
  }
  Update(t, i) {
    (this.Data = t), this.XD_(t.InstanceGirdId);
    var e =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
        t.InstanceGirdId,
      );
    let s = this.qai,
      h = this.Gai;
    this.qai.SetUiActive(!e),
      this.Gai.SetUiActive(!e),
      this.Nai.SetUiActive(e),
      this.Oai.SetUiActive(e),
      e && ((h = this.Oai), (s = this.Nai)),
      t.InstanceSeriesTitle
        ? (h.SetUiActive(!1),
          s.SetUiActive(!0),
          (s.CurrentData = t),
          s.BindCanShowRedDot(this.c_l),
          s && this.YD_(s, t.InstanceGirdId),
          this.N3_ && (s.IconRightPath = this.N3_(t.InstanceGirdId)),
          t.IsOnlyOneGrid
            ? (s.BindClickCallbackOnlyOneGrid(this.Fai),
              s.Update(t.InstanceGirdId, t.IsSelect, !0))
            : (s.BindClickCallback(this.kai),
              s.Update(t.InstanceSeriesTitle, t.IsSelect)))
        : (s.SetUiActive(!1),
          h.SetUiActive(!0),
          h.BindClickCallback(this.Fai),
          h.BindCanExecuteChange(this.Vai),
          h.Update(t.InstanceGirdId, t.IsSelect, t.IsShow));
  }
  UpdateSelf() {
    var t = this.Data,
      i =
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
          t.InstanceGirdId,
        );
    this.qai?.SetUiActive(!i), this.Nai?.SetUiActive(i);
    let e = this.qai;
    i && (e = this.Nai);
    i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      t.InstanceGirdId,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(e?.GetTitleText(), i.MapName),
      e && this.YD_(e, t.InstanceGirdId),
      e.RefreshSubtitleByIdAndArgs();
  }
  XD_(t) {
    let i = void 0;
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    t &&
      ((t = t.InstSubType),
      (i = InstanceDungeonMapDefine_1.instanceDetectItemGetterDataMap[t])),
      this.BindSubtitleTextIdGetter(i?.SubtitleTextIdGetter),
      this.BindSubtitleArgsGetter(i?.SubtitleArgsGetter),
      this.BindInstanceCheckFinishedGetter(i?.CheckFinishedGetter);
  }
  YD_(t, i) {
    (t.SubtitleTextId = this.Rja?.(i)),
      (t.SubtitleTextArgs = this.Uja?.(i)),
      t.RefreshSubtitleByIdAndArgs(),
      (t.HasOverrideFinishState = void 0 !== this.KD_),
      this.KD_ && (t.OverrideFinishState = this.KD_(i));
  }
  UpdateSelfByText(t) {
    var i = this.Data,
      i =
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
          i.InstanceGirdId,
        );
    this.qai?.SetUiActive(!i),
      this.Nai?.SetUiActive(i),
      i && this.Nai?.UpdateSubtitleByText(t);
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
  BindClickSeriesCallback(t) {
    this.kai = t;
  }
  BindClickInstanceCallback(t) {
    this.Fai = t;
  }
  BindCanExecuteChange(t) {
    this.Vai = t;
  }
  BindSubtitleTextIdGetter(t) {
    this.Rja = t;
  }
  BindSubtitleArgsGetter(t) {
    this.Uja = t;
  }
  BindInstanceCheckFinishedGetter(t) {
    this.KD_ = t;
  }
  BindCanShowRedDot(t) {
    this.c_l = t;
  }
  BindIconRightPathGetter(t) {
    this.N3_ = t;
  }
  ClearItem() {
    this.Destroy();
  }
  GetExtendToggleForGuide() {
    if (this.Gai.GetActive()) return this.Gai.ExtendToggle;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Guide",
        16,
        "聚焦引导索引到了副本标题, 检查extraParam字段是否配置错误",
      );
  }
  get InstanceId() {
    return this.Data.InstanceGirdId;
  }
}
exports.InstanceDetectItem = InstanceDetectItem;
class InstanceSeriesItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.$Ve = void 0),
      (this.Zqe = void 0),
      (this.Hai = void 0),
      (this.c_l = void 0),
      (this.TDe = void 0),
      (this.jai = 0),
      (this.Wai = !1),
      (this.Kai = !1),
      (this.Qai = void 0),
      (this.Xai = !1),
      (this.CurrentData = void 0),
      (this.SubtitleTextId = void 0),
      (this.SubtitleTextArgs = void 0),
      (this.HasOverrideFinishState = !1),
      (this.OverrideFinishState = !1),
      (this.IconRightPath = void 0),
      (this.R$l = void 0),
      (this.$ai = () => {
        var t =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        t &&
          ((t = t.GetActivityLevelCountdownText(this.jai)),
          this.GetText(8).SetText(t),
          StringUtils_1.StringUtils.IsEmpty(t)) &&
          ((this.Xai = !1), this.Update(this.jai, this.Wai, this.Kai));
      }),
      (this.m_l = (t) => {
        var i = this.R$l.InstanceByTitleMap.get(this.jai);
        i && i.includes(t) && this.BNe();
      }),
      (this.OnClickExtendToggle = (t) => {
        1 === t &&
          ((this.Wai = !0),
          this.Zqe && this.Zqe(this.jai, this.$Ve, this.Wai),
          this.Hai) &&
          this.Hai(this.jai, this.$Ve, this.CurrentData);
      }),
      (this.Yai = (t) => {
        t = 1 === t;
        (this.Wai = t), this.GetItem(5)?.SetUIActive(t);
      });
  }
  OnRegisterComponent() {
    (this.R$l = this.OpenParam),
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
        [9, UE.UIItem],
        [10, UE.UITexture],
      ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChallengeInstanceRedDot,
      this.m_l,
    ),
      (this.$Ve = this.GetExtendToggle(0)),
      this.$Ve.SetToggleState(0),
      this.$Ve.OnStateChange.Add(this.Yai),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.q7e();
      }, TimeUtil_1.TimeUtil.InverseMillisecond));
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChallengeInstanceRedDot,
      this.m_l,
    ),
      void 0 !== this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  q7e() {
    this.Xai && this.Qai?.();
  }
  GetTitleText() {
    return this.GetText(3);
  }
  GBl(t) {
    let i = void 0,
      e = void 0;
    for (var [s, h] of t) (i = s), (e = h);
    1 === i
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e)
      : 2 === i
        ? ((t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
              this.jai,
              ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            "RecommendLevel",
            t,
          ))
        : 3 === i &&
          this.SubtitleTextId &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            this.SubtitleTextId,
            this.SubtitleTextArgs,
          );
  }
  gCc() {
    var t, i;
    (TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
      this.jai,
    )
      ? ((t =
          TowerDefenceController_1.TowerDefenseController.CheckInstancePassedByInstanceId(
            this.jai,
          )),
        TowerDefenceController_1.TowerDefenseController.CheckIsChallengeInstanceByInstanceId(
          this.jai,
        )
          ? ((i =
              TowerDefenceController_1.TowerDefenseController.GetPassTimeContentByInstanceId(
                this.jai,
              )),
            t
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(8),
                  "TowerDefenceBestTime",
                  i,
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(8),
                  "Text_NotFinished_Text",
                ))
          : ((i =
              TowerDefenceController_1.TowerDefenseController.GetRecordByInstanceId(
                this.jai,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "TowerDefence_GPint",
              i,
            )),
        this.GetItem(6).SetUIActive(t),
        this.GetItem(7))
      : ((i =
          TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownText(
            this.jai,
          )) && this.GetText(8)?.SetText(i),
        this.GetItem(7).SetUIActive(!0),
        this.GetItem(6))
    ).SetUIActive(!1);
  }
  CCc(t) {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.jai,
      ),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.MapName),
        t && this.Hai && this.Hai(this.jai, this.$Ve, this.CurrentData),
        i.DifficultyIcon),
      t =
        (this.GetSprite(2)?.SetUIActive(!0),
        this.GetItem(1)?.SetUIActive(!0),
        this.SetTextureByPath(t, this.GetTexture(2)),
        this.GetText(8)?.SetUIActive(!0),
        i.SubTitle);
    if (0 < t?.size) this.GBl(t);
    else {
      if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow())
        return this.gCc(), !1;
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(
        this.GetText(8),
        i?.SubInstanceTitle,
      );
    }
    return !0;
  }
  pCc() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
        this.jai,
      ),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.CommonText),
        this.GetText(8)?.SetUIActive(!1),
        t.IconTexture);
    t &&
      (this.GetSprite(2)?.SetUIActive(!0),
      this.GetItem(1)?.SetUIActive(!0),
      this.SetTextureByPath(t, this.GetTexture(2)));
  }
  Update(t, i, e = !1) {
    if (
      ((this.jai = t),
      (this.Wai = i),
      (this.Kai = e),
      this.$Ve.SetToggleStateForce(i ? 1 : 0),
      this.GetItem(5)?.SetUIActive(i),
      this.GetSprite(2)?.SetUIActive(!1),
      this.TrySetTextureByPath(this.IconRightPath, this.GetTexture(10)),
      this.GetItem(1)?.SetUIActive(!1),
      this.BNe(),
      e)
    ) {
      if (!this.CCc(i)) return;
    } else this.pCc();
    (this.Xai = this.Jai(this.jai)),
      this.Xai && this.Qai?.(),
      this.zai(e),
      this.zD_();
  }
  UpdateSubtitleByText(t) {
    this.GetText(8)?.SetText(t);
  }
  RefreshSubtitleByIdAndArgs() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(
      this.GetText(8),
      this.SubtitleTextId,
      this.SubtitleTextArgs,
    );
  }
  Jai(t) {
    if (
      ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
        t,
      )
    ) {
      var i =
        ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (!i) return !1;
      this.Qai = this.$ai;
      var e = i.GetActivityLevelUnlockState(t);
      return (
        e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            "ActivityMowing_Point",
            i.GetLevelMaxPoint(t),
          ),
        !e
      );
    }
    return !1;
  }
  zD_() {
    this.HasOverrideFinishState &&
      this.GetItem(6).SetUIActive(this.OverrideFinishState);
  }
  BindClickCallback(t) {
    this.Zqe = t;
  }
  BindClickCallbackOnlyOneGrid(t) {
    this.Hai = t;
  }
  BindCanShowRedDot(t) {
    this.c_l = t;
  }
  zai(t) {
    var i =
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
        this.jai,
      );
    this.GetItem(4).SetUIActive(!t),
      t &&
        (i
          ? (this.GetItem(7).SetUIActive(!0), this.GetItem(6).SetUIActive(!1))
          : ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                this.jai,
              )
            ? (this.GetItem(7).SetUIActive(!1), this.GetItem(6).SetUIActive(!0))
            : (this.GetItem(7).SetUIActive(!1),
              this.GetItem(6).SetUIActive(!1)));
  }
  BNe() {
    this.c_l && this.c_l(this.jai)
      ? this.GetItem(9)?.SetUIActive(!0)
      : this.GetItem(9)?.SetUIActive(!1);
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
      (this.R$l = void 0),
      (this.m_l = (t) => {
        this.NUe === t && this.GOl();
      }),
      (this.Lke = () => !this.Vai || this.Vai(this.NUe)),
      (this.OnClickExtendToggle = (t) => {
        1 === t && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0);
      });
  }
  OnRegisterComponent() {
    (this.R$l = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIExtendToggle],
        [2, UE.UIText],
        [1, UE.UITexture],
        [3, UE.UIItem],
        [4, UE.UIItem],
        [5, UE.UIExtendToggleTextureTransition],
        [6, UE.UIItem],
        [7, UE.UIItem],
      ]),
      (this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
  }
  OnStart() {
    (this.ExtendToggle = this.GetExtendToggle(0)),
      this.ExtendToggle.SetToggleState(0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChallengeInstanceRedDot,
        this.m_l,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChallengeInstanceRedDot,
      this.m_l,
    );
  }
  GetTitleText() {
    return this.GetText(2);
  }
  Update(t, i, e) {
    (this.NUe = t),
      this.ExtendToggle.SetToggleStateForce(i ? 1 : 0),
      this.ExtendToggle.CanExecuteChange.Unbind(),
      this.ExtendToggle.CanExecuteChange.Bind(this.Lke),
      i && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0),
      e && (this.zai(), this.Zai(), this.ehi(), this.vCc(), this.GOl());
  }
  zai() {
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(
      this.NUe,
    )
      ? (this.GetItem(3).SetUIActive(!0), this.GetItem(4).SetUIActive(!1))
      : this.R$l.IsFinishInstance(this.NUe)
        ? (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0))
        : (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!1));
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
      let t = void 0,
        i = void 0;
      for (var [h, r] of e) (t = h), (i = r);
      void (1 === t
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i)
        : 2 === t &&
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
    var t = this.R$l.GetInstanceDetectItemIcon(this.NUe);
    StringUtils_1.StringUtils.IsBlank(t)
      ? this.GetItem(6)?.SetUIActive(!1)
      : (this.GetItem(6)?.SetUIActive(!0),
        this.SetTextureByPath(t, this.GetTexture(1)));
  }
  vCc() {
    var t = this.R$l?.GetInstanceItemTextureBg(this.NUe) ?? "";
    StringUtils_1.StringUtils.IsBlank(t) ||
      ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
      this.SetExtendToggleTextureTransitionByPath(
        t,
        this.GetUiExtendToggleTextureTransition(5),
        0,
      ));
  }
  GOl() {
    var t = this.R$l?.CheckInstanceItemHasRedDot(this.NUe) ?? !1;
    this.GetItem(7)?.SetUIActive(t);
  }
  BindClickCallback(t) {
    this.Zqe = t;
  }
  BindCanExecuteChange(t) {
    this.Vai = t;
  }
}
exports.InstanceItem = InstanceItem;
//# sourceMappingURL=InstanceDetectItem.js.map
