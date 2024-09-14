"use strict";
var UeComponentTickManageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var i,
        r = arguments.length,
        s =
          r < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, o);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (i = e[a]) &&
            (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
      return 3 < r && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeComponentTickManageComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeComponentTickManageComponent =
  (UeComponentTickManageComponent_1 = class UeComponentTickManageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments), (this.vsn = new Array()), (this.LFr = new Array());
    }
    static get Dependencies() {
      return [1];
    }
    OnInitData(e) {
      for (const t of e.GetParam(UeComponentTickManageComponent_1))
        t instanceof UE.Class && this.vsn.push(t);
      return !0;
    }
    OnActivate() {
      const t = this.Entity.GetComponent(1);
      if (0 < this.vsn.length)
        for (const e of this.vsn) {
          var n = t.Owner.K2_GetComponentsByClass(e),
            o = n.Num();
          for (let e = 0; e < o; ++e) {
            const t = n.Get(e);
            t instanceof UE.SkeletalMeshComponent ||
              !t.IsComponentTickEnabled() ||
              (this.LFr.push(t), t.SetComponentTickEnabled(!1));
          }
        }
      else {
        var i = t.Owner.K2_GetComponentsByClass(
            UE.ActorComponent.StaticClass(),
          ),
          r = i.Num();
        for (let e = 0; e < r; ++e) {
          const t = i.Get(e);
          t instanceof UE.SkeletalMeshComponent ||
            !t.IsComponentTickEnabled() ||
            (this.LFr.push(t), t.SetComponentTickEnabled(!1));
        }
      }
    }
    OnTick(e) {
      var t = this.Entity.GetComponent(2).Actor.CustomTimeDilation,
        n = e * MathUtils_1.MathUtils.MillisecondToSecond * t;
      for (const o of this.LFr) o.KuroTickComponentOutside(n);
    }
  });
(UeComponentTickManageComponent = UeComponentTickManageComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(100)],
    UeComponentTickManageComponent,
  )),
  (exports.UeComponentTickManageComponent = UeComponentTickManageComponent);
//# sourceMappingURL=UeComponentTickManageComponent.js.map
