"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConnectNearbySensory = void 0);
const BaseSensoryInfo_1 = require("./BaseSensoryInfo");
class ConnectNearbySensory extends BaseSensoryInfo_1.BaseSensoryInfo {
  constructor() {
    super(...arguments),
      (this.RangePerceptionType = 1),
      (this.CacheEntityList = new Set()),
      (this.LastFindEntities = new Set()),
      (this.OnEnterSensoryRange = void 0),
      (this.OnExitSensoryRange = void 0);
  }
  OnInit(...t) {
    this.SensoryRange = t[0];
  }
  OnClear() {
    this.LastFindEntities.clear(),
      this.CacheEntityList.clear(),
      (this.OnEnterSensoryRange = void 0),
      (this.OnExitSensoryRange = void 0);
  }
  OnTick(t) {}
  CheckEntity(t) {
    return !0;
  }
  EnterRange(t) {
    (this.InRange = !0),
      (this.LastFindEntities.has(t.Id) || this.OnEnterSensoryRange(t)) &&
        (this.CacheEntityList.add(t.Id), this.LastFindEntities.delete(t.Id));
  }
  ExitRange() {
    this.InRange = 0 !== this.CacheEntityList.size;
    for (const t of this.LastFindEntities)
      this.OnExitSensoryRange(t), this.CacheEntityList.delete(t);
    this.LastFindEntities.clear();
    for (const s of this.CacheEntityList) this.LastFindEntities.add(s);
  }
  OnEntityExitConnectRange(t) {
    this.LastFindEntities.delete(t), this.CacheEntityList.delete(t);
  }
}
exports.ConnectNearbySensory = ConnectNearbySensory;
//# sourceMappingURL=ConnectNearbySensory.js.map
