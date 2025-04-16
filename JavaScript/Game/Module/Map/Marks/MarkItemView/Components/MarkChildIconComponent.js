"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkChildIconComponent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  MarkPanelBase_1 = require("../MarkPanelBase");
class MarkChildIconComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.n8 = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(!1), this.ehi();
  }
  ehi() {
    StringUtils_1.StringUtils.IsEmpty(this.n8)
      ? this.GetSprite(0).SetUIActive(!1)
      : this.SetSpriteByPath(this.n8, this.GetSprite(0), !1, void 0, () => {
          this.GetSprite(0).SetUIActive(!0);
        });
  }
  set Icon(t) {
    (this.n8 = t), this.GetSprite(0) && this.ehi();
  }
  get Icon() {
    return this.n8;
  }
}
exports.MarkChildIconComponent = MarkChildIconComponent;
//# sourceMappingURL=MarkChildIconComponent.js.map
