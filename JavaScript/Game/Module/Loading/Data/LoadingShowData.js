"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingShowData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class LoadingShowData {
  constructor() {
    (this._pi = []),
      (this.upi = 0),
      (this.cpi = 0),
      (this.mpi = []),
      (this.oTt = 0);
  }
  Initialize() {
    this.Cpi(),
      (this.mpi = [...this._pi]),
      (this.cpi = this.mpi.reduce((e, t) => e + t.Weight, 0));
  }
  gpi(e) {
    const t = new Set();
    for (const a of e) t.add(a.ImageId);
    var e = Array.from(t.values());
    const r = Math.random();
    return e[Math.round(r * (e.length - 1))];
  }
  Cpi() {
    const e = [];
    for (const t of this.fpi())
      e.push(
        ...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(
          t,
        ),
      );
    (this.upi = this.gpi(e)), (this._pi = []);
    for (const r of e) r.ImageId === this.upi && this._pi.push(r);
  }
  fpi() {
    const i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
    const e = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea();
    const o = ModelManager_1.ModelManager.GameModeModel.MapId;
    let n = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    ModelManager_1.ModelManager.LoadingModel.TargetTeleportId &&
      (t =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(
          ModelManager_1.ModelManager.LoadingModel.TargetTeleportId,
        )) &&
      void 0 !==
        (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(t)) &&
      (n = t.AreaId);
    var t = e.filter((e) => {
      let t, r, a;
      return (
        e.Id !== 1 &&
        ((t = i >= e.LevelRange[0] && i <= e.LevelRange[1]),
        (r = e.AreaId.includes(n)),
        (a = e.MapId.includes(o)),
        (e =
          e.ConditionGroup === 0 ||
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
            e.ConditionGroup.toString(),
            void 0,
          )),
        t) &&
        (r || a) &&
        e
      );
    });
    const r = t.filter((e) => e.IsLimitShow);
    var t = t.filter((e) => !e.IsLimitShow);
    if (
      r.length > 0 &&
      r.filter((e) => {
        e = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
          e.ActivityId,
        );
        return void 0 !== e && e.CheckIfInOpenTime();
      }).length > 0
    )
      return r.map((e) => e.Id);
    return t.length === 0 ? [e[0].Id] : t.map((e) => e.Id);
  }
  ppi() {
    let t = this.cpi * Math.random();
    for (let e = 0; e < this.mpi.length; ++e) {
      const r = this.mpi[e];
      if (!(t > r.Weight)) return e;
      t -= r.Weight;
    }
    return 0;
  }
  GetNextTip() {
    if (this._pi.length !== 0) {
      if (this._pi.length === 1) return this._pi[0];
      let e = -1;
      for (; (e = this.ppi()) === this.oTt; );
      return (this.oTt = e), this._pi[this.oTt];
    }
  }
  GetImageId() {
    return this.upi;
  }
}
exports.LoadingShowData = LoadingShowData;
// # sourceMappingURL=LoadingShowData.js.map
