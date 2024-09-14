"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, s, n) {
    var o,
      i = arguments.length,
      r =
        i < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, s))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, s, n);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (r = (i < 3 ? o(r) : 3 < i ? o(e, s, r) : o(e, s)) || r);
    return 3 < i && r && Object.defineProperty(e, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnSensoryComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PawnSensoryInfoController_1 = require("../Controllers/PawnSensoryInfoController"),
  TICK_INTERVAL_TIME = 1e3;
let PawnSensoryComponent = class PawnSensoryComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Uhn = 0),
      (this.Ahn = void 0),
      (this.Phn = -0),
      (this.Ioe = []),
      (this.Hte = void 0),
      (this.Wnr = Vector_1.Vector.Create());
  }
  OnInit() {
    return (
      (this.Uhn = 0),
      (this.Phn = 0),
      (this.Hte = this.Entity.GetComponent(1)),
      this.Wnr.DeepCopy(this.Hte.ActorLocationProxy),
      (this.Ahn = new PawnSensoryInfoController_1.SensoryInfoController()),
      !0
    );
  }
  AddSensoryInfo(t) {
    this.Hte || (this.Hte = this.Entity.GetComponent(1));
    t = this.Ahn.AddSensoryInfo(t);
    return this.xhn(), t;
  }
  RemoveSensoryInfo(t) {
    this.Ahn.RemoveSensoryInfo(t), this.xhn();
  }
  xhn() {
    var t = this.Ahn.MaxSensoryRange;
    this.Uhn !== t && (this.Uhn = t);
  }
  OnTick(t) {
    this.Hte &&
      this.Ahn &&
      0 !== this.Ahn.SensoryInfoType &&
      (this.Ahn.Tick(t),
      (this.Phn += t),
      this.Phn < TICK_INTERVAL_TIME ||
        ((this.Phn = 0),
        this.Ioe &&
          (this.Wnr.Equals(this.Hte.ActorLocationProxy) ||
            this.Wnr.DeepCopy(this.Hte.ActorLocationProxy),
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            this.Hte.ActorLocationProxy,
            this.Uhn,
            63,
            this.Ioe,
          ),
          this.Ahn.HandleEntities(
            this.Ioe,
            this.Hte.ActorLocationProxy,
            this.Entity.Id,
          ))));
  }
  OnClear() {
    return (this.Ioe.length = 0), this.Ahn?.Clear(), !0;
  }
};
(PawnSensoryComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(108)],
  PawnSensoryComponent,
)),
  (exports.PawnSensoryComponent = PawnSensoryComponent);
//# sourceMappingURL=PawnSensoryComponent.js.map
