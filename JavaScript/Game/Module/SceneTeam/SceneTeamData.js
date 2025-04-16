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
    (this.CreatureDataId = 0),
      (this.RoleId = 0),
      (this.OnStageWithoutControl = !1);
  }
}
exports.SceneTeamRole = SceneTeamRole;
class SceneTeamPlayer {
  constructor() {
    (this.j8 = 0),
      (this.hTn = void 0),
      (this.Npo = new Map()),
      (this.Vpo = void 0);
  }
  static Create(t) {
    var e = new SceneTeamPlayer();
    return (e.j8 = t), e;
  }
  Clear() {
    this.hTn = void 0;
    for (const t of this.Npo.values()) t.Clear();
    this.Npo.clear(), this.Vpo?.Cancel(), (this.Vpo = void 0);
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
  UpdateGroup(t, e, r, s, i) {
    let o = this.Npo.get(t);
    o || ((o = SceneTeamGroup.Create(this.j8, t)), this.Npo.set(t, o)),
      o.Update(e, r, s, i);
  }
  RefreshEntityEnable() {
    this.Vpo?.Cancel(), (this.Vpo = void 0);
    const c = new Set(),
      f = new Set();
    for (const s of this.Npo.values()) {
      for (const i of s.GetRoleList()) {
        var t = i.CreatureDataId;
        0 < t && f.add(t);
      }
      var e = s.GetCurrentRole();
      s.GetGroupType() !== this.hTn &&
        e &&
        e.OnStageWithoutControl &&
        c.add(e.CreatureDataId);
    }
    if (!(f.size <= 0)) {
      var r = [];
      for (const o of f) r.push(o);
      this.Vpo = WaitEntityTask_1.WaitEntityTask.Create(
        "SceneTeamPlayer.RefreshEntityEnable",
        r,
        () => {
          this.Vpo = void 0;
          let t = !1;
          ModelManager_1.ModelManager.PlotModel.InSeamlessFormation && (t = !0);
          var e =
              this.j8 === ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
            r =
              ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
                this.j8,
              )?.IsRemoteSceneLoading() ?? !0,
            s =
              ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId() ??
              0,
            i = this.GetCurrentGroup(),
            o = i?.GetCurrentRole()?.CreatureDataId ?? 0;
          for (const u of f) {
            var n,
              a,
              h =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(u)?.Entity;
            h
              ? t || !(n = h.GetComponent(15)) || n.IsDead()
                ? this.wvl(h, !1)
                : e
                  ? (n = h.GetComponent(0)) && n.IsAutoRole()
                    ? ((n = i?.HasRole(u) ?? !1), this.wvl(h, n))
                    : ((n = c.has(u)),
                      (a = u === s || u === o || n),
                      this.wvl(h, a),
                      n && h.GetComponent(91)?.OutOfControl())
                  : ((a = u === o && !r), this.wvl(h, a))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Formation", 48, "更新编队实体显隐时无法获取", [
                  "CreatureDataId",
                  u,
                ]);
          }
        },
      );
    }
  }
  IsRoleOnStageWithoutControl(t) {
    for (const r of this.Npo.values()) {
      var e = r.GetCurrentRole();
      if (e && e.CreatureDataId === t && e.OnStageWithoutControl) return !0;
    }
    return !1;
  }
  wvl(t, e) {
    e
      ? t.EnableByKey(1, !0)
      : (t.DisableByKey(1, !0), t.GetComponent(91)?.SetTeamTag(2));
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
      (this.o$s = 0);
  }
  static Create(t, e) {
    var r = new SceneTeamGroup();
    return (r.j8 = t), (r.Opo = e), r;
  }
  Clear() {
    (this.Opo = 0),
      this.Vlo.splice(0, this.Vlo.length),
      (this.o$s = 0),
      (this.kpo = void 0);
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
  HasRole(t) {
    for (const e of this.Vlo) if (e.CreatureDataId === t) return !0;
    return !1;
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
  Update(t, e, r, s) {
    if (
      (this.Vlo.splice(0, this.Vlo.length),
      (this.kpo = void 0),
      this.UpdateLivingState(r),
      !(t.length <= 0))
    ) {
      this.IsFixedLocation = s;
      for (const i of t) this.Vlo.push(i), i.RoleId === e && (this.kpo = i);
    }
  }
  AddRoleList(t) {
    for (const e of t) this.Vlo.push(e);
  }
}
exports.SceneTeamGroup = SceneTeamGroup;
//# sourceMappingURL=SceneTeamData.js.map
