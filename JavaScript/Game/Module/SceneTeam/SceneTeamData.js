"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamGroup =
    exports.SceneTeamPlayer =
    exports.SceneTeamRole =
      void 0);
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
class SceneTeamRole {
  constructor() {
    (this.CreatureDataId = 0), (this.RoleId = 0);
  }
}
exports.SceneTeamRole = SceneTeamRole;
class SceneTeamPlayer {
  constructor() {
    (this.j8 = 0), (this.Wyn = void 0), (this.Ffo = new Map());
  }
  static Create(t) {
    const e = new SceneTeamPlayer();
    return (e.j8 = t), e;
  }
  Clear() {
    this.Wyn = void 0;
    for (const t of this.Ffo.values()) t.Clear();
    this.Ffo.clear();
  }
  ResetServerGroupData() {
    const t = [];
    for (const e of this.Ffo.keys()) e >= 0 && t.push(e);
    for (const r of t) this.Ffo.get(r)?.Clear(), this.Ffo.delete(r);
  }
  GetCurrentGroupType() {
    return this.Wyn;
  }
  GetCurrentGroup() {
    if (this.Wyn) return this.Ffo.get(this.Wyn);
  }
  GetGroupList() {
    const t = [];
    for (const e of this.Ffo.values()) t.push(e);
    return t;
  }
  SwitchGroup(t) {
    this.Wyn = t;
  }
  UpdateGroup(t, e, r, o = !1) {
    let s = this.Ffo.get(t);
    s || ((s = SceneTeamGroup.Create(this.j8, t)), this.Ffo.set(t, s)),
      s.Update(e, r, o);
  }
}
exports.SceneTeamPlayer = SceneTeamPlayer;
class SceneTeamGroup {
  constructor() {
    (this.j8 = 0),
      (this.Vfo = 0),
      (this.Kho = new Array()),
      (this.Hfo = void 0),
      (this.IsRetain = !1),
      (this.Wfo = void 0);
  }
  static Create(t, e) {
    const r = new SceneTeamGroup();
    return (r.j8 = t), (r.Vfo = e), r;
  }
  Clear() {
    (this.Vfo = 0),
      this.Kho.splice(0, this.Kho.length),
      (this.IsRetain = !1),
      (this.Hfo = void 0),
      (this.Wfo = void 0);
  }
  GetGroupType() {
    return this.Vfo;
  }
  GetRoleList() {
    const t = [];
    for (const e of this.Kho) t.push(e);
    return t;
  }
  GetCurrentRole() {
    return this.Hfo;
  }
  SetCurrentRole(t) {
    for (const e of this.Kho) e.CreatureDataId === t && (this.Hfo = e);
  }
  Update(t, e, i = !1) {
    if (
      (this.Kho.splice(0, this.Kho.length),
      (this.Hfo = void 0),
      this.Wfo?.Cancel(),
      (this.Wfo = void 0),
      !(t.length <= 0))
    ) {
      this.IsRetain = i;
      const r = [];
      const a = new Map();
      for (const s of t) {
        const o = s.CreatureDataId;
        this.Kho.push(s),
          s.RoleId === e && (this.Hfo = s),
          o > 0 && (r.push(o), a.set(o, s));
      }
      r.length <= 0 ||
        (this.Wfo = WaitEntityTask_1.WaitEntityTask.Create(
          r,
          () => {
            for (const [t, e] of a) {
              var r;
              const o =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity;
              o
                ? ((r = this.Kfo(e, o, i)),
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    o,
                    r,
                    "Formation UpdateGroup",
                  ),
                  e === this.Hfo || r || o.CheckGetComponent(81)?.SetTeamTag(2))
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Formation",
                    49,
                    "更新编队实体显隐时无法获取",
                    ["CreatureDataId", t],
                  );
            }
            let s;
            i &&
              (s = this.Hfo?.CreatureDataId) &&
              ModelManager_1.ModelManager.CreatureModel.GetEntity(s)
                ?.Entity?.GetComponent(81)
                ?.OutOfControl();
          },
          !0,
          -1,
        ));
    }
  }
  Kfo(t, e, r) {
    return (
      !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
      !(
        !(e = e.GetComponent(15)) ||
        e.IsDead() ||
        (this.j8 !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()
          ? ((e = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              this.j8,
            )?.IsRemoteSceneLoading()),
            t !== this.Hfo || e)
          : t.CreatureDataId !==
              ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId() &&
            (!r || t !== this.Hfo))
      )
    );
  }
}
exports.SceneTeamGroup = SceneTeamGroup;
// # sourceMappingURL=SceneTeamData.js.map
