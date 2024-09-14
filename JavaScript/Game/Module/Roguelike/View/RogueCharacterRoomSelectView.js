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
  CommonSelectItem_1 = require("./CommonSelectItem"),
  TopPanel_1 = require("./TopPanel");
class RogueCharacterRoomSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Era = void 0),
      (this.Sui = void 0),
      (this.yra = -1),
      (this.Ira = () => {
        ControllerHolder_1.ControllerHolder.RoguelikeController.RoguelikeRoleRoomSelectRequest(
          this.yra,
        ).then(() => {
          this.CloseMe();
        });
      }),
      (this.Tra = (e, t, i) => {
        t
          ? (this.Sui?.DeselectCurrentGridProxy(),
            this.Sui?.SelectGridProxy(e),
            (this.yra = i))
          : this.Sui?.DeselectCurrentGridProxy(),
          this.GetButton(3).SetSelfInteractive(t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.Ira]]);
  }
  async OnBeforeStartAsync() {
    (this.Era = new TopPanel_1.TopPanel()),
      await this.Era.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.Era.CloseCallback = () => {
        this.CloseMe();
      }),
      (this.Sui = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        () => {
          var e = new RogueCharacterRoomItem();
          return (e.ClickCallback = this.Tra), e;
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
      (this.Sui = void 0),
      (this.Fao = () => {
        return new CommonSelectItem_1.CommonElementItem();
      }),
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
      [4, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[3, this.cFe]]);
  }
  async OnBeforeStartAsync() {
    this.Sui = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.Fao,
    );
  }
  SetItemToggleState(e) {
    this.GetExtendToggle(3).SetToggleState(e, !1);
  }
  OnDeselected(e) {
    this.SetItemToggleState(0);
  }
  OnSelected(e) {
    this.SetItemToggleState(1);
  }
  IsSelectRoom() {
    return 1 === this.GetExtendToggle(3).GetToggleState();
  }
  Refresh(e, t, i) {
    this.RoomId = e;
    e =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueRoomShowConfig(e);
    if (e) {
      var s = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(
        e.BuffId,
      );
      if (s) {
        let i = void 0;
        s.BuffElement.forEach((e, t) => {
          i = new Array(e).fill(t);
        }),
          i && this.Sui?.RefreshByData(i),
          this.SetTextureByPath(e.Icon, this.GetTexture(0)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Desc);
      }
    }
  }
}
exports.RogueCharacterRoomItem = RogueCharacterRoomItem;
//# sourceMappingURL=RogueCharacterRoomSelectView.js.map
