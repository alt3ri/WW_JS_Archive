"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, n, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(e, n, r) : s(e, n)) || r);
    return 3 < o && r && Object.defineProperty(e, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnSensoryInfoComponent = void 0);
const cpp_1 = require("cpp"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EnvironmentalPerceptionController_1 = require("../../../World/Enviroment/EnvironmentalPerceptionController"),
  PERCEPTION_SEARCH_RANGE = 2e3;
let PawnSensoryInfoComponent = class PawnSensoryInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.whn = 0),
      (this.Bhn = !1),
      (this.bhn = !1),
      (this.qhn = Number.MAX_VALUE),
      (this.Ghn = void 0),
      (this.fBa = new Set()),
      (this.Nhn = void 0),
      (this.Ohn = () => {
        (this.Bhn = !0),
          this.bhn || this.khn(),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterLogicRange,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayerSenseTargetEnter,
            this.Entity.Id,
          );
      }),
      (this.Fhn = () => {
        (this.Bhn = !1),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.LeaveLogicRange,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayerSenseTargetLeave,
            this.Entity.Id,
          );
      }),
      (this.khn = () => {
        this.bhn ||
          ((this.bhn = !0),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
          ),
          this.Ghn &&
            (this.DeletePerceptionEvent(this.Ghn), (this.Ghn = void 0)));
      });
  }
  CreatePerceptionEvent() {
    var t =
      EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent();
    return this.fBa.add(t), t;
  }
  DeletePerceptionEvent(t) {
    this.fBa.delete(t),
      EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
        t,
      );
  }
  pBa() {
    for (const t of this.fBa)
      EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
        t,
      );
    this.fBa.clear();
  }
  RegisterPerceptionEvent() {
    var t = this.Entity.GameBudgetManagedToken;
    if (t) for (const e of this.fBa) e.IsValid() || e.Register(t);
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0),
      e = this.Entity?.GameBudgetManagedToken;
    return (
      t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player
        ? this.khn()
        : (this.Ghn &&
            (this.DeletePerceptionEvent(this.Ghn), (this.Ghn = void 0)),
          (this.Ghn = this.CreatePerceptionEvent()),
          this.Ghn.Init(PERCEPTION_SEARCH_RANGE, e, this.khn)),
      !this.Nhn &&
        0 < this.whn &&
        ((this.Nhn = this.CreatePerceptionEvent()),
        this.Nhn.Init(this.whn, e, this.Ohn, this.Fhn)),
      !0
    );
  }
  SetLogicRange(t) {
    var e;
    t > this.whn &&
      ((this.whn = t),
      this.Nhn
        ? this.Nhn.UpdateDistance(t)
        : (e = this.Entity?.GameBudgetManagedToken) &&
          ((this.Nhn = this.CreatePerceptionEvent()),
          this.Nhn.Init(t, e, this.Ohn, this.Fhn)));
  }
  OnEnd() {
    return (
      (this.Nhn = void 0),
      (this.Ghn = void 0),
      this.pBa(),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayerSenseTargetLeave,
        this.Entity.Id,
      ),
      !0
    );
  }
  get PlayerDistSquared() {
    return this.qhn;
  }
  get PlayerDist() {
    return Math.sqrt(this.qhn);
  }
  get LogicRange() {
    return this.whn;
  }
  get IsInLogicRange() {
    return this.Bhn;
  }
  GetDebugString() {
    let t = "";
    return (
      (t =
        (t += `DefaultRangeToken: ${this.Ghn?.EventToken ?? "undefined"}
`) +
        `LogicRangeToken: ${this.Nhn?.EventToken ?? "undefined"}; LogicRange: ${this.whn}; IsInRangeInternal: ${this.IsInLogicRange}
LogicRangeInfo:
`),
      this.Nhn &&
        (t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(
          this.Nhn.EventToken,
        )),
      t
    );
  }
};
(PawnSensoryInfoComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(109)],
  PawnSensoryInfoComponent,
)),
  (exports.PawnSensoryInfoComponent = PawnSensoryInfoComponent);
//# sourceMappingURL=PawnSensoryInfoComponent.js.map
