"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubLevelLoadingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SubLevelLoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.LIo = 0), (this.uEr = void 0), (this.DIo = !1);
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
  set LoadSubLevelPromise(e) {
    this.uEr = e;
  }
  get LoadSubLevelPromise() {
    return this.uEr;
  }
  OnLeaveLevel() {
    return !(this.DIo = !1);
  }
  OnClear() {
    return (
      (this.LIo = 0),
      (ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0),
      (this.DIo = !1),
      !(this.uEr = void 0)
    );
  }
}
exports.SubLevelLoadingModel = SubLevelLoadingModel;
//# sourceMappingURL=SubLevelLoadingModel.js.map
