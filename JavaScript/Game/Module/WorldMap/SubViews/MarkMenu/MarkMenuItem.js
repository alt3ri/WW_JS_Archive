"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkMenuItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class MarkMenuItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.QWi = void 0),
      (this.LevelSequencePlayer = void 0);
  }
  async Init(e, s) {
    e.SetUIActive(!0),
      await this.CreateThenShowByActorAsync(e.GetOwner()),
      (this.QWi = s),
      this.MAi();
  }
  OnStart() {
    var e = this.GetExtendToggle(0).GetOwner().GetUIItem();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(e);
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
    ];
  }
  SetOnClick(e) {
    this.GetExtendToggle(0).OnStateChange.Add(e);
  }
  MAi() {
    this.SetSpriteByPath(this.QWi.IconPath, this.GetSprite(1), !1),
      this.GetText(2).SetText(this.QWi.GetTitleText());
  }
  async OnBeforeHideAsync() {
    return this.PlayDisappearSequence();
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).OnStateChange.Clear(),
      this.LevelSequencePlayer && this.LevelSequencePlayer.Clear(),
      (this.LevelSequencePlayer = void 0);
  }
  async PlayReleaseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Select",
      new CustomPromise_1.CustomPromise(),
      !0,
    );
  }
  PlayAppearSequence() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  async PlayDisappearSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    );
  }
}
exports.MarkMenuItem = MarkMenuItem;
//# sourceMappingURL=MarkMenuItem.js.map
