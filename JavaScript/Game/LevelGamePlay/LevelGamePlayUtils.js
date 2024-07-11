"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayUtils = void 0);
const Log_1 = require("../../Core/Common/Log");
const GamePlayScanCompositeByUid_1 = require("../../Core/Define/ConfigQuery/GamePlayScanCompositeByUid");
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const InputController_1 = require("../Input/InputController");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ModelManager_1 = require("../Manager/ModelManager");
const InputDefine_1 = require("../Ui/Input/InputDefine");
const InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
const UiLayer_1 = require("../Ui/UiLayer");
const UiManager_1 = require("../Ui/UiManager");
const LevelEventLockInputState_1 = require("./LevelEventLockInputState");
const skillDisableBuffId = BigInt(1101007019);
class LevelGamePlayUtils {
  static HasScanInfo(e) {
    e = e.GetBaseInfo()?.ScanFunction?.ScanId;
    return !!e && e !== 0;
  }
  static GetScanCompositeResult(t) {
    t = t.GetBaseInfo()?.ScanFunction?.ScanId;
    if (t && t !== 0) {
      let n = LevelGamePlayUtils.EUe.get(t);
      if (n) return n;
      const o =
        GamePlayScanCompositeByUid_1.configGamePlayScanCompositeByUid.GetConfig(
          t,
        );
      if (o) {
        const a = [];
        for (const r of o.ScanInfos) {
          const i =
            ConfigManager_1.ConfigManager.LevelGamePlayConfig.GetScanInfoById(
              r,
            );
          a.push(i);
        }
        let e = 0;
        for (const l of a) l.Interval > e && (e = l.Interval);
        return (
          (n = { ScanInfos: a, Interval: e, ScanCompositeConfig: o }),
          LevelGamePlayUtils.EUe.set(t, n),
          n
        );
      }
    }
  }
  static ReleaseOperationRestriction() {
    let e, t;
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
      (this.LevelEventBlockAll = !1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActiveBattleViewSkill,
        !0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
        !0,
      );
    for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      n.Entity?.GetComponent(157)?.RemoveBuff(
        skillDisableBuffId,
        1,
        "LevelEventSetPlayerOperation",
      );
    LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = [];
    const n = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    n?.Valid &&
      ((e = n.GetComponent(185))?.HasTag((t = 477750727)) &&
        (e.RemoveTag(t), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      e?.HasTag((t = -63548288)) && e.RemoveTag(t),
      e?.HasTag((t = 229513169))) &&
      e.RemoveTag(t),
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
  }
  static LevelOperationRestriction(e) {
    const t = JSON.parse(e);
    const n = [];
    const o = new Map();
    switch (
      (EventSystem_1.EventSystem.Emit(
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
      this.ShowAllUi(),
      (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []),
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
      (this.LevelEventBlockAll = !1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      o.set(0, !0),
      t.Type)
    ) {
      case IAction_1.EPlayerOperationType.EnableAll:
        return void this.SetFuncFlag(o);
      case IAction_1.EPlayerOperationType.DisableAll:
        t.DisplayMode === IAction_1.EDisplayModeInPlayerOp.HideUi
          ? ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
              1,
            )
          : this.ShowAllUi(),
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
        var a = t;
        if (
          a.UiOption &&
          a.UiOption?.Type !== IAction_1.EUiOperationType.Enable
        ) {
          if (a.UiOption?.Type === IAction_1.EUiOperationType.Disable) {
            n.push("UiInputRoot.MouseInputTag"),
              n.push("UiInputRoot.Navigation");
            var i = [];
            i.push(12),
              i.push(18),
              i.push(19),
              ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
                1,
                i,
              );
          } else if (
            a.UiOption?.Type === IAction_1.EUiOperationType.EnableSectionalUi
          ) {
            n.push("UiInputRoot");
            i = [];
            if (
              (i.push(12),
              i.push(18),
              a.UiOption.ShowEsc
                ? i.push(1)
                : (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc =
                    !0),
              a.UiOption.ShowMiniMap
                ? i.push(4)
                : LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                    "WorldMapView",
                  ),
              a.UiOption.ShowQuestTrack && (i.push(5), i.push(17)),
              a.UiOption.ShowScreenEffect && i.push(23),
              a.UiOption.ShowSystem)
            )
              i.push(3), i.push(2);
            else
              for (const l of InputDefine_1.openViewActionsMap.values())
                l !== "WorldMapView" &&
                  LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                    l,
                  );
            (a.SceneInteractionOption &&
              a.SceneInteractionOption?.Type !==
                IAction_1.ESceneInteractionOperationType.Enable) ||
              i.push(19),
              i.length > 0 &&
                ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
                  1,
                  i,
                );
          }
        } else
          n.push("UiInputRoot"),
            this.ShowAllUi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Interaction", 37, "玩法行为树禁用交互(UI屏蔽)"),
            a.SceneInteractionOption?.Type ===
              IAction_1.ESceneInteractionOperationType.Disable &&
              ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
                1,
                [19],
                !1,
              );
        if (
          (a.MoveOption?.Type === IAction_1.EMoveOperationType.Disable
            ? this.DisableMove(a.MoveOption) &&
              n.push("FightInputRoot.FightInput.AxisInput.MoveInput")
            : (a.MoveOption &&
                a.MoveOption?.Type !== IAction_1.EMoveOperationType.Enable) ||
              (this.EnableMove(),
              n.push("FightInputRoot.FightInput.AxisInput.MoveInput")),
          a.SkillOption &&
            a.SkillOption?.Type !== IAction_1.ESkillOperationType.Enable)
        ) {
          if (
            a.SkillOption?.DisplayMode === IAction_1.EDisplayModeInSkillOp.Hide
          )
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
              1,
              [9, 10],
              !1,
            );
          else if (
            a.SkillOption?.DisplayMode === IAction_1.EDisplayModeInSkillOp.Ashen
          ) {
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
              1,
              [9, 10],
              !0,
            );
            for (const _ of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
              !0,
            )) {
              const r = _.Entity?.GetComponent(157);
              r?.AddBuff(skillDisableBuffId, {
                InstigatorId: r?.CreatureDataId,
                Reason: "LevelEventSetPlayerOperation",
              });
            }
          }
          a.SkillOption?.Type === IAction_1.ESkillOperationType.DisableSection
            ? (n.push("FightInputRoot.FightInput.ActionInput"),
              o.set(
                0,
                !a.SkillOption.DisableExploreSkill?.PlaceTemporaryTeleport,
              ))
            : a.SkillOption?.Type === IAction_1.ESkillOperationType.Disable &&
              o.set(0, !1);
        } else
          n.push("FightInputRoot.FightInput.ActionInput"),
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
              1,
              [9, 10],
              !0,
            ),
            ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(
              0,
              !0,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
              !0,
            );
        (a.CameraOption &&
          a.CameraOption?.Type !== IAction_1.ECameraOperationType.Enable) ||
          n.push("FightInputRoot.FightInput.AxisInput.CameraInput"),
          (a.SceneInteractionOption &&
            a.SceneInteractionOption?.Type !==
              IAction_1.ESceneInteractionOperationType.Enable) ||
            n.push("InteractionRoot");
    }
    this.SetLevelEventLockInputState(n), this.SetFuncFlag(o);
  }
  static EnableMove() {
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0);
    let e;
    let t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    t?.Valid &&
      ((t = t.GetComponent(185))?.HasTag((e = 477750727)) &&
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
  static ShowAllUi() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActiveBattleViewSkill,
        !0,
      );
    for (const e of ModelManager_1.ModelManager.SceneTeamModel?.GetTeamEntities(
      !0,
    ))
      e.Entity?.GetComponent(157)?.RemoveBuff(
        skillDisableBuffId,
        1,
        "LevelEventSetPlayerOperation",
      );
  }
  static DisableMove(e) {
    let t;
    return (
      !!e &&
      ((t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity),
      e.ForbidSprint &&
        t?.Valid &&
        (t.GetComponent(185)?.AddTag(477750727), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[LevelEventSetPlayerOperation.DisableMove] AddTag 禁止冲刺",
        ),
      t?.Valid &&
        (e.ForceWalk
          ? t.GetComponent(185)?.AddTag(-63548288)
          : e.ForceJog && t.GetComponent(185)?.AddTag(229513169)),
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
    for (const [t, n] of e)
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
  (LevelGamePlayUtils.EUe = new Map());
// # sourceMappingURL=LevelGamePlayUtils.js.map
