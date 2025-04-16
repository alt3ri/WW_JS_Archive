"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGamePlayUtils = void 0);
const Log_1 = require("../../Core/Common/Log"),
  GamePlayScanCompositeByUid_1 = require("../../Core/Define/ConfigQuery/GamePlayScanCompositeByUid"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  IAction_1 = require("../../UniverseEditor/Interface/IAction"),
  IVar_1 = require("../../UniverseEditor/Interface/IVar"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  ExploreSkillFlagDefine_1 = require("../Module/Functional/ExploreSkillFlag/ExploreSkillFlagDefine"),
  InputManager_1 = require("../Ui/Input/InputManager"),
  UiLayer_1 = require("../Ui/UiLayer"),
  UiManager_1 = require("../Ui/UiManager"),
  ActorUtils_1 = require("../Utils/ActorUtils"),
  LevelEventLockInputState_1 = require("./LevelEventLockInputState");
class LevelGamePlayUtils {
  static HasScanInfo(e) {
    e = e.GetBaseInfo()?.ScanFunction?.ScanId;
    return !!e && 0 !== e;
  }
  static GetScanCompositeResult(t) {
    t = t.GetBaseInfo()?.ScanFunction?.ScanId;
    if (t && 0 !== t) {
      var a = LevelGamePlayUtils.SUe.get(t);
      if (a) return a;
      var r =
        GamePlayScanCompositeByUid_1.configGamePlayScanCompositeByUid.GetConfig(
          t,
        );
      if (r) {
        var n = [];
        for (const i of r.ScanInfos) {
          var o =
            ConfigManager_1.ConfigManager.LevelGamePlayConfig.GetScanInfoById(
              i,
            );
          n.push(o);
        }
        let e = 0;
        for (const l of n) l.Interval > e && (e = l.Interval);
        return (
          (a = { ScanInfos: n, Interval: e, ScanCompositeConfig: r }),
          LevelGamePlayUtils.SUe.set(t, a),
          a
        );
      }
    }
  }
  static ReleaseOperationRestriction() {
    var e,
      t = new Map(),
      a =
        (ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
          !0,
          !0,
          !0,
          !0,
        ),
        LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
        UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
        (this.LevelEventBlockAll = !1),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
          1,
        ),
        ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
        (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView =
          []),
        Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity);
    a?.Valid &&
      ((a = a.GetComponent(203))?.HasTag((e = 477750727)) &&
        (a.RemoveTag(e), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          29,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      a?.HasTag((e = -63548288)) && a.RemoveTag(e),
      a?.HasTag((e = 229513169))) &&
      a.RemoveTag(e),
      t.set(0, !0),
      t.set(1, !0),
      this.SetFuncFlag(t),
      ModelManager_1.ModelManager.ExploreSkillFlagModel.EnableAllExploreSkillFlag();
  }
  static LevelOperationRestriction(e) {
    var t = JSON.parse(e),
      a = [],
      r = new Map(),
      n = new Map();
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
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
      this.EnableMove(),
      ModelManager_1.ModelManager.ExploreSkillFlagModel.EnableAllExploreSkillFlag(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
    let o = !1;
    var i = [];
    let l = !0;
    switch (
      ((LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView =
        []),
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", !1),
      (this.LevelEventBlockAll = !1),
      r.set(0, !0),
      r.set(1, !0),
      t.Type)
    ) {
      case IAction_1.EPlayerOperationType.EnableAll:
        return (
          ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
          this.SetFuncFlag(r),
          void ModelManager_1.ModelManager.ExploreSkillFlagModel.EnableAllExploreSkillFlag()
        );
      case IAction_1.EPlayerOperationType.DisableAll:
        (l = !1),
          t.DisplayMode === IAction_1.EDisplayModeInPlayerOp.HideUi && (o = !0),
          UiManager_1.UiManager.IsViewShow("BattleView") &&
            UiLayer_1.UiLayer.SetShowMaskLayer(
              "LevelEventSetPlayerOperation",
              !0,
            ),
          (this.LevelEventBlockAll = !0),
          ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
            !1,
            !1,
            !1,
            !1,
          ),
          r.set(0, !1),
          ModelManager_1.ModelManager.ExploreSkillFlagModel.DisableAllExploreSkillFlag();
        break;
      case IAction_1.EPlayerOperationType.DisableModule:
        var s = t;
        if (
          s.UiOption &&
          s.UiOption?.Type !== IAction_1.EUiOperationType.Enable
        ) {
          if (s.UiOption?.Type === IAction_1.EUiOperationType.Disable) {
            a.push("UiInputRoot.MouseInputTag"),
              a.push("UiInputRoot.Navigation");
            for (let e = 0; e < 25; e++)
              12 !== e && 18 !== e && 19 !== e && i.push(e);
          } else if (
            s.UiOption?.Type === IAction_1.EUiOperationType.EnableSectionalUi
          ) {
            if (
              (a.push("UiInputRoot"),
              s.UiOption.ShowEsc ||
                (i.push(1),
                (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc =
                  !0)),
              s.UiOption.ShowMiniMap ||
                (i.push(4),
                LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                  "WorldMapView",
                )),
              s.UiOption.ShowQuestTrack || (i.push(5), i.push(17)),
              s.UiOption.ShowScreenEffect || i.push(23),
              !s.UiOption.ShowSystem)
            ) {
              i.push(3), i.push(2);
              for (const g of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
                var c = g.ViewName;
                c &&
                  "WorldMapView" !== c &&
                  LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(
                    c,
                  );
              }
            }
            s.UiOption.ShowOther ||
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
              i.push(22),
              i.push(24),
              s.UiOption.AlwaysShowUiSections &&
                s.UiOption.AlwaysShowUiSections.indexOf(
                  IAction_1.EUiElement.Guide,
                ) < 0 &&
                i.push(27));
          }
        } else a.push("UiInputRoot");
        if (
          (s.MoveOption?.Type === IAction_1.EMoveOperationType.Disable
            ? this.DisableMove(s.MoveOption) &&
              a.push("FightInputRoot.FightInput.AxisInput.MoveInput")
            : (s.MoveOption &&
                s.MoveOption?.Type !== IAction_1.EMoveOperationType.Enable) ||
              (this.EnableMove(),
              a.push("FightInputRoot.FightInput.AxisInput.MoveInput")),
          s.SkillOption &&
            s.SkillOption?.Type !== IAction_1.ESkillOperationType.Enable)
        )
          if (
            (s.SkillOption?.DisplayMode === IAction_1.EDisplayModeInSkillOp.Hide
              ? (i.push(9), i.push(10), (l = !1))
              : s.SkillOption?.DisplayMode ===
                  IAction_1.EDisplayModeInSkillOp.Ashen && (l = !1),
            s.SkillOption?.Type ===
              IAction_1.ESkillOperationType.DisableSection)
          ) {
            a.push("FightInputRoot.FightInput.ActionInput"),
              r.set(1, !s.SkillOption?.DisableSkillWheel);
            var _ = s.SkillOption.DisableExploreSkill?.ExploreSkillList;
            if (void 0 !== _)
              if (_.length <= 0)
                ModelManager_1.ModelManager.ExploreSkillFlagModel.DisableAllExploreSkillFlag();
              else {
                var v = s.SkillOption.DisableExploreSkill?.IsComplementary;
                for (const M of ExploreSkillFlagDefine_1.levelExploreSkillFlagDefaultVal.keys())
                  v ? n.set(M, _.includes(M)) : n.set(M, !_.includes(M));
                var u = v
                  ? _.includes(
                      IAction_1.EExploreSkillType.PlaceTemporaryTeleport,
                    )
                  : !_.includes(
                      IAction_1.EExploreSkillType.PlaceTemporaryTeleport,
                    );
                r.set(0, u);
              }
          } else
            s.SkillOption?.Type === IAction_1.ESkillOperationType.Disable &&
              (r.set(0, !1),
              r.set(1, !s.SkillOption?.DisableSkillWheel),
              ModelManager_1.ModelManager.ExploreSkillFlagModel.DisableAllExploreSkillFlag());
        else
          a.push("FightInputRoot.FightInput.ActionInput"),
            ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(
              0,
              !0,
            ),
            ModelManager_1.ModelManager.ExploreSkillFlagModel.EnableAllExploreSkillFlag();
        (s.CameraOption &&
          s.CameraOption?.Type !== IAction_1.ECameraOperationType.Enable) ||
          a.push("FightInputRoot.FightInput.AxisInput.CameraInput"),
          s.SceneInteractionOption &&
          s.SceneInteractionOption?.Type !==
            IAction_1.ESceneInteractionOperationType.Enable
            ? i.push(19)
            : a.push("InteractionRoot");
    }
    o
      ? ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          1,
        )
      : ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
          1,
          i,
          !1,
        ),
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(l, 0),
      this.SetLevelEventLockInputState(a),
      this.SetFuncFlag(r),
      this.SetExploreSkillFlag(n);
  }
  static EnableMove() {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
      !0,
      !0,
      !0,
      !0,
    );
    var e,
      t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    t?.Valid &&
      ((t = t.GetComponent(203))?.HasTag((e = 477750727)) &&
        (t.RemoveTag(e), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          29,
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
        (t.GetComponent(203)?.AddTag(477750727), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          29,
          "[LevelEventSetPlayerOperation.DisableMove] AddTag 禁止冲刺",
        ),
      t?.Valid &&
        (e.ForceWalk
          ? t.GetComponent(203)?.AddTag(-63548288)
          : e.ForceJog && t.GetComponent(203)?.AddTag(229513169)),
      ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
        e.Forward,
        e.Back,
        e.Left,
        e.Right,
      ),
      !0)
    );
  }
  static SetFuncFlag(e) {
    for (var [t, a] of e)
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(t, a);
  }
  static SetExploreSkillFlag(e) {
    for (var [t, a] of e)
      ModelManager_1.ModelManager.ExploreSkillFlagModel.SetExploreSkillFlagEnable(
        t,
        a,
      );
  }
  static SetLevelEventLockInputState(e) {
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
      ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
          ...e,
        ),
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag())
      : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTags(
          e,
        ),
        LevelEventLockInputState_1.LevelEventLockInputState.Lock(e));
  }
  static CheckVarRefSame(e, t) {
    if (e.Source === t.Source) return !1;
    let a = !1;
    switch (e.Source) {
      case "Constant":
        a = !0;
        break;
      case "Self":
        "Self" === t.Source && (a = e.Name === t.Name);
        break;
      case "Other":
        "Other" === t.Source && (a = e.Name === t.Name);
        break;
      case "Global":
        "Global" === t.Source && (a = e.Keyword === t.Keyword);
    }
    return a;
  }
  static GetVarValue(e, t) {
    switch (e.Source) {
      case "Constant":
        return e.Value;
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.GetWorldState(e.Keyword);
      case "Other":
        var a = this.DRn(e.Name, e.RefId, e.RefType);
        return this.E$(a);
      case "Self":
        return t ? ((a = this.RRn(e.Name, t)), this.E$(a)) : void 0;
      default:
        return;
    }
  }
  static DRn(t, a, e) {
    switch (e) {
      case "Entity":
        var r =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(a);
        if (r) return r.Entity?.GetComponent(0)?.GetEntityVar(t);
        break;
      case "Quest":
        return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          a,
        )?.Tree?.GetTreeVarByKey(t);
      case "LevelPlay": {
        let e =
          ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(a)?.Tree;
        return (
          e ||
            ((r =
              ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())
              ?.TreeConfigId === a &&
              (e = r.Tree)),
          e?.GetTreeVarByKey(t)
        );
      }
      default:
        return;
    }
  }
  static RRn(e, t) {
    switch (t.Type) {
      case 1:
        var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
          t.EntityId,
        );
        if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        break;
      case 6:
        return ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          t.TreeIncId,
        )?.GetTreeVarByKey(e);
      case 5:
        a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
          t.TriggerEntityId,
        );
        if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        break;
      default:
        return;
    }
  }
  static GetVarRefFormAiLevelVar(e) {
    let t = "Constant",
      a = "Entity";
    switch (e.VarSource) {
      case 0:
        t = "Global";
        break;
      case 1:
        t = "Self";
        break;
      case 2:
        (t = "Other"), (a = "Entity");
        break;
      case 4:
        (t = "Other"), (a = "LevelPlay");
        break;
      case 3:
        (t = "Other"), (a = "Quest");
    }
    let r = void 0;
    switch (t) {
      case "Global":
        var n = { Type: "Int", Source: t, Keyword: e.VarName };
        r = n;
        break;
      case "Self":
        n = { Type: "Int", Source: t, Name: e.VarName };
        r = n;
        break;
      case "Other":
        n = {
          Type: "Int",
          Source: t,
          Name: e.VarName,
          RefId: e.Id,
          RefType: a,
        };
        r = n;
    }
    return r;
  }
  static E$(e) {
    if (e)
      switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
        case "Boolean":
          return e.rTs;
        case "Float":
          return e.sTs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(e.oTs);
        case "String":
          return e.nTs;
        case "Transform":
          return e.Bo1
            ? {
                X: e.Bo1.l8n ? e.Bo1.l8n.X : void 0,
                Y: e.Bo1.l8n ? e.Bo1.l8n.Y : void 0,
                Z: e.Bo1.l8n ? e.Bo1.l8n.Z : void 0,
                Pitch: e.Bo1._8n ? e.Bo1._8n.Pitch : void 0,
                Roll: e.Bo1._8n ? e.Bo1._8n.Roll : void 0,
              }
            : {};
        default:
          return;
      }
  }
  static GetEntityHandle(e, t) {
    let a = void 0;
    return (
      t
        ? 1 === t.Type
          ? (a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              t.EntityId,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[LevelGamePlayUtils.GetEntityHandle] 对应的Context类型获取实体未实现",
              ["context.Type", t.Type],
            )
        : e && (a = ActorUtils_1.ActorUtils.GetEntityByActor(e)),
      a
    );
  }
  static GetCheckTargetConditionEntityHandles(t, a, r) {
    const n = new Array();
    function e() {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      e?.Valid
        ? n.push(e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            72,
            "[GetCheckTargetConditionEntityHandles] 玩家实体无效",
            [
              "PlayerId",
              ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
            ],
          );
    }
    switch (t.Type) {
      case "OnlinePlayer":
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
          switch (t.OnlinePlayerConditionTargetOption.Type) {
            case "Host":
              ModelManager_1.ModelManager.CreatureModel.IsMyWorld() && e();
              break;
            case "Participator":
              e();
          }
        else e();
        break;
      case "TargetEntity": {
        let e = void 0;
        var o = t;
        switch (o.TargetEntity.Type) {
          case "Self":
            e = LevelGamePlayUtils.GetEntityHandle(a, r);
            break;
          case "Target":
            var i = o.TargetEntity;
            e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
              i.EntityId,
            );
            break;
          case "Triggered":
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                72,
                "[GetCheckTargetConditionEntityHandles] 指定实体为触发者未实现",
                ["TargetEntity.Type", "Triggered"],
              );
            break;
          case "Player":
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                72,
                "[GetCheckTargetConditionEntityHandles] 指定实体为某个特定玩家未实现",
                ["TargetEntity.Type", "Player"],
              );
        }
        e?.Valid
          ? n.push(e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[GetCheckTargetConditionEntityHandles] 指定实体无效",
              ["TargetEntity.Type", o.TargetEntity.Type],
            );
      }
    }
    return n;
  }
}
((exports.LevelGamePlayUtils = LevelGamePlayUtils).LevelEventBlockAll = !1),
  (LevelGamePlayUtils.SUe = new Map());
//# sourceMappingURL=LevelGamePlayUtils.js.map
