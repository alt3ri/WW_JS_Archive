"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventVehicleWaterfallMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  GameSplineComponent_1 = require("../Common/GameSplineComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleWaterfallMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.OPt = void 0),
      (this.nx = void 0),
      (this.hic = void 0),
      (this.lic = () => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.hic,
          EventDefine_1.EEventName.OnWaterfallMoveEnd,
          this.lic,
        ),
          this.FinishExecute(!0),
          (this.hic = void 0);
      });
  }
  ExecuteNew(e, t) {
    (this.OPt = e),
      (this.nx = t),
      this.OPt ? this.n0l(this.OPt, this.nx) : this.FinishExecute(!1);
  }
  n0l(e, t) {
    var i,
      s,
      o,
      r = Global_1.Global.BaseCharacter?.CharacterActorComponent,
      l = r?.Entity.GetComponent(226),
      n = l?.VehicleEntity?.GetComponent(242);
    n
      ? (s = new GameSplineComponent_1.GameSplineComponent(
          e.SplineEntityId,
        )).Initialize()
        ? (i = s.GetNumberOfSplinePoints()) < 2
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Vehicle",
                50,
                "[LevelEventExecVehicleAction] 攀瀑样条点数量不合法",
                ["SplineId", e.SplineEntityId],
                ["PointNum", i],
              ),
            this.FinishExecute(!1))
          : ((o = s.GetWorldLocationAtSplinePoint(i - 1)),
            (s = s.GetWorldLocationAtSplinePoint(i - 2)),
            o.Subtraction(s, MathUtils_1.MathUtils.CommonTempVector),
            GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
              r,
              MathUtils_1.MathUtils.CommonTempVector,
            ),
            MathUtils_1.MathUtils.CommonTempVector.Normalize()
              ? ((o = this._ic(e.ChangeGravity?.GravityDirection)),
                n.TryEnterWaterfallMove({
                  SplineId: e.SplineEntityId,
                  Direct: Vector_1.Vector.Create(
                    MathUtils_1.MathUtils.CommonTempVector,
                  ),
                  ChangeGravity: o,
                })
                  ? ((this.hic = l.VehicleEntity),
                    EventSystem_1.EventSystem.AddWithTarget(
                      this.hic,
                      EventDefine_1.EEventName.OnWaterfallMoveEnd,
                      this.lic,
                    ))
                  : this.FinishExecute(!1))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Vehicle",
                    50,
                    "[LevelEventExecVehicleAction] 无法从计算得到攀瀑方向",
                    ["SplineId", e.SplineEntityId],
                    ["PointNum", i],
                  ),
                this.FinishExecute(!1)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Vehicle",
              50,
              "[LevelEventExecVehicleAction] 攀瀑样条数据获取失败",
              ["SplineId", e.SplineEntityId],
            ),
          this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Vehicle",
            50,
            "[LevelEventExecVehicleAction] 无法获取玩家角色，或玩家角色未乘坐载具",
            ["RolePbDataId", r?.CreatureData.GetPbDataId()],
            ["IsOnVehicle", !!l?.VehicleEntity],
          ),
        this.FinishExecute(!1));
  }
  _ic(e) {
    var t = Vector_1.Vector.Create();
    switch (e) {
      case "PositiveX":
        t.Set(1, 0, 0);
        break;
      case "NegativeX":
        t.Set(-1, 0, 0);
        break;
      case "PositiveY":
        t.Set(0, 1, 0);
        break;
      case "NegativeY":
        t.Set(0, -1, 0);
        break;
      case "PositiveZ":
        t.Set(0, 0, 1);
        break;
      case "NegativeZ":
        t.Set(0, 0, -1);
        break;
      default:
        return;
    }
    return t;
  }
}
exports.LevelEventVehicleWaterfallMove = LevelEventVehicleWaterfallMove;
//# sourceMappingURL=LevelEventVehicleWaterfallMove.js.map
