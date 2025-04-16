"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardCageBackpackPanelModel = void 0);
const DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardCageBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  constructor() {
    super(...arguments), (this.ConfigId = 0);
  }
  Init(e) {
    this.ConfigId = e;
  }
}
exports.DockyardCageBackpackPanelModel = DockyardCageBackpackPanelModel;
//# sourceMappingURL=DockyardCageBackpackPanelModel.js.map
