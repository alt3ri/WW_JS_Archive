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
    Net_1.Net.Register(15408, (e) => {
      this.uHe(e);
    });
  }
  UnRegisterNet() {
    Net_1.Net.UnRegister(15408);
  }
  uHe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t = t.Entity.GetComponent(69)) &&
      (0 !== e.xEs
        ? (t.RegisterCharacterDropWeaponEvent(e.xEs),
          t.ChangeWeaponByWeaponByConfigId(e.xEs))
        : t.ClearWeaponForAi());
  }
  SendHoldWeaponPushOnSafe(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!r && !!r.GetComponent(128).CanBeUsed() && this.SendHoldWeaponPush(e, t)
    );
  }
  SendHoldWeaponPush(e, t) {
    var r = new Protocol_1.Aki.Protocol.Yls();
    return (
      (r.rkn = this.cHe(e)), (r.T3n = this.cHe(t)), Net_1.Net.Send(7665, r), !0
    );
  }
  SendDiscardWeaponPush(e) {
    if (0 === e.AiWeaponConfigId) return !1;
    var t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
      e.AiWeaponConfigId,
      e.Entity,
    );
    if (!t) return !1;
    var r = new Protocol_1.Aki.Protocol.zls(),
      o = new Protocol_1.Aki.Protocol.L3n(),
      a = ((r.rkn = this.cHe(e.Entity.Id)), e.Entity.GetComponent(3)),
      e = e.Entity.GetComponent(51);
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
      (o.$kn = a),
      (o.D3n = new Protocol_1.Aki.Protocol.iws()),
      (o.D3n.Roll = t.Roll),
      (o.D3n.Pitch = t.Pitch),
      (o.D3n.Yaw = t.Yaw),
      (o.A3n = new Protocol_1.Aki.Protocol.VBs()),
      (o.A3n.X = e.X),
      (o.A3n.Y = e.Y),
      (o.A3n.Z = e.Z),
      (r.L3n = o),
      Net_1.Net.Call(29293, r, (e) => {}),
      !0
    );
  }
  cHe(e) {
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
