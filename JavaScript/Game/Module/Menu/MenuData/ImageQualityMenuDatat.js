"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImageQualityMenuData = void 0);
const MenuController_1 = require("../MenuController"),
  MenuData_1 = require("../MenuData");
class ImageQualityMenuData extends MenuData_1.MenuData {
  constructor() {
    super(...arguments),
      (this.C4a = []),
      (this.g4a = []),
      (this.f4a = []),
      (this.p4a = []);
  }
  OnInitialize(t) {
    (this.f4a = t.OptionsName),
      (this.p4a = t.OptionsValue),
      this.OptionsNameListInternal.pop(),
      this.OptionsValueListInternal.pop(),
      (this.C4a = this.OptionsNameListInternal),
      (this.g4a = this.OptionsValueListInternal);
  }
  get OptionsNameList() {
    return 4 === MenuController_1.MenuController.GetTargetConfig(10)
      ? this.f4a
      : this.C4a;
  }
  get OptionsValueList() {
    return 4 === MenuController_1.MenuController.GetTargetConfig(10)
      ? this.p4a
      : this.g4a;
  }
}
exports.ImageQualityMenuData = ImageQualityMenuData;
//# sourceMappingURL=ImageQualityMenuDatat.js.map
