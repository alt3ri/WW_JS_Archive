"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleView = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
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
      (this.Hot = void 0),
      (this.jot = void 0),
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
          n = t.GetHierarchyIndex(),
          i = i.GetHierarchyIndex();
        (e && i <= n) ||
          (void 0 !== (n = e ? i : this.Yot) && t.SetHierarchyIndex(n),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BattleUiSet",
              38,
              "轮盘界面显隐，调整摇杆面板层级",
              ["bVisible", e],
              ["panelUiIndex", n],
            ));
      }),
      (this.rrt = (e) => {
        var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
        t && "" !== t.Path
          ? AudioController_1.AudioController.PostEventByUi(
              t.Path,
              this.PlayEventResult,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Audio", 18, "获取Audio配表信息错误", ["id", e]);
      }),
      (this.XBo = () => {
        !this.Wot &&
          Info_1.Info.IsInGamepad() &&
          this.art().then(() => {
            this.IsDestroyOrDestroying ||
              (this.Hot.ShowBattleChildViewPanel(),
              this.Hot.RefreshOnDelayShow(),
              this.jot.ShowBattleChildViewPanel());
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
      (this.bsa = () => {
        var e = this.Kot.get(6);
        return (e = e && e.GetExecutionItem()) ? [e, e] : void 0;
      }),
      (this.qsa = (e) => {
        var t = this.Kot.get(3);
        if (t)
          return t.GetBattleSkillItemByButtonType(Number(e[1]))?.GetGuideItem();
      }),
      (this.Gsa = (t) => {
        var i = this.Kot.get(Number(t[0]))
          ?.GetUiActorForGuide()
          ?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
        if (i) {
          var n = t[2],
            s = i.GuideHookComponents.Get(n),
            s =
              (s ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    17,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
                  )),
              s.GetUIItem());
          let e = t[1];
          StringUtils_1.StringUtils.IsEmpty(e) && (e = n);
          (t = i.GuideHookComponents.Get(e)),
            (n =
              (t ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    17,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
                  )),
              t.GetUIItem()));
          return [s, n];
        }
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "战斗界面挂接组件(GuideHookRegistry)缺失",
          );
      }),
      (this.Osa = () => {
        var e,
          t = this.ort(2);
        if (t)
          for (const i of t.GetFormationItemList())
            if (!i.FormationIns?.IsMyRole())
              return (e = i.GetRootItem()) ? [e, e] : void 0;
      }),
      (this.Nsa = new Map([
        ["Execution", this.bsa],
        ["Skill", this.qsa],
        ["Default", this.Gsa],
        ["Teammate", this.Osa],
      ]));
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
      this.hrt(2, FormationPanel_1.FormationPanel, !0, 7),
      this.hrt(3, SkillButtonPanel_1.SkillButtonPanel, !0, 9),
      this.art(),
      this.hrt(0, BossStatePanel_1.BossStatePanel, !0, 13),
      this.hrt(5, TopPanel_1.TopPanel, !0, 24),
      this.hrt(4, BottomPanel_1.BottomPanel, !0, 11),
      this.hrt(1, MissionPanel_1.MissionPanel, !0, 5),
      this.hrt(6, CenterPanel_1.CenterPanel, !0, 24),
      this.hrt(7, ChatPanel_1.ChatPanel, !1, 6),
      this.hrt(8, FullScreenPanel_1.FullScreenPanel, !0, 23),
      this.hrt(9, PositionPanel_1.PositionPanel, !0),
    ]),
      this.lrt(),
      this._rt(),
      this.Ore(),
      this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt),
      ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      this.urt();
  }
  async art() {
    !Info_1.Info.IsInGamepad() ||
      this.Wot ||
      (ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData(),
      (this.Wot = !0),
      (this.Hot = await this.hrt(11, FormationPanel_1.FormationPanel, !0, 8)),
      this.Hot.SetIsGamepad(),
      (this.jot = await this.hrt(
        12,
        GamepadSkillButtonPanel_1.GamepadSkillButtonPanel,
        !0,
        10,
      )));
  }
  OnTick(e) {
    for (const t of this.Qot) t.GetVisible() && t.OnTickBattleChildViewPanel(e);
    this.Fot.Tick(e), this.Vot.Tick(e);
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
            AudioController_1.AudioController.SetState(
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
      AudioController_1.AudioController.SetState(
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
  async hrt(e, t, i = !1, n = 0) {
    var s = this.GetItem(e),
      t = new t();
    return (
      await t.CreateThenShowByActorAsync(s.GetOwner(), n),
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
          var n = this.ort(t);
          if (n) {
            var s,
              a,
              o,
              r,
              i = i.GetPanelItemDataMap();
            if (i)
              for (var [_, h] of i)
                if (h.IsInitialized()) {
                  let e = n.GetItem(_);
                  (e = -1 === _ ? n.GetRootItem() : e)
                    ? ((s = h.Size),
                      (a = h.Alpha),
                      (o = h.OffsetX),
                      (r = h.OffsetY),
                      (h = h.HierarchyIndex),
                      (this.Xot.X = s),
                      (this.Xot.Y = s),
                      (this.Xot.Z = s),
                      e.SetUIItemScale(this.Xot),
                      e.SetAnchorOffsetX(o),
                      e.SetAnchorOffsetY(r),
                      e.SetUIItemAlpha(a),
                      e.SetHierarchyIndex(h))
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "BattleUiSet",
                        8,
                        "刷新移动端主界面设置时，找不到对应按钮",
                        ["panelIndex", t],
                        ["panelItemIndex", _],
                      );
                }
          }
        }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length)
      return (this.Nsa.get(e[0]) || this.Nsa.get("Default"))(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        65,
        "BattleView相关的引导Extra参数设置错误，不能为空",
      );
  }
}
(exports.BattleView = BattleView).vJe = void 0;
//# sourceMappingURL=BattleView.js.map
