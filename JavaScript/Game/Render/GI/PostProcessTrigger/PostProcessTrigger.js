"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine"),
  RoleTriggerController_1 = require("../../../NewWorld/Character/Role/RoleTriggerController"),
  PostProcessTriggerStateInside_1 = require("./PostProcessTriggerStateInside"),
  PostProcessTriggerStateInsideToOutside_1 = require("./PostProcessTriggerStateInsideToOutside"),
  PostProcessTriggerStateOutside_1 = require("./PostProcessTriggerStateOutside"),
  PostProcessTriggerStateOutsideToInside_1 = require("./PostProcessTriggerStateOutsideToInside");
class PostProcessTrigger {
  constructor() {
    (this.D1r = void 0),
      (this.R1r = void 0),
      (this.U1r = void 0),
      (this.TransitionTime = -0),
      (this.A1r = void 0),
      (this.Lle = void 0),
      (this.P1r = void 0),
      (this.x1r = ""),
      (this.w1r = (t, s, e) => {
        this.B1r(s) && (this.A1r = 0);
      }),
      (this.b1r = (t, s, e, i) => {
        this.B1r(s) && (this.A1r = 1);
      });
  }
  Init(t, s, e, i, r, o) {
    (this.x1r = o),
      (this.P1r = r),
      (this.Lle = new StateMachine_1.StateMachine(this)),
      this.Lle.AddState(0, PostProcessTriggerStateInside_1.default),
      this.Lle.AddState(1, PostProcessTriggerStateOutside_1.default),
      this.Lle.AddState(2, PostProcessTriggerStateInsideToOutside_1.default),
      this.Lle.AddState(3, PostProcessTriggerStateOutsideToInside_1.default),
      this.Lle.Start(1),
      (this.D1r = t),
      (this.R1r = s),
      (this.U1r = e),
      (this.TransitionTime = i),
      (this.A1r = 1),
      (this.U1r.BlendWeight = 0),
      (this.U1r.bUnbound = !0),
      this.D1r.OnComponentBeginOverlapNoGcAlloc.Add(this.w1r),
      this.R1r.OnComponentEndOverlap.Add(this.b1r);
    var o = (0, puerts_1.$ref)(void 0),
      h = (this.D1r.GetOverlappingActors(o), (0, puerts_1.$unref)(o));
    if (h)
      for (let t = 0; t < h.Num(); t++) this.B1r(h.Get(t)) && (this.A1r = 0);
  }
  GetWuYinQuBattleKey() {
    return this.x1r;
  }
  GetWuYinQuBattleState() {
    return this.P1r;
  }
  GetPostProcessComponent() {
    return this.U1r;
  }
  B1r(t) {
    return (
      !!UE.KismetSystemLibrary.IsValid(t) &&
      t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
    );
  }
  Tick(t) {
    this.Lle.CurrentState !== this.A1r &&
      (0 === this.Lle.CurrentState
        ? this.Lle.Switch(2)
        : 1 === this.Lle.CurrentState && this.Lle.Switch(3)),
      this.Lle.Update(t);
  }
  Dispose() {
    this.D1r.OnComponentBeginOverlapNoGcAlloc.Remove(this.w1r),
      this.R1r.OnComponentEndOverlap.Remove(this.b1r);
  }
}
exports.default = PostProcessTrigger;
//# sourceMappingURL=PostProcessTrigger.js.map
