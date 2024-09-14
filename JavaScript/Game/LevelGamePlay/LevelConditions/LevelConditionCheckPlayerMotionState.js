"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckPlayerMotionState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerMotionState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    if (!e) return !1;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelCondition",
            7,
            "[CheckPlayerMotionState]无法获取当前角色",
          ),
        !1
      );
    var r = t.Entity.GetComponent(161);
    if (!r)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelCondition",
            7,
            "[CheckPlayerMotionState]无法获取当前角色UnifiedState组件",
          ),
        !1
      );
    let i = !1,
      n = !1;
    switch (e.MotionState) {
      case "Ground":
        i =
          r.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          r.PositionSubState ===
            CharacterUnifiedStateTypes_1.ECharPositionSubState.None;
        break;
      case "Air":
        i =
          r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air;
        break;
      case "Climb":
        i =
          r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
        break;
      case "OnClimbing":
        i =
          r.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
          (r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other ||
            r.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb ||
            r.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb);
        break;
      case "Water":
        i =
          r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Water;
        break;
      case "WalkOnWater":
        i =
          r.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          r.PositionSubState ===
            CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface;
        break;
      case "GlideInAir":
        i =
          r.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide;
        break;
      case "FallInAir":
        i =
          r.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
          r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other;
        break;
      default:
        n = !0;
    }
    if (n) {
      var o = t.Entity.GetComponent(190);
      if (!o)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelCondition",
              7,
              "[CheckPlayerMotionState]无法获取当前角色CharacterGameplayTag组件",
            ),
          !1
        );
      switch (e.MotionState) {
        case "SwitchSkill":
          i = o.HasTag(1674960297);
          break;
        case "UltimateDodge":
          i = o.HasTag(-1221493771);
          break;
        case "UltimateSkill":
          i = o.HasTag(1733479717);
      }
    }
    switch (e.Compare) {
      case "Eq":
        return i;
      case "Ne":
        return !i;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckPlayerMotionState =
  LevelConditionCheckPlayerMotionState;
//# sourceMappingURL=LevelConditionCheckPlayerMotionState.js.map
