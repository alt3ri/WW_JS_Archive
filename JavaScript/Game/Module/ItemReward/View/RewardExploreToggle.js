"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreToggle = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Afi = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIExtendToggle],
      [0, UE.UIText],
    ];
  }
  OnStart() {
    this.Afi = this.GetExtendToggle(1);
  }
  OnBeforeDestroy() {
    this.Afi = void 0;
  }
  Refresh(e) {
    this.Afi.OnStateChange.Add(e.OnToggleClick),
      StringUtils_1.StringUtils.IsEmpty(e.DescriptionTextId) ||
        this.Ubt(e.DescriptionTextId);
  }
  Ubt(e) {
    var t;
    StringUtils_1.StringUtils.IsEmpty(e) ||
      ((t = this.GetText(0)), LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
}
exports.RewardExploreToggle = RewardExploreToggle;
//# sourceMappingURL=RewardExploreToggle.js.map
