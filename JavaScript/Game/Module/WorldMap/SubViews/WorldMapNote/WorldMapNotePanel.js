"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapNotePanel = void 0);
const UE = require("ue"),
  MapNoteById_1 = require("../../../../../Core/Define/ConfigQuery/MapNoteById"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapNoteItemNew_1 = require("./WorldMapNoteItemNew");
class WorldMapNotePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments), (this.zJa = void 0), (this.jNl = void 0);
  }
  GetResourceId() {
    return "UiView_MapPopupTrack";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.Close),
      (this.jNl = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        () => new WorldMapNoteItemNew_1.WorldMapNoteItemNew(),
      ));
  }
  OnShowWorldMapSecondaryUi(e) {
    e = e.map((e) => {
      var o = MapNoteById_1.configMapNoteById.GetConfig(e.MapNoteId),
        t = o.Icon,
        r = o.Desc,
        o = o.Style;
      return {
        Id: e.MapMarkId,
        IconRes: t,
        DescId: r,
        NoteStyle: o,
        ClickCallback: e.ClickCallBack,
      };
    });
    this.jNl.RefreshByData(e, void 0, !0);
  }
  OnCloseWorldMapSecondaryUi() {}
  OnBeforeDestroy() {
    (this.zJa = void 0), (this.jNl = void 0);
  }
  GetNeedBgItem() {
    return !1;
  }
}
exports.WorldMapNotePanel = WorldMapNotePanel;
//# sourceMappingURL=WorldMapNotePanel.js.map
