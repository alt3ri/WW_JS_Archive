"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SyncSplineMoveController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../Define/WaitEntityTask"),
  splineMoveStatusLogString = {
    [Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusInterrupt]: "中断",
    [Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusMoving]: "运行",
    [Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusStop]: "停止",
  };
class SyncSplineMoveController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(16420, this.OnMoveSplineStatusNotify), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(16420), !0;
  }
  static RecvSyncSplineMoveStatus(e, o) {
    switch (e.GetComponent(0)?.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.HI_:
        this.RecvSyncVehicleSplineMoveStatus(e, o);
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        this.RecvSyncSceneItemSplineMoveStatus(e, o);
    }
  }
  static RecvSyncSceneItemSplineMoveStatus(e, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SceneItem",
        39,
        "[SyncSplineMoveController.RecvSyncSceneItemSplineMoveStatus] 接收同步场景物件样条移动信息",
        ["CreatureDataId", o.F4n],
        ["SplineId", o.dTs],
        ["Status", splineMoveStatusLogString[o.PRc]],
        ["RuntimeData", o.TRc],
        ["Config", o.IRc],
      );
    var t = e.GetComponent(126);
    if (t?.Valid)
      switch (o.PRc) {
        case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusMoving:
          t.OnRecvSyncSplineMoving(o.dTs, o.IRc, o.TRc);
          break;
        case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusStop:
          t.OnRecvSyncSplineStop(o.dTs, o.IRc, o.TRc);
          break;
        case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusInterrupt:
          t.OnRecvSyncSplineInterrupt(o.dTs, o.IRc, o.TRc);
      }
  }
  static SendSyncSceneItemSplineMoveRunning(o, t, e, n) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SceneItem",
        39,
        "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息",
        ["CreatureDataId", o],
        ["SplineId", t],
        ["CurDistanceAlongSpline", e],
        ["CurPos", n],
      );
    var r = Protocol_1.Aki.Protocol.CRc.create();
    (r.F4n = o),
      (r.dTs = t),
      (r.PRc = Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusMoving),
      (r.DRc = Protocol_1.Aki.Protocol.kRc.create()),
      (r.DRc.URc = e),
      (r.DRc.BRc = Protocol_1.Aki.Protocol.Gks.create()),
      (r.DRc.BRc.X = n.X),
      (r.DRc.BRc.Y = n.Y),
      (r.DRc.BRc.Z = n.Z),
      Net_1.Net.Call(27646, r, (e) => {
        (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息: 失败",
              ["CreatureDataId", o],
              ["SplineId", t],
              ["ErrorCode", e?.Q4n],
            ));
      });
  }
  static SendSyncSceneItemSplineMoveEnd(o, t, e, n, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SceneItem",
        39,
        "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息",
        ["CreatureDataId", o],
        ["SplineId", t],
        ["CurDistanceAlongSpline", e],
        ["CurPos", n],
        ["IsInterrupt", r],
      );
    var l = Protocol_1.Aki.Protocol.CRc.create();
    (l.F4n = o),
      (l.dTs = t),
      (l.PRc = r
        ? Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusInterrupt
        : Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusStop),
      (l.DRc = Protocol_1.Aki.Protocol.kRc.create()),
      (l.DRc.URc = e),
      (l.DRc.BRc = Protocol_1.Aki.Protocol.Gks.create()),
      (l.DRc.BRc.X = n.X),
      (l.DRc.BRc.Y = n.Y),
      (l.DRc.BRc.Z = n.Z),
      Net_1.Net.Call(27646, l, (e) => {
        (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息: 失败",
              ["CreatureDataId", o],
              ["SplineId", t],
              ["ErrorCode", e?.Q4n],
            ));
      });
  }
  static RecvSyncVehicleSplineMoveStatus(e, o) {
    switch (o.PRc) {
      case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusMoving:
        this.SyncVehicleMoveAlongPath(e, o.dTs);
        break;
      case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusStop:
      case Protocol_1.Aki.Protocol.PRc.Proto_MoveStatusInterrupt:
        this.SyncVehicleStopMove(e);
    }
  }
  static SendSyncVehicleSplineMoveEndRequest(e, o, t) {
    var n,
      r = e.GetComponent(0);
    r
      ? ((r = r.GetCreatureDataId()),
        ((n = Protocol_1.Aki.Protocol.SRc.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(r)),
        (n.dTs = o),
        (n.xRc = t),
        Net_1.Net.Call(29751, n, () => {}))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Movement",
          50,
          "[SyncSplineMoveController.MoveSplineStatusNotify] 结束时无法获取对应实体CreatureData",
          ["EntityId", e.Id],
          ["SplineId", o],
          ["IsInterrupt", t],
        );
  }
  static SyncVehicleMoveAlongPath(o, t) {
    var e,
      n = o.GetComponent(233);
    n &&
      ((e = n.GetMovingSplineId()) && e !== t && n.StopMove(),
      n.MoveAlongPath({
        SplineId: t,
        StartFromNearest: !0,
        OnMoveEndHandle: (e) => {
          e && this.SendSyncVehicleSplineMoveEndRequest(o, t, !1);
        },
      }));
  }
  static SyncVehicleStopMove(e) {
    e = e.GetComponent(233);
    e && e.StopMove();
  }
}
(exports.SyncSplineMoveController = SyncSplineMoveController),
  ((_a = SyncSplineMoveController).OnMoveSplineStatusNotify = (o) => {
    const t = MathUtils_1.MathUtils.LongToNumber(o.F4n);
    WaitEntityTask_1.WaitEntityTask.Create("MoveSplineStatusNotify", t, () => {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
      e?.Valid
        ? _a.RecvSyncSplineMoveStatus(e.Entity, o)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            50,
            "[MoveSplineStatusNotify] 无法获取对应实体",
            ["CreatureId", t],
            ["SplineId", o.dTs],
            ["Status", splineMoveStatusLogString[o.PRc]],
          );
    });
  });
//# sourceMappingURL=SyncSplineMoveController.js.map
