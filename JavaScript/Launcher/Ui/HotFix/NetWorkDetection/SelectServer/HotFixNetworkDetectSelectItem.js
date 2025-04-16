"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectSelectItem = void 0);
const LaunchComponentsAction_1 = require("../../../LaunchComponentsAction"),
  HotFixNetworkDetectionModel_1 = require("../HotFixNetworkDetectionModel");
class HotFixNetworkDetectSelectItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.OnToggleStateChange = void 0),
      (this.grc = (t) => {
        this.Data &&
          (HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentUiSelectSeverData =
            this.Data.LoginServersData),
          this.OnToggleStateChange?.();
      });
  }
  SetRootActor(t) {
    this.SetRootActorLaunchComponentsAction(t);
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetExtendToggle(0).OnStateChange.Add(this.grc);
  }
  GetToggle() {
    return this.GetExtendToggle(0);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).OnStateChange.Clear();
  }
  RefreshToggleState() {
    var t =
      HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
        .CurrentUiSelectSeverData === this.Data.LoginServersData;
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, !1);
  }
  OnShow() {
    this.Crc(), this.RefreshToggleState();
  }
  Refresh(t) {
    this.Data = t;
  }
  Crc() {
    this.GetText(1).SetText(this.Data.LoginServersData.name);
  }
}
exports.HotFixNetworkDetectSelectItem = HotFixNetworkDetectSelectItem;
//# sourceMappingURL=HotFixNetworkDetectSelectItem.js.map
