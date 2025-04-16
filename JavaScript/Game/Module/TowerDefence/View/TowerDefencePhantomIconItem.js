"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomIconItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  SmallItemGridLockBlackComponent_1 = require("../../Common/SmallItemGrid/SmallItemGridComponent/SmallItemGridLockBlackComponent"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine");
class TowerDefensePhantomIconItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments),
      (this.UZs = TowerDefenceDefine_1.DEFAULT_ID),
      (this.yXa = void 0),
      (this.EXa = void 0),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.eTt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom,
          this.UZs,
        );
      });
  }
  Clear() {
    this.yXa?.Destroy(),
      (this.yXa = void 0),
      this.EXa?.Destroy(),
      (this.EXa = void 0);
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[7, this.eTt]]);
  }
  async OnBeforeStartAsync() {
    (this.yXa = new TowerDefensePhantomIconCornerMark()),
      (this.EXa = new TowerDefensePhantomUnavailableMask()),
      await Promise.all([
        this.yXa.CreateThenShowByResourceIdAsync(
          "UiItem_ItemBVisionPoint",
          this.GetItem(5),
        ),
        this.EXa.CreateThenShowByResourceIdAsync(
          "UiItem_ItemBDark",
          this.GetItem(5),
        ),
      ]);
  }
  Refresh(e, t, i) {
    this.IXa(e, t, i);
  }
  async IXa(e, t, i) {
    var n = e.Data;
    (this.UZs = n.ConfigId),
      this.ApplyPhantomSmallItemGrid(e),
      this.SetSelected(n.IsChosen),
      this.yXa?.RefreshColor(n.HexColorPath),
      this.EXa?.SetUiActive(n.IsOccupied),
      await this.TXa(n.IsLocked);
  }
  async TXa(e) {
    var t = this.GetItemGridComponent(
      SmallItemGridLockBlackComponent_1.SmallItemGridLockBlackComponent,
    );
    t &&
      ((t = (await t.GetAsync()).GetRootItem()),
      (t = new UiSequencePlayer_1.UiSequencePlayer(t)),
      e || (await t.LitePlayAsync("Unlock")));
  }
}
exports.TowerDefensePhantomIconItem = TowerDefensePhantomIconItem;
const MARK_COMPONENT_INDEX = 0;
class TowerDefensePhantomIconCornerMark extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[MARK_COMPONENT_INDEX, UE.UISprite]];
  }
  RefreshColor(e) {
    this.SetSpriteByPath(e, this.GetSprite(MARK_COMPONENT_INDEX), !1);
  }
}
class TowerDefensePhantomUnavailableMask extends UiPanelBase_1.UiPanelBase {}
//# sourceMappingURL=TowerDefencePhantomIconItem.js.map
