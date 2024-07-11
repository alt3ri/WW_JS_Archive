"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, s, n) {
    let o;
    const i = arguments.length;
    let r =
      i < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, s)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, s, n);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (o = t[h]) && (r = (i < 3 ? o(r) : i > 3 ? o(e, s, r) : o(e, s)) || r);
    return i > 3 && r && Object.defineProperty(e, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnSensoryComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PawnSensoryInfoController_1 = require("../Controllers/PawnSensoryInfoController");
const TICK_INTERVAL_TIME = 1e3;
let PawnSensoryComponent = class PawnSensoryComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Xhn = 0),
      (this.$hn = void 0),
      (this.Yhn = -0),
      (this.Ioe = []),
      (this.Hte = void 0),
      (this.Xrr = Vector_1.Vector.Create());
  }
  OnInit() {
    return (
      (this.Xhn = 0),
      (this.Yhn = 0),
      (this.Hte = this.Entity.GetComponent(1)),
      this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
      (this.$hn = new PawnSensoryInfoController_1.SensoryInfoController()),
      !0
    );
  }
  AddSensoryInfo(t) {
    this.Hte || (this.Hte = this.Entity.GetComponent(1));
    t = this.$hn.AddSensoryInfo(t);
    return this.Jhn(), t;
  }
  RemoveSensoryInfo(t) {
    this.$hn.RemoveSensoryInfo(t), this.Jhn();
  }
  Jhn() {
    const t = this.$hn.MaxSensoryRange;
    this.Xhn !== t && (this.Xhn = t);
  }
  OnTick(t) {
    this.Hte &&
      this.$hn &&
      this.$hn.SensoryInfoType !== 0 &&
      (this.$hn.Tick(t),
      (this.Yhn += t),
      this.Yhn < TICK_INTERVAL_TIME ||
        ((this.Yhn = 0),
        this.Ioe &&
          (this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
            this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            this.Hte.ActorLocationProxy,
            this.Xhn,
            3,
            this.Ioe,
          ),
          this.$hn.HandleEntities(
            this.Ioe,
            this.Hte.ActorLocationProxy,
            this.Entity.Id,
          ))));
  }
  OnClear() {
    return (this.Ioe.length = 0), this.$hn?.Clear(), !0;
  }
};
(PawnSensoryComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(105)],
  PawnSensoryComponent,
)),
  (exports.PawnSensoryComponent = PawnSensoryComponent);
// # sourceMappingURL=PawnSensoryComponent.js.map
