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
    Net_1.Net.Register(19372, (e) => {
      this.yje(e);
    });
  }
  UnRegisterNet() {
    Net_1.Net.UnRegister(19372);
  }
  yje(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t = t.Entity.GetComponent(71)) &&
      (0 !== e.zLs
        ? (t.RegisterCharacterDropWeaponEvent(e.zLs),
          t.ChangeWeaponByWeaponByConfigId(e.zLs))
        : t.ClearWeaponForAi());
  }
  SendHoldWeaponPushOnSafe(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!r && !!r.GetComponent(130).CanBeUsed() && this.SendHoldWeaponPush(e, t)
    );
  }
  SendHoldWeaponPush(e, t) {
    var r = new Protocol_1.Aki.Protocol.Hcs();
    return (
      (r.P4n = this.Ije(e)), (r.n8n = this.Ije(t)), Net_1.Net.Send(26972, r), !0
    );
  }
  SendDiscardWeaponPush(e) {
    if (0 === e.AiWeaponConfigId) return !1;
    var t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
      e.AiWeaponConfigId,
      e.Entity,
    );
    if (!t) return !1;
    var r = new Protocol_1.Aki.Protocol.Wcs(),
      o = new Protocol_1.Aki.Protocol.s8n(),
      a = ((r.P4n = this.Ije(e.Entity.Id)), e.Entity.GetComponent(3)),
      e = e.Entity.GetComponent(52);
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
      (o.y5n = a),
      (o.a8n = new Protocol_1.Aki.Protocol.S2s()),
      (o.a8n.Roll = t.Roll),
      (o.a8n.Pitch = t.Pitch),
      (o.a8n.Yaw = t.Yaw),
      (o.h8n = new Protocol_1.Aki.Protocol.Pks()),
      (o.h8n.X = e.X),
      (o.h8n.Y = e.Y),
      (o.h8n.Z = e.Z),
      (r.s8n = o),
      Net_1.Net.Call(13168, r, (e) => {}),
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
