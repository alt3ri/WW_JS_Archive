"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuScrollSettingTitleItem = void 0);
const UE = require("ue"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingTitleItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments), (this.$pt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    void 0 === this.$pt &&
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    this.$pt && (this.$pt = void 0), this.Data && (this.Data = void 0);
  }
  Update(e) {
    (this.Data = e), this.mGe();
  }
  mGe() {
    this.SetSpriteByPath(this.Data.SubImage, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(this.Data.SubName ?? "");
  }
  PlaySequenceFromName(e) {
    this.$pt?.PlayLevelSequenceByName(e);
  }
  SetInteractionActive(e) {}
}
exports.MenuScrollSettingTitleItem = MenuScrollSettingTitleItem;
//# sourceMappingURL=MenuScrollSettingTitleItem.js.map
