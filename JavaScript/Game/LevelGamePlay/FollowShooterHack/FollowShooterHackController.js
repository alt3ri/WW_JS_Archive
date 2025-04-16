"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterHackController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GAMEPLAY_CUE_ID = 640015002;
class FollowShooterHackController extends ControllerBase_1.ControllerBase {
  static AddRelationship(e, o) {
    var r;
    this.TW_.has(e) || this.TW_.set(e, new Set()),
      this.TW_.get(e).has(o) ||
        ((r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) &&
          r.Entity?.Valid &&
          (r = r.Entity.GetComponent(207)) &&
          ((r = r.AddGameplayCue([GAMEPLAY_CUE_ID], -1, "AddHackEffect")),
          this.bW_.set(o, r),
          this.TW_.get(e).add(o)));
  }
  static RemoveRelationship(e, o) {
    if (this.TW_.has(e) && this.TW_.get(e).has(o)) {
      if (this.bW_.has(o)) {
        var r = this.bW_.get(o);
        if ((this.bW_.delete(o), void 0 !== r)) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
          if (!t || !t.Entity?.Valid) return;
          t = t.Entity.GetComponent(207);
          if (!t) return;
          t.RemoveBuffByHandle(r);
        }
      }
      this.TW_.get(e).delete(o);
    }
  }
}
((exports.FollowShooterHackController = FollowShooterHackController).TW_ =
  new Map()),
  (FollowShooterHackController.bW_ = new Map());
//# sourceMappingURL=FollowShooterHackController.js.map
