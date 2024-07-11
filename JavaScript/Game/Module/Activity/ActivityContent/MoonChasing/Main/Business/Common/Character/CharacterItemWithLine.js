"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterItemWithLine = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract"),
  CharacterItem_1 = require("./CharacterItem");
class CharacterItemWithLine extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.CharacterItem = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.CharacterItem = new CharacterItem_1.CharacterItem()),
      await this.CharacterItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  Refresh(t, e, r) {
    this.CharacterItem.Refresh(t), this.GetItem(1)?.SetUIActive(0 !== r);
  }
}
exports.CharacterItemWithLine = CharacterItemWithLine;
//# sourceMappingURL=CharacterItemWithLine.js.map
