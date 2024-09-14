"use strict";
var TriggerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var r,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, o);
      else
        for (var g = e.length - 1; 0 <= g; g--)
          (r = e[g]) &&
            (s = (i < 3 ? r(s) : 3 < i ? r(t, n, s) : r(t, n)) || s);
      return 3 < i && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
let TriggerComponent = (TriggerComponent_1 = class TriggerComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.vtn = void 0),
      (this.Lo = void 0),
      (this.HYo = 0);
  }
  get Actions() {
    return this.Lo?.Actions;
  }
  get ExitActions() {
    return this.Lo?.ExitConfig?.Actions;
  }
  OnInitData(e) {
    var e = e.GetParam(TriggerComponent_1)[0],
      e = e || void 0,
      t = this.Entity.GetComponent(109);
    return (
      t && !t.LogicRange && t.SetLogicRange(300),
      (this.Lo = e),
      (this.EIe = this.Entity.GetComponent(0)),
      (this.HYo = this.EIe.GetPbDataId()),
      !0
    );
  }
  OnStart() {
    return (
      (this.vtn = this.Entity.GetComponent(77)),
      !!this.vtn ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneItem", 40, "[TriggerComponent] RangeComp缺失", [
            "ConfigId",
            this.HYo,
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
    [(0, RegisterComponent_1.RegisterComponent)(78)],
    TriggerComponent,
  )),
  (exports.TriggerComponent = TriggerComponent);
//# sourceMappingURL=TriggerComponent.js.map
