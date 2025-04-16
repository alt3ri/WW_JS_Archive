"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamItem = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class SceneTeamItem {
  constructor() {
    (this.jpo = !1),
      (this.zZa = !1),
      (this.Opo = 0),
      (this.j8 = 0),
      (this.Mne = 0),
      (this.Wpo = 0),
      (this.Kpo = void 0),
      (this.Qpo = !1);
  }
  static Create(t, e, r, s) {
    var i = new SceneTeamItem();
    return (
      (i.Opo = t),
      (i.jpo = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      (i.j8 = e),
      (i.Mne = r),
      (i.Wpo = s),
      i.UpdateEntityHandle(),
      i.Kpo?.Entity?.GetComponent(0)?.IsAutoRole() && (i.zZa = !0),
      i
    );
  }
  Reset() {
    (this.Wpo = 0), (this.Kpo = void 0);
  }
  GetGroupType() {
    return this.Opo;
  }
  GetPlayerId() {
    return this.j8;
  }
  IsMyRole() {
    return this.jpo;
  }
  IsAutoRole() {
    return this.zZa;
  }
  IsControl() {
    var t;
    return this.jpo
      ? !(
          !(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
          !this.EntityHandle
        ) && t.Id === this.EntityHandle.Id
      : this.Qpo;
  }
  get GetConfigId() {
    return this.Mne;
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  UpdateEntityHandle() {
    this.Kpo = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
  }
  get EntityHandle() {
    if (!this.Kpo || !this.Kpo.Valid) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
      if (!t || !t.Valid) return;
      this.Kpo = t;
    }
    if (this.Kpo.IsInit) return this.Kpo;
  }
  IsDead() {
    var t = this.EntityHandle?.Entity;
    return !t || !(t = t.GetComponent(15)) || t.IsDead();
  }
  CanGoBattle() {
    var t;
    return this.EntityHandle
      ? this.IsDead()
        ? 4
        : (t = this.EntityHandle.Entity.CheckGetComponent(203)).HasTag(
              -2100129479,
            ) && !t.HasTag(781722537)
          ? 2
          : 0
      : 1;
  }
  CanControl() {
    return !this.IsDead() && !this.IsAutoRole();
  }
  SetRemoteIsControl(t) {
    this.Qpo = t;
  }
}
exports.SceneTeamItem = SceneTeamItem;
//# sourceMappingURL=SceneTeamItem.js.map
