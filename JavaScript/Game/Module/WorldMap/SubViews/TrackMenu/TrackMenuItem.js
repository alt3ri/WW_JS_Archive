"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackMenuItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class TrackMenuItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FNl = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.OnClick = (e) => {
        1 === e &&
          this.PlayReleaseSequence().then(
            () => {
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.TrackMenuClickItem,
                this.FNl,
              );
            },
            () => {},
          );
      });
  }
  async Init(e, t) {
    e.SetUIActive(!0),
      await this.CreateThenShowByActorAsync(e.GetOwner()),
      (this.FNl = t),
      this.MAi();
  }
  OnStart() {
    var e = this.GetExtendToggle(0).GetOwner().GetUIItem();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(e);
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  OnAfterShow() {
    this.GetExtendToggle(0)?.OnStateChange.Add(this.OnClick);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
    ];
  }
  MAi() {
    this.SetSpriteByPath(this.FNl.Icon, this.GetSprite(1), !1),
      this.FNl.MarkItem
        ? this.FNl.MarkItem.SetTitleText(this.GetText(2))
        : this.FNl.Title && this.GetText(2)?.SetText(this.FNl.Title);
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
exports.TrackMenuItem = TrackMenuItem;
//# sourceMappingURL=TrackMenuItem.js.map
