"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiWeaponNet = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MAX_SPEED_SIZE = 600;
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
    var t = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    t &&
      (t = t.Entity.GetComponent(69)) &&
      (e.xEs !== 0
        ? (t.RegisterCharacterDropWeaponEvent(e.xEs),
          t.ChangeWeaponByWeaponByConfigId(e.xEs))
        : t.ClearWeaponForAi());
  }
  SendHoldWeaponPushOnSafe(e, t) {
    const r = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!r && !!r.GetComponent(128).CanBeUsed() && this.SendHoldWeaponPush(e, t)
    );
  }
  SendHoldWeaponPush(e, t) {
    const r = new Protocol_1.Aki.Protocol.Yls();
    return (
      (r.rkn = this.cHe(e)), (r.T3n = this.cHe(t)), Net_1.Net.Send(7665, r), !0
    );
  }
  SendDiscardWeaponPush(e) {
    if (e.AiWeaponConfigId === 0) return !1;
    let t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
      e.AiWeaponConfigId,
      e.Entity,
    );
    if (!t) return !1;
    const r = new Protocol_1.Aki.Protocol.zls();
    const o = new Protocol_1.Aki.Protocol.L3n();
    let a = ((r.rkn = this.cHe(e.Entity.Id)), e.Entity.GetComponent(3));
    var e = e.Entity.GetComponent(51);
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
    const t = Math.abs(e);
    var e = e > 0 ? 1 : -1;
    const r = MAX_SPEED_SIZE;
    return (r - MathUtils_1.MathUtils.Clamp(t, 0, r)) * e;
  }
}
exports.AiWeaponNet = AiWeaponNet;
// # sourceMappingURL=AiWeaponNet.js.map
