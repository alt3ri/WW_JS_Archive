"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenElementWithCount = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTokenElementWithCount extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.ElementItem = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    return (
      (this.ElementItem =
        new RogueBattleTokenElement_1.RogueBattleTokenElement()),
      this.ElementItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
    );
  }
  Refresh(e, t, r) {
    this.ElementItem?.Refresh(e.ElementId, t, r),
      this.GetText(1).SetText(e.Count.toString()),
      this.GetText(1).SetChangeColor(e.IsPreview);
  }
}
exports.RogueBattleTokenElementWithCount = RogueBattleTokenElementWithCount;
//# sourceMappingURL=RogueBattleTokenElementWithCount.js.map
