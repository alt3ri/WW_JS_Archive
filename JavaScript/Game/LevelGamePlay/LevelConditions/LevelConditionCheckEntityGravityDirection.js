"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntityGravityDirection = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGamePlayUtils_1 = require("../LevelGamePlayUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityGravityDirection extends LevelGeneralBase_1.LevelConditionBase {
  Hj_(e) {
    switch (e) {
      case "PositiveX":
        return Vector_1.Vector.Create(1, 0, 0);
      case "PositiveY":
        return Vector_1.Vector.Create(0, 1, 0);
      case "PositiveZ":
        return Vector_1.Vector.Create(0, 0, 1);
      case "NegativeX":
        return Vector_1.Vector.Create(-1, 0, 0);
      case "NegativeY":
        return Vector_1.Vector.Create(0, -1, 0);
      case "NegativeZ":
        return Vector_1.Vector.Create(0, 0, -1);
    }
    return Vector_1.Vector.Create(0, 0, 0);
  }
  $j_(e) {
    var t,
      i = e.Entity.GetComponent(176);
    return i
      ? i.GravityDirect
      : (i = e.Entity.GetComponent(1))
        ? ((t = Vector_1.Vector.Create(0, 0, 0)),
          i.ActorQuatProxy.RotateVector(
            LevelConditionCheckEntityGravityDirection.Wj_,
            t,
          ),
          t)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[CheckEntityGravityDirection] 实体获取BaseActorComponent失败",
              ["entityHandle", e],
            )
          );
  }
  Qj_(e, t, i) {
    t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(t, i);
    return t?.Valid
      ? (i = this.$j_(t))
        ? !!i.Equals(e)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[CheckEntityGravityDirection] 使用实体朝向计算，重力方向计算错误",
              ["selfHandle", t],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            72,
            "[CheckEntityGravityDirection] 使用实体朝向计算，实体无效",
            ["selfHandle", t],
          ),
        !1);
  }
  CheckNew(e, t, i) {
    var r = e,
      e =
        LevelGamePlayUtils_1.LevelGamePlayUtils.GetCheckTargetConditionEntityHandles(
          r.Target,
          t,
          i,
        );
    if (0 === e.length)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelCondition",
            72,
            "[CheckEntityGravityDirection] 没有符合条件的联机判断的玩家或者指定的实体",
            ["config", r],
            ["inTrigger", t],
            ["context", i],
          ),
        !1
      );
    for (const c of e) {
      if (!c?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[CheckEntityGravityDirection] 联机条件判断的玩家或者指定的实体无效",
              ["entityHandle", c],
            ),
          !1
        );
      var o = this.$j_(c);
      if (!o)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              72,
              "[CheckEntityGravityDirection] 联机条件判断的玩家或者指定的实体重力无效",
              ["entityHandle", c],
            ),
          !1
        );
      switch (r.GravityDirection.Type) {
        case "SelfRotation":
          if (this.Qj_(o, t, i)) break;
          return !1;
        case "VectorInfo":
          if (
            Vector_1.Vector.Create(
              r.GravityDirection.Direction.X,
              r.GravityDirection.Direction.Y,
              r.GravityDirection.Direction.Z,
            ).Equals(o)
          )
            break;
          return !1;
        case "WorldAxis":
          if (this.Hj_(r.GravityDirection.WorldAxis).Equals(o)) break;
          return !1;
        case "EntityGravity":
          var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            r.GravityDirection.EntityId,
          );
          if (n?.Valid) {
            var a = this.$j_(n);
            if (a && a.Equals(o)) break;
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                72,
                "[CheckEntityGravityDirection] 指定的实体无效",
                ["specificEntityHandle", n],
              );
          return !1;
        default:
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "LevelCondition",
                72,
                "[CheckEntityGravityDirection] 未实现的重力方向配置",
              ),
            !1
          );
      }
    }
    return !0;
  }
}
(exports.LevelConditionCheckEntityGravityDirection =
  LevelConditionCheckEntityGravityDirection).Wj_ =
  Vector_1.Vector.DownVectorProxy;
//# sourceMappingURL=LevelConditionCheckEntityGravityDirection.js.map
