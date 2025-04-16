"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueGetListItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ListSliderControl_1 = require("../../../ItemHint/Views/ListSliderControl");
class RogueGetListItem extends ListSliderControl_1.SliderItem {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.Data = void 0),
      (this.K3t = (e) => {
        "Start" === e
          ? this.FinishPlayStart()
          : "Close" === e && this.FinishPlayEnd();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer &&
      (this.LevelSequencePlayer.Clear(), (this.LevelSequencePlayer = void 0));
  }
  PlayStart() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  PlayEnd() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
  }
  OnActiveStatusChange(e) {}
  async AsyncLoadUiResource() {
    (this.Data = ModelManager_1.ModelManager.MapRogueModel.ShiftGetItemData()),
      this.Data && (await this.Refresh(this.Data));
  }
  async Refresh(e) {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      e.ItemId,
    );
    t &&
      (this.SetTextureShowUntilLoaded(t.IconSmall, this.GetTexture(0)),
      (t = 0 < e.ChangeCount ? "+" + e.ChangeCount : e.ChangeCount.toString()),
      this.GetText(1).SetText(t));
  }
}
exports.RogueGetListItem = RogueGetListItem;
//# sourceMappingURL=RogueGetListItem.js.map
