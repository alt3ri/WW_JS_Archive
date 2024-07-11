"use strict";
let TriggerComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    let r;
    const i = arguments.length;
    let s =
      i < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, n)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, o);
    else
      for (let g = e.length - 1; g >= 0; g--)
        (r = e[g]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
let TriggerComponent = (TriggerComponent_1 = class TriggerComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.SIe = void 0),
      (this.ktn = void 0),
      (this.Lo = void 0),
      (this.K$o = 0);
  }
  get Actions() {
    return this.Lo?.Actions;
  }
  get ExitActions() {
    return this.Lo?.ExitConfig?.Actions;
  }
  OnInitData(e) {
    var e = e.GetParam(TriggerComponent_1)[0];
    var e = e || void 0;
    const t = this.Entity.GetComponent(106);
    return (
      t && !t.LogicRange && t.SetLogicRange(300),
      (this.Lo = e),
      (this.SIe = this.Entity.GetComponent(0)),
      (this.K$o = this.SIe.GetPbDataId()),
      !0
    );
  }
  OnStart() {
    return (
      (this.ktn = this.Entity.GetComponent(74)),
      !!this.ktn ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneItem", 40, "[TriggerComponent] RangeComp缺失", [
            "ConfigId",
            this.K$o,
          ]),
        !1)
    );
  }
  OnEnd() {
    return !(this.Lo = void 0);
  }
  CreateTriggerContext(e) {
    return LevelGeneralContextDefine_1.TriggerContext.Create(this.Entity.Id, e);
  }
});
(TriggerComponent = TriggerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(75)],
    TriggerComponent,
  )),
  (exports.TriggerComponent = TriggerComponent);
// # sourceMappingURL=TriggerComponent.js.map
