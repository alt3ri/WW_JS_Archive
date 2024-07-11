"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let s;
    const o = arguments.length;
    let r =
      o < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, n);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (s = t[h]) && (r = (o < 3 ? s(r) : o > 3 ? s(e, i, r) : s(e, i)) || r);
    return o > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnPerceptionComponent = void 0);
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EnvironmentalPerceptionController_1 = require("../../../World/Enviroment/EnvironmentalPerceptionController");
const DISTANCE_OFFSET = 100;
const INTERACT_LOGIC_OFFSET = 100;
let PawnPerceptionComponent = class PawnPerceptionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ban = void 0),
      (this.Nhn = !1),
      (this.Ohn = !1),
      (this.khn = !1),
      (this.NearbyEnable = !1),
      (this.Fhn = !1),
      (this.Vhn = void 0),
      (this.Izr = void 0),
      (this.ConfigId = -0),
      (this.Hhn = void 0),
      (this.jhn = void 0),
      (this.Whn = void 0),
      (this.Khn = void 0),
      (this.CVs = () => {
        this.Hhn &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.Hhn,
          ),
          (this.Hhn = void 0));
      }),
      (this.gVs = () => {
        this.jhn &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.jhn,
          ),
          (this.jhn = void 0));
      }),
      (this.fVs = () => {
        this.Whn &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.Whn,
          ),
          (this.Whn = void 0));
      }),
      (this.pVs = () => {
        this.Khn &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.Khn,
          ),
          (this.Khn = void 0));
      }),
      (this.Ozr = () => {
        this.Fhn &&
          ((this.Fhn = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
            this.Entity,
          ));
      }),
      (this.Qhn = (t) => {
        (this.NearbyEnable = t), (this.Fhn = !1);
      });
  }
  get IsInInteractRange() {
    return this.Nhn;
  }
  get IsInAdsorbRange() {
    return this.Ohn;
  }
  get IsInSightRange() {
    return this.khn;
  }
  SetInteractRange(t, e = 0, i = void 0) {
    this.Izr.SetLogicRange(Math.max(t + INTERACT_LOGIC_OFFSET, e)),
      this.Hhn
        ? this.Hhn.UpdateDistance(t, e === 0 ? t : e)
        : ((this.Hhn =
            EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
          this.Hhn.Init(
            t,
            this.Entity?.GameBudgetManagedToken,
            () => {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Interaction", 37, "进入交互范围", [
                  "EntityId",
                  this.Entity.Id,
                ]),
                (this.Nhn = !0);
            },
            () => {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Interaction", 37, "离开交互范围", [
                  "EntityId",
                  this.Entity.Id,
                ]),
                (this.Nhn = !1);
            },
            this.CVs,
            void 0,
            e,
            i,
          ));
  }
  SetSightRange(t) {
    this.Izr.SetLogicRange(t),
      this.jhn
        ? this.jhn.UpdateDistance(t)
        : ((this.jhn =
            EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
          this.jhn.Init(
            t,
            this.Entity?.GameBudgetManagedToken,
            () => {
              this.khn = !0;
            },
            () => {
              this.khn = !1;
            },
            this.gVs,
          ));
  }
  SetGuideRange(t) {
    this.Izr.SetLogicRange(t),
      this.Whn
        ? this.Whn.UpdateDistance(t)
        : ((this.Whn =
            EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
          this.Whn.Init(
            t,
            this.Entity?.GameBudgetManagedToken,
            () => {
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnGuideRangeEnter,
                this.Entity.Id,
              );
            },
            void 0,
            this.fVs,
          ));
  }
  OnInitData() {
    return (
      (this.Vhn = UE.NewMap(UE.BuiltinInt, UE.BuiltinInt)),
      (this.ConfigId = this.Entity.GetComponent(0).GetPbDataId()),
      !0
    );
  }
  OnInit() {
    return (this.Izr = this.Entity.GetComponent(106)), !0;
  }
  OnStart() {
    const t = this.Entity.GetComponent(0);
    const e = ((this.ban = this.Entity.GetComponent(1)), this.ban.Owner);
    return UE.KismetSystemLibrary.IsValid(e)
      ? (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnUpdateNearbyEnable,
          this.Qhn,
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Pawn",
            7,
            "[PawnPerceptionComponent.OnStart] 非法Actor",
            ["PbDataId", t.GetPbDataId()],
          ),
        !1);
  }
  OnActivate() {
    let t;
    let e;
    const i = this.Entity.GetComponent(144);
    return (
      i &&
        ((t = i.ShowRange),
        (e = i.HideRange),
        (this.NearbyEnable = i.EnableTracking),
        (this.Fhn = !1),
        (this.Khn =
          EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
        this.Khn.Init(
          t,
          this.Entity?.GameBudgetManagedToken,
          () => {
            (this.Fhn = !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnEnterNearbyTrackRange,
                this.Entity,
              );
          },
          () => {
            (this.Fhn = !1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
                this.Entity,
              );
          },
          this.pVs,
          () => this.NearbyEnable,
          e,
        ),
        this.Izr.SetLogicRange(t),
        this.Izr.SetLogicRange(e + DISTANCE_OFFSET)),
      !0
    );
  }
  OnEnd() {
    return (
      this.Fhn &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveNearbyTrack,
          this.Entity,
        ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.LeaveLogicRange,
        this.Ozr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnUpdateNearbyEnable,
        this.Qhn,
      ),
      this.CVs(),
      this.gVs(),
      this.fVs(),
      this.pVs(),
      this.Vhn.Empty(),
      !0
    );
  }
  GetDebugString() {
    let t = "";
    return (
      (t += `InteractRangeToken: ${this.Hhn?.EventToken ?? "undefined"}; IsInRangeInternal: ${this.Nhn}
InteractRangeInfo:
`),
      this.Hhn &&
        (t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(
          this.Hhn.EventToken,
        )),
      t
    );
  }
};
(PawnPerceptionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(104)],
  PawnPerceptionComponent,
)),
  (exports.PawnPerceptionComponent = PawnPerceptionComponent);
// # sourceMappingURL=PawnPerceptionComponent.js.map
