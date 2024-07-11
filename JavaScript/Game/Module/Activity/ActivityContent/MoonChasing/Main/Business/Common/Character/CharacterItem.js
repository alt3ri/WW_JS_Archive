"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract"),
  CharacterNameItem_1 = require("./CharacterNameItem"),
  CharacterValueItem_1 = require("./CharacterValueItem");
class CharacterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.NameItem = void 0),
      (this.ValueItem = void 0),
      (this.Id = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.NameItem = new CharacterNameItem_1.CharacterNameItem()),
      (this.ValueItem = new CharacterValueItem_1.CharacterValueItem()),
      await Promise.all([
        this.NameItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        this.ValueItem.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      ]);
  }
  Refresh(e) {
    (this.Id = e.Id), this.NameItem.Refresh(e), this.ValueItem.Refresh(e);
  }
  RefreshName(e) {
    this.NameItem.Refresh(e);
  }
  RefreshProgress(e, t) {
    this.ValueItem.RefreshProgress(e, t);
  }
  RefreshCurrentValue(e) {
    this.ValueItem.RefreshCurrentValue(e);
  }
  RefreshProgressAdd(e, t) {
    this.ValueItem.RefreshProgressAdd(e, t);
  }
  SetLightProgressWidth() {
    this.ValueItem.SetLightProgressWidth();
  }
  SetGoodItemActive(e) {
    this.NameItem?.SetGoodItemActive(e);
  }
  GetId() {
    return this.Id;
  }
}
exports.CharacterItem = CharacterItem;
//# sourceMappingURL=CharacterItem.js.map
