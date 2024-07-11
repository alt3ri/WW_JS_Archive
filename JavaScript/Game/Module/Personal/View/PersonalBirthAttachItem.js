"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalBirthAttachItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
  MIN_ALPHA = 0.5,
  MAX_ALPHA = 1;
class PersonalBirthAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.kG = new UE.Vector(0)),
      (this.wst = 0),
      (this.q6e = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.wst = void 0;
  }
  OnRefreshItem(t) {
    (this.wst = t), this.GetText(0).SetText(String(this.wst));
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage(),
      t = MathUtils_1.MathUtils.Lerp(MAX_ALPHA, MIN_ALPHA, t);
    (this.kG.X = 1),
      (this.kG.Y = 1),
      (this.kG.Z = 1),
      this.RootItem.SetUIItemScale(this.kG),
      this.GetText(0).SetAlpha(t);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  OnSelect() {
    this.q6e && this.q6e(this.wst);
  }
  OnUnSelect() {}
}
exports.PersonalBirthAttachItem = PersonalBirthAttachItem;
//# sourceMappingURL=PersonalBirthAttachItem.js.map
