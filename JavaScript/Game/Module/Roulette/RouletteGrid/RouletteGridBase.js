"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridBase = void 0);
const UE = require("ue"),
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
      (this.v$e = !1),
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
    (this.IsIconTexture = !1), (this.v$e = !1);
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
  Init() {}
  IsDataValid() {
    return void 0 !== this.Data.Id && 0 !== this.Data.Id;
  }
  RefreshGrid(t) {
    (this.Data = t), this.Init(), this.x0o(t.State);
  }
  BindRedDot(t, i = 0) {
    var s = this.GetItem(11);
    s &&
      (this.UnBindRedDot(), (this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, s, void 0, i);
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0));
  }
  SetRedDotVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  GetIconItem() {
    return this.IsIconTexture
      ? this.GetTexture(2)
      : this.GetUiExtendToggleSpriteTransition(5).RootUIComp;
  }
  LoadSpriteIcon(t) {
    this.GetTexture(2).SetUIActive(!1), (this.v$e = !0);
    const i = this.GetUiExtendToggleSpriteTransition(5),
      s = this.GetSprite(6);
    this.SetSpriteByPath(t, s, !0, void 0, () => {
      (this.v$e = !1),
        i.SetAllStateSprite(s.GetSprite()),
        this.GetIconItem().SetUIActive(
          1 === this.Data.State || 0 === this.Data.State,
        );
    });
  }
  LoadTextureIcon(t) {
    this.GetUiExtendToggleSpriteTransition(5).RootUIComp.SetUIActive(!1),
      (this.v$e = !0);
    var i = this.GetTexture(2);
    this.SetTextureByPath(t, i, void 0, () => {
      (this.v$e = !1),
        this.GetIconItem().SetUIActive(
          1 === this.Data.State || 0 === this.Data.State,
        );
    });
  }
  LoadIconByItemId(t) {
    this.v$e = !0;
    var i = this.GetTexture(2);
    this.SetItemIcon(i, t, void 0, () => {
      (this.v$e = !1),
        this.GetIconItem().SetUIActive(
          1 === this.Data.State || 0 === this.Data.State,
        );
    });
  }
  x0o(t) {
    4 === (this.Data.State = t)
      ? this.SetActive(!1)
      : (this.GetItem(1).SetUIActive(2 === t),
        this.GetItem(4).SetUIActive(0 === t),
        (t = this.Data.ShowIndex),
        this.GetItem(8).SetUIActive(t),
        this.GetText(9).SetUIActive(t),
        (t = (this.Data.GridIndex + 1).toString()),
        this.GetText(9).SetText(t),
        this.GetText(10).SetUIActive(this.Data.ShowNum),
        this.Data.ShowNum &&
          this.GetText(10).SetText(this.Data.DataNum.toString()),
        this.v$e ||
          this.GetIconItem().SetUIActive(
            1 === this.Data.State || 0 === this.Data.State,
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
