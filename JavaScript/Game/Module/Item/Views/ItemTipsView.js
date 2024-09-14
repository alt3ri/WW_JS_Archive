"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ItemTipsComponent_1 = require("../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool"),
  PowerTipsData_1 = require("../../Power/SubViews/PowerTipsData"),
  PowerTipsItem_1 = require("../../Power/SubViews/PowerTipsItem");
class ItemTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IncId = 0),
      (this.ConfigId = 0),
      (this.ItemTipsComponent = void 0),
      (this.kXs = void 0),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.DoCloseMe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Jvt]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    (this.IncId = e?.ItemUid),
      (this.ConfigId = e.ItemId),
      ConfigManager_1.ConfigManager.PowerConfig.GetPowerCurrencyIds().includes(
        this.ConfigId,
      )
        ? ((this.kXs = new PowerTipsItem_1.PowerTipsItem()),
          await this.kXs.CreateByResourceIdAsync(
            "UiItem_ItemTips1",
            this.GetItem(1),
          ),
          this.kXs.SetBackBackCallBack(this.DoCloseMe),
          this.AddChild(this.kXs))
        : ((this.ItemTipsComponent =
            new ItemTipsComponent_1.ItemTipsComponent()),
          await this.ItemTipsComponent.CreateByResourceIdAsync(
            "UiItem_TipsScreenTips",
            this.GetItem(1),
          ),
          this.AddChild(this.ItemTipsComponent)),
      this.Og();
  }
  Og() {
    var e,
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.ConfigId,
      ).ItemType,
      t = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
        this.ConfigId,
        this.IncId,
      );
    ConfigManager_1.ConfigManager.PowerConfig.GetPowerCurrencyIds().includes(
      this.ConfigId,
    )
      ? (((e = new PowerTipsData_1.PowerTipsData()).ItemId = this.ConfigId),
        this.kXs.RefreshByData(e))
      : (this.ItemTipsComponent.Refresh(t),
        void 0 === this.IncId &&
          this.ItemTipsComponent.SetTipsComponentLockButton(!1),
        0 === i && this.ItemTipsComponent.SetTipsNumShow(!1));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeChildView,
      this.DoCloseMe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeChildView,
      this.DoCloseMe,
    );
  }
  OnBeforeDestroy() {
    var e = this.OpenParam;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CloseItemTips,
      e.ItemId,
      e.ItemUid,
    );
  }
  async OnBeforeHideAsync() {
    await this.ItemTipsComponent?.PlayCloseSequence(),
      await this.kXs?.PlayCloseSequence(),
      this.ItemTipsComponent?.SetActive(!1),
      this.kXs?.SetActive(!1);
  }
}
exports.ItemTipsView = ItemTipsView;
//# sourceMappingURL=ItemTipsView.js.map
