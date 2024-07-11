"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookChipDynamicData =
    exports.noSelectColor =
    exports.selectColor =
    exports.HandBookQuestViewOpenParam =
    exports.HandBookPlotDynamicData =
    exports.HandBookQuestDynamicData =
    exports.HandBookQuestNode =
    exports.HandBookPhotoData =
    exports.HandBookCommonItemData =
    exports.HandBookDropItemData =
    exports.HandBookContentItemData =
    exports.HandBookEntry =
      void 0);
const UE = require("ue");
class HandBookEntry {
  constructor(t, o, s, i) {
    (this.Id = t), (this.CreateTime = o), (this.Num = s), (this.IsRead = i);
  }
}
exports.HandBookEntry = HandBookEntry;
class HandBookContentItemData {
  constructor(t, o) {
    (this.Title = t), (this.Desc = o);
  }
}
exports.HandBookContentItemData = HandBookContentItemData;
class HandBookDropItemData {
  constructor(t, o, s) {
    (this.Title = t), (this.Place = o), (this.ItemData = s);
  }
}
exports.HandBookDropItemData = HandBookDropItemData;
class HandBookCommonItemData {
  constructor() {
    (this.Icon = ""),
      (this.QualityId = 0),
      (this.Title = ""),
      (this.IsLock = !1),
      (this.IsNew = !1),
      (this.ConfigId = 0);
  }
}
exports.HandBookCommonItemData = HandBookCommonItemData;
class HandBookPhotoData {
  constructor() {
    (this.TextureList = void 0),
      (this.TypeText = void 0),
      (this.NameText = void 0),
      (this.DescrtptionText = void 0),
      (this.DateText = void 0),
      (this.Index = 0),
      (this.HandBookType = 0),
      (this.ConfigId = void 0);
  }
}
exports.HandBookPhotoData = HandBookPhotoData;
class HandBookQuestNode {
  constructor(t = "", o = void 0, s = 0, i = 0) {
    (this.TidText = t),
      (this.FlowListName = o),
      (this.FlowId = s),
      (this.StateId = i);
  }
}
exports.HandBookQuestNode = HandBookQuestNode;
class HandBookQuestDynamicData {
  constructor() {
    this.TidText = "";
  }
}
exports.HandBookQuestDynamicData = HandBookQuestDynamicData;
class HandBookPlotDynamicData {
  constructor() {
    (this.PlotAudio = void 0),
      (this.TalkOwnerName = void 0),
      (this.TalkText = void 0),
      (this.TalkOption = void 0),
      (this.TalkItemId = -1),
      (this.PlotId = -1),
      (this.IsChoseOption = !1),
      (this.OptionIndex = 0),
      (this.OptionTalker = !1),
      (this.MoveId = 0),
      (this.NodeText = void 0),
      (this.BelongToNode = "");
  }
}
exports.HandBookPlotDynamicData = HandBookPlotDynamicData;
class HandBookQuestViewOpenParam {
  constructor() {
    (this.ConfigIdList = void 0), (this.Index = 0);
  }
}
(exports.HandBookQuestViewOpenParam = HandBookQuestViewOpenParam),
  (exports.selectColor = UE.Color.FromHex("ECE5D8FF")),
  (exports.noSelectColor = UE.Color.FromHex("ADADADFF"));
class HandBookChipDynamicData {
  constructor() {
    (this.HandBookChipConfigId = 0),
      (this.HandBookCommonItemData = void 0),
      (this.IsShowContent = !1);
  }
}
exports.HandBookChipDynamicData = HandBookChipDynamicData;
//# sourceMappingURL=HandBookDefine.js.map
