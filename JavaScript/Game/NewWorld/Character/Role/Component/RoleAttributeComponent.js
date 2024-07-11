"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    let n;
    const i = arguments.length;
    let a =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(e, t, o, r);
    else
      for (let l = e.length - 1; l >= 0; l--)
        (n = e[l]) && (a = (i < 3 ? n(a) : i > 3 ? n(t, o, a) : n(t, o)) || a);
    return i > 3 && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CharacterAttributeComponent_1 = require("../../Common/Component/Abilities/CharacterAttributeComponent");
let RoleAttributeComponent = class RoleAttributeComponent extends CharacterAttributeComponent_1.CharacterAttributeComponent {
  *GetAllBoundsLocker(e) {
    for (const o of super.GetAllBoundsLocker(e)) yield o;
    const t = FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(179);
    if (t) for (const r of t.GetAllBoundsLocker(e)) yield r;
  }
  *GetAllModifiers(e) {
    for (const o of super.GetAllModifiers(e)) yield o;
    const t = FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(179);
    if (t) for (const r of t.GetAllModifiers(e)) yield r;
  }
};
(RoleAttributeComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(169)],
  RoleAttributeComponent,
)),
  (exports.RoleAttributeComponent = RoleAttributeComponent);
// # sourceMappingURL=RoleAttributeComponent.js.map
