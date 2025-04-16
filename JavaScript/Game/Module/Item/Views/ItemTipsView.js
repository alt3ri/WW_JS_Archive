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
  PersonalCardPreviewComponent_1 = require("../../Personal/View/PersonalCardPreviewComponent"),
  PowerTipsItem_1 = require("../../Power/SubViews/PowerTipsItem");
class ItemTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IncId = 0),
      (this.ConfigId = 0),
      (this.ExtraParam = void 0),
      (this.UiTipsType = "ItemTipsComponent"),
      (this.TipsProxy = void 0),
      (this.DoCloseMe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.DoCloseMe]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      i =
        ((this.IncId = e?.ItemUid),
        (this.ConfigId = e.ItemId),
        (this.ExtraParam = e.ExtraParam),
        ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e));
    if (i)
      switch (
        ((this.UiTipsType =
          ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsUiType(
            i.ItemType,
          )),
        this.UiTipsType)
      ) {
        case "ItemTipsComponent":
          await this.DDl(i);
          break;
        case "PowerTipsItem":
          await this.ADl(i);
          break;
        case "PersonalCardPreviewComponent":
          await this.xDl(i);
      }
  }
  async DDl(e) {
    var i = new ItemTipsComponent_1.ItemTipsComponent(),
      e =
        (await i.CreateByResourceIdAsync(
          "UiItem_TipsScreenTips",
          this.GetItem(1),
        ),
        (this.TipsProxy = i).Refresh(e),
        void 0 === this.IncId && i.SetTipsComponentLockButton(!1),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.ConfigId,
        ).ItemType);
    0 === e && i.SetTipsNumShow(!1);
  }
  async ADl(e) {
    var i = new PowerTipsItem_1.PowerTipsItem();
    await i.CreateByResourceIdAsync("UiItem_ItemTips1", this.GetItem(1)),
      (this.TipsProxy = i).SetBackBackCallBack(this.DoCloseMe),
      i.Refresh(e);
  }
  async xDl(e) {
    var i = new PersonalCardPreviewComponent_1.PersonalCardPreviewComponent();
    await i.CreateByResourceIdAsync("UiView_CardPreview", this.GetItem(1)),
      (this.TipsProxy = i).Refresh(e);
  }
  OnBeforeShow() {
    this.TipsProxy?.SetActive(!0);
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
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CloseItemTips,
      this.ConfigId,
      this.IncId,
    );
  }
  async OnPlayingCloseSequenceAsync() {
    await this.TipsProxy?.PlayCloseSequence(), this.TipsProxy?.SetActive(!1);
  }
}
exports.ItemTipsView = ItemTipsView;
//# sourceMappingURL=ItemTipsView.js.map
