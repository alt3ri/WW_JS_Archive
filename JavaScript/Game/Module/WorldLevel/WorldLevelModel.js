"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class WorldLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.h2o = 0),
      (this.l2o = 0),
      (this.LastChangeWorldLevelTimeStamp = 0),
      (this._2o = 0),
      (this.WorldLevelChangeTarget = 0);
  }
  get WorldLevelMultilingualText() {
    return (
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevel") ?? ""
    );
  }
  get CurWorldLevel() {
    return this.l2o;
  }
  set CurWorldLevel(e) {
    this.l2o !== e &&
      ((this.l2o = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CurWorldLevelChange,
      ));
  }
  get OriginWorldLevel() {
    return this.h2o;
  }
  set OriginWorldLevel(e) {
    var t = e > this.h2o;
    (this.h2o = e),
      t &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OriginWorldLevelUp,
        );
  }
  get Sex() {
    return this._2o;
  }
  set Sex(e) {
    this._2o = e;
  }
  OnInit() {
    return !(this.LastChangeWorldLevelTimeStamp = 0);
  }
  OnClear() {
    return !0;
  }
}
exports.WorldLevelModel = WorldLevelModel;
//# sourceMappingURL=WorldLevelModel.js.map
