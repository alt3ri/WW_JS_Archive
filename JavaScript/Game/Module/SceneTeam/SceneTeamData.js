"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamGroup =
    exports.SceneTeamPlayer =
    exports.SceneTeamRole =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
class SceneTeamRole {
  constructor() {
    (this.CreatureDataId = 0), (this.RoleId = 0);
  }
}
exports.SceneTeamRole = SceneTeamRole;
class SceneTeamPlayer {
  constructor() {
    (this.j8 = 0), (this.hTn = void 0), (this.Npo = new Map());
  }
  static Create(t) {
    var e = new SceneTeamPlayer();
    return (e.j8 = t), e;
  }
  Clear() {
    this.hTn = void 0;
    for (const t of this.Npo.values()) t.Clear();
    this.Npo.clear();
  }
  GetCurrentGroupType() {
    return this.hTn;
  }
  GetCurrentGroup() {
    if (this.hTn) return this.Npo.get(this.hTn);
  }
  GetGroup(t) {
    return this.Npo.get(t);
  }
  GetGroupList() {
    var t = [];
    for (const e of this.Npo.values()) t.push(e);
    return t;
  }
  SwitchGroup(t) {
    this.hTn = t;
  }
  UpdateGroup(t, e, r, i, s, o) {
    let n = this.Npo.get(t);
    n || ((n = SceneTeamGroup.Create(this.j8, t)), this.Npo.set(t, n)),
      n.Update(e, r, i, s, o);
  }
  RefreshEntityVisible() {
    for (const t of this.Npo.values()) t.RefreshEntityVisible();
  }
}
exports.SceneTeamPlayer = SceneTeamPlayer;
class SceneTeamGroup {
  constructor() {
    (this.j8 = 0),
      (this.Opo = 0),
      (this.Vlo = new Array()),
      (this.kpo = void 0),
      (this.IsFixedLocation = !1),
      (this.IsRetain = !1),
      (this.o$s = 0),
      (this.Vpo = void 0);
  }
  static Create(t, e) {
    var r = new SceneTeamGroup();
    return (r.j8 = t), (r.Opo = e), r;
  }
  Clear() {
    (this.Opo = 0),
      this.Vlo.splice(0, this.Vlo.length),
      (this.IsRetain = !1),
      (this.o$s = 0),
      (this.kpo = void 0),
      (this.Vpo = void 0);
  }
  GetGroupType() {
    return this.Opo;
  }
  GetRoleList() {
    var t = [];
    for (const e of this.Vlo) t.push(e);
    return t;
  }
  GetCurrentRole() {
    return this.kpo;
  }
  SetCurrentRole(t) {
    for (const e of this.Vlo) e.CreatureDataId === t && (this.kpo = e);
  }
  GetLivingState() {
    return this.o$s;
  }
  UpdateLivingState(t) {
    var e,
      r = this.o$s;
    r !== (this.o$s = t) &&
      ((e =
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        e,
        this.Opo,
        t,
        r,
      ));
  }
  Update(t, e, r, i, s) {
    if (
      (this.Vlo.splice(0, this.Vlo.length),
      (this.kpo = void 0),
      this.Vpo?.Cancel(),
      (this.Vpo = void 0),
      this.UpdateLivingState(r),
      !(t.length <= 0))
    ) {
      (this.IsFixedLocation = i), (this.IsRetain = s);
      for (const o of t) this.Vlo.push(o), o.RoleId === e && (this.kpo = o);
    }
  }
  RefreshEntityVisible() {
    const i = [];
    for (const e of this.Vlo) {
      var t = e.CreatureDataId;
      0 < t && i.push(t);
    }
    i.length <= 0 ||
      (this.Vpo = WaitEntityTask_1.WaitEntityTask.Create(
        i,
        () => {
          for (const r of i) {
            var t =
              ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity;
            t
              ? (this.Hpo(r, t) ? t.EnableByKey(1, !0) : t.DisableByKey(1, !0),
                t.Active || t?.CheckGetComponent(84).SetTeamTag(2))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 49, "更新编队实体显隐时无法获取", [
                  "CreatureDataId",
                  r,
                ]);
          }
          var e;
          this.IsRetain &&
            (e = this.kpo?.CreatureDataId) &&
            ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
              ?.Entity?.GetComponent(84)
              ?.OutOfControl();
        },
        -1,
      ));
  }
  Hpo(t, e) {
    if (!ModelManager_1.ModelManager.PlotModel.InSeamlessFormation) {
      e = e.GetComponent(15);
      if (e && !e.IsDead()) {
        e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(
          this.j8,
        );
        if (e) {
          var r,
            i = e.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
          if (this.j8 !== ModelManager_1.ModelManager.PlayerInfoModel.GetId())
            return (
              (r = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
                this.j8,
              )?.IsRemoteSceneLoading()),
              t === i && !r
            );
          if (t === i) return !0;
          if (
            t ===
            ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId()
          )
            return !0;
          for (const s of e.GetGroupList())
            if (s.IsRetain && t === s.kpo?.CreatureDataId) return !0;
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("SceneTeam", 49, "更新实体显隐时不存在玩家", [
              "PlayerId",
              this.j8,
            ]);
      }
    }
    return !1;
  }
}
exports.SceneTeamGroup = SceneTeamGroup;
//# sourceMappingURL=SceneTeamData.js.map
