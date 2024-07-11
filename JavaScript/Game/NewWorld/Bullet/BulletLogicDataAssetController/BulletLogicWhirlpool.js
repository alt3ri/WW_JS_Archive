"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicWhirlpool = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const WhirlpoolPoint_1 = require("../../Character/Common/Component/Move/WhirlpoolPoint");
const BulletConstant_1 = require("../BulletConstant");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicWhirlpool extends BulletLogicController_1.BulletLogicController {
  constructor(t, o) {
    super(t, o),
      (this.Z9o = 0),
      (this._9o = void 0),
      (this.xe = 0),
      (this.e7o = 0),
      (this.t7o = new Set()),
      (this.NeedTick = !0),
      (this.Z9o = t.WeightLimit),
      (this._9o = o.GetBulletInfo()),
      (this.xe = WhirlpoolPoint_1.WhirlpoolPoint.GenId()),
      (this.e7o = t.MoveTime);
  }
  OnInit() {}
  Update(t) {
    let o;
    for ([o] of this._9o.CollisionInfo.CharacterEntityMap) this.t7o.add(o);
    for (const i of this.t7o) this.i7o(i);
  }
  i7o(t) {
    const o = t?.GetComponent(161);
    !o?.Valid ||
      this.Z9o < o.CharacterWeight ||
      (o.GetWhirlpoolId() !== this.xe
        ? (o.GetWhirlpoolEnable() && !o.CompareWhirlpoolPriority(this.e7o)) ||
          (o.BeginWhirlpool(
            this.xe,
            this.e7o,
            this._9o.ActorComponent.ActorLocationProxy,
            o.ActorComp.ActorLocationProxy,
          ),
          BulletConstant_1.BulletConstant.OpenMoveLog &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              21,
              "添加吸附",
              ["Entity", t.Id],
              ["ToLocation", this._9o.ActorComponent.ActorLocationProxy],
              ["BeginLocation", o.ActorComp.ActorLocationProxy],
            ))
        : o.UpdateWhirlpoolLocation(
            this._9o.ActorComponent.ActorLocationProxy,
          ));
  }
  OnBulletDestroy() {
    for (const o of this.t7o) {
      const t = o?.GetComponent(161);
      t?.Valid &&
        t.GetWhirlpoolEnable() &&
        t.GetWhirlpoolId() === this.xe &&
        (t.EndWhirlpool(), BulletConstant_1.BulletConstant.OpenMoveLog) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "解除吸附",
          ["Entity", o.Id],
          ["BulletLocation", this._9o.ActorComponent.ActorLocationProxy],
          ["ToLocation", t.ActorComp.ActorLocationProxy],
        );
    }
    this.t7o.clear();
  }
}
exports.BulletLogicWhirlpool = BulletLogicWhirlpool;
// # sourceMappingURL=BulletLogicWhirlpool.js.map
