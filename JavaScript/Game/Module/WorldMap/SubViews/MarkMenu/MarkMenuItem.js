"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkMenuItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  EnrichmentAreaItem_1 = require("../../../Map/Marks/MarkItem/EnrichmentAreaItem"),
  TeleportMarkItem_1 = require("../../../Map/Marks/MarkItem/TeleportMarkItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class MarkMenuItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.QWi = void 0),
      (this.LevelSequencePlayer = void 0);
  }
  async Init(e, t) {
    e.SetUIActive(!0),
      await this.CreateThenShowByActorAsync(e.GetOwner()),
      (this.QWi = t),
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
      [3, UE.UISprite],
    ];
  }
  SetOnClick(e) {
    this.GetExtendToggle(0).OnStateChange.Add(e);
  }
  MAi() {
    this.SetSpriteByPath(this.QWi.IconPath, this.GetSprite(1), !1),
      this.QWi instanceof EnrichmentAreaItem_1.EnrichmentAreaItem
        ? ((t = this.QWi.MarkConfig.MarkTitle),
          (e = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
            this.QWi.GetEnrichmentItemNameId(),
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t, e))
        : this.GetText(2).SetText(this.QWi.GetTitleText());
    var e,
      t = this.GetSprite(3);
    this.QWi instanceof TeleportMarkItem_1.TeleportMarkItem
      ? ((e = this.QWi.IsMultiMap()),
        t.SetUIActive(e),
        e &&
          ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            this.QWi.IsSelectThisFloor
              ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH
              : WorldMapDefine_1.MULTI_MAP_ICON_PATH,
          )),
          this.SetSpriteByPath(e, t, !1)))
      : t.SetUIActive(!1);
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
