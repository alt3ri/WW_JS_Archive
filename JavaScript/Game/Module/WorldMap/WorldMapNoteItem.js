"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapNoteItem = void 0);
const UE = require("ue"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class WorldMapNoteItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.MCt = 0),
      (this.NTt = void 0),
      (this.eTt = () => {
        this.NTt(this.MCt);
      }),
      e.SetUIActive(!0),
      this.CreateThenShowByActor(e.GetOwner());
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
  OnStart() {}
  OnBeforeDestroy() {}
  UpdateNoteItem(e, t, s) {
    var i = this.GetSprite(0),
      e = MapNoteById_1.configMapNoteById.GetConfig(e),
      i = (this.SetSpriteByPath(e.Icon, i, !0), this.GetText(1)),
      o = e.Desc,
      i = (i.ShowTextNew(o), e.Style);
    this.GetItem(3).SetUIActive(0 === i),
      this.GetItem(6).SetUIActive(0 === i),
      this.GetItem(4).SetUIActive(1 === i),
      this.GetItem(5).SetUIActive(1 === i),
      (this.MCt = s),
      (this.NTt = t);
  }
}
exports.WorldMapNoteItem = WorldMapNoteItem;
//# sourceMappingURL=WorldMapNoteItem.js.map
