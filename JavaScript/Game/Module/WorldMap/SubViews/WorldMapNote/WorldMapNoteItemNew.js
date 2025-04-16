"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapNoteItemNew = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class WorldMapNoteItemNew extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.DNl = void 0),
      (this.eTt = () => {
        this.DNl?.ClickCallback(this.DNl?.Id);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.eTt]]);
  }
  Refresh(t) {
    this.DNl = t;
    var s = this.GetSprite(0);
    this.SetSpriteByPath(t.IconRes, s, !0);
    this.GetText(1).ShowTextNew(t.DescId);
    s = t.NoteStyle;
    this.GetItem(3).SetUIActive(0 === s),
      this.GetItem(6).SetUIActive(0 === s),
      this.GetItem(4).SetUIActive(1 === s),
      this.GetItem(5).SetUIActive(1 === s);
  }
}
exports.WorldMapNoteItemNew = WorldMapNoteItemNew;
//# sourceMappingURL=WorldMapNoteItemNew.js.map
