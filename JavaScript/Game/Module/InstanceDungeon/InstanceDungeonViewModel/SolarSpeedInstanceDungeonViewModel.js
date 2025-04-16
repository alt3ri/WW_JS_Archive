"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SolarSpeedInstanceDungeonViewModel = void 0);
const InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class SolarSpeedInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  OnCheckNeedOnTimer(e) {
    return this.View.RefreshSolarSpeedInstance(0, !0), !0;
  }
  OnTimerRefreshFunction(e) {
    this.View.RefreshSolarSpeedInstance(e);
  }
}
exports.SolarSpeedInstanceDungeonViewModel = SolarSpeedInstanceDungeonViewModel;
//# sourceMappingURL=SolarSpeedInstanceDungeonViewModel.js.map
