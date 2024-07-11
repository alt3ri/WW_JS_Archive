"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConsumeItemData = exports.ConsumeItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const ConsumeItemUtil_1 = require("./ConsumeItemUtil");
class ConsumeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0, s = void 0) {
    super(),
      (this.BelongView = s),
      (this.Data = void 0),
      (this.ButtonFunction = void 0),
      (this.j7e = () => {
        this.ButtonFunction &&
          this.ButtonFunction(this.Data?.IncId, this.Data?.ItemId);
      }),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UITexture],
      [5, UE.UISprite],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.j7e]]);
  }
  SetIconState() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(
      this.Data,
    )[0];
    var s = this.GetTexture(4);
    var s =
      (this.SetItemIcon(s, t.GetConfigId(), this.BelongView),
      this.GetSprite(5));
    var s =
      (this.SetItemQualityIcon(s, t.GetConfigId(), this.BelongView),
      this.GetText(6));
    var t = this.GetItem(7);
    var s =
      (this.Data.ResonanceLevel
        ? (t.SetUIActive(!0), s.SetText(this.Data.ResonanceLevel.toString()))
        : t.SetUIActive(!1),
      this.GetSprite(3));
    this.Data.ChipPath
      ? (s.SetUIActive(!0), this.SetSpriteByPath(this.Data.ChipPath, s, !1))
      : s.SetUIActive(!1);
  }
  Refresh(t, s, i) {
    let e = void 0;
    t && (e = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(t[0], t[1])),
      this.UpdateItem(e);
  }
  UpdateItem(t) {
    const s = this.GetItem(1);
    const i = this.GetItem(2);
    t
      ? ((this.Data = t),
        this.SetIconState(),
        s.SetUIActive(!1),
        i.SetUIActive(!0),
        this.GetText(8).SetText(this.Data.BottomText))
      : ((this.Data = t), s.SetUIActive(!0), i.SetUIActive(!1));
  }
  SetButtonFunction(t) {
    this.ButtonFunction = t;
  }
}
exports.ConsumeItem = ConsumeItem;
class ConsumeItemData {
  constructor() {
    (this.IncId = 0),
      (this.ItemId = 0),
      (this.BottomText = ""),
      (this.ResonanceLevel = 0),
      (this.ChipPath = "");
  }
}
exports.ConsumeItemData = ConsumeItemData;
// # sourceMappingURL=ConsumeItem.js.map
