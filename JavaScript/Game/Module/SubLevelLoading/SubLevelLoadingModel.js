"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubLevelLoadingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SubLevelLoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.LIo = 0), (this.DIo = !1);
  }
  get ScreenEffect() {
    return this.LIo;
  }
  set ScreenEffect(e) {
    this.LIo = e;
  }
  get LoadSubLeveling() {
    return this.DIo;
  }
  set LoadSubLeveling(e) {
    this.DIo = e;
  }
  OnClear() {
    return (
      (this.LIo = 0),
      (ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0),
      !(this.DIo = !1)
    );
  }
}
exports.SubLevelLoadingModel = SubLevelLoadingModel;
//# sourceMappingURL=SubLevelLoadingModel.js.map
