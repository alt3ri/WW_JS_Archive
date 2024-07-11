"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockOnDebug = exports.LockOnDebugData = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ARROW_SIZE = 15;
class LockOnDebugData {
  constructor(t) {
    (this.LAe = t),
      (this.ShowTip = void 0),
      (this.ColorType = 1),
      (this.Due = Vector_1.Vector.Create());
  }
  DrawDebug(t) {
    var e = EntitySystem_1.EntitySystem.Get(this.LAe.EntityHandle.Id);
    this.LAe.SocketName
      ? this.Due.DeepCopy(this.JYo(e, this.LAe.SocketName)?.GetLocation())
      : this.Due.DeepCopy(e.GetComponent(1).ActorLocationProxy);
    let a = void 0;
    switch (this.ColorType) {
      case 0:
        a = LockOnDebugData.zYo;
        break;
      case 2:
        a = LockOnDebugData.ZYo;
        break;
      case 1:
        a = LockOnDebugData.Fct;
        break;
      case 3:
        a = LockOnDebugData.eJo;
    }
    UE.KismetSystemLibrary.DrawDebugArrow(
      GlobalData_1.GlobalData.World,
      t.GetComponent(1)?.ActorLocationProxy.ToUeVector(),
      this.Due.ToUeVector(),
      ARROW_SIZE,
      a,
    ),
      this.ShowTip &&
        UE.KismetSystemLibrary.DrawDebugString(
          GlobalData_1.GlobalData.World,
          this.Due.ToUeVector(),
          this.ShowTip,
          void 0,
          a,
        );
  }
  JYo(t, e) {
    var t = t.GetComponent(3)?.Actor;
    return t?.IsValid() &&
      e &&
      ((t = t.Mesh),
      (e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
      t?.DoesSocketExist(e))
      ? t.GetSocketTransform(e, 0)
      : MathUtils_1.MathUtils.DefaultTransform;
  }
}
((exports.LockOnDebugData = LockOnDebugData).zYo = new UE.LinearColor(
  1,
  0,
  0,
  1,
)),
  (LockOnDebugData.Fct = new UE.LinearColor(0, 1, 0, 1)),
  (LockOnDebugData.ZYo = new UE.LinearColor(0, 0, 1, 1)),
  (LockOnDebugData.eJo = new UE.LinearColor(1, 1, 0, 1));
class LockOnDebug {
  static Clear() {
    LockOnDebug.tJo.clear();
  }
  static Push(t) {
    var e;
    LockOnDebug.IsShowDebugLine &&
      ((e = new LockOnDebugData(t)), LockOnDebug.tJo.set(t, e));
  }
  static SetDebugString(t, e, a, o, i) {
    LockOnDebug.IsShowDebugLine &&
      (t = LockOnDebug.tJo.get(t)) &&
      ((t.ShowTip =
        "角度：" + e + "\n距离：" + a + "\n移动方向：" + o.ToString()),
      i) &&
      (t.ShowTip += "\n实际方向：" + i.ToString());
  }
  static SetDebugArrow(t) {
    LockOnDebug.IsShowDebugLine &&
      (t = LockOnDebug.tJo.get(t)) &&
      (t.ColorType = 0);
  }
  static Tick(t) {
    if (LockOnDebug.IsShowDebugLine)
      for (var [e, a] of LockOnDebug.tJo)
        e.EntityHandle?.Valid ? a.DrawDebug(t) : LockOnDebug.tJo.delete(e);
  }
}
((exports.LockOnDebug = LockOnDebug).IsShowDebugLine = !1),
  (LockOnDebug.tJo = new Map());
//# sourceMappingURL=LockOnDebug.js.map
