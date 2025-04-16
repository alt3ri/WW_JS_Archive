"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateInteractModel = void 0);
const GlobalConfigFromCsvByName_1 = require("../../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulateInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Bal = -1),
      (this.bal = -1),
      (this.$0l = -1),
      (this.InRangePoints = new Set()),
      (this.sHr = (e, t) => {
        e ? this.InRangePoints.add(t) : this.InRangePoints.delete(t);
      });
  }
  get StatueInteractCheckAngle() {
    return this.Bal;
  }
  get StatueInteractMoveSpeed() {
    return this.bal;
  }
  get StatueInteractMaxMoveTime() {
    return this.$0l;
  }
  OnInit() {
    return (
      this.qal(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
        this.sHr,
      ),
      !0
    );
  }
  qal() {
    var e =
      GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "StatueInteract.CheckAngle",
      );
    e && (this.Bal = parseFloat(e.Value)),
      (e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "StatueInteract.MoveSpeed",
        )) && (this.bal = parseInt(e.Value)),
      (e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "StatueInteract.MaxMoveTime",
        )) && (this.$0l = parseFloat(e.Value));
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
        this.sHr,
      ),
      !0
    );
  }
}
exports.ManipulateInteractModel = ManipulateInteractModel;
//# sourceMappingURL=CharacterManipulateInteractModel.js.map
