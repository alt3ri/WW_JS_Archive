"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterItemWithoutProgress = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract"),
  CharacterNameItem_1 = require("./CharacterNameItem");
class CharacterItemWithoutProgress extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.NameItem = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.NameItem = new CharacterNameItem_1.CharacterNameItem()),
      await this.NameItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  Refresh(t) {
    this.NameItem.Refresh(t),
      this.GetText(1).SetText(t.CurrentValue.toString());
  }
}
exports.CharacterItemWithoutProgress = CharacterItemWithoutProgress;
//# sourceMappingURL=CharacterItemWithoutProgress.js.map
