"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterItemWithAdd = void 0);
const UE = require("ue"),
  LevelSequencePlayer_1 = require("../../../../../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract"),
  CharacterItem_1 = require("./CharacterItem");
class CharacterItemWithAdd extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.CharacterItem = void 0),
      (this.Data = void 0),
      (this.SequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      (this.CharacterItem = new CharacterItem_1.CharacterItem()),
      await this.CharacterItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      this.GetText(1)?.SetText("");
  }
  RefreshAddText() {
    0 < this.Data.ValueInterval
      ? this.GetText(1)?.SetText("+" + this.Data.ValueInterval)
      : this.GetText(1)?.SetText("");
  }
  Refresh(t, e, s) {
    (this.Data = t),
      this.CharacterItem.Refresh(t),
      this.GetItem(2)?.SetUIActive(0 !== s);
  }
  RefreshProgress(t) {
    t =
      this.Data.CurrentValue -
      this.Data.ValueInterval +
      Math.floor(this.Data.ValueInterval * t);
    this.CharacterItem.RefreshProgress(t, this.Data.MaxValue);
  }
  RefreshCurrentValue(t) {
    t =
      this.Data.CurrentValue -
      this.Data.ValueInterval +
      Math.floor(this.Data.ValueInterval * t);
    this.CharacterItem.RefreshCurrentValue(t);
  }
  RefreshProgressAdd(t) {
    t =
      this.Data.CurrentValue -
      this.Data.ValueInterval +
      Math.floor(this.Data.ValueInterval * t);
    this.CharacterItem.RefreshProgressAdd(t, this.Data.MaxValue);
  }
  PlayStartAction() {
    this.CharacterItem.SetLightProgressWidth(),
      this.SequencePlayer.PlayLevelSequenceByName("Action01");
  }
  PlayAddAction() {
    this.SequencePlayer.PlayLevelSequenceByName("Action02");
  }
  SetLightProgressWidth() {
    this.CharacterItem.SetLightProgressWidth();
  }
  PlayEndAction() {
    this.SequencePlayer.PlayLevelSequenceByName("Action03");
  }
}
exports.CharacterItemWithAdd = CharacterItemWithAdd;
//# sourceMappingURL=CharacterItemWithAdd.js.map
