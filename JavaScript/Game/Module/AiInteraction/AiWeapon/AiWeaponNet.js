"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiWeaponNet = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MAX_SPEED_SIZE = 600;
class AiWeaponNet {
  RegisterNet() {
    Net_1.Net.Register(29224, (e) => {
      this.yje(e);
    });
  }
  UnRegisterNet() {
    Net_1.Net.UnRegister(29224);
  }
  yje(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t = t.Entity.GetComponent(72)) &&
      (0 !== e.nRs
        ? (t.RegisterCharacterDropWeaponEvent(e.nRs),
          t.ChangeWeaponByWeaponByConfigId(e.nRs))
        : t.ClearWeaponForAi());
  }
  SendHoldWeaponPushOnSafe(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!r && !!r.GetComponent(131).CanBeUsed() && this.SendHoldWeaponPush(e, t)
    );
  }
  SendHoldWeaponPush(e, t) {
    var r = new Protocol_1.Aki.Protocol.Jcs();
    return (
      (r.F4n = this.Ije(e)), (r.d8n = this.Ije(t)), Net_1.Net.Send(29346, r), !0
    );
  }
  SendDiscardWeaponPush(e) {
    if (0 === e.AiWeaponConfigId) return !1;
    var t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
      e.AiWeaponConfigId,
      e.Entity,
    );
    if (!t) return !1;
    var r = new Protocol_1.Aki.Protocol.Zcs(),
      o = new Protocol_1.Aki.Protocol.C8n(),
      a = ((r.F4n = this.Ije(e.Entity.Id)), e.Entity.GetComponent(3)),
      e = e.Entity.GetComponent(53);
    let i = void 0;
    e.GetHitData()
      ? (i = Vector_1.Vector.Create(e.GetHitData().HitPosition))
      : ((i = Vector_1.Vector.Create(a.ActorLocation)).Z -= 50);
    (e = Vector_1.Vector.Create(a.ActorLocation)),
      e.SubtractionEqual(i),
      (e.X *= 100),
      (e.Y *= 100),
      (e.Z *= 5),
      (e.X = this.CalculateWeight(e.X)),
      (e.Y = this.CalculateWeight(e.Y)),
      (e.Z = Math.abs(this.CalculateWeight(e.Z))),
      (a = a.Actor.Mesh.GetSocketLocation(t.DropSocket)),
      (t = Rotator_1.Rotator.Create());
    return (
      e.Rotation(t),
      (o.P5n = a),
      (o.g8n = new Protocol_1.Aki.Protocol.D2s()),
      (o.g8n.Roll = t.Roll),
      (o.g8n.Pitch = t.Pitch),
      (o.g8n.Yaw = t.Yaw),
      (o.f8n = new Protocol_1.Aki.Protocol.Gks()),
      (o.f8n.X = e.X),
      (o.f8n.Y = e.Y),
      (o.f8n.Z = e.Z),
      (r.C8n = o),
      Net_1.Net.Call(25591, r, (e) => {}),
      !0
    );
  }
  Ije(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    return MathUtils_1.MathUtils.NumberToLong(e);
  }
  CalculateWeight(e) {
    var t = Math.abs(e),
      e = 0 < e ? 1 : -1,
      r = MAX_SPEED_SIZE;
    return (r - MathUtils_1.MathUtils.Clamp(t, 0, r)) * e;
  }
}
exports.AiWeaponNet = AiWeaponNet;
//# sourceMappingURL=AiWeaponNet.js.map
