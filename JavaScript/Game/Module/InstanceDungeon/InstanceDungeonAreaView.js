"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonAreaView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  SHOW_TIME = 3e3;
class InstanceDungeonAreaView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qWe = () => {
        var e;
        this.GetText(0) &&
          (e =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonName()) &&
          this.GetText(0).SetText(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.CloseMe();
      }, SHOW_TIME);
    });
  }
  OnBeforeShow() {
    this.qWe();
  }
}
exports.InstanceDungeonAreaView = InstanceDungeonAreaView;
//# sourceMappingURL=InstanceDungeonAreaView.js.map
