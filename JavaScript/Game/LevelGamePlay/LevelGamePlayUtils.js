"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayUtils = void 0);
const Log_1 = require("../../Core/Common/Log"),
  GamePlayScanCompositeByUid_1 = require("../../Core/Define/ConfigQuery/GamePlayScanCompositeByUid"),
  IAction_1 = require("../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  InputController_1 = require("../Input/InputController"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputManager_1 = require("../Ui/Input/InputManager"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
  UiLayer_1 = require("../Ui/UiLayer"),
  UiManager_1 = require("../Ui/UiManager"),
  LevelEventLockInputState_1 = require("./LevelEventLockInputState");
class LevelGamePlayUtils {
  static HasScanInfo(e) {
    e = e.GetBaseInfo()?.ScanFunction?.ScanId;
    return !!e && 0 !== e;
  }
  static GetScanCompositeResult(t) {
    t = t.GetBaseInfo()?.ScanFunction?.ScanId;
    if (t && 0 !== t) {
      var n = LevelGamePlayUtils.SUe.get(t);
      if (n) return n;
      var o =
        GamePlayScanCompositeByUid_1.configGamePlayScanCompositeByUid.GetConfig(
          t,
        );
      if (o) {
        var a = [];
        for (const r of o.ScanInfos) {
          var i =
            ConfigManager_1.ConfigManager.LevelGamePlayConfig.GetScanInfoById(
              r,
            );
          a.push(i);
        }
        let e = 0;
        for (const l of a) l.Interval > e && (e = l.Interval);
        return (
          (n = { ScanInfos: a, Interval: e, ScanCompositeConfig: o }),
          LevelGamePlayUtils.SUe.set(t, n),
          n
        );
      }
    }
  }
  static ReleaseOperationRestriction() {
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
      (this.LevelEventBlockAll = !1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
      (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []);
    var e,
      t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    t?.Valid &&
      ((t = t.GetComponent(190))?.HasTag((e = 477750727)) &&
        (t.RemoveTag(e), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      t?.HasTag((e = -63548288)) && t.RemoveTag(e),
      t?.HasTag((e = 229513169))) &&
      t.RemoveTag(e),
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
  }
  static LevelOperationRestriction(e) {
    var t = JSON.parse(e),
      n = [],
      o = new Map();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ForceReleaseInput,
      "Set Player Operation Action",
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelEvent", 5, "关卡事件-设置玩家操作限制", [
          "配置param:",
          t,
        ]),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      this.EnableMove(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
    let a = !1;
    var i = [];
    let r = !0;
    switch (
      ((LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView =
        []),
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
      (this.LevelEventBlockAll = !1),
      o.set(0, !0),
      t.Type)
    ) {
      case IAction_1.EPlayerOperationType.EnableAll:
        return (
          ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
          void this.SetFuncFlag(o)
        );
      case IAction_1.EPlayerOperationType.DisableAll:
        (r = !1),
          t.DisplayMode === IAction_1.EDisplayModeInPlayerOp.HideUi && (a = !0),
          UiManager_1.UiManager.IsViewShow("BattleView") &&
            UiLayer_1.UiLayer.SetShowMaskLayer(
              "LevelEventSetPlayerOperation",
              !0,
            ),
          (this.LevelEventBlockAll = !0),
          InputController_1.InputController.SetMoveControlEnabled(
            !1,
            !1,
            !1,
            !1,
          ),
          o.set(0, !1);
        break;
      case IAction_1.EPlayerOperationType.DisableModule:
        var l = t;
        if (
          l.UiOption &&
          l.UiOption?.Type !== IAction_1.EUiOperationType.Enable
        ) {
          if (l.UiOption?.Type === IAction_1.EUiOperationType.Disable) {
            n.push("UiInputRoot.MouseInputTag"),
              n.push("UiInputRoot.Navigation");
            for (let e = 0; e < 24; e++)
              12 !== e && 18 !== e && 19 !== e && i.push(e);
          } else if (
            l.UiOption?.Type === IAction_1.EUiOperationType.EnableSectionalUi
          ) {
            if (
              (n.push("UiInputRoot"),
              l.UiOption.ShowEsc ||
                (i.push(1),
                (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc =
                  !0)),
              l.UiOption.ShowMiniMap ||
                (i.push(4),
                LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                  "WorldMapView",
                )),
              l.UiOption.ShowQuestTrack || (i.push(5), i.push(17)),
              l.UiOption.ShowScreenEffect || i.push(23),
              !l.UiOption.ShowSystem)
            ) {
              i.push(3), i.push(2);
              for (const _ of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
                var u = _.ViewName;
                u &&
                  "WorldMapView" !== u &&
                  LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                    u,
                  );
              }
            }
            l.UiOption.ShowOther ||
              (i.push(0),
              i.push(6),
              i.push(7),
              i.push(8),
              i.push(11),
              i.push(13),
              i.push(14),
              i.push(15),
              i.push(16),
              i.push(20),
              i.push(21),
              i.push(22));
          }
        } else n.push("UiInputRoot");
        l.MoveOption?.Type === IAction_1.EMoveOperationType.Disable
          ? this.DisableMove(l.MoveOption) &&
            n.push("FightInputRoot.FightInput.AxisInput.MoveInput")
          : (l.MoveOption &&
              l.MoveOption?.Type !== IAction_1.EMoveOperationType.Enable) ||
            (this.EnableMove(),
            n.push("FightInputRoot.FightInput.AxisInput.MoveInput")),
          l.SkillOption &&
          l.SkillOption?.Type !== IAction_1.ESkillOperationType.Enable
            ? (l.SkillOption?.DisplayMode ===
              IAction_1.EDisplayModeInSkillOp.Hide
                ? (i.push(9), i.push(10), (r = !1))
                : l.SkillOption?.DisplayMode ===
                    IAction_1.EDisplayModeInSkillOp.Ashen && (r = !1),
              l.SkillOption?.Type ===
              IAction_1.ESkillOperationType.DisableSection
                ? (n.push("FightInputRoot.FightInput.ActionInput"),
                  o.set(
                    0,
                    !l.SkillOption.DisableExploreSkill?.PlaceTemporaryTeleport,
                  ))
                : l.SkillOption?.Type ===
                    IAction_1.ESkillOperationType.Disable && o.set(0, !1))
            : (n.push("FightInputRoot.FightInput.ActionInput"),
              ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(
                0,
                !0,
              )),
          (l.CameraOption &&
            l.CameraOption?.Type !== IAction_1.ECameraOperationType.Enable) ||
            n.push("FightInputRoot.FightInput.AxisInput.CameraInput"),
          l.SceneInteractionOption &&
          l.SceneInteractionOption?.Type !==
            IAction_1.ESceneInteractionOperationType.Enable
            ? i.push(19)
            : n.push("InteractionRoot");
    }
    a
      ? ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          1,
        )
      : ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
          1,
          i,
          !1,
        ),
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(r, 0),
      this.SetLevelEventLockInputState(n),
      this.SetFuncFlag(o);
  }
  static EnableMove() {
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0);
    var e,
      t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    t?.Valid &&
      ((t = t.GetComponent(190))?.HasTag((e = 477750727)) &&
        (t.RemoveTag(e), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[LevelEventSetPlayerOperation.EnableMove] RemoveTag 禁止冲刺",
        ),
      t?.HasTag((e = -63548288)) && t.RemoveTag(e),
      t?.HasTag((e = 229513169))) &&
      t.RemoveTag(e);
  }
  static DisableMove(e) {
    var t;
    return (
      !!e &&
      ((t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity),
      e.ForbidSprint &&
        t?.Valid &&
        (t.GetComponent(190)?.AddTag(477750727), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[LevelEventSetPlayerOperation.DisableMove] AddTag 禁止冲刺",
        ),
      t?.Valid &&
        (e.ForceWalk
          ? t.GetComponent(190)?.AddTag(-63548288)
          : e.ForceJog && t.GetComponent(190)?.AddTag(229513169)),
      InputController_1.InputController.SetMoveControlEnabled(
        e.Forward,
        e.Back,
        e.Left,
        e.Right,
      ),
      !0)
    );
  }
  static SetFuncFlag(e) {
    for (var [t, n] of e)
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(t, n);
  }
  static SetLevelEventLockInputState(e) {
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
      ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
          ...e,
        ),
        InputDistributeController_1.InputDistributeController.RefreshInputTag())
      : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTags(
          e,
        ),
        LevelEventLockInputState_1.LevelEventLockInputState.Lock(e));
  }
}
((exports.LevelGamePlayUtils = LevelGamePlayUtils).LevelEventBlockAll = !1),
  (LevelGamePlayUtils.SUe = new Map());
//# sourceMappingURL=LevelGamePlayUtils.js.map
