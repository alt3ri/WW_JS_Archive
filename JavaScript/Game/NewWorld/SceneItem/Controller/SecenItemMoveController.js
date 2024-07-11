"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMoveController = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const SceneItemMoveComponent_1 = require("../Common/Component/SceneItemMoveComponent");
class MoveParam {
  constructor() {
    (this.Points = []),
      (this.IsLoop = !1),
      (this.MoveMotion = void 0),
      (this.StopTime = void 0),
      (this.Acceleration = void 0),
      (this.MaxSpeed = void 0);
  }
}
class SceneItemMoveController extends ControllerBase_1.ControllerBase {
  static AddSceneItemMove(e, o, t, r, n = void 0) {
    const v = new MoveParam();
    (v.Points = o),
      (v.IsLoop = t),
      (v.MoveMotion = r),
      (v.StopTime = n),
      (v.Acceleration =
        r.Type === IAction_1.EMoveMotion.VariableMotion ? r.Acceleration : -1),
      (v.MaxSpeed =
        r.Type === IAction_1.EMoveMotion.VariableMotion ? r.MaxSpeed : -1),
      this.EUr.set(e, v),
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
        this.yUr,
      );
    let i = -1;
    if (r.Type !== IAction_1.EMoveMotion.VariableMotion) {
      const c = e.GetComponent(1).ActorLocationProxy;
      var t = Vector_1.Vector.Create(
        o[o.length - 1].X ?? 0,
        o[o.length - 1].Y ?? 0,
        o[o.length - 1].Z ?? 0,
      );
      if (Vector_1.Vector.Distance(c, t) < MathUtils_1.MathUtils.SmallNumber)
        return void (v.IsLoop && this.TUr(e));
      const l = Vector_1.Vector.Create(
        o[o.length - 1].X ?? 0,
        o[o.length - 1].Y ?? 0,
        o[o.length - 1].Z ?? 0,
      );
      l.SubtractionEqual(
        Vector_1.Vector.Create(o[0].X ?? 0, o[0].Y ?? 0, o[0].Z ?? 0),
      ),
        l.Normalize();
      for (let e = 1; e < o.length; e++) {
        const a = Vector_1.Vector.Create(o[e].X ?? 0, o[e].Y ?? 0, o[e].Z ?? 0);
        if ((a.SubtractionEqual(c), a.Normalize(), a.DotProduct(l) > 0)) {
          i = e;
          break;
        }
      }
      if (i === -1) return;
    } else i = 0;
    this.IUr(e, i);
  }
  static TUr(e, o = 1) {
    const t = this.EUr.get(e);
    if (t) {
      const r = e.GetComponent(113);
      if (r) {
        e = t.Points.slice();
        if (
          (e.reverse(),
          o > 0 && e.splice(0, o),
          t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion)
        )
          for (const i of e) {
            const n = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
            r.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(
                n,
                -1,
                t.StopTime,
                t.MoveMotion.MaxSpeed ?? -1,
                t.MoveMotion.Acceleration ?? -1,
              ),
            );
          }
        else
          for (const c of e) {
            const v = Vector_1.Vector.Create(c.X ?? 0, c.Y ?? 0, c.Z ?? 0);
            r.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(
                v,
                t.MoveMotion?.Time ?? -1,
                t.StopTime,
              ),
            );
          }
        t.IsLoop
          ? r.AddStopMoveCallbackWithEntity(SceneItemMoveController.LUr)
          : r.AddStopMoveCallbackWithEntity(SceneItemMoveController.yUr);
      }
    }
  }
  static IUr(e, t = 1) {
    const r = this.EUr.get(e);
    if (r) {
      const n = e.GetComponent(113);
      if (n) {
        e = r.Points.slice();
        if (
          (t > 0 && e.splice(0, t),
          r.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion)
        ) {
          let o = t > 0;
          for (const i of e) {
            const v = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
            let e = r.StopTime;
            o || ((e = 0), (o = !0)),
              n.AddMoveTarget(
                new SceneItemMoveComponent_1.MoveTarget(
                  v,
                  -1,
                  e,
                  r.MoveMotion.MaxSpeed ?? -1,
                  r.MoveMotion.Acceleration ?? -1,
                ),
              );
          }
        } else
          for (const c of e) {
            const o = Vector_1.Vector.Create(c.X ?? 0, c.Y ?? 0, c.Z ?? 0);
            n.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(
                o,
                r.MoveMotion?.Time ?? -1,
                r.StopTime,
              ),
            );
          }
        r.IsLoop
          ? n.AddStopMoveCallbackWithEntity(SceneItemMoveController.DUr)
          : n.AddStopMoveCallbackWithEntity(SceneItemMoveController.yUr);
      }
    }
  }
}
(exports.SceneItemMoveController = SceneItemMoveController),
  ((_a = SceneItemMoveController).EUr = new Map()),
  (SceneItemMoveController.DUr = (e) => {
    const o = e.GetComponent(113);
    o &&
      (o?.RemoveStopMoveCallbackWithEntity(_a.DUr),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Event",
          32,
          "[LevelEventSceneItemMove] MoveToStartCallback",
        ),
      SceneItemMoveController.TUr(e));
  }),
  (SceneItemMoveController.LUr = (e) => {
    const o = e.GetComponent(113);
    o &&
      (o?.RemoveStopMoveCallbackWithEntity(_a.LUr),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Event",
          32,
          "[LevelEventSceneItemMove] MoveToEndCallback",
        ),
      SceneItemMoveController.IUr(e));
  }),
  (SceneItemMoveController.yUr = (e) => {
    const o = e.GetComponent(113);
    o &&
      (o?.RemoveStopMoveCallbackWithEntity(_a.yUr),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
        _a.yUr,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
          _a.yUr,
        ),
      SceneItemMoveController.EUr.delete(e));
  });
// # sourceMappingURL=SecenItemMoveController.js.map
