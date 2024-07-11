"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine"),
  RoleTriggerController_1 = require("../../../NewWorld/Character/Role/RoleTriggerController"),
  PostProcessTriggerStateInside_1 = require("./PostProcessTriggerStateInside"),
  PostProcessTriggerStateInsideToOutside_1 = require("./PostProcessTriggerStateInsideToOutside"),
  PostProcessTriggerStateOutside_1 = require("./PostProcessTriggerStateOutside"),
  PostProcessTriggerStateOutsideToInside_1 = require("./PostProcessTriggerStateOutsideToInside");
class PostProcessTrigger {
  constructor() {
    (this.Alr = void 0),
      (this.Plr = void 0),
      (this.xlr = void 0),
      (this.TransitionTime = -0),
      (this.wlr = void 0),
      (this.Lle = void 0),
      (this.Blr = void 0),
      (this.blr = ""),
      (this.qlr = (t, e, s) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RenderBattle", 12, "begin overlap with actor:", [
            "name",
            e.GetName(),
          ]),
          this.Glr(e) && (this.wlr = 0);
      }),
      (this.Nlr = (t, e, s, i) => {
        this.Glr(e) && (this.wlr = 1);
      });
  }
  Init(t, e, s, i, r, o) {
    (this.blr = o),
      (this.Blr = r),
      (this.Lle = new StateMachine_1.StateMachine(this)),
      this.Lle.AddState(0, PostProcessTriggerStateInside_1.default),
      this.Lle.AddState(1, PostProcessTriggerStateOutside_1.default),
      this.Lle.AddState(2, PostProcessTriggerStateInsideToOutside_1.default),
      this.Lle.AddState(3, PostProcessTriggerStateOutsideToInside_1.default),
      this.Lle.Start(1),
      (this.Alr = t),
      (this.Plr = e),
      (this.xlr = s),
      (this.TransitionTime = i),
      (this.wlr = 1),
      (this.xlr.BlendWeight = 0),
      (this.xlr.bUnbound = !0),
      this.Alr.OnComponentBeginOverlapNoGcAlloc.Add(this.qlr),
      this.Plr.OnComponentEndOverlap.Add(this.Nlr);
    var o = (0, puerts_1.$ref)(void 0),
      h = (this.Alr.GetOverlappingActors(o), (0, puerts_1.$unref)(o));
    if (h)
      for (let t = 0; t < h.Num(); t++) this.Glr(h.Get(t)) && (this.wlr = 0);
  }
  GetWuYinQuBattleKey() {
    return this.blr;
  }
  GetWuYinQuBattleState() {
    return this.Blr;
  }
  GetPostProcessComponent() {
    return this.xlr;
  }
  Glr(t) {
    return (
      !!UE.KismetSystemLibrary.IsValid(t) &&
      t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
    );
  }
  Tick(t) {
    this.Lle.CurrentState !== this.wlr &&
      (0 === this.Lle.CurrentState
        ? this.Lle.Switch(2)
        : 1 === this.Lle.CurrentState && this.Lle.Switch(3)),
      this.Lle.Update(t);
  }
  Dispose() {
    this.Alr.OnComponentBeginOverlapNoGcAlloc.Remove(this.qlr),
      this.Plr.OnComponentEndOverlap.Remove(this.Nlr);
  }
}
exports.default = PostProcessTrigger;
//# sourceMappingURL=PostProcessTrigger.js.map
