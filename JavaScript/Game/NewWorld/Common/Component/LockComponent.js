"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, i);
    else
      for (var c = t.length - 1; 0 <= c; c--)
        (s = t[c]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, o, n) : s(e, o)) || n);
    return 3 < r && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockComponent = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let LockComponent = class LockComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Snn = void 0),
      (this.zht = void 0),
      (this.Enn = 0);
  }
  OnStart() {
    (this.Snn = this.Entity.GetComponent(177)),
      (this.zht = this.Entity.GetComponent(0));
    var t = this.zht.GetEntityEnterComponentState();
    if (void 0 !== t)
      switch (t) {
        case Protocol_1.Aki.Protocol.qqs.Proto_NotUnlock:
          this.Enn = -421801185;
          break;
        case Protocol_1.Aki.Protocol.qqs.Proto_Unlockable:
          this.Enn = 1960897308;
          break;
        case Protocol_1.Aki.Protocol.qqs.Proto_Unlocked:
          this.Enn = 1196894179;
          break;
        default:
          this.Enn = -421801185;
      }
    return this.Enn || (this.Enn = -421801185), this.Snn.AddTag(this.Enn), !0;
  }
  ChangeLockTag(t) {
    var e = this.Enn;
    (this.Enn = t), this.Snn.ChangeLocalLevelTag(this.Enn, e);
  }
};
(LockComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(92)],
  LockComponent,
)),
  (exports.LockComponent = LockComponent);
//# sourceMappingURL=LockComponent.js.map
