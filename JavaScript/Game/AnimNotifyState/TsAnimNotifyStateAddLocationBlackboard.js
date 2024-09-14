"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BlackboardController_1 = require("../World/Controller/BlackboardController");
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
  K2_NotifyBegin(r, t, a) {
    var e = r.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    var s = e.CharacterActorComponent.Entity.Id;
    if (!this.AddLocationKey) return !1;
    let o = paramsMaps.get(this.AddLocationKey);
    o || ((o = new Map()), paramsMaps.set(this.AddLocationKey, o));
    var i =
      0 < paramsPool.length
        ? paramsPool.pop()
        : new AddLocationBlackboardParams();
    switch (((i.TotalDuration = a), (i.RunTime = 0), this.黑板类型)) {
      case 0:
        var n =
          BlackboardController_1.BlackboardController.GetVectorValueByEntity(
            s,
            this.AddLocationKey,
          );
        if (!n) return !1;
        i.AddOffset.FromUeVector(n);
        break;
      case 1:
        n = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          s,
          this.AddLocationKey,
        );
        if (!n) return !1;
        i.AddOffset.FromUeVector(n),
          i.AddOffset.SubtractionEqual(
            e.CharacterActorComponent.ActorLocationProxy,
          );
        break;
      case 2:
      case 3: {
        let r = void 0;
        if (
          !(r =
            2 === this.黑板类型
              ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                  s,
                  this.AddLocationKey,
                )
              : BlackboardController_1.BlackboardController.GetIntValueByEntity(
                  s,
                  this.AddLocationKey,
                ))
        )
          return !1;
        n = EntitySystem_1.EntitySystem.Get(r);
        if (!n?.Valid) return !1;
        n = n.GetComponent(1);
        i.AddOffset.DeepCopy(n.ActorLocationProxy),
          i.AddOffset.SubtractionEqual(
            e.CharacterActorComponent.ActorLocationProxy,
          );
        break;
      }
      default:
        return !1;
    }
    return (
      o.set(s, i),
      this.NeedChangeToFlying &&
        e.CharacterActorComponent.Entity.GetComponent(
          164,
        ).CharacterMovement.SetMovementMode(5),
      !0
    );
  }
  K2_NotifyTick(t, r, a) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var t = t.CharacterActorComponent.Entity,
      e = t.Id,
      s = paramsMaps.get(this.AddLocationKey);
    if (!s) return !1;
    s = s.get(e);
    if (!s) return !1;
    if (!(s.RunTime >= s.TotalDuration)) {
      e = Math.min(s.TotalDuration, s.RunTime + a);
      let r = 0;
      r = this.Curve
        ? this.Curve.GetFloatValue(e / s.TotalDuration) -
          this.Curve.GetFloatValue(s.RunTime / s.TotalDuration)
        : (e - s.RunTime) / s.TotalDuration;
      t = t.GetComponent(164);
      s.AddOffset.Multiply(r, tmpVector),
        t.MoveCharacter(tmpVector, a),
        (s.RunTime = e);
    }
    return !0;
  }
  K2_NotifyEnd(r, t) {
    var a,
      e,
      r = r.GetOwner();
    return (
      r instanceof TsBaseCharacter_1.default &&
      !!(a = paramsMaps.get(this.AddLocationKey)) &&
      ((r = r.CharacterActorComponent.Entity.Id),
      (e = a.get(r)) && (paramsPool.push(e), a.delete(r)),
      !0)
    );
  }
  GetNotifyName() {
    return "黑板位置设置角色位置偏移";
  }
}
exports.default = TsAnimNotifyStateAddLocationBlackboard;
//# sourceMappingURL=TsAnimNotifyStateAddLocationBlackboard.js.map
