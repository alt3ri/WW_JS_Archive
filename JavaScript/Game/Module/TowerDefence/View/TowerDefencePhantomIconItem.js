"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomIconItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  SmallItemGridLockBlackComponent_1 = require("../../Common/SmallItemGrid/SmallItemGridComponent/SmallItemGridLockBlackComponent"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine");
class TowerDefensePhantomIconItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments),
      (this.wJs = TowerDefenceDefine_1.DEFAULT_ID),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.eTt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom,
          this.wJs,
        );
      });
  }
  Clear() {}
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
  Refresh(e, t, n) {
    const o = e.Data;
    (this.wJs = o.ConfigId),
      this.ApplyPhantomSmallItemGrid(e),
      this.SetSelected(o.IsChosen);
    e = this.GetItemGridComponent(
      SmallItemGridLockBlackComponent_1.SmallItemGridLockBlackComponent,
    );
    e &&
      e.GetAsync().then((e) => {
        (e = e.GetRootItem()),
          (e = new LevelSequencePlayer_1.LevelSequencePlayer(e));
        o.IsLocked || e.PlayLevelSequenceByName("Unlock");
      });
  }
}
exports.TowerDefensePhantomIconItem = TowerDefensePhantomIconItem;
//# sourceMappingURL=TowerDefencePhantomIconItem.js.map
