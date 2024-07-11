"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, n, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(e, n, r) : o(e, n)) || r);
    return 3 < s && r && Object.defineProperty(e, n, r), r;
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
      (this.zhn = 0),
      (this.Zhn = !1),
      (this.eln = !1),
      (this.tln = Number.MAX_VALUE),
      (this.iln = void 0),
      (this.oln = void 0),
      (this.rln = () => {
        (this.Zhn = !0),
          this.eln || this.nln(),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterLogicRange,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayerSenseTargetEnter,
            this.Entity.Id,
          );
      }),
      (this.sln = () => {
        (this.Zhn = !1),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.LeaveLogicRange,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayerSenseTargetLeave,
            this.Entity.Id,
          );
      }),
      (this.vVs = () => {
        this.iln &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.iln,
          ),
          (this.iln = void 0));
      }),
      (this.MVs = () => {
        this.oln &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.oln,
          ),
          (this.oln = void 0));
      }),
      (this.nln = () => {
        this.eln ||
          ((this.eln = !0),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
          ),
          this.iln &&
            (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
              this.iln,
            ),
            (this.iln = void 0)));
      });
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0),
      e = this.Entity?.GameBudgetManagedToken;
    return (
      t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player
        ? this.nln()
        : (this.iln &&
            (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
              this.iln,
            ),
            (this.iln = void 0)),
          (this.iln =
            EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
          this.iln.Init(
            PERCEPTION_SEARCH_RANGE,
            e,
            this.nln,
            void 0,
            this.vVs,
          )),
      !this.oln &&
        0 < this.zhn &&
        ((this.oln =
          EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
        this.oln.Init(this.zhn, e, this.rln, this.sln, this.MVs)),
      !0
    );
  }
  SetLogicRange(t) {
    var e;
    t > this.zhn &&
      ((this.zhn = t),
      this.oln
        ? this.oln.UpdateDistance(t)
        : (e = this.Entity?.GameBudgetManagedToken) &&
          ((this.oln =
            EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
          this.oln.Init(t, e, this.rln, this.sln, this.MVs)));
  }
  OnEnd() {
    return (
      this.vVs(),
      this.MVs(),
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
    return this.tln;
  }
  get PlayerDist() {
    return Math.sqrt(this.tln);
  }
  get LogicRange() {
    return this.zhn;
  }
  get IsInLogicRange() {
    return this.Zhn;
  }
  GetDebugString() {
    let t = "";
    return (
      (t =
        (t += `DefaultRangeToken: ${this.iln?.EventToken ?? "undefined"}
`) +
        `LogicRangeToken: ${this.oln?.EventToken ?? "undefined"}; LogicRange: ${this.zhn}; IsInRangeInternal: ${this.IsInLogicRange}
LogicRangeInfo:
`),
      this.oln &&
        (t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(
          this.oln.EventToken,
        )),
      t
    );
  }
};
(PawnSensoryInfoComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(106)],
  PawnSensoryInfoComponent,
)),
  (exports.PawnSensoryInfoComponent = PawnSensoryInfoComponent);
//# sourceMappingURL=PawnSensoryInfoComponent.js.map
