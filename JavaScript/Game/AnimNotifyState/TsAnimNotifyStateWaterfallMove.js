"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateWaterfallMove extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, o) {
    const r = e.GetOwner();
    if (!r) return !1;
    if (!(r instanceof TsBaseVehicle_1.default)) return !1;
    e = r.VehicleActorComponent?.Entity;
    const i = e?.GetComponent(242);
    if (!i?.IsWaterfallMove) return !1;
    var a = e?.GetComponent(238);
    a?.RemoveTag(-1782915173), a?.AddTag(-360496329);
    e?.GetComponent(232)?.ConsumeRootMotion(),
      i.WaterfallHideVehicleAndPassenger(!0, "贡多拉攀瀑入水");
    a = Rotator_1.Rotator.Create();
    return (
      i.WaterfallDirect.Rotation(a),
      i.IsWaterfallDynamicGravity ||
        e
          ?.GetComponent(231)
          .SetActorRotation(a.ToUeRotator(), "攀瀑进入二阶段设置旋转", !1),
      e?.GetComponent(233).MoveAlongPath({
        SplineId: i.WaterfallSplineId,
        SimulateRotation: !1,
        NeedSync: !1,
        DynamicGravity: i.IsWaterfallDynamicGravity,
        OnMoveEndHandle: (e) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Vehicle",
              50,
              "贡多拉攀瀑样条移动结束",
              ["PbDataId", r.VehicleActorComponent?.CreatureData.GetPbDataId()],
              ["SplineId", i.WaterfallSplineId],
              ["Result", e],
            ),
            e ? i?.OnWaterfallMoveBeginEnd() : i?.EndWaterfallMove();
        },
      }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "贡多拉攀瀑进入二阶段",
          ["PbDataId", r.VehicleActorComponent?.CreatureData.GetPbDataId()],
          ["SplineId", i.WaterfallSplineId],
          ["Passengers", i.PassengerInfoMap],
        ),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      !!e &&
      e instanceof TsBaseVehicle_1.default &&
      !!(e = e.VehicleActorComponent?.Entity?.GetComponent(242))
        ?.IsWaterfallMove &&
      (e.EndWaterfallMove(), !0)
    );
  }
  GetNotifyName() {
    return "贡多拉攀瀑";
  }
}
exports.default = TsAnimNotifyStateWaterfallMove;
//# sourceMappingURL=TsAnimNotifyStateWaterfallMove.js.map
