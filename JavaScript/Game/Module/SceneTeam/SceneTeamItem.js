"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamItem = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("./SceneTeamDefine");
class SceneTeamItem {
  constructor() {
    (this.jpo = !1),
      (this.Opo = 0),
      (this.j8 = 0),
      (this.Mne = 0),
      (this.Wpo = 0),
      (this.Kpo = void 0),
      (this.Qpo = !1);
  }
  static Create(e, t, r, i) {
    var s = new SceneTeamItem();
    return (
      (s.Opo = e),
      (s.jpo = t === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      (s.j8 = t),
      (s.Mne = r),
      (s.Wpo = i),
      s
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
  IsControl() {
    var e;
    return this.jpo
      ? !(
          !(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
          !this.EntityHandle
        ) && e.Id === this.EntityHandle.Id
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
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
      if (!e || !e.Valid) return;
      this.Kpo = e;
    }
    if (this.Kpo.IsInit) return this.Kpo;
  }
  IsDead() {
    var e = this.EntityHandle?.Entity;
    return !e || !(e = e.GetComponent(15)) || e.IsDead();
  }
  CanGoBattle() {
    var e;
    return this.EntityHandle
      ? this.IsDead()
        ? 4
        : (e = this.EntityHandle.Entity.CheckGetComponent(190)).HasTag(
              -2100129479,
            ) && !e.HasTag(781722537)
          ? 2
          : 0
      : 1;
  }
  CanGoDown(e) {
    var t;
    return this.EntityHandle
      ? (t = this.EntityHandle.Entity.CheckGetComponent(190)).HasTag(
          -1697149502,
        )
        ? 6
        : e
          ? 0
          : t.HasTag(-2044964178) && t.HasAnyTag(SceneTeamDefine_1.beHitTagList)
            ? 5
            : t.HasTag(191377386)
              ? 4
              : t.HasTag(1008164187)
                ? 3
                : 0
      : 1;
  }
  SetRemoteIsControl(e) {
    this.Qpo = e;
  }
}
exports.SceneTeamItem = SceneTeamItem;
//# sourceMappingURL=SceneTeamItem.js.map
