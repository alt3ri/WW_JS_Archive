"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapLifeEventDispatcher = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  MapSceneGameplayUnlock_1 = require("./MapSceneGameplayUnlock");
class MapLifeEventDispatcher {
  constructor(e) {
    (this.ZRi = void 0),
      (this.eUi = void 0),
      (this.ZRi = e),
      (this.eUi = new Map([
        [0, new MapSceneGameplayUnlock_1.MapSceneGameplayUnlock(this.ZRi)],
      ]));
  }
  async OnWorldMapBeforeStartAsync() {
    var e,
      a,
      o = [];
    for ([e, a] of this.eUi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && o.push(a.OnWorldMapBeforeStartAsync());
    await Promise.all(o);
  }
  OnWorldMapBeforeShow() {
    for (var [e, a] of this.eUi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && a.OnWorldMapBeforeShow();
  }
  OnWorldMapAfterShow() {
    for (var [e, a] of this.eUi)
      ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
        ?.State && a.OnWorldMapAfterShow();
  }
  OnWorldBeforeDestroy() {}
}
exports.MapLifeEventDispatcher = MapLifeEventDispatcher;
//# sourceMappingURL=MapLifeEventDispatcher.js.map
