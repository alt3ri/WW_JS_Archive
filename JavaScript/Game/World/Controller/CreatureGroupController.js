"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureGroupController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DisjointSet_1 = require("../../../Core/Container/DisjointSet"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BindGroupEntityWhiteFilter_1 = require("../../Utils/Filter/EntityToLoad/BindGroupEntityWhiteFilter");
class CreatureGroupController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return super.OnInit();
  }
  static OnClear() {
    return this.sTa.Clear(), this.Bkc.Cleanup(), super.OnClear();
  }
  static AddBindEntity(r, e) {
    this.sTa.Union(r, e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          19,
          "[实体生命周期:实体绑组] 建立实体绑定",
          ["CreatureDataIdA", r],
          ["CreatureDataIdB", e],
        );
  }
  static HasBindGroup(r) {
    return this.sTa.Has(r);
  }
  static GetBindGroup(r) {
    return this.sTa.GetSet(r);
  }
  static rr_(r) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    if (r?.Valid && r.Entity)
      return 64 & (r = r.Entity.Flag)
        ? 64
        : 32 & r
          ? 32
          : 16 & r
            ? 16
            : 8 & r
              ? 8
              : 4 & r
                ? 4
                : 2 & r
                  ? 2
                  : 1 & r
                    ? 1
                    : 0;
  }
  static or_(r) {
    let e = 4;
    for (const o of r) {
      var t = this.rr_(o);
      void 0 !== t && (e = Math.max(e, t));
    }
    return e;
  }
  static nr_(r) {
    let e = 16;
    for (const o of r) {
      var t = this.rr_(o);
      void 0 !== t && (e = Math.min(e, t));
    }
    return e;
  }
  static sr_() {
    var r, e;
    (CreatureGroupController.ar_ = !1),
      0 < CreatureGroupController.hr_.size &&
        ((r = [...CreatureGroupController.hr_.keys()][0]),
        (e = CreatureGroupController.hr_.get(r)),
        CreatureGroupController.hr_.delete(r),
        CreatureGroupController.RefreshBindGroup(r, e));
  }
  static RefreshBindGroup(r, e) {
    var t = CreatureGroupController.GetBindGroup(r),
      o = [
        ["CreatureDataId", r],
        ["bindGroup", t],
        [
          "EntityId",
          ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Id,
        ],
        ["reason", e],
      ];
    if (t) {
      var n = this.or_(t),
        i = this.nr_(t);
      if ((o.push(["highestFlag", n], ["lowestFlag", i]), 16 <= i)) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            19,
            "[实体生命周期:实体绑组] 实体组激活完毕，删除实体组及相应缓存",
            ...o,
          );
        for (const l of t) CreatureGroupController.hr_.delete(l);
        CreatureGroupController.sTa.DeleteSet(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RemoveEntityFromBindGroup,
            t,
          ),
          this.sr_();
      } else if (CreatureGroupController.ar_)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            19,
            "[实体生命周期:实体绑组] 绑组递归调用，缓存执行",
            ...o,
          ),
          CreatureGroupController.hr_.set(r, e);
      else {
        if (((CreatureGroupController.ar_ = !0), n <= i)) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              19,
              "[实体生命周期:实体绑组] 整组推进生命周期",
              ...o,
            );
          for (const u of t) CreatureGroupController.lr_(u);
        } else if (4 < n) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              19,
              "[实体生命周期:实体绑组] 部分推进生命周期",
              ...o,
            );
          for (const C of t) {
            var a = CreatureGroupController.rr_(C);
            a && a < n && CreatureGroupController.lr_(C);
          }
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              19,
              "[实体生命周期:实体绑组] 同组尚未start，暂时阻塞",
              ...o,
            );
        this.sr_();
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          19,
          "[实体生命周期:实体绑组] 实体不在实体组中",
          ...o,
        ),
        this.sr_();
  }
  static lr_(r) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      t = CreatureGroupController.rr_(r),
      o = [
        ["CreatureDataId", r],
        ["EntityId", e?.Id],
        ["ExecutedFlag", t],
      ];
    e?.Valid && e.Entity
      ? t
        ? t < 4 || 16 <= t
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Entity",
              19,
              "[实体生命周期:实体绑组]实体无需推进",
              ...o,
            )
          : 4 === t
            ? ControllerHolder_1.ControllerHolder.CreatureController.ActivateEntityRequest(
                e,
              )
            : 8 === t
              ? (EntitySystem_1.EntitySystem.PostActive(e.Entity),
                CreatureGroupController.RefreshBindGroup(r, "postActive"))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  19,
                  "[实体生命周期:实体绑组]预期外的flag类型",
                  ...o,
                )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            19,
            "[实体生命周期:实体绑组]实体Flag为空",
            ...o,
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          19,
          "[实体生命周期:实体绑组]推进不存在的实体生命周期",
          ...o,
        );
  }
  static RemoveFromBindGroup(e, t) {
    var o = CreatureGroupController.GetBindGroup(e);
    if (o) {
      let r = void 0;
      for (const n of o)
        if (void 0 !== n && n !== e) {
          r = n;
          break;
        }
      CreatureGroupController.sTa.Delete(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveEntityFromBindGroup,
          e,
        ),
        void 0 !== r &&
          (CreatureGroupController.HasBindGroup(r)
            ? CreatureGroupController.RefreshBindGroup(r, t)
            : CreatureGroupController.lr_(r));
    }
  }
}
((exports.CreatureGroupController = CreatureGroupController).sTa =
  new DisjointSet_1.DisjointSet()),
  (CreatureGroupController.Bkc =
    BindGroupEntityWhiteFilter_1.BindGroupEntityWhiteFilter.Create()),
  (CreatureGroupController.ar_ = !1),
  (CreatureGroupController.hr_ = new Map());
//# sourceMappingURL=CreatureGroupController.js.map
