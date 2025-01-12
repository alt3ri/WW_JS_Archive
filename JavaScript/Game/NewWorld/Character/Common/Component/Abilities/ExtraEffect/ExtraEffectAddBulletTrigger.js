"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBulletTrigger = void 0);
const BulletController_1 = require("../../../../../Bullet/BulletController"),
  ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBulletTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
  constructor() {
    super(...arguments), (this.BulletIds = []), (this.BulletDtType = -1);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.EventType = Number(t[0])),
      (this.TargetType = Number(t[1])),
      (this.BulletIds = t[2].split("#").map((t) => BigInt(t))),
      (this.BulletDtType = Number(t[3] ?? -1));
  }
  OnExecute() {
    var t = this.GetEffectTarget()?.GetEntity(),
      e = t?.CheckGetComponent(3)?.ActorTransform,
      s = this.InstigatorBuffComponent?.ActorComponent?.Actor;
    if (t && s && e) {
      var r = this.Buff.MessageId;
      for (const i of this.BulletIds)
        BulletController_1.BulletController.CreateBulletCustomTarget(
          s,
          String(i),
          e,
          { SyncType: 1, DtType: this.BulletDtType },
          r,
        );
    }
  }
}
exports.AddBulletTrigger = AddBulletTrigger;
//# sourceMappingURL=ExtraEffectAddBulletTrigger.js.map
