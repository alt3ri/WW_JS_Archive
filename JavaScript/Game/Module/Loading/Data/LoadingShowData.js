"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingShowData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class LoadingShowData {
  constructor() {
    (this.uvi = []),
      (this.cvi = 0),
      (this.mvi = 0),
      (this.dvi = []),
      (this.hLt = 0);
  }
  Initialize() {
    this.Cvi(),
      (this.dvi = [...this.uvi]),
      (this.mvi = this.dvi.reduce((e, t) => e + t.Weight, 0));
  }
  gvi(e) {
    var t = new Set();
    for (const a of e) t.add(a.ImageId);
    var e = Array.from(t.values()),
      r = Math.random();
    return e[Math.round(r * (e.length - 1))];
  }
  Cvi() {
    var e = [];
    for (const t of this.fvi())
      e.push(
        ...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(
          t,
        ),
      );
    (this.cvi = this.gvi(e)), (this.uvi = []);
    for (const r of e) r.ImageId === this.cvi && this.uvi.push(r);
  }
  fvi() {
    const i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
    var e = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea();
    const o = ModelManager_1.ModelManager.GameModeModel.MapId;
    let n = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    0 !== ModelManager_1.ModelManager.LoadingModel.TargetTeleportId &&
      ((t = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(
        ModelManager_1.ModelManager.LoadingModel.TargetTeleportId,
      )),
      (ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = 0),
      t) &&
      void 0 !==
        (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(
          t.TeleportEntityConfigId,
          t.MapId,
        )) &&
      (n = t.AreaId);
    var t = e.filter((e) => {
        var t, r, a;
        return (
          1 !== e.Id &&
          ((t = i >= e.LevelRange[0] && i <= e.LevelRange[1]),
          (r = e.AreaId.includes(n)),
          (a = e.MapId.includes(o)),
          (e =
            0 === e.ConditionGroup ||
            ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
              e.ConditionGroup.toString(),
              void 0,
            )),
          t) &&
          (r || a) &&
          e
        );
      }),
      r = t.filter((e) => e.IsLimitShow),
      t = t.filter((e) => !e.IsLimitShow);
    if (
      0 < r.length &&
      0 <
        r.filter((e) => {
          e = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
            e.ActivityId,
          );
          return void 0 !== e && e.CheckIfInOpenTime();
        }).length
    )
      return r.map((e) => e.Id);
    return 0 === t.length ? [e[0].Id] : t.map((e) => e.Id);
  }
  pvi() {
    let t = this.mvi * Math.random();
    for (let e = 0; e < this.dvi.length; ++e) {
      var r = this.dvi[e];
      if (!(t > r.Weight)) return e;
      t -= r.Weight;
    }
    return 0;
  }
  GetNextTip() {
    if (0 !== this.uvi.length) {
      if (1 === this.uvi.length) return this.uvi[0];
      let e = -1;
      for (; (e = this.pvi()) === this.hLt; );
      return (this.hLt = e), this.uvi[this.hLt];
    }
  }
  GetImageId() {
    return this.cvi;
  }
}
exports.LoadingShowData = LoadingShowData;
//# sourceMappingURL=LoadingShowData.js.map
