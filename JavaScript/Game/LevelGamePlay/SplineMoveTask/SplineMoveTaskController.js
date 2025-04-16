"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineMoveTaskController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class SplineMoveTaskController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    for (var [, t] of this.ni1) for (const n of t) n.TickTask(e);
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ClearWorld,
        this.OnClearWorld,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ClearWorld,
          this.OnClearWorld,
        ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ClearWorld,
        this.OnClearWorld,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ClearWorld,
          this.OnClearWorld,
        ),
      !0
    );
  }
  static GetEntitySplineMoveTasks(e) {
    return this.ni1.get(e);
  }
  static GetEntityCurSplineMoveTask(e) {
    return this.ni1.get(e)?.[0];
  }
  static EndEntityTasks(e) {
    e = this.GetEntitySplineMoveTasks(e);
    if (e && 0 !== e.length) for (const t of Array.from(e)) t.EndTask(!1);
  }
  static RegisterTask(e) {
    if (!e.EntityHandle.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlay",
            39,
            "[SplineMoveTaskController] Task所属实体非valid，不允许注册",
            ["EntityId", e.EntityHandle.Id],
          ),
        !1
      );
    let t = this.ni1.get(e.EntityHandle.Id);
    if (t) {
      if (t.includes(e))
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelPlay",
              39,
              "[SplineMoveTaskController] Task已注册过，可能存在错误导致重复注册",
              ["EntityId", e.EntityHandle.Id],
            ),
          !0
        );
    } else (t = []), this.ni1.set(e.EntityHandle.Id, t);
    return (
      t.push(e),
      e.EntityHandle &&
        !EventSystem_1.EventSystem.HasWithTarget(
          e.EntityHandle,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          e.EntityHandle,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ),
      !0
    );
  }
  static UnregisterTask(e) {
    var t = this.ni1.get(e.EntityHandle.Id),
      n = t?.indexOf(e);
    return (
      void 0 !== n && -1 !== n && t?.splice(n),
      e.EntityHandle &&
        EventSystem_1.EventSystem.HasWithTarget(
          e.EntityHandle,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e.EntityHandle,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ),
      !0
    );
  }
}
(exports.SplineMoveTaskController = SplineMoveTaskController),
  ((_a = SplineMoveTaskController).ni1 = new Map()),
  (SplineMoveTaskController.OnRemoveEntity = (e, t) => {
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "LevelPlay",
        39,
        "[SplineMoveTaskController] 检测到移动实体被销毁，直接结束Task",
        ["EntityId", t.Id],
      );
    t = _a.GetEntitySplineMoveTasks(t.Id);
    if (t && 0 !== t.length) for (const n of Array.from(t)) n.EndTask(!1);
  }),
  (SplineMoveTaskController.OnClearWorld = () => {
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "LevelPlay",
        39,
        "[SplineMoveTaskController]检测到世界清理，结束所有Task",
      );
    var e,
      t = [];
    for ([, e] of _a.ni1) e && 0 !== e.length && t.push(...e);
    for (const n of t) n.EndTask(!1);
  });
//# sourceMappingURL=SplineMoveTaskController.js.map
