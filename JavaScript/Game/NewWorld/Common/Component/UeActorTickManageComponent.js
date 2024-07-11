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
      for (var s = e.length - 1; 0 <= s; s--)
        (n = e[s]) && (a = (i < 3 ? n(a) : 3 < i ? n(t, o, a) : n(t, o)) || a);
    return 3 < i && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UeActorTickManageComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils");
let UeActorTickManageComponent = class UeActorTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.Hte = void 0);
  }
  static get Dependencies() {
    return [1];
  }
  OnInitData(e) {
    return (this.Hte = this.Entity.GetComponent(1)), !0;
  }
  OnActivate() {
    this.Hte.Owner.SetActorTickEnabled(!1);
  }
  OnTick(e) {
    var t;
    PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity &&
      (this.Entity.GetDeltaSeconds().toFixed(2),
      this.Entity.GetTickInterval(),
      this.Entity.DistanceWithCamera.toFixed(2),
      (t = this.Entity.GetComponent(160))) &&
      t.IsInFighting,
      this.Hte.Owner.KuroTickActorOutside(
        e * MathUtils_1.MathUtils.MillisecondToSecond,
      );
  }
  DisableTickWithLog(e) {
    var t = this.Disable(e);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "DisableTick",
          ["CreatureDataId", this.Hte.CreatureData?.GetCreatureDataId()],
          ["PbDataId", this.Hte.CreatureData?.GetPbDataId()],
          ["Handle", t],
          ["Reason", e],
        ),
      t
    );
  }
  EnableTickWithLog(e, t) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "EnableTick",
          ["CreatureDataId", this.Hte.CreatureData?.GetCreatureDataId()],
          ["PbDataId", this.Hte.CreatureData?.GetPbDataId()],
          ["Handle", e],
          ["Reason", t],
        ),
      this.Enable(e, t)
    );
  }
  DumpDisableTickInfo() {
    return this.DumpDisableInfo();
  }
};
(UeActorTickManageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(98)],
  UeActorTickManageComponent,
)),
  (exports.UeActorTickManageComponent = UeActorTickManageComponent);
//# sourceMappingURL=UeActorTickManageComponent.js.map
