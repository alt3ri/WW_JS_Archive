"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridBase = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
class RouletteGridBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.Toggle = void 0),
      (this.IsIconTexture = !1),
      (this.l4e = void 0),
      (this.W5e = void 0),
      (this.A5e = () =>
        !this.W5e || this.W5e(this.Data, this.Toggle.GetToggleState())),
      (this.A0o = (t) => {
        1 === t &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRouletteItemSelect,
            this.Data,
          );
      }),
      (this.P0o = (t) => {
        this.SetGridEquipped(1 === t);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIExtendToggleSpriteTransition],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
    ];
  }
  OnStart() {
    this.IsIconTexture = !1;
    var t = this.GetUiExtendToggleSpriteTransition(5),
      i = this.GetTexture(2);
    t.RootUIComp.SetUIActive(!1),
      i.SetUIActive(!1),
      (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle.SetToggleState(0),
      this.Toggle.CanExecuteChange.Bind(this.A5e),
      this.SetGridEquipped(!1),
      this.SetRedDotVisible(!1);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot(),
      (this.Data = void 0),
      this.Toggle.CanExecuteChange.Unbind(),
      (this.Toggle = void 0);
  }
  async Init() {}
  IsDataValid() {
    return void 0 !== this.Data.Id && 0 !== this.Data.Id;
  }
  RefreshGrid(t) {
    (this.Data = t),
      this.WH_(),
      this.Init().finally(() => {
        this.x0o();
      });
  }
  BindRedDot(t, i = 0) {
    var e = this.GetItem(11);
    e &&
      (this.UnBindRedDot(), (this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, e, void 0, i);
  }
  UnBindRedDot() {
    var t;
    this.l4e &&
      ((t = this.GetItem(11)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t),
      (this.l4e = void 0));
  }
  SetRedDotVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  GetIconItem(t = this.IsIconTexture) {
    return t
      ? this.GetTexture(2)
      : this.GetUiExtendToggleSpriteTransition(5).RootUIComp;
  }
  async LoadSpriteIcon(t) {
    const i = this.GetUiExtendToggleSpriteTransition(5),
      e = this.GetSprite(6),
      s = new CustomPromise_1.CustomPromise();
    this.SetSpriteByPath(t, e, !0, void 0, () => {
      i.SetAllStateSprite(e.GetSprite()), s.SetResult();
    }),
      await s.Promise;
  }
  async LoadTextureIcon(t) {
    var i = this.GetTexture(2);
    await this.SetTextureAsync(t, i);
  }
  async LoadIconByItemId(t) {
    var i = this.GetTexture(2);
    await this.SetItemIconAsync(i, t);
  }
  WH_() {
    this.GetItem(1).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetText(10).SetUIActive(!1),
      this.GetIconItem(!0).SetUIActive(!1),
      this.GetIconItem(!1).SetUIActive(!1);
  }
  x0o() {
    var t,
      i = this.Data.State;
    4 === i
      ? this.SetActive(!1)
      : (this.GetItem(1).SetUIActive(2 === i),
        this.GetItem(4).SetUIActive(0 === i),
        (t = this.Data.ShowIndex),
        this.GetItem(8).SetUIActive(t),
        t &&
          ((t = (this.Data.GridIndex + 1).toString()),
          this.GetText(9).SetText(t)),
        this.GetText(10).SetUIActive(this.Data.ShowNum),
        this.Data.ShowNum &&
          this.GetText(10).SetText(this.Data.DataNum.toString()),
        this.GetIconItem(!this.IsIconTexture).SetUIActive(!1),
        this.GetIconItem(this.IsIconTexture).SetUIActive(
          1 === i || 0 === i || 5 === i,
        ));
  }
  SetGridEquipped(t) {
    this.GetItem(3).SetUIActive(t);
  }
  BindOnCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  AddToggleStateChangeEvent(t) {
    this.Toggle.OnStateChange.Add(t);
  }
  SetGridToggleChangeEvent() {
    this.AddToggleStateChangeEvent(this.A0o),
      this.AddToggleStateChangeEvent(this.P0o);
  }
  SetToggleSelfInteractive(t) {
    this.Toggle.SetSelfInteractive(t);
  }
  SetGridToggleState(t) {
    this.Toggle.SetToggleState(t ? 1 : 0, !0);
  }
  SetGridToggleNavigation(t) {
    t &&
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
        this.RootItem,
      );
  }
  SelectOnGrid(t) {
    this.OnSelect(t);
  }
  OnSelect(t) {}
}
exports.RouletteGridBase = RouletteGridBase;
//# sourceMappingURL=RouletteGridBase.js.map
