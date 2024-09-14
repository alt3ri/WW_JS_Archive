"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotCleanRange = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
class Range {
  constructor(e, t, o) {
    (this.Center = e), (this.RadiusSquare = t), (this.IgnoreList = o);
  }
}
class PlotCleanRange {
  constructor() {
    (this.WNn = !1),
      (this.VYi = !1),
      (this.QNn = new Map()),
      (this.$Nn = !1),
      (this.uWs = []),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Jpe = (e, t) => {
        var o;
        this.JNn(t) &&
          (void 0 !==
            (o = t.Entity?.Disable(
              "PlotCleanRange.OnCreateEntity.DisableEntity",
            )) && this.QNn.set(t, o),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Plot",
            27,
            "[PlotCleanRange] 剧情清场持续隐藏实体",
            ["pb", t.PbDataId],
            ["cd", t.CreatureDataId],
          );
      });
  }
  Open(e) {
    this.WNn = !0;
    const t = new Set();
    e.EntityIds.forEach((e) => {
      t.add(e);
    }),
      this.$Nn || (this.$Nn = !e.IsCleanPasserByNpc);
    var o,
      n = Vector_1.Vector.Create(),
      i = (n.FromConfigVector(e.Center), new Range(n, e.Radius * e.Radius, t));
    this.uWs.push(i), this.zNn(e.IsCleanSimpleNpc);
    for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      this.JNn(r, i) &&
        void 0 !==
          (o = r.Entity?.Disable("PlotCleanRange.Open.DisableEntity")) &&
        this.QNn.set(r, o);
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CreateEntity,
      this.Jpe,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      );
    const l = [];
    this.QNn.forEach((e, t) => {
      l.push([t.PbDataId, t.CreatureDataId]);
    }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 剧情清场隐藏范围内实体", [
          "list",
          l,
        ]);
  }
  Close() {
    if (this.WNn) {
      this.ZNn(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntity,
          this.Jpe,
        );
      for (var [e, t] of this.QNn)
        e.Valid && e.Entity && e.Entity.Enable(t, "PlotCleanRange.Close");
      (this.uWs.length = 0),
        (this.$Nn = !1),
        this.QNn.clear(),
        (this.WNn = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 恢复清场");
    }
  }
  zNn(e) {
    this.VYi ||
      (e &&
        ((this.VYi = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 演出清理SimpleNPC"),
        SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, !0)));
  }
  ZNn() {
    this.VYi &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 演出恢复SimpleNPC"),
      SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, !1),
      (this.VYi = !1));
  }
  JNn(e, t) {
    if (this.QNn.has(e)) return !1;
    if (!e.Entity?.Valid)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 实体失效 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1
      );
    var o = e.Entity.GetComponent(0);
    if (!o)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 拿不到CreatureData 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1
      );
    if (o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 主角 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1
      );
    var n = o.GetBaseInfo();
    if (n && 100 === n.Category.HideInFlowType)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 配置必显示 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1
      );
    if (2 === o.GetSubEntityType())
      return (
        !this.$Nn ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 行人 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1)
      );
    if (e.Entity.GetComponent(196))
      return (
        !this.$Nn ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 刷行人器 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1)
      );
    n = e.Entity.GetComponent(1)?.ActorTransform;
    if (n) this.Lz.FromUeVector(n.GetLocation());
    else {
      n = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(
        e.PbDataId,
      )?.Transform;
      if (!n)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "[PlotCleanRange] 拿不到坐标 忽略",
              ["pb", e.PbDataId],
              ["cd", e.CreatureDataId],
            ),
          !1
        );
      this.Lz.FromConfigVector(n.Pos);
    }
    let i = !1;
    if (t) i = this.zsn(e, o, t);
    else
      for (const t of this.uWs)
        if (this.zsn(e, o, t)) {
          i = !0;
          break;
        }
    return !!i;
  }
  zsn(e, t, o) {
    return o.IgnoreList.has(t.GetPbDataId())
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotCleanRange] 忽略列表中 忽略",
            ["pb", e.PbDataId],
            ["cd", e.CreatureDataId],
          ),
        !1)
      : !(
          Vector_1.Vector.DistSquared(this.Lz, o.Center) > o.RadiusSquare &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "[PlotCleanRange] 范围外 忽略",
              ["pb", e.PbDataId],
              ["cd", e.CreatureDataId],
            ),
          1)
        );
  }
  OnTick(e) {}
}
exports.PlotCleanRange = PlotCleanRange;
//# sourceMappingURL=PlotCleanRange.js.map
