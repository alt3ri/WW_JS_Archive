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
    ]),
      (this.BtnBindInfo = [[2, this.eTt]]);
  }
  OnStart() {}
  OnBeforeDestroy() {}
  UpdateNoteItem(e, t, s) {
    var i = this.GetSprite(0),
      e = MapNoteById_1.configMapNoteById.GetConfig(e),
      i = (this.SetSpriteByPath(e.Icon, i, !0), this.GetText(1)),
      e = e.Desc;
    i.ShowTextNew(e), (this.MCt = s), (this.NTt = t);
  }
}
exports.WorldMapNoteItem = WorldMapNoteItem;
//# sourceMappingURL=WorldMapNoteItem.js.map
