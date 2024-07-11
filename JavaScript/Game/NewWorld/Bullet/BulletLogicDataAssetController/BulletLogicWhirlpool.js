"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicWhirlpool = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  WhirlpoolPoint_1 = require("../../Character/Common/Component/Move/WhirlpoolPoint"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicWhirlpool extends BulletLogicController_1.BulletLogicController {
  constructor(t, o) {
    super(t, o),
      (this.Y7o = 0),
      (this.a7o = void 0),
      (this.xe = 0),
      (this.J7o = 0),
      (this.z7o = new Set()),
      (this.NeedTick = !0),
      (this.Y7o = t.WeightLimit),
      (this.a7o = o.GetBulletInfo()),
      (this.xe = WhirlpoolPoint_1.WhirlpoolPoint.GenId()),
      (this.J7o = t.MoveTime);
  }
  OnInit() {}
  Update(t) {
    var o;
    for ([o] of this.a7o.CollisionInfo.CharacterEntityMap) this.z7o.add(o);
    for (const i of this.z7o) this.Z7o(i);
  }
  Z7o(t) {
    var o = t?.GetComponent(163);
    !o?.Valid ||
      this.Y7o < o.CharacterWeight ||
      (o.GetWhirlpoolId() !== this.xe
        ? (o.GetWhirlpoolEnable() && !o.CompareWhirlpoolPriority(this.J7o)) ||
          (o.BeginWhirlpool(
            this.xe,
            this.J7o,
            this.a7o.ActorComponent.ActorLocationProxy,
            o.ActorComp.ActorLocationProxy,
          ),
          BulletConstant_1.BulletConstant.OpenMoveLog &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              21,
              "添加吸附",
              ["Entity", t.Id],
              ["ToLocation", this.a7o.ActorComponent.ActorLocationProxy],
              ["BeginLocation", o.ActorComp.ActorLocationProxy],
            ))
        : o.UpdateWhirlpoolLocation(
            this.a7o.ActorComponent.ActorLocationProxy,
          ));
  }
  OnBulletDestroy() {
    for (const o of this.z7o) {
      var t = o?.GetComponent(163);
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
          ["BulletLocation", this.a7o.ActorComponent.ActorLocationProxy],
          ["ToLocation", t.ActorComp.ActorLocationProxy],
        );
    }
    this.z7o.clear();
  }
}
exports.BulletLogicWhirlpool = BulletLogicWhirlpool;
//# sourceMappingURL=BulletLogicWhirlpool.js.map
