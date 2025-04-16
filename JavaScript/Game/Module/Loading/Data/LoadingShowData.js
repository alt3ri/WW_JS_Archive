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
      (this.hLt = 0),
      (this.kGc = 0),
      (this._Ui = 0),
      (this.L9e = 0);
  }
  Initialize() {
    this.Cvi(),
      (this.dvi = [...this.uvi]),
      (this.mvi = this.dvi.reduce((t, e) => t + e.Weight, 0));
  }
  gvi(t) {
    var e = new Set();
    for (const i of t) e.add(i.ImageId);
    var t = Array.from(e.values()),
      r = Math.random();
    return t[Math.round(r * (t.length - 1))];
  }
  Cvi() {
    var t = [],
      e = this.OGc(),
      r = (e && 0 !== e.length ? t.push(...e) : t.push(...this.qGc()), []);
    for (const i of t)
      r.push(
        ...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(
          i,
        ),
      );
    (this.cvi = this.gvi(r)), (this.uvi = []);
    for (const a of r) a.ImageId === this.cvi && this.uvi.push(a);
  }
  OGc() {
    var t = ModelManager_1.ModelManager.LoadingModel.GetLoadingConfigId();
    if (t && 0 !== t.length) {
      var e,
        r,
        i = [];
      for (const a of ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea())
        1 === a.Type &&
          ((e = this.kGc >= a.LevelRange[0] && this.kGc <= a.LevelRange[1]),
          (r = t.includes(a.Id)),
          e && r) &&
          i.push(a.Id);
      return i;
    }
  }
  GGc() {
    var t;
    (this.kGc = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel()),
      (this._Ui = ModelManager_1.ModelManager.GameModeModel.MapId),
      (this.L9e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
      0 !== ModelManager_1.ModelManager.LoadingModel.TargetTeleportId &&
        void 0 !== ModelManager_1.ModelManager.LoadingModel.TargetTeleportId &&
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
        (this.L9e = t.AreaId);
  }
  qGc() {
    this.GGc();
    var t,
      e,
      r,
      i,
      a = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea(),
      o = [],
      s = [];
    for (const M of a)
      1 !== M.Id &&
        0 === M.Type &&
        ((t = this.kGc >= M.LevelRange[0] && this.kGc <= M.LevelRange[1]),
        (e = M.MapId.includes(this._Ui)),
        (r = M.AreaId.includes(this.L9e)),
        (i =
          0 === M.ConditionGroup ||
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
            M.ConditionGroup.toString(),
            void 0,
          )),
        t && e && i && o.push(M),
        t && r && i) &&
        s.push(M);
    var n = 0 < o.length ? o : s,
      h = n.filter((t) => t.IsLimitShow),
      n = n.filter((t) => !t.IsLimitShow);
    if (
      0 < h.length &&
      0 <
        h.filter((t) => {
          t = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
            t.ActivityId,
          );
          return void 0 !== t && t.CheckIfInOpenTime();
        }).length
    )
      return h.map((t) => t.Id);
    return 0 === n.length ? [a[0].Id] : n.map((t) => t.Id);
  }
  pvi() {
    let e = this.mvi * Math.random();
    for (let t = 0; t < this.dvi.length; ++t) {
      var r = this.dvi[t];
      if (!(e > r.Weight)) return t;
      e -= r.Weight;
    }
    return 0;
  }
  GetNextTip() {
    if (0 !== this.uvi.length) {
      if (1 === this.uvi.length) return this.uvi[0];
      let t = -1;
      for (; (t = this.pvi()) === this.hLt; );
      return (this.hLt = t), this.uvi[this.hLt];
    }
  }
  GetImageId() {
    return this.cvi;
  }
  GetTipCount() {
    return this.uvi.length;
  }
}
exports.LoadingShowData = LoadingShowData;
//# sourceMappingURL=LoadingShowData.js.map
