"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterExploreModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
class CharacterExploreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ManipulateFound = !1),
      (this.ManipulateEntity = void 0),
      (this.ManipulateActorComp = void 0),
      (this.LastManipulateTriggerId = 0),
      (this.CurManipulateTriggerId = 0),
      (this.HookFound = !1),
      (this.HookEntity = void 0),
      (this.LastHookTriggerId = 0),
      (this.CurHookTriggerId = 0),
      (this.AutoResetSkillFinished = !0),
      (this.$Rc = new Array(3).fill(0)),
      (this.WRc = 1001),
      (this.QRc = 0);
  }
  KRc(e) {
    if (void 0 !== e) this.QRc = 0 === e ? this.WRc : e;
    else {
      let t = this.WRc;
      for (let e = 2; 0 <= e; e--)
        if (0 !== this.$Rc[e]) {
          (t = this.$Rc[e]), (this.QRc = t);
          break;
        }
      this.QRc = t;
    }
  }
  XRc(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Character",
        79,
        "[CharacterExploreModel] DoSetExploreSkillId",
        ["skillId", e],
        ["layer", t],
        ["DefaultExploreSkillId", this.WRc],
        ["ExploreSkillIdLayerData", this.$Rc],
      );
  }
  SetDefaultExploreSkillId(e) {
    (this.WRc = e), this.YRc(e);
  }
  GetTopLayerExplodeSkillId() {
    return this.QRc;
  }
  YRc(e, t = 0) {
    if (((this.$Rc[t] = e), 0 !== t)) this.XRc(e, t), this.KRc();
    else {
      for (let e = 2; 0 < e; e--) this.$Rc[e] = 0;
      this.XRc(e, t), this.KRc(e);
    }
  }
  SetExploreSkillId(e, t = 0) {
    return this.YRc(e, t), !!this.ExistHigherLayerSkill(t);
  }
  ResetExplodeSkillId(e = 0) {
    this.YRc(0, e);
  }
  ExistAutoLayerSkill() {
    return 0 !== this.$Rc[2];
  }
  ExistHigherLayerSkill(t) {
    for (let e = t + 1; e < 3; e++) if (0 !== this.$Rc[e]) return !0;
    return !1;
  }
}
exports.CharacterExploreModel = CharacterExploreModel;
//# sourceMappingURL=CharacterExploreModel.js.map
