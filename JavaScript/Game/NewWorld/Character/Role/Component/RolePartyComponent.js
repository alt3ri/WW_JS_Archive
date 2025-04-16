"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    var r,
      i = arguments.length,
      a =
        i < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, o))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, o, n);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (r = e[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(t, o, a) : r(t, o)) || a);
    return 3 < i && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePartyComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager");
let RolePartyComponent = class RolePartyComponent extends EntityComponent_1.EntityComponent {
  OnStart() {
    var e = this.Entity.GetComponent(0),
      t = this.Entity.CheckGetComponent(203),
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.GetRoleId()),
      o = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
        o.PartyId,
      );
    if (o) for (const n of o.PartyTags) t.AddTag(n);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 28, "势力.xlsx配置不存在", [
          "RoleId",
          e.GetRoleId(),
        ]);
    return !0;
  }
};
(RolePartyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(266)],
  RolePartyComponent,
)),
  (exports.RolePartyComponent = RolePartyComponent);
//# sourceMappingURL=RolePartyComponent.js.map
