"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicTabConfig = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  UiDynamicTabByChildViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByChildViewName"),
  UiDynamicTabById_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabById"),
  UiDynamicTabByParentViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByParentViewName"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DynamicTabConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.VFt = (e, i) => e.TabIndex - i.TabIndex);
  }
  GetViewTabList(e) {
    e = ConfigCommon_1.ConfigCommon.ToList(
      UiDynamicTabByParentViewName_1.configUiDynamicTabByParentViewName.GetConfigList(
        e,
      ),
    );
    return e.sort(this.VFt), e;
  }
  GetTabViewNameList(e) {
    var i = [];
    for (const a of this.GetViewTabList(e)) i.push(a.ChildViewName);
    return i;
  }
  GetViewTab(e) {
    return UiDynamicTabByChildViewName_1.configUiDynamicTabByChildViewName.GetConfig(
      e,
    );
  }
  GetTabViewConfById(e) {
    return UiDynamicTabById_1.configUiDynamicTabById.GetConfig(e);
  }
}
exports.DynamicTabConfig = DynamicTabConfig;
//# sourceMappingURL=DynamicTabConfig.js.map
