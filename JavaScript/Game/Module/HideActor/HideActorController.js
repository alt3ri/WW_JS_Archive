"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideActorController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class HideActorController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.dei = !1), (this.Cei = !1), this._Rn.clear(), this.uRn.clear(), !0
    );
  }
  static OnTick(t) {
    if (this.Cei) for (const e of this._Rn) e.Valid && this.fei(e, !0);
  }
  static HideMesh() {
    this.dei || ((this.dei = !0), this.pei(!0, !1));
  }
  static HideEffect() {
    this.Cei || ((this.Cei = !0), this.pei(!1, !0));
  }
  static ShowMesh() {
    this.dei && ((this.dei = !1), this.vei(!0, !1));
  }
  static ShowEffect() {
    this.Cei && ((this.Cei = !1), this.vei(!1, !0));
  }
  static pei(t, e) {
    if (Global_1.Global.BaseCharacter)
      for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var i, r;
        s.IsInit &&
          s.Entity.Active &&
          (r = (i = s.Entity.GetComponent(3))?.Actor) &&
          r !== Global_1.Global.BaseCharacter &&
          1 !==
            CampUtils_1.CampUtils.GetCampRelationship(
              r.Camp,
              Global_1.Global.BaseCharacter.Camp,
            ) &&
          (t &&
            ((r = i.DisableActor("[HideActorController] 隐藏Mesh")),
            this.uRn.set(s, r)),
          e) &&
          (this.fei(s, !0), this._Rn.add(s));
      }
  }
  static vei(t, e) {
    if (t) {
      for (var [i, r] of this.uRn)
        i.Valid && i.Entity.GetComponent(3).EnableActor(r);
      this.uRn.clear();
    }
    if (e) {
      for (const s of this._Rn) s.Valid && this.fei(s, !1);
      this._Rn.clear();
    }
  }
  static fei(t, e) {
    t.Entity.GetComponent(33)?.CurrentSkill?.SetEffectHidden(e),
      t.Entity.GetComponent(19)?.SetHidden(e);
  }
  static OnClear() {
    return (this.dei = !1), (this.Cei = !1), this.vei(!0, !0), !0;
  }
}
((exports.HideActorController = HideActorController).dei = !1),
  (HideActorController.Cei = !1),
  (HideActorController._Rn = new Set()),
  (HideActorController.uRn = new Map());
//# sourceMappingURL=HideActorController.js.map
