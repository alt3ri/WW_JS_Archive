"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryLevelItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
class DarkCoastDeliveryLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.LevelData = void 0),
      (this.UiLevelSequence = void 0),
      (this.MHa = void 0),
      (this.UOt = !0),
      (this.OnClickToggleCallback = () => {
        this.MHa && this.MHa(this.LevelData, this);
      }),
      (this.LevelData = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.OnClickToggleCallback]]);
  }
  OnBeforeCreateImplement() {
    (this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiLevelSequence),
      this.GetExtendToggle(4).CanExecuteChange.Bind(
        () => 0 === this.GetExtendToggle(4).GetToggleState(),
      ),
      this.GetItem(5).SetUIActive(!1);
  }
  OnStart() {
    this.RefreshUi();
  }
  OnBeforeShow() {
    this.UOt && (this.PlaySequence(!0), (this.UOt = !1));
  }
  RefreshUi() {
    var e = this.LevelData.Config,
      i = this.LevelData.GetDarkCoastDeliveryGuardState();
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0)),
      this.SetSpriteByPath(e.LevelIcon, this.GetSprite(1), !1),
      this.SetSpriteByPath(e.LevelSelectIcon, this.GetSprite(2), !1),
      this.GetItem(3).SetUIActive(3 === i);
  }
  PlaySequence(e) {
    switch (this.LevelData.GetDarkCoastDeliveryGuardState()) {
      case 0:
        this.UiLevelSequence.PlaySequence("Lock");
        break;
      case 1:
        this.UiLevelSequence.PlaySequence("Unlock");
        break;
      case 3:
        this.UiLevelSequence.PlaySequence("Receive");
        break;
      case 4:
        this.UiLevelSequence.PlaySequence("Done");
    }
    e && this.UiLevelSequence.StopPrevSequence(!1, !0);
  }
  SetSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(4).SetToggleStateForce(e);
  }
  JumpUnCheckedToCheckedAnim() {
    var e = this.GetExtendToggle(4),
      i = e.StateSwitchAnimations.Get(2);
    void 0 !== i &&
      ((i = i.Animation.LevelSequence), e.GetOwner().SequenceJumpToEnd(i));
  }
  SetClickToggleCallback(e) {
    this.MHa = e;
  }
}
exports.DarkCoastDeliveryLevelItem = DarkCoastDeliveryLevelItem;
//# sourceMappingURL=DarkCoastDeliveryLevelItem.js.map
