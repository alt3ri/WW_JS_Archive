"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapLifeEventDispatcher = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const MapSceneGameplayUnlock_1 = require("./MapSceneGameplayUnlock");
class MapLifeEventDispatcher {
  constructor(e) {
    (this.ZDi = void 0),
      (this.eRi = void 0),
      (this.ZDi = e),
      (this.eRi = new Map([
        [0, new MapSceneGameplayUnlock_1.MapSceneGameplayUnlock(this.ZDi)],
      ]));
  }
  async OnWorldMapBeforeStartAsync() {
    let e;
    let a;
    const o = [];
    for ([e, a] of this.eRi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && o.push(a.OnWorldMapBeforeStartAsync());
    await Promise.all(o);
  }
  OnWorldMapBeforeShow() {
    for (const [e, a] of this.eRi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && a.OnWorldMapBeforeShow();
  }
  OnWorldMapAfterShow() {
    for (const [e, a] of this.eRi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && a.OnWorldMapAfterShow();
  }
  OnWorldBeforeDestroy() {}
}
exports.MapLifeEventDispatcher = MapLifeEventDispatcher;
// # sourceMappingURL=MapLifeEventDispatcher.js.map
