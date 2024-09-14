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
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager");
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
    this.Hte.Owner.SetKuroOnlyTickOutside(!0);
  }
  OnTick(e) {
    let t = void 0;
    if (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity) {
      let e =
        `DeltaSeconds: ${this.Entity.GetDeltaSeconds().toFixed(2)}, TickInterval: ${this.Entity.GetTickInterval()}, Distance: ` +
        this.Entity.DistanceWithCamera.toFixed(2);
      var o = this.Entity.GetComponent(161);
      o && ((o = o.IsInFighting), (e += " IsInFight: " + o)),
        (t = Stats_1.Stat.Create(e));
    }
    t?.Start(),
      this.Hte.Owner.KuroTickActorOutside(
        e * MathUtils_1.MathUtils.MillisecondToSecond,
      ),
      t?.Stop();
  }
  DisableTickWithLog(e) {
    var t = this.Disable(e);
    return (
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
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
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
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
  [(0, RegisterComponent_1.RegisterComponent)(99)],
  UeActorTickManageComponent,
)),
  (exports.UeActorTickManageComponent = UeActorTickManageComponent);
//# sourceMappingURL=UeActorTickManageComponent.js.map
