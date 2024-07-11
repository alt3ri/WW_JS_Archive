"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalBirthAttachItem = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const MIN_ALPHA = 0.5;
const MAX_ALPHA = 1;
class PersonalBirthAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.kG = new UE.Vector(0)),
      (this.Mnt = 0),
      (this.EVe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.Mnt = void 0;
  }
  OnRefreshItem(t) {
    (this.Mnt = t), this.GetText(0).SetText(String(this.Mnt));
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    var t = MathUtils_1.MathUtils.Lerp(MAX_ALPHA, MIN_ALPHA, t);
    (this.kG.X = 1),
      (this.kG.Y = 1),
      (this.kG.Z = 1),
      this.RootItem.SetUIItemScale(this.kG),
      this.GetText(0).SetAlpha(t);
  }
  BindOnSelected(t) {
    this.EVe = t;
  }
  OnSelect() {
    this.EVe && this.EVe(this.Mnt);
  }
  OnUnSelect() {}
}
exports.PersonalBirthAttachItem = PersonalBirthAttachItem;
// # sourceMappingURL=PersonalBirthAttachItem.js.map
