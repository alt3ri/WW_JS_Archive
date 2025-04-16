"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMarkBaseItem = void 0);
const ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class ActivityMarkBaseItem extends ConfigMarkItem_1.ConfigMarkItem {
  GetMarkItemViewType() {
    return 0;
  }
  CreateView() {
    return new ActivityMarkItemView(this);
  }
}
exports.ActivityMarkBaseItem = ActivityMarkBaseItem;
class ActivityMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
}
//# sourceMappingURL=ActivityMarkBaseItem.js.map
