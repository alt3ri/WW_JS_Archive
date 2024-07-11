"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DebugDrawManager = void 0);
const UE = require("ue"),
  GlobalData_1 = require("../../GlobalData"),
  RenderDataManager_1 = require("../Data/RenderDataManager");
class EffectDebugDrawInfo {
  constructor() {
    (this.Index = 0),
      (this.Type = void 0),
      (this.VectorA = void 0),
      (this.ColorA = void 0),
      (this.NumberA = 0),
      (this.BoxA = void 0);
  }
}
class DebugDrawManager {
  constructor() {
    (this.DebugDrawMap = void 0), (this.Counter = 0);
  }
  static EnsureInstance() {
    this.Instance ||
      ((this.Instance = new DebugDrawManager()),
      (this.Instance.Counter = 0),
      (this.Instance.DebugDrawMap = new Map()));
  }
  static AddDebugLineFromPlayer(t, a, e) {
    this.EnsureInstance();
    var i = new EffectDebugDrawInfo();
    return (
      (i.Index = this.Instance.Counter),
      (i.Type = 0),
      (i.VectorA = t),
      (i.ColorA = a),
      (i.NumberA = e),
      this.Instance.DebugDrawMap.set(i.Index, i),
      this.Instance.Counter++,
      i.Index
    );
  }
  static AddDebugBox(t, a, e) {
    this.EnsureInstance();
    var i = new EffectDebugDrawInfo();
    return (
      (i.Index = this.Instance.Counter),
      (i.Type = 1),
      (i.ColorA = a),
      (i.NumberA = e),
      (i.BoxA = t),
      this.Instance.DebugDrawMap.set(i.Index, i),
      this.Instance.Counter++,
      i.Index
    );
  }
  static RemoveDebugDraw(t) {
    this.Instance && this.Instance.DebugDrawMap.delete(t);
  }
  static ClearDebugDraw() {
    this.Instance && this.Instance.DebugDrawMap.clear();
  }
  static Initialize() {}
  static Tick(t) {
    if (this.Instance)
      this.Instance.DebugDrawMap.forEach((t, a) => {
        switch (t.Type) {
          case 0:
            UE.KismetSystemLibrary.DrawDebugLine(
              GlobalData_1.GlobalData.World,
              RenderDataManager_1.RenderDataManager.Get()
                .GetCurrentCharacterPosition()
                .ToUeVector(),
              t.VectorA.ToUeVector(),
              t.ColorA,
              0.01,
              t.NumberA,
            );
            break;
          case 1:
            UE.KismetSystemLibrary.DrawDebugBox(
              GlobalData_1.GlobalData.World,
              t.BoxA.Min.op_Addition(t.BoxA.Max).op_Division(2),
              t.BoxA.Max.op_Subtraction(t.BoxA.Min).op_Division(2),
              t.ColorA,
              void 0,
              0.01,
              t.NumberA,
            );
        }
      });
  }
  static Destroy() {
    this.Instance && (this.Instance = void 0);
  }
}
(exports.DebugDrawManager = DebugDrawManager).Instance = void 0;
//# sourceMappingURL=DebugDrawManager.js.map
