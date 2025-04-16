"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardViewModel = void 0);
const DockyardViewModelBase_1 = require("../Base/DockyardViewModelBase"),
  DockyardTrawlBackpackPanelModel_1 = require("../Trawl/DockyardTrawlBackpackPanelModel"),
  DockyardTrawlListPanelModel_1 = require("../Trawl/DockyardTrawlListPanelModel");
class DockyardViewModel extends DockyardViewModelBase_1.DockyardViewModelBase {
  constructor() {
    super(...arguments),
      (this.BackpackPanelModel =
        new DockyardTrawlBackpackPanelModel_1.DockyardTrawlBackpackPanelModel()),
      (this.ListPanelModel =
        new DockyardTrawlListPanelModel_1.DockyardTrawlListPanelModel());
  }
}
exports.DockyardViewModel = DockyardViewModel;
//# sourceMappingURL=DockyardViewModel.js.map
