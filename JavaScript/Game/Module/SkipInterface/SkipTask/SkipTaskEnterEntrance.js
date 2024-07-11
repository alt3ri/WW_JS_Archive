"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskEnterEntrance = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SkipTaskEnterEntrance extends SkipTask_1.SkipTask {
  OnRun(e, o, a) {
    e = Number(e);
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
      e,
    ).then(
      (e) => {
        e || this.Finish(),
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .EntranceInstanceIdList.length <= 0 &&
            (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "InstanceTime",
            ),
            this.Finish());
        let r;
        var e = Number(o);
        const n = Number(a);
        UiManager_1.UiManager.IsViewShow("WorldMapView") &&
        (r = ModelManager_1.ModelManager.WorldMapModel).CurrentFocalMarkType ===
          e &&
        r.CurrentFocalMarkId === n
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "IsInView",
            )
          : WorldMapController_1.WorldMapController.FocalMarkItem(e, n),
          this.Finish();
      },
      () => {},
    );
  }
}
exports.SkipTaskEnterEntrance = SkipTaskEnterEntrance;
// # sourceMappingURL=SkipTaskEnterEntrance.js.map
