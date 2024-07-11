"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotCleanRange = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
class Range {
  constructor(e, t, o) {
    (this.Center = e), (this.RadiusSquare = t), (this.IgnoreList = o);
  }
}
class PlotCleanRange {
  constructor() {
    (this.PGn = !1),
      (this.j$i = !1),
      (this.wGn = new Map()),
      (this.qGn = !1),
      (this.g6s = []),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Jpe = (e, t) => {
        let o;
        this.OGn(t) &&
          (void 0 !==
            (o = t.Entity?.Disable(
              "PlotCleanRange.OnCreateEntity.DisableEntity",
            )) && this.wGn.set(t, o),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            t.Entity,
            !1,
            "PlotCleanRange.OnCreateEntity",
          ),
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
    this.PGn = !0;
    const t = new Set();
    e.EntityIds.forEach((e) => {
      t.add(e);
    }),
      this.qGn || (this.qGn = !e.IsCleanPasserByNpc);
    let o;
    const n = Vector_1.Vector.Create();
    const l =
      (n.FromConfigVector(e.Center), new Range(n, e.Radius * e.Radius, t));
    this.g6s.push(l), this.NGn(e.IsCleanSimpleNpc);
    for (const i of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      this.OGn(i, l) &&
        (void 0 !==
          (o = i.Entity?.Disable("PlotCleanRange.Open.DisableEntity")) &&
          this.wGn.set(i, o),
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          i.Entity,
          !1,
          "PlotCleanRange.Open",
        ));
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CreateEntity,
      this.Jpe,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      );
    const r = [];
    this.wGn.forEach((e, t) => {
      r.push([t.PbDataId, t.CreatureDataId]);
    }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 剧情清场隐藏范围内实体", [
          "list",
          r,
        ]);
  }
  Close() {
    if (this.PGn) {
      this.kGn(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntity,
          this.Jpe,
        );
      for (const [e, t] of this.wGn)
        e.Valid &&
          e.Entity &&
          (e.Entity.Enable(t, "PlotCleanRange.Close"),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            e.Entity,
            !0,
            "PlotCleanRange",
          ));
      (this.g6s.length = 0),
        (this.qGn = !1),
        this.wGn.clear(),
        (this.PGn = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 恢复清场");
    }
  }
  NGn(e) {
    this.j$i ||
      (e &&
        ((this.j$i = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 演出清理SimpleNPC"),
        SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, !0)));
  }
  kGn() {
    this.j$i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotCleanRange] 演出恢复SimpleNPC"),
      SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, !1),
      (this.j$i = !1));
  }
  OGn(e, t) {
    if (this.wGn.has(e)) return !1;
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
    const o = e.Entity.GetComponent(0);
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
    if (o.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player)
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
    let n = o.GetBaseInfo();
    if (n && n.Category.HideInFlowType === 100)
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
    if (o.GetSubEntityType() === 2)
      return (
        !this.qGn ||
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
    if (e.Entity.GetComponent(189))
      return (
        !this.qGn ||
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
    let l = !1;
    if (t) l = this.van(e, o, t);
    else
      for (const t of this.g6s)
        if (this.van(e, o, t)) {
          l = !0;
          break;
        }
    return !!l;
  }
  van(e, t, o) {
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
// # sourceMappingURL=PlotCleanRange.js.map
