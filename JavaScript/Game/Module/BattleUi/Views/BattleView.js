"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleView = void 0);
const UE = require("ue"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  BottomPanel_1 = require("./BattleChildViewPanel/BottomPanel"),
  CenterPanel_1 = require("./BattleChildViewPanel/CenterPanel"),
  ChatPanel_1 = require("./BattleChildViewPanel/ChatPanel"),
  FormationPanel_1 = require("./BattleChildViewPanel/FormationPanel"),
  GamepadSkillButtonPanel_1 = require("./BattleChildViewPanel/GamepadSkillButtonPanel"),
  MissionPanel_1 = require("./BattleChildViewPanel/MissionPanel"),
  PositionPanel_1 = require("./BattleChildViewPanel/PositionPanel"),
  SkillButtonPanel_1 = require("./BattleChildViewPanel/SkillButtonPanel"),
  TopPanel_1 = require("./BattleChildViewPanel/TopPanel"),
  BossStatePanel_1 = require("./BossState/BossStatePanel"),
  FullScreenPanel_1 = require("./FullScreenPanel"),
  BattleHeadStatePanel_1 = require("./HeadState/BattleHeadStatePanel"),
  PartStatePanel_1 = require("./PartStatePanel"),
  CHECK_DESTROY_TIME = 5e3,
  battleUiChildren = [0, 14, 15, 16, 17, 18, 19, 20];
class BattleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Fot = void 0),
      (this.Vot = void 0),
      (this.NKa = void 0),
      (this.FKa = void 0),
      (this.Hot = void 0),
      (this.jot = void 0),
      (this.VKa = !1),
      (this.Wot = !1),
      (this.Kot = new Map()),
      (this.Qot = []),
      (this.Xot = new UE.Vector()),
      (this.Yot = 0),
      (this.Jot = !1),
      (this.zot = void 0),
      (this.Zot = () => {
        this.Fot.RefreshCurrentRole();
      }),
      (this.ert = () => {
        var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        e?.RoleConfig && this.trt(2 === e.RoleConfig.RoleType);
      }),
      (this.fHe = () => {
        this.Fot.RefreshCurrentRole();
      }),
      (this.irt = () => {
        this.IsShow && this.SetActive(!0);
      }),
      (this.Jpe = (e, t, i) => {
        t?.Valid &&
          (this.Fot.OnCreateEntity(t.Entity),
          this.Vot.OnCreateEntity(t.Entity));
      }),
      (this.zpe = (e, t) => {
        t?.Valid &&
          (this.Fot.OnRemoveEntity(t.Entity),
          this.Vot.DestroyPartStateFromRole(t.Entity));
      }),
      (this.FJe = (e) => {
        var t = this.ort(6).GetRootItem(),
          i = this.ort(7).GetRootItem(),
          s = t.GetHierarchyIndex(),
          i = i.GetHierarchyIndex();
        (e && i <= s) ||
          (void 0 !== (s = e ? i : this.Yot) && t.SetHierarchyIndex(s),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BattleUiSet",
              38,
              "轮盘界面显隐，调整摇杆面板层级",
              ["bVisible", e],
              ["panelUiIndex", s],
            ));
      }),
      (this.yJa = () => {
        for (const e of this.Kot.values())
          void 0 !== e && e.OnSeamlessTravelFinish();
      }),
      (this.rrt = (e) => {
        AudioSystem_1.AudioSystem.PostEvent(e);
      }),
      (this.XBo = () => {
        Info_1.Info.IsInGamepad()
          ? this.Wot ||
            this.HKa().then(() => {
              this.IsDestroyOrDestroying ||
                (this.Hot.ShowBattleChildViewPanel(),
                this.Hot.RefreshOnDelayShow(),
                this.jot.ShowBattleChildViewPanel());
            })
          : Info_1.Info.IsInKeyBoard() &&
            !this.VKa &&
            this.jKa().then(() => {
              this.IsDestroyOrDestroying ||
                (this.NKa.ShowBattleChildViewPanel(),
                this.NKa.RefreshOnDelayShow(),
                this.FKa.ShowBattleChildViewPanel());
            });
      }),
      (this.ttt = (e) => {
        for (var [t, i] of this.Kot)
          5 !== t &&
            (e
              ? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
              : i.GetRootItem().SetUIActive(!1));
      }),
      (this.HJe = (e) => {
        for (var [t, i] of this.Kot)
          6 !== t &&
            (e
              ? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
              : i.GetRootItem().SetUIActive(!1));
      }),
      (this.Tla = () => {
        var e = this.Kot.get(6);
        return (e = e && e.GetExecutionItem()) ? [e, e] : void 0;
      }),
      (this.Lla = (e) => {
        var t = this.Kot.get(3);
        if (t)
          return t.GetBattleSkillItemByButtonType(Number(e[1]))?.GetGuideItem();
      }),
      (this.Dla = (t) => {
        var i = this.Kot.get(Number(t[0]))
          ?.GetUiActorForGuide()
          ?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
        if (i) {
          var s = t[2],
            n = i.GuideHookComponents.Get(s),
            n =
              (n ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    17,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
                  )),
              n.GetUIItem());
          let e = t[1];
          StringUtils_1.StringUtils.IsEmpty(e) && (e = s);
          (t = i.GuideHookComponents.Get(e)),
            (s =
              (t ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    17,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
                  )),
              t.GetUIItem()));
          return [n, s];
        }
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "战斗界面挂接组件(GuideHookRegistry)缺失",
          );
      }),
      (this.Ala = () => {
        var e,
          t = this.ort(2);
        if (t)
          for (const i of t.GetFormationItemList())
            if (!i.FormationIns?.IsMyRole())
              return (e = i.GetRootItem()) ? [e, e] : void 0;
      }),
      (this.Ula = new Map([
        ["Execution", this.Tla],
        ["Skill", this.Lla],
        ["Default", this.Dla],
        ["Teammate", this.Ala],
      ])),
      (this.MZa = (e, t, i) => {
        var s;
        e < 0 ||
          2 < e ||
          (void 0 !== (s = Info_1.Info.IsInGamepad() ? this.Hot : this.NKa) &&
            s.RefreshFormationCooldownExternal(e, t, i));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      Info_1.Info.IsInTouch() ||
        (this.ComponentRegisterInfos.push([11, UE.UIItem]),
        this.ComponentRegisterInfos.push([12, UE.UIItem]));
  }
  async OnBeforeStartAsync() {
    await Promise.all([
      this.WKa(),
      this.art(),
      this.hrt(0, BossStatePanel_1.BossStatePanel, !0, 13),
      this.hrt(5, TopPanel_1.TopPanel, !0, 24),
      this.hrt(4, BottomPanel_1.BottomPanel, !0, 11),
      this.hrt(1, MissionPanel_1.MissionPanel, !0, 5),
      this.hrt(6, CenterPanel_1.CenterPanel, !0, 24),
      this.hrt(7, ChatPanel_1.ChatPanel, !1, 6),
      this.hrt(8, FullScreenPanel_1.FullScreenPanel, !0, 23),
      this.hrt(9, PositionPanel_1.PositionPanel, !0, 24),
    ]),
      this.lrt(),
      this._rt(),
      this.Ore(),
      this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt),
      ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      this.urt();
  }
  async WKa() {
    Info_1.Info.IsInGamepad()
      ? (this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!1))
      : this.VKa || (await this.jKa());
  }
  async jKa() {
    (this.VKa = !0),
      (this.NKa = await this.hrt(2, FormationPanel_1.FormationPanel, !0, 7)),
      (this.FKa = await this.hrt(
        3,
        SkillButtonPanel_1.SkillButtonPanel,
        !0,
        9,
      ));
  }
  async art() {
    Info_1.Info.IsInGamepad()
      ? this.Wot || (await this.HKa())
      : (this.GetItem(11)?.SetUIActive(!1), this.GetItem(12)?.SetUIActive(!1));
  }
  async HKa() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData(),
      (this.Wot = !0),
      (this.Hot = await this.hrt(11, FormationPanel_1.FormationPanel, !0, 8)),
      this.Hot.SetIsGamepad(),
      (this.jot = await this.hrt(
        12,
        GamepadSkillButtonPanel_1.GamepadSkillButtonPanel,
        !0,
        10,
      ));
  }
  OnTick(e) {
    BattleView.vJe.Start();
    for (const t of this.Qot) t.GetVisible() && t.OnTickBattleChildViewPanel(e);
    this.Fot.Tick(e), this.Vot.Tick(e), BattleView.vJe.Stop();
  }
  OnAfterTick(e) {
    for (const t of this.Qot)
      t.GetVisible() && t.OnAfterTickBattleChildViewPanel(e);
  }
  OnBeforeShow() {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeShow"),
      this.IsDestroyOrDestroying)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          18,
          "[battleView]OnBeforeShow Cancel Because Destroy",
        );
    else {
      this.crt();
      for (const e of this.Kot.values()) e.ShowBattleChildViewPanel();
    }
  }
  OnAfterShow() {
    var e;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterShow"),
      this.IsDestroyOrDestroying
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "[battleView]OnAfterShow Cancel Because Destroy",
          )
        : (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
            0,
            battleUiChildren,
            !0,
          ),
          ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
            AudioSystem_1.AudioSystem.SetState(
              AudioDefine_1.STATEGROUP,
              AudioDefine_1.STATENORMAL,
            ),
          (e =
            ModelManager_1.ModelManager
              .BattleUiModel).TryBroadcastCacheRoleLevelUpData(),
          e.TryBroadcastCacheRevive(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActiveBattleView,
          ),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart));
  }
  OnBeforeHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeHide"),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
        0,
        battleUiChildren,
        !1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DisActiveBattleView,
      );
  }
  OnAfterHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterHide");
    for (const e of this.Kot.values()) e.HideBattleChildViewPanel();
    ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
      AudioSystem_1.AudioSystem.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATEBACKGROUND,
      );
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeDestroy"),
      this.kre(),
      this.mrt(),
      this.drt(),
      this.Crt(),
      this.ResetFormationCooldownExternal(),
      (this.Xot = void 0),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (this.zot = TimerSystem_1.TimerSystem.Forever(() => {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            (TimerSystem_1.TimerSystem.Remove(this.zot),
            (this.zot = void 0),
            Log_1.Log.CheckError()) &&
            Log_1.Log.Error(
              "Battle",
              18,
              "[battleView]主界面销毁超时，请将本次日志提交给测试",
            );
        }, CHECK_DESTROY_TIME));
  }
  OnAfterDestroy() {
    this.zot &&
      (TimerSystem_1.TimerSystem.Remove(this.zot), (this.zot = void 0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterDestroy");
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Zot,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.ert,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView,
        this.MZa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
        this.yJa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiPlayAudio,
        this.rrt,
      ),
      Info_1.Info.IsInTouch() ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Zot,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.ert,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView,
        this.MZa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
        this.yJa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiPlayAudio,
        this.rrt,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        );
  }
  trt(e) {
    this.Jot !== e &&
      ((this.Jot = e), this.IsShow) &&
      this.UiViewSequence?.PlaySequencePurely("Switch");
  }
  lrt() {
    this.Fot = new BattleHeadStatePanel_1.BattleHeadStatePanel();
  }
  drt() {
    this.Fot && (this.Fot.ResetAllHeadStates(), (this.Fot = void 0));
  }
  _rt() {
    (this.Vot = new PartStatePanel_1.PartStatePanel()),
      this.Vot.InitializePartStatePanel();
  }
  Crt() {
    this.Vot && (this.Vot.ResetPartStatePanel(), (this.Vot = void 0));
  }
  async hrt(e, t, i = !1, s = 0) {
    var n = this.GetItem(e),
      t = new t();
    return (
      await t.CreateThenShowByActorAsync(n.GetOwner(), s),
      this.Kot.set(e, t),
      i && this.Qot.push(t),
      t
    );
  }
  ort(e) {
    return this.Kot.get(e);
  }
  urt() {
    var e = this.ort(6).GetRootItem();
    this.Yot = e.GetHierarchyIndex();
  }
  mrt() {
    for (const e of this.Kot.values()) void 0 !== e && e.Reset();
    this.Kot.clear(), (this.Qot.length = 0);
  }
  crt() {
    if (Info_1.Info.IsInTouch()) {
      var e = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
      if (e)
        for (var [t, i] of e) {
          var s = this.ort(t);
          if (s) {
            var n,
              a,
              o,
              h,
              i = i.GetPanelItemDataMap();
            if (i)
              for (var [r, _] of i)
                if (_.IsInitialized()) {
                  let e = s.GetItem(r);
                  (e = -1 === r ? s.GetRootItem() : e)
                    ? ((n = _.Size),
                      (a = _.Alpha),
                      (o = _.OffsetX),
                      (h = _.OffsetY),
                      (_ = _.HierarchyIndex),
                      (this.Xot.X = n),
                      (this.Xot.Y = n),
                      (this.Xot.Z = n),
                      e.SetUIItemScale(this.Xot),
                      e.SetAnchorOffsetX(o),
                      e.SetAnchorOffsetY(h),
                      e.SetUIItemAlpha(a),
                      e.SetHierarchyIndex(_))
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "BattleUiSet",
                        8,
                        "刷新移动端主界面设置时，找不到对应按钮",
                        ["panelIndex", t],
                        ["panelItemIndex", r],
                      );
                }
          }
        }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length)
      return (this.Ula.get(e[0]) || this.Ula.get("Default"))(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        65,
        "BattleView相关的引导Extra参数设置错误，不能为空",
      );
  }
  ResetFormationCooldownExternal() {
    this.Hot?.ResetFormationCooldownExternal(),
      this.NKa?.ResetFormationCooldownExternal();
  }
}
(exports.BattleView = BattleView).vJe = Stats_1.Stat.Create(
  "[BattleView]BattleViewTick",
);
//# sourceMappingURL=BattleView.js.map
