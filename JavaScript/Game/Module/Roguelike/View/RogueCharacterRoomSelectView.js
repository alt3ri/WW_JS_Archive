"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueCharacterRoomItem = exports.RogueCharacterRoomSelectView =
    void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TopPanel_1 = require("./TopPanel");
class RogueCharacterRoomSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lta = void 0),
      (this.Sui = void 0),
      (this._ta = -1),
      (this.uta = () => {
        ControllerHolder_1.ControllerHolder.RoguelikeController.RoguelikeRoleRoomSelectRequest(
          this._ta,
        ).then(() => {
          this.CloseMe();
        });
      }),
      (this.cta = (t, e, i) => {
        e
          ? (this.Sui?.DeselectCurrentGridProxy(),
            this.Sui?.SelectGridProxy(t),
            (this._ta = i))
          : this.Sui?.DeselectCurrentGridProxy(),
          this.GetButton(3).SetSelfInteractive(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.uta]]);
  }
  async OnBeforeStartAsync() {
    (this.lta = new TopPanel_1.TopPanel()),
      await this.lta.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.lta.CloseCallback = () => {
        this.CloseMe();
      }),
      (this.Sui = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        () => {
          var t = new RogueCharacterRoomItem();
          return (t.ClickCallback = this.cta), t;
        },
      )),
      await this.Sui.RefreshByDataAsync(this.OpenParam),
      this.GetButton(3).SetSelfInteractive(!1);
  }
}
exports.RogueCharacterRoomSelectView = RogueCharacterRoomSelectView;
class RogueCharacterRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ClickCallback = void 0),
      (this.RoomId = -1),
      (this.cFe = () => {
        this.ClickCallback &&
          this.ClickCallback(this.GridIndex, this.IsSelectRoom(), this.RoomId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.cFe]]);
  }
  SetItemToggleState(t) {
    this.GetExtendToggle(3).SetToggleState(t, !1);
  }
  OnDeselected(t) {
    this.SetItemToggleState(0);
  }
  OnSelected(t) {
    this.SetItemToggleState(1);
  }
  IsSelectRoom() {
    return 1 === this.GetExtendToggle(3).GetToggleState();
  }
  Refresh(t, e, i) {
    this.RoomId = t;
    t =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueRoomShowConfig(t);
    t &&
      (this.SetTextureByPath(t.Icon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Desc));
  }
}
exports.RogueCharacterRoomItem = RogueCharacterRoomItem;
//# sourceMappingURL=RogueCharacterRoomSelectView.js.map
