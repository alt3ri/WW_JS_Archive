"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUi = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PopupTypeRightItem_1 = require("../../../Ui/Common/PopupTypeRightItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MapHelper_1 = require("../../Map/MapHelper");
class WorldMapSecondaryUi extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.UiBgItem = void 0),
      (this.a3o = void 0),
      (this.jHa = 0),
      (this.Map = void 0),
      (this.h3o = void 0),
      (this.K3t = (e) => {
        "Close" === e && this.Gh_();
      }),
      (this.Close = (e, t = !0) => {
        (this.h3o = e),
          (this.jHa = 1),
          t ? this.SPe.PlayLevelSequenceByName("Close") : this.Gh_();
      });
  }
  get IsUiOpen() {
    return 0 === this.jHa;
  }
  get IsUiCloseComplete() {
    return 2 === this.jHa;
  }
  get IsUiClose() {
    return 1 === this.jHa;
  }
  get SPe() {
    var e;
    return (
      this.a3o ||
        ((e = this.UiBgItem?.GetRootItem() ?? this.GetRootItem()),
        (this.a3o = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
        this.a3o.BindSequenceCloseEvent(this.K3t)),
      this.a3o
    );
  }
  OnBeforeCreate() {
    this.GetNeedBgItem() && (this.UiBgItem = this.GetPopupRightItem());
  }
  GetPopupRightItem() {
    return new PopupTypeRightItem_1.PopupTypeRightItem();
  }
  OnBeforeDestroyImplementImplement() {}
  OnBeforeDestroyImplement() {
    this.OnBeforeDestroyImplementImplement(),
      this.a3o?.Clear(),
      (this.a3o = void 0);
  }
  async OnBeforeStartAsync() {
    var e;
    this.UiBgItem &&
      (await this.UiBgItem.CreateByResourceIdAsync(
        "UiView_PopupR",
        this.ParentUiItem,
        this.UsePool,
      ),
      (e = this.GetOriginalActor().GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      this.UiBgItem.AttachItem(e, this.GetRootItem()),
      this.UiBgItem.SetPopupViewBase(),
      this.UiBgItem.OverrideBackBtnCallBack(this.Close),
      this.AddChild(this.UiBgItem));
  }
  Gh_() {
    this.SetActive(!1), this.m2e();
  }
  m2e() {
    this.OnCloseWorldMapSecondaryUi(),
      (this.jHa = 2),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
      ),
      this.h3o && this.h3o();
  }
  OnBeforeHide() {
    this.SPe.IsPlayingSequence("Close") &&
      (this.SPe.StopCurrentSequence(), this.m2e());
  }
  MarkForOpen() {
    this.jHa = 0;
  }
  async ShowPanel(e, ...t) {
    this.IsUiOpen &&
      ((this.Map = e),
      this.SetupWorldMapSecondaryUiLayout(),
      await this.OnBeforeShowWorldMapSecondaryUiAsync(...t),
      this.RootItem.SetAlpha(1),
      this.SetActive(!0),
      this.OnShowWorldMapSecondaryUi(...t),
      this.SPe.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
      ));
  }
  UpdateMap(e) {
    this.Map = e;
  }
  async OnBeforeShowWorldMapSecondaryUiAsync() {}
  SetupWorldMapSecondaryUiLayout() {}
  OnShowWorldMapSecondaryUi() {}
  OnCloseWorldMapSecondaryUi() {}
  GetResourceId() {
    return "";
  }
  GetGuideFocusUiItem() {}
  GetNeedBgItem() {
    return !0;
  }
  CheckAndShowCrossMapTips(e) {
    e.IsTracked ||
      MapHelper_1.MapHelper.CheckAndShowCrossMapTips(
        e.MarkId,
        e.MarkType,
        e.TrackAreaId,
        e.WorldPosition,
      );
  }
}
exports.WorldMapSecondaryUi = WorldMapSecondaryUi;
//# sourceMappingURL=WorldMapSecondaryUi.js.map
