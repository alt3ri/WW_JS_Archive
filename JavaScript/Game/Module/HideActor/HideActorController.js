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
      (this.dti = !1), (this.Cti = !1), this.jAn.clear(), this.WAn.clear(), !0
    );
  }
  static OnTick(t) {
    if (this.Cti) for (const e of this.jAn) e.Valid && this.fti(e, !0);
  }
  static HideMesh() {
    this.dti || ((this.dti = !0), this.pti(!0, !1));
  }
  static HideEffect() {
    this.Cti || ((this.Cti = !0), this.pti(!1, !0));
  }
  static ShowMesh() {
    this.dti && ((this.dti = !1), this.vti(!0, !1));
  }
  static ShowEffect() {
    this.Cti && ((this.Cti = !1), this.vti(!1, !0));
  }
  static pti(t, e) {
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
            this.WAn.set(s, r)),
          e) &&
          (this.fti(s, !0), this.jAn.add(s));
      }
  }
  static vti(t, e) {
    if (t) {
      for (var [i, r] of this.WAn)
        i.Valid && i.Entity.GetComponent(3).EnableActor(r);
      this.WAn.clear();
    }
    if (e) {
      for (const s of this.jAn) s.Valid && this.fti(s, !1);
      this.jAn.clear();
    }
  }
  static fti(t, e) {
    t.Entity.GetComponent(33)?.CurrentSkill?.SetEffectHidden(e),
      t.Entity.GetComponent(19)?.SetHidden(e);
  }
  static OnClear() {
    return (this.dti = !1), (this.Cti = !1), this.vti(!0, !0), !0;
  }
}
((exports.HideActorController = HideActorController).dti = !1),
  (HideActorController.Cti = !1),
  (HideActorController.jAn = new Set()),
  (HideActorController.WAn = new Map());
//# sourceMappingURL=HideActorController.js.map
