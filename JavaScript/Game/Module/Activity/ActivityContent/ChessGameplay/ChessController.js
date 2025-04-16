"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChessController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
class ChessController extends ControllerBase_1.ControllerBase {
  static async InitChessGameAsync(e, o, r, a = 0) {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    var t = [];
    for (const M of o) t.push(M.CreatureDataId);
    const s = new CustomPromise_1.CustomPromise();
    WaitEntityTask_1.WaitEntityTask.Create("InitChessGame", t, () => {
      s.SetResult();
    }),
      await s.Promise,
      ModelManager_1.ModelManager.ChessModel.UpdateChessMode(a);
    for (const i of e)
      ModelManager_1.ModelManager.ChessModel.AddChessboardPoint(
        i.Id,
        i.Location,
        i.Rotation,
        i.SortIndex,
      );
    for (const l of o) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        l.CreatureDataId,
      );
      n?.IsInit &&
        (ModelManager_1.ModelManager.ChessModel.AddChessItem(l.Id, n),
        ChessController.TeleportItemToPoint(l.Id, l.InitPointId));
    }
    ModelManager_1.ModelManager.ChessModel.UpdateTerminalPoint(r);
  }
  static async MoveItemToPointAsync(e, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Chess",
        48,
        "ChessItemMove Begin",
        ["ItemId", e],
        ["TargetPointId", o],
      );
    var r,
      a = ModelManager_1.ModelManager.ChessModel.GetChessItem(e),
      t = ModelManager_1.ModelManager.ChessModel.GetChessboardPoint(o);
    a &&
      t &&
      (a.GetCurrentPoint()?.ItemLeave(a),
      (r = t.GetMoveLocationAndRotator()),
      await a.MoveAsync(r[0], r[1]),
      t.ItemEnter(a),
      ChessController.nkc()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Chess",
          48,
          "ChessItemMove End",
          ["ItemId", e],
          ["TargetPointId", o],
        );
  }
  static async ChessItemPerformAsync(e, o) {
    e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    e && (await e.PerformAsync(o));
  }
  static TeleportItemToPoint(e, o) {
    var r,
      e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e),
      o = ModelManager_1.ModelManager.ChessModel.GetChessboardPoint(o);
    e &&
      o &&
      (e.GetCurrentPoint()?.ItemLeave(e),
      (r = o.GetMoveLocationAndRotator()),
      e.Teleport(r[0], r[1]),
      o.ItemEnter(e),
      ChessController.nkc());
  }
  static ChangeItemToMaxPriorityInPoint(e) {
    e = ModelManager_1.ModelManager.ChessModel.GetChessItem(e);
    e?.GetCurrentPoint()?.ChangeItemToMaxPriority(e), ChessController.nkc();
  }
  static nkc() {
    ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList = void 0;
  }
  static GetRankingItemIdList() {
    var e = ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList;
    if (e) return e;
    e = ModelManager_1.ModelManager.ChessModel.GetTerminalPoint();
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Chess", 48, "未设置终点，无法比较优先级"),
        ModelManager_1.ModelManager.ChessModel.GetChessItemIdList()
      );
    const t = e.GetSortIndex();
    e = ModelManager_1.ModelManager.ChessModel.GetChessItemIdList((e, o) => {
      var r = e.GetReachTerminalTimes(),
        a = o.GetReachTerminalTimes();
      return r !== a
        ? a - r
        : ((a = e.GetCurrentPoint()),
          (r = o.GetCurrentPoint()),
          a && r
            ? a.GetId() === r.GetId()
              ? a.ComparePriority(e, o)
              : ((e = t - a.GetSortIndex()),
                (o = t - r.GetSortIndex()),
                0 == e ? 1 : 0 == o ? -1 : 0 < e * o ? e - o : o - e)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Chess", 48, "棋子所在点位不存在"),
              0));
    });
    return (ModelManager_1.ModelManager.ChessModel.CacheRankingItemIdList = e);
  }
}
exports.ChessController = ChessController;
//# sourceMappingURL=ChessController.js.map
