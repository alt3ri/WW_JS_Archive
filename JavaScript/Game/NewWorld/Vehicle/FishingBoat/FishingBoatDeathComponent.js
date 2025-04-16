"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var s,
      n = arguments.length,
      r =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, o, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (r = (n < 3 ? s(r) : 3 < n ? s(e, o, r) : s(e, o)) || r);
    return 3 < n && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBoatDeathComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  BaseDeathComponent_1 = require("../../Character/Common/Component/Abilities/BaseDeathComponent");
let FishingBoatDeathComponent = class FishingBoatDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.Xte = void 0),
      (this.tRr = void 0),
      (this.m1t = void 0);
  }
  OnInit() {
    return (
      (this.u1t = this.Entity.CheckGetComponent(0)),
      (this.Xte = this.Entity.GetComponent(203)),
      (this.tRr = this.Entity.GetComponent(38)),
      (this.m1t = this.Entity.GetComponent(172)),
      !0
    );
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      (this.u1t.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead &&
        this.ExecuteDeath(void 0),
      !0)
    );
  }
  ExecuteDeath(t) {
    return (
      !!super.ExecuteDeath(t) &&
      (this.Xte?.AddTag(1008164187),
      this.tRr?.StopAllSkills("RoleDeathComponent.ExecuteDeath"),
      this.m1t?.RemoveAllDurationBuffs("实体死亡清理持续型buff"),
      this.PlayDeathMontageWithType(0, void 0, t),
      !0)
    );
  }
  ExecuteRevive() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 48, "执行捕鱼船复活"),
      (this.IsDeadInternal = !1),
      this.Xte?.RemoveTag(1008164187);
  }
};
(FishingBoatDeathComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(273)],
  FishingBoatDeathComponent,
)),
  (exports.FishingBoatDeathComponent = FishingBoatDeathComponent);
//# sourceMappingURL=FishingBoatDeathComponent.js.map
