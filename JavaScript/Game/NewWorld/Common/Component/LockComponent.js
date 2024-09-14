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
      (this.inn = void 0),
      (this.u1t = void 0),
      (this.onn = 0);
  }
  OnStart() {
    (this.inn = this.Entity.GetComponent(181)),
      (this.u1t = this.Entity.GetComponent(0));
    var t = this.u1t.GetEntityEnterComponentState();
    if (void 0 !== t)
      switch (t) {
        case Protocol_1.Aki.Protocol.U3s.Proto_NotUnlock:
          this.onn = -421801185;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlockable:
          this.onn = 1960897308;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlocked:
          this.onn = 1196894179;
          break;
        default:
          this.onn = -421801185;
      }
    return this.onn || (this.onn = -421801185), this.inn.AddTag(this.onn), !0;
  }
  ChangeLockTag(t) {
    var e = this.onn;
    (this.onn = t), this.inn.ChangeLocalLevelTag(this.onn, e);
  }
};
(LockComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(95)],
  LockComponent,
)),
  (exports.LockComponent = LockComponent);
//# sourceMappingURL=LockComponent.js.map
