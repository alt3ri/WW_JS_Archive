"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSkillGridPanel = void 0);
const UE = require("ue"),
  RogueResSortById_1 = require("../../../../Core/Define/ConfigQuery/RogueResSortById"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RogueResSkillNode_1 = require("./RogueResSkillNode");
class RogueResSkillGridPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.NodeMap = []),
      (this.NodeDataList = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  GetNodeByPos(e) {
    return this.NodeMap[e];
  }
  OnStart() {}
  BuildNode() {
    for (const i of this.NodeDataList) {
      var e = RogueResSortById_1.configRogueResSortById.GetConfig(i.Id),
        s = this.GetItem(0 + e.Row);
      const t = new RogueResSkillNode_1.RogueResSkillNode(s, i, this.RootItem);
      (this.NodeMap[e.Row] = t)
        .CreateThenShowByResourceIdAsync("RoguelikeSkillNodeB", s)
        .then(() => {
          t.Refresh();
        });
    }
  }
  Refresh(e, s, i) {
    (this.NodeDataList = e), this.BuildNode();
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, s) {}
}
exports.RogueResSkillGridPanel = RogueResSkillGridPanel;
//# sourceMappingURL=RogueResSkillGridPanel.js.map
