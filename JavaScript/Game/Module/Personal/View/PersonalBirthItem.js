"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalBirthItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
  MIN_ALPHA = 0.5,
  MAX_ALPHA = 1;
class PersonalBirthItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.Dates = void 0),
      (this.kG = new UE.Vector(0)),
      (this.wst = void 0),
      (this.q6e = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.wst = void 0;
  }
  RefreshItem() {
    (this.wst = this.Dates[this.GetShowItemIndex()]),
      this.GetText(0).SetText(String(this.wst));
  }
  SetData(t) {
    this.Dates = t;
  }
  OnMoveItem(t) {
    var i = this.GetAttachItem().ExhibitionView.ItemActor.GetHeight(),
      e = this.GetRootItem(),
      e = Math.abs(e.GetAnchorOffsetY()) / (i / 2),
      i = MathUtils_1.MathUtils.Lerp(MAX_ALPHA, MIN_ALPHA, e);
    (this.kG.X = 1),
      (this.kG.Y = 1),
      (this.kG.Z = 1),
      this.RootItem.SetUIItemScale(this.kG),
      this.GetText(0).SetAlpha(i);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  OnSelect() {
    this.q6e && this.q6e(this.wst);
  }
}
exports.PersonalBirthItem = PersonalBirthItem;
//# sourceMappingURL=PersonalBirthItem.js.map
