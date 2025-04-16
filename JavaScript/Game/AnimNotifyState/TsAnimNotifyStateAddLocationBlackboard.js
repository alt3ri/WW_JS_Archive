"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class AddLocationBlackboardParams {
  constructor() {
    (this.TotalDuration = -0),
      (this.AddOffset = Vector_1.Vector.Create()),
      (this.RunTime = -0);
  }
}
const paramsPool = new Array(),
  paramsMaps = new Map(),
  tmpVector = Vector_1.Vector.Create();
class TsAnimNotifyStateAddLocationBlackboard extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.AddLocationKey = ""),
      (this.Curve = void 0),
      (this.NeedChangeToFlying = !1),
      (this.黑板类型 = 0);
  }
  Constructor() {}
  K2_NotifyBegin(t, r, e) {
    var a = t.GetOwner();
    if (!(a instanceof TsBaseCharacter_1.default)) return !1;
    var s = a.CharacterActorComponent.Entity.Id;
    if (!this.AddLocationKey) return !1;
    let o = paramsMaps.get(this.AddLocationKey);
    o || ((o = new Map()), paramsMaps.set(this.AddLocationKey, o));
    var i =
      0 < paramsPool.length
        ? paramsPool.pop()
        : new AddLocationBlackboardParams();
    switch (((i.TotalDuration = e), (i.RunTime = 0), this.黑板类型)) {
      case 0:
        var n =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            s,
            this.AddLocationKey,
          );
        if (!n) return !1;
        i.AddOffset.FromUeVector(n);
        break;
      case 1:
        n =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            s,
            this.AddLocationKey,
          );
        if (!n) return !1;
        i.AddOffset.FromUeVector(n),
          i.AddOffset.SubtractionEqual(
            a.CharacterActorComponent.ActorLocationProxy,
          );
        break;
      case 2:
      case 3: {
        let t = void 0;
        if (
          !(t =
            2 === this.黑板类型
              ? ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
                  s,
                  this.AddLocationKey,
                )
              : ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
                  s,
                  this.AddLocationKey,
                ))
        )
          return !1;
        n = EntitySystem_1.EntitySystem.Get(t);
        if (!n?.Valid) return !1;
        n = n.GetComponent(1);
        i.AddOffset.DeepCopy(n.ActorLocationProxy),
          i.AddOffset.SubtractionEqual(
            a.CharacterActorComponent.ActorLocationProxy,
          );
        break;
      }
      default:
        return !1;
    }
    return (
      o.set(s, i),
      this.NeedChangeToFlying &&
        a.KuroSetMovementMode({
          Mode: 5,
          Context: "[TsAnimNotifyStateAddLocationBlackboard.K2_NotifyBegin]",
        }),
      !0
    );
  }
  K2_NotifyTick(r, t, e) {
    r = r.GetOwner();
    if (!(r instanceof TsBaseCharacter_1.default)) return !1;
    var r = r.CharacterActorComponent.Entity,
      a = r.Id,
      s = paramsMaps.get(this.AddLocationKey);
    if (!s) return !1;
    s = s.get(a);
    if (!s) return !1;
    if (!(s.RunTime >= s.TotalDuration)) {
      a = Math.min(s.TotalDuration, s.RunTime + e);
      let t = 0;
      t = this.Curve
        ? this.Curve.GetFloatValue(a / s.TotalDuration) -
          this.Curve.GetFloatValue(s.RunTime / s.TotalDuration)
        : (a - s.RunTime) / s.TotalDuration;
      r = r.GetComponent(176);
      s.AddOffset.Multiply(t, tmpVector),
        r.MoveCharacter(tmpVector, e),
        (s.RunTime = a);
    }
    return !0;
  }
  K2_NotifyEnd(t, r) {
    var e,
      a,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(e = paramsMaps.get(this.AddLocationKey)) &&
      ((t = t.CharacterActorComponent.Entity.Id),
      (a = e.get(t)) && (paramsPool.push(a), e.delete(t)),
      !0)
    );
  }
  GetNotifyName() {
    return "黑板位置设置角色位置偏移";
  }
}
exports.default = TsAnimNotifyStateAddLocationBlackboard;
//# sourceMappingURL=TsAnimNotifyStateAddLocationBlackboard.js.map
