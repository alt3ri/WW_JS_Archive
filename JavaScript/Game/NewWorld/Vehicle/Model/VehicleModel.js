"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayDrivingSoundOnReachSpeed =
    exports.KeepDrivingDurationAtSpeed =
    exports.KeepDrivingInfo =
    exports.VehicleModel =
    exports.WaitEntityTaskContext =
      void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
class WaitEntityTaskContext {
  constructor() {
    (this.WaitTask = void 0), (this.Context = void 0);
  }
}
exports.WaitEntityTaskContext = WaitEntityTaskContext;
class VehicleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PlayerVehicleInfo = new Map()),
      (this.VehiclePlayerInfo = new Map()),
      (this.PassengerVehicleMap = new Map()),
      (this.VehiclePassengerMap = new Map()),
      (this.IsReadyRiderSharing = !1),
      (this.IsForbidRiderSharing = !1),
      (this.RideSharingInfo = void 0),
      (this._A = 0),
      (this.Jbl = void 0);
  }
  Reset() {
    this.PlayerVehicleInfo.clear(),
      this.VehiclePlayerInfo.clear(),
      this.PassengerVehicleMap.clear(),
      this.VehiclePassengerMap.clear(),
      (this.IsReadyRiderSharing = !1),
      (this.IsForbidRiderSharing = !1),
      (this.RideSharingInfo = void 0);
  }
  UpdateAllPlayerVehicleData(e) {
    this.PlayerVehicleInfo.clear(),
      this.VehiclePlayerInfo.clear(),
      this.PostUpdateAllVehicleEntityData(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[VehicleModel.UpdateAllPlayerVehicleData] 开始刷新全量载具数据",
          ["PlayerNum", e.length],
        );
    for (const s of e) {
      var t,
        i = new VehicleInfoDefines_1.ScenePlayerVehicleInfo();
      (i.PlayerId = s.W5n),
        this.PlayerVehicleInfo.set(s.W5n, i),
        s.JI_ &&
          ((t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
            i.PlayerId,
          )
            ?.GetCurrentGroup()
            ?.GetCurrentRole()?.CreatureDataId)
            ? ((i.EntityCreatureId = t),
              (i.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(
                s.JI_.F4n,
              )),
              (i.Seat = s.JI_.fhl),
              this.UpdatePlayerVehicleData(i))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Vehicle",
                50,
                "[VehicleModel.UpdateAllPlayerVehicleData] 刷新载具全量数据时无法获取对应PlayerId的CreatureId",
                ["PlayerId", s.W5n],
                ["VehicleId", MathUtils_1.MathUtils.LongToNumber(s.JI_.F4n)],
                ["Seat", s.JI_.fhl],
              ));
    }
  }
  AddOtherPlayerVehicleData(e) {
    var t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo();
    (t.PlayerId = e),
      this.PlayerVehicleInfo.set(e, t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[VehicleModel.AddOtherPlayerVehicleData] 添加玩家载具信息",
          ["PlayerId", e],
        );
  }
  RemoveOtherPlayerVehicleData(e) {
    var t,
      i = this.PlayerVehicleInfo.get(e);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Vehicle",
        50,
        "[VehicleModel.RemoveOtherPlayerVehicleData] 移除玩家载具信息",
        ["PlayerId", i?.PlayerId],
        ["PlayerCreatureId", i?.EntityCreatureId],
        ["VehicleCreatureId", i?.VehicleCreatureId],
        ["Seat", i?.Seat],
      ),
      i &&
        0 !== i.VehicleCreatureId &&
        (((t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId =
          i.PlayerId),
        (t.EntityCreatureId = i.EntityCreatureId),
        (t.VehicleCreatureId = 0),
        (t.Seat = i.Seat),
        this.UpdatePlayerVehicleData(i)),
      this.PlayerVehicleInfo.delete(e);
  }
  UpdatePlayerVehicleData(e) {
    let t = this.PlayerVehicleInfo.get(e.PlayerId);
    t ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[VehicleModel] 没有数据默认不在船上",
          ["PlayerId", e.PlayerId],
          ["Seat", e.Seat],
        ),
      ((t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId =
        e.PlayerId),
      (t.EntityCreatureId = e.EntityCreatureId),
      (t.VehicleCreatureId = 0),
      (t.Seat = e.Seat),
      this.PlayerVehicleInfo.set(e.PlayerId, t));
    var i = 0 !== e.VehicleCreatureId;
    i || ((e.VehicleCreatureId = t.VehicleCreatureId), (e.Seat = -1)),
      (!i && 0 === t.VehicleCreatureId) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Vehicle",
            50,
            "[VehicleModel.UpdateVehicleData] 更新载具数据",
            ["PlayerId", e.PlayerId],
            ["PlayerCreatureId", e.EntityCreatureId],
            ["VehicleCreatureId", e.VehicleCreatureId],
            ["Seat", e.Seat],
          ),
        this.vhl(e),
        this.Mhl(e),
        this.UpdateEntityVehicleData(e));
  }
  Mhl(e) {
    var t = -1 !== e.Seat;
    let i = this.VehiclePlayerInfo.get(e.VehicleCreatureId);
    t
      ? (i ||
          ((i = new Set()), this.VehiclePlayerInfo.set(e.VehicleCreatureId, i)),
        i.add(e.PlayerId))
      : (i.delete(e.PlayerId),
        i.size || this.VehiclePlayerInfo.delete(e.VehicleCreatureId));
  }
  vhl(e) {
    var t = -1 !== e.Seat,
      i = this.PlayerVehicleInfo.get(e.PlayerId);
    (i.EntityCreatureId = e.EntityCreatureId),
      (i.VehicleCreatureId = t ? e.VehicleCreatureId : 0),
      (i.Seat = e.Seat),
      (i.ExitType = e.ExitType);
  }
  UpdateEntityVehicleData(e) {
    var t = e.EntityCreatureId,
      i = e.VehicleCreatureId,
      s = this.PassengerVehicleMap.get(t);
    if (s) {
      var h = s.Context,
        r = h.VehicleCreatureId;
      if (r === i && h.Seat === e.Seat) return;
      s.WaitTask &&
        (s.WaitTask.Cancel(), (s.WaitTask = void 0), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[VehicleController] 由于载具数据更新取消之前的等待实体任务",
          ["OldEntityCreatureId", h.EntityCreatureId],
          ["OldVehicleCreatureId", h.VehicleCreatureId],
          ["OldSeat", h.Seat],
        ),
        this.VehiclePassengerMap.get(r)?.delete(t);
    }
    i = new WaitEntityTaskContext();
    (i.Context = e),
      (i.WaitTask = void 0),
      this.UpdateVehicleEntityInfo(i),
      this.UpdateEntityVehicleInfo(i);
  }
  UpdateEntityVehicleInfo(e) {
    var t = e.Context;
    this.PassengerVehicleMap.set(t.EntityCreatureId, e);
  }
  UpdateVehicleEntityInfo(e) {
    var t = e.Context;
    let i = this.VehiclePassengerMap.get(t.VehicleCreatureId);
    i ||
      ((i = new Map()), this.VehiclePassengerMap.set(t.VehicleCreatureId, i)),
      i.set(t.EntityCreatureId, e);
  }
  PostUpdateAllVehicleEntityData() {
    for (const e of this.PassengerVehicleMap.values())
      this.PostUpdateVehicleEntityData(e.Context);
  }
  PostUpdateVehicleEntityData(e) {
    var t;
    -1 === e.Seat &&
      ((t = this.VehiclePassengerMap.get(e.VehicleCreatureId)).delete(
        e.EntityCreatureId,
      ),
      t.size || this.VehiclePassengerMap.delete(e.VehicleCreatureId),
      this.PassengerVehicleMap.delete(e.EntityCreatureId));
  }
  GetVehiclePlayerData(e) {
    var t = new Array(),
      e = this.VehiclePlayerInfo.get(e);
    if (e) for (const i of e) t.push(this.PlayerVehicleInfo.get(i));
    return t;
  }
  GetPlayerVehicleData(e) {
    return this.PlayerVehicleInfo.get(e);
  }
  GetEntityVehicleData(e) {
    return this.PassengerVehicleMap.get(e)?.Context;
  }
  UpdateKeepDrivingInfo(e, t) {
    if (this.Jbl)
      for (const i of this.Jbl)
        (i[1].CheckCondition && !i[1].CheckCondition()) ||
          !i[1].UpdateDrivingInfo(e, t) ||
          (i[1].RunAction &&
            (i[1].RunAction(), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Vehicle",
              42,
              "[VehicleModel] 达成持续驾驶事件",
              ["UID", i[0]],
              ["info", i[1].ToString()],
            ));
  }
  AddKeepDrivingInfo(e) {
    return (
      this.Jbl || (this.Jbl = new Map()),
      this._A++,
      this.Jbl.set(this._A, e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Vehicle",
          42,
          "[VehicleModel] 新增持续驾驶事件",
          ["UID", this._A],
          ["info", e.ToString()],
        ),
      this._A
    );
  }
  RemoveKeepDrivingInfo(e) {
    this.Jbl?.has(e) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Vehicle",
          42,
          "[VehicleModel] 移除持续驾驶事件",
          ["UID", e],
          ["info", this.Jbl.get(e)?.ToString()],
        ),
      this.Jbl.delete(e));
  }
}
exports.VehicleModel = VehicleModel;
class KeepDrivingInfo {
  constructor() {
    (this.CheckCondition = void 0), (this.RunAction = void 0);
  }
}
class KeepDrivingDurationAtSpeed extends (exports.KeepDrivingInfo =
  KeepDrivingInfo) {
  constructor(e, t, i, s, h) {
    super(),
      (this.SpeedRange = [0, 0]),
      (this.Duration = 0),
      (this.CurrentDuration = 0),
      (this.CoolDown = 0),
      (this.LastTime = 0),
      (this.SpeedRange = e),
      (this.Duration = t),
      (this.CoolDown = h ?? 0),
      (this.CheckCondition = i),
      (this.RunAction = s);
  }
  UpdateDrivingInfo(e, t) {
    t = MathUtils_1.MathUtils.InRangeArray(t.Speed, this.SpeedRange);
    if (t) {
      if (((this.CurrentDuration += e), this.CurrentDuration > this.Duration))
        return (
          Math.abs(TimerSystem_1.TimerSystem.Now - this.LastTime) >
            this.CoolDown &&
          ((this.LastTime = TimerSystem_1.TimerSystem.Now), !0)
        );
    } else this.CurrentDuration = 0;
    return !1;
  }
  ToString() {
    return `保持速度在区间[${this.SpeedRange[0]},${this.SpeedRange[1]}]内,持续${this.Duration}毫秒,冷却时间${this.CoolDown}毫秒`;
  }
}
exports.KeepDrivingDurationAtSpeed = KeepDrivingDurationAtSpeed;
class PlayDrivingSoundOnReachSpeed extends KeepDrivingInfo {
  constructor(e, t, i, s) {
    super(),
      (this.SpeedRange = [0, 0]),
      (this.CoolDown = 0),
      (this.LastSpeed = 0),
      (this.LastTime = 0),
      (this.SpeedRange = e),
      (this.CoolDown = t),
      (this.CheckCondition = i),
      (this.RunAction = s);
  }
  UpdateDrivingInfo(e, t) {
    var i =
      !MathUtils_1.MathUtils.InRangeArray(this.LastSpeed, this.SpeedRange) &&
      MathUtils_1.MathUtils.InRangeArray(t.Speed, this.SpeedRange);
    if (
      ((this.LastSpeed = t.Speed), i) &&
      Math.abs(TimerSystem_1.TimerSystem.Now - this.LastTime) > this.CoolDown
    )
      return (this.LastTime = TimerSystem_1.TimerSystem.Now), !0;
    return !1;
  }
  ToString() {
    return `速度每次进入区间[${this.SpeedRange[0]},${this.SpeedRange[1]}]内,触发事件,冷却时间${this.CoolDown}毫秒`;
  }
}
exports.PlayDrivingSoundOnReachSpeed = PlayDrivingSoundOnReachSpeed;
//# sourceMappingURL=VehicleModel.js.map
