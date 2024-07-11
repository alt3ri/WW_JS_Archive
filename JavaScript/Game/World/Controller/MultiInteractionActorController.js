"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiInteractionActorController = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  AttachToActorController_1 = require("./AttachToActorController"),
  MAX_DESTROY_TIME = 3;
class MultiInteractionActorController extends ControllerBase_1.ControllerBase {
  static OnTick() {
    if (!(this.Vfr.Size <= 0)) {
      let t = 0;
      for (; t < MAX_DESTROY_TIME; ) {
        if (this.Vfr.Size <= 0) return;
        this.Vfr.Pop().DestroySelf(), t++;
      }
    }
  }
  static OnClear() {
    return this.Hfr(), !0;
  }
  static OnLeaveLevel() {
    return this.Hfr(), !0;
  }
  static Hfr() {
    for (; 0 < this.Vfr.Size; ) {
      var t = this.Vfr.Pop();
      t?.IsValid() && t.DestroySelf();
    }
  }
  static AddWaitDestroyActor(t) {
    this.Vfr.Push(t),
      AttachToActorController_1.AttachToActorController.DetachActor(
        t,
        !1,
        "MultiInteractionActorController.AddWaitDestroyActor",
        1,
        1,
        1,
      );
  }
}
(exports.MultiInteractionActorController =
  MultiInteractionActorController).Vfr = new Queue_1.Queue();
//# sourceMappingURL=MultiInteractionActorController.js.map
