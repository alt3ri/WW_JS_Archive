"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    let r;
    const s = arguments.length;
    let i =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, o, n);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (r = e[a]) && (i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i);
    return s > 3 && i && Object.defineProperty(t, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseDeathComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
let BaseDeathComponent = class BaseDeathComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.IsDeadInternal = !1);
  }
  IsDead() {
    return this.IsDeadInternal;
  }
  ExecuteDeath() {
    return this.IsDeadInternal
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 20, "实体重复死亡", [
            "entityId",
            this.Entity.Id,
          ]),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            20,
            "[DeathComponent]执行角色死亡逻辑",
            ["Entity", this.Entity.toString()],
            ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()],
          ),
        (this.IsDeadInternal = !0));
  }
};
(BaseDeathComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(15)],
  BaseDeathComponent,
)),
  (exports.BaseDeathComponent = BaseDeathComponent);
// # sourceMappingURL=BaseDeathComponent.js.map
