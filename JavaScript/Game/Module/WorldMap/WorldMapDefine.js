"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkPriority2HierarchyIndexHelper =
    exports.HUANG_LONG_COUNTRY_ID =
    exports.secondaryUiPanelComponentsRegisterInfoB =
    exports.secondaryUiPanelComponentsRegisterInfoA =
    exports.ESecondaryPanel =
      void 0);
const UE = require("ue");
var ESecondaryPanel;
!(function (e) {
  (e[(e.CustomMarkPanel = 0)] = "CustomMarkPanel"),
    (e[(e.TeleportPanel = 1)] = "TeleportPanel"),
    (e[(e.GeneralPanel = 2)] = "GeneralPanel"),
    (e[(e.MarkMenuPanel = 3)] = "MarkMenuPanel"),
    (e[(e.QuestPanel = 4)] = "QuestPanel"),
    (e[(e.InstanceDungeonEntrancePanel = 5)] = "InstanceDungeonEntrancePanel"),
    (e[(e.SceneGameplayPanel = 6)] = "SceneGameplayPanel"),
    (e[(e.TowerEntrancePanel = 7)] = "TowerEntrancePanel"),
    (e[(e.ParkourPanel = 8)] = "ParkourPanel"),
    (e[(e.TemporaryTeleportPanel = 9)] = "TemporaryTeleportPanel"),
    (e[(e.DetectorPanel = 10)] = "DetectorPanel"),
    (e[(e.BoxPanel = 11)] = "BoxPanel"),
    (e[(e.LordGymPanel = 12)] = "LordGymPanel"),
    (e[(e.RoguelikePanel = 13)] = "RoguelikePanel");
})(
  (ESecondaryPanel = exports.ESecondaryPanel || (exports.ESecondaryPanel = {})),
),
  (exports.secondaryUiPanelComponentsRegisterInfoA = [
    [0, UE.UISprite],
    [1, UE.UIText],
    [2, UE.UIItem],
    [3, UE.UIText],
    [4, UE.UIText],
    [5, UE.UIVerticalLayout],
    [6, UE.UIItem],
    [7, UE.UIVerticalLayout],
    [8, UE.UIItem],
    [9, UE.UIItem],
    [10, UE.UIText],
    [11, UE.UIButtonComponent],
    [12, UE.UIItem],
    [13, UE.UIText],
    [14, UE.UIItem],
    [15, UE.UIButtonComponent],
    [16, UE.UIVerticalLayout],
    [17, UE.UIItem],
    [18, UE.UIButtonComponent],
    [19, UE.UIItem],
    [20, UE.UIText],
    [21, UE.UIItem],
    [22, UE.UIItem],
    [23, UE.UISprite],
    [24, UE.UISprite],
  ]),
  (exports.secondaryUiPanelComponentsRegisterInfoB = [
    [0, UE.UISprite],
    [1, UE.UIText],
    [2, UE.UIText],
    [3, UE.UIText],
    [4, UE.UIItem],
    [5, UE.UIItem],
    [6, UE.UIItem],
    [7, UE.UIItem],
    [8, UE.UIItem],
  ]),
  (exports.HUANG_LONG_COUNTRY_ID = 1);
class PriorityHierarchyIndexNode {
  constructor(e) {
    (this.Priority = 0), (this.MaxHierarchyIndex = 1), (this.Priority = e);
  }
}
class MarkPriority2HierarchyIndexHelper {
  constructor() {
    this.d3o = [];
  }
  C3o(e, r = 0) {
    let t = 0;
    return (t = 11 === e ? 3e3 : r);
  }
  AddMarkItem(e, r) {
    var t = this.C3o(e, r),
      a = this.d3o.length;
    let o = 0;
    if (0 === a) this.d3o.push(new PriorityHierarchyIndexNode(t));
    else {
      let r = -1;
      for (let e = 0; e < a; ++e) {
        var n = this.d3o[e],
          i = n.Priority;
        if (!(i < t)) {
          if (i === t) {
            (o += n.MaxHierarchyIndex), ++n.MaxHierarchyIndex;
            break;
          }
          r = e;
          break;
        }
        if (((o += n.MaxHierarchyIndex), e === a - 1)) {
          r = a;
          break;
        }
      }
      0 <= r && this.d3o.splice(r, 0, new PriorityHierarchyIndexNode(t));
    }
    return o;
  }
  RemoveMarkItem(e, r) {
    const t = this.C3o(e, r);
    this.d3o
      .filter((e) => e.Priority === t)
      .every((e) => (0 < e.MaxHierarchyIndex && --e.MaxHierarchyIndex, !0));
  }
  ClearData() {
    this.d3o.length = 0;
  }
}
exports.MarkPriority2HierarchyIndexHelper = MarkPriority2HierarchyIndexHelper;
//# sourceMappingURL=WorldMapDefine.js.map
