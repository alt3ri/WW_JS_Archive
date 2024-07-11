"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var n,
      i = arguments.length,
      a =
        i < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, o, r);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (n = e[l]) && (a = (i < 3 ? n(a) : 3 < i ? n(t, o, a) : n(t, o)) || a);
    return 3 < i && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CharacterAttributeComponent_1 = require("../../Common/Component/Abilities/CharacterAttributeComponent");
let RoleAttributeComponent = class RoleAttributeComponent extends CharacterAttributeComponent_1.CharacterAttributeComponent {
  *GetAllBoundsLocker(e) {
    for (const o of super.GetAllBoundsLocker(e)) yield o;
    var t = FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(182);
    if (t) for (const r of t.GetAllBoundsLocker(e)) yield r;
  }
  *GetAllModifiers(e) {
    for (const o of super.GetAllModifiers(e)) yield o;
    var t = FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(182);
    if (t) for (const r of t.GetAllModifiers(e)) yield r;
  }
};
(RoleAttributeComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(172)],
  RoleAttributeComponent,
)),
  (exports.RoleAttributeComponent = RoleAttributeComponent);
//# sourceMappingURL=RoleAttributeComponent.js.map
