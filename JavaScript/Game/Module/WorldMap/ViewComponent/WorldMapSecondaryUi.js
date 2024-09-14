"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUi = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PopupTypeRightItem_1 = require("../../../Ui/Common/PopupTypeRightItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class WorldMapSecondaryUi extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.InnerPointerIsInView = !1),
      (this.UiBgItem = void 0),
      (this.a3o = void 0),
      (this.YVa = 0),
      (this.Map = void 0),
      (this.h3o = void 0),
      (this.K3t = (e) => {
        "Close" === e && this.m2e();
      }),
      (this.Close = (e, t = !0) => {
        (this.h3o = e),
          (this.YVa = 1),
          t ? this.SPe.PlayLevelSequenceByName("Close") : this.m2e();
      });
  }
  get IsUiOpen() {
    return 0 === this.YVa;
  }
  get IsUiCloseComplete() {
    return 2 === this.YVa;
  }
  get IsUiClose() {
    return 1 === this.YVa;
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
  m2e() {
    this.SetActive(!1),
      this.OnCloseWorldMapSecondaryUi(),
      (this.YVa = 2),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
      ),
      this.h3o && this.h3o();
  }
  get PointerIsInView() {
    return this.InnerPointerIsInView;
  }
  ShowPanel(e, ...t) {
    (this.Map = e),
      (this.YVa = 0),
      this.RootItem.SetAlpha(1),
      this.SetActive(!0),
      this.OnShowWorldMapSecondaryUi(...t),
      this.SPe.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
      );
  }
  OnShowWorldMapSecondaryUi() {}
  OnCloseWorldMapSecondaryUi() {}
  GetResourceId() {
    return "";
  }
  GetGuideFocusUiItem() {}
  GetNeedBgItem() {
    return !0;
  }
}
exports.WorldMapSecondaryUi = WorldMapSecondaryUi;
//# sourceMappingURL=WorldMapSecondaryUi.js.map
