"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkMenuItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiTextAdapterProxy_1 = require("../../../../Ui/UiTextAdapterProxy"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  EnrichmentAreaItem_1 = require("../../../Map/Marks/MarkItem/EnrichmentAreaItem");
class MarkMenuItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.QWi = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.Bf1 = void 0);
  }
  async Init(e, t) {
    e.SetUIActive(!0),
      await this.CreateThenShowByActorAsync(e.GetOwner()),
      (this.QWi = t),
      this.MAi();
  }
  OnStart() {
    var e = this.GetExtendToggle(0).GetOwner().GetUIItem();
    (this.Bf1 = new UiTextAdapterProxy_1.UiTextAdapterProxy(this.GetText(2))),
      this.Bf1.Init(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        e,
      ));
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
    ];
  }
  SetOnClick(e) {
    this.GetExtendToggle(0).OnStateChange.Add(e);
  }
  MAi() {
    this.SetSpriteByPath(this.QWi.IconPath, this.GetSprite(1), !1),
      this.QWi instanceof EnrichmentAreaItem_1.EnrichmentAreaItem
        ? ((e = this.QWi.MarkConfig.MarkTitle),
          (t = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            this.QWi.GetEnrichmentItemNameId(),
          )),
          this.Bf1.SetLocalText(e, t))
        : this.Bf1.SetText(this.QWi.GetTitleText());
    var e = this.QWi.MarkItemEntity.ViewLifeCircle,
      t = e.IsChildViewVisible(7),
      t =
        (this.GetSprite(3).SetUIActive(t),
        t &&
          ((t = this.QWi.MarkItemEntity.Resource.ChildIconPath),
          this.SetSpriteByPath(t, this.GetSprite(3), !1)),
        e.IsChildViewVisible(1));
    this.GetSprite(4).SetUIActive(t),
      t &&
        ((e = this.QWi.MarkItemEntity.Resource.TopRightIconPath),
        this.SetSpriteByPath(e, this.GetSprite(4), !1));
  }
  async OnBeforeHideAsync() {
    return this.PlayDisappearSequence();
  }
  OnBeforeDestroy() {
    this.Bf1.Clear(),
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
