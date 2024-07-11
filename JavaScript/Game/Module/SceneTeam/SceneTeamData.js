"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamGroup =
    exports.SceneTeamPlayer =
    exports.SceneTeamRole =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
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
  static Create(e) {
    var t = new SceneTeamPlayer();
    return (t.j8 = e), t;
  }
  Clear() {
    this.hTn = void 0;
    for (const e of this.Npo.values()) e.Clear();
    this.Npo.clear();
  }
  GetCurrentGroupType() {
    return this.hTn;
  }
  GetCurrentGroup() {
    if (this.hTn) return this.Npo.get(this.hTn);
  }
  GetGroup(e) {
    return this.Npo.get(e);
  }
  GetGroupList() {
    var e = [];
    for (const t of this.Npo.values()) e.push(t);
    return e;
  }
  SwitchGroup(e) {
    this.hTn = e;
  }
  UpdateGroup(e, t, r, i, s, o) {
    let n = this.Npo.get(e);
    n || ((n = SceneTeamGroup.Create(this.j8, e)), this.Npo.set(e, n)),
      n.Update(t, r, i, s, o);
  }
  RefreshEntityVisible() {
    for (const e of this.Npo.values()) e.RefreshEntityVisible();
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
      (this.y7s = 0),
      (this.Vpo = void 0);
  }
  static Create(e, t) {
    var r = new SceneTeamGroup();
    return (r.j8 = e), (r.Opo = t), r;
  }
  Clear() {
    (this.Opo = 0),
      this.Vlo.splice(0, this.Vlo.length),
      (this.IsRetain = !1),
      (this.y7s = 0),
      (this.kpo = void 0),
      (this.Vpo = void 0);
  }
  GetGroupType() {
    return this.Opo;
  }
  GetRoleList() {
    var e = [];
    for (const t of this.Vlo) e.push(t);
    return e;
  }
  GetCurrentRole() {
    return this.kpo;
  }
  SetCurrentRole(e) {
    for (const t of this.Vlo) t.CreatureDataId === e && (this.kpo = t);
  }
  GetLivingState() {
    return this.y7s;
  }
  UpdateLivingState(e) {
    var t,
      r = this.y7s;
    r !== (this.y7s = e) &&
      ((t =
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        t,
        this.Opo,
        e,
        r,
      ));
  }
  Update(e, t, r, i, s) {
    if (
      (this.Vlo.splice(0, this.Vlo.length),
      (this.kpo = void 0),
      this.Vpo?.Cancel(),
      (this.Vpo = void 0),
      this.UpdateLivingState(r),
      !(e.length <= 0))
    ) {
      (this.IsFixedLocation = i), (this.IsRetain = s);
      for (const o of e) this.Vlo.push(o), o.RoleId === t && (this.kpo = o);
    }
  }
  RefreshEntityVisible() {
    const s = [];
    for (const t of this.Vlo) {
      var e = t.CreatureDataId;
      0 < e && s.push(e);
    }
    s.length <= 0 ||
      (this.Vpo = WaitEntityTask_1.WaitEntityTask.Create(
        s,
        () => {
          for (const i of s) {
            var e,
              t =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(i)?.Entity;
            t
              ? ((e = this.Hpo(i, t)),
                ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                  t,
                  e,
                  "SceneTeamData.RefreshEntityVisible",
                ),
                t.Active || t?.CheckGetComponent(83).SetTeamTag(2))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 49, "更新编队实体显隐时无法获取", [
                  "CreatureDataId",
                  i,
                ]);
          }
          var r;
          this.IsRetain &&
            (r = this.kpo?.CreatureDataId) &&
            ModelManager_1.ModelManager.CreatureModel.GetEntity(r)
              ?.Entity?.GetComponent(83)
              ?.OutOfControl();
        },
        !0,
        -1,
      ));
  }
  Hpo(e, t) {
    if (!ModelManager_1.ModelManager.PlotModel.InSeamlessFormation) {
      t = t.GetComponent(15);
      if (t && !t.IsDead()) {
        if (this.j8 !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
          const r =
            ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              this.j8,
            );
          t = r?.IsRemoteSceneLoading();
          return e === this.kpo?.CreatureDataId && !t;
        }
        const r = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(
          this.j8,
        );
        if (r) {
          if (e === r.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId)
            return !0;
          if (
            e ===
            ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId()
          )
            return !0;
          for (const i of r.GetGroupList())
            if (i.IsRetain && e === i.kpo?.CreatureDataId) return !0;
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
