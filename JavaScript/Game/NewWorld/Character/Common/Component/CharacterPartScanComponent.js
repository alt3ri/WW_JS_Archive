"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, n) {
    let r;
    const c = arguments.length;
    let i =
      c < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(t, e, o, n);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (r = t[s]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
    return c > 3 && i && Object.defineProperty(e, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPartScanComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterPartScanComponent = class CharacterPartScanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Ajr = void 0),
      (this.nXt = void 0),
      (this.Ujr = void 0);
  }
  OnInit() {
    return (
      (this.Ajr = this.Entity.GetComponent(58)),
      (this.nXt = this.Entity.GetComponent(3)),
      (this.Ujr = this.nXt.Actor.CharRenderingComponent),
      !0
    );
  }
  ShowScanEffect() {
    if (this.Ajr.IsMultiPart)
      for (const e of this.Ajr.Parts) {
        var t;
        e?.ScanEffect &&
          e?.ScanEffect !== "None" &&
          ((t = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.GameInstance,
            new UE.Transform(),
            e.ScanEffect,
            "[CharacterPartScanComponent.ShowScanEffect]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          )),
          EffectSystem_1.EffectSystem.IsValid(t)) &&
          (t = EffectSystem_1.EffectSystem.GetEffectActor(t))?.IsValid() &&
          t.K2_AttachToComponent(
            this.nXt.Actor.Mesh,
            e.ScanEffectSocketName,
            0,
            0,
            0,
            !1,
          ),
          e.ScanMaterialEffect &&
            this.Ujr &&
            this.Ujr.CheckInit() &&
            this.Ujr.AddMaterialControllerData(e.ScanMaterialEffect);
      }
  }
};
(CharacterPartScanComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(59)],
  CharacterPartScanComponent,
)),
  (exports.CharacterPartScanComponent = CharacterPartScanComponent);
// # sourceMappingURL=CharacterPartScanComponent.js.map
