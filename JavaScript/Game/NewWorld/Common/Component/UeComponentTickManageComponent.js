"use strict";
let UeComponentTickManageComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    let i;
    const r = arguments.length;
    let s =
      r < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, n)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, o);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
    return r > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeComponentTickManageComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeComponentTickManageComponent =
  (UeComponentTickManageComponent_1 = class UeComponentTickManageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments), (this.Nsn = new Array()), (this.QFr = new Array());
    }
    static get Dependencies() {
      return [1];
    }
    OnInitData(e) {
      for (const t of e.GetParam(UeComponentTickManageComponent_1))
        t instanceof UE.Class && this.Nsn.push(t);
      return !0;
    }
    OnActivate() {
      const t = this.Entity.GetComponent(1);
      if (this.Nsn.length > 0)
        for (const e of this.Nsn) {
          const n = t.Owner.K2_GetComponentsByClass(e);
          const o = n.Num();
          for (let e = 0; e < o; ++e) {
            const t = n.Get(e);
            t instanceof UE.SkeletalMeshComponent ||
              !t.IsComponentTickEnabled() ||
              (this.QFr.push(t), t.SetComponentTickEnabled(!1));
          }
        }
      else {
        const i = t.Owner.K2_GetComponentsByClass(
          UE.ActorComponent.StaticClass(),
        );
        const r = i.Num();
        for (let e = 0; e < r; ++e) {
          const t = i.Get(e);
          t instanceof UE.SkeletalMeshComponent ||
            !t.IsComponentTickEnabled() ||
            (this.QFr.push(t), t.SetComponentTickEnabled(!1));
        }
      }
    }
    OnTick(e) {
      const t = this.Entity.GetComponent(2).Actor.CustomTimeDilation;
      const n = e * MathUtils_1.MathUtils.MillisecondToSecond * t;
      for (const o of this.QFr) o.KuroTickComponentOutside(n);
    }
  });
(UeComponentTickManageComponent = UeComponentTickManageComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(97)],
    UeComponentTickManageComponent,
  )),
  (exports.UeComponentTickManageComponent = UeComponentTickManageComponent);
// # sourceMappingURL=UeComponentTickManageComponent.js.map
