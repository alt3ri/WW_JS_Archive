"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ItemTipsComponent_1 = require("../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
class ItemTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IncId = 0),
      (this.ConfigId = 0),
      (this.ItemTipsComponent = void 0),
      (this.CloseBtnClickCallBack = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.CloseBtnClickCallBack]]);
  }
  async OnBeforeStartAsync() {
    (this.ItemTipsComponent = new ItemTipsComponent_1.ItemTipsComponent()),
      await this.ItemTipsComponent.CreateByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
  OnStart() {
    const e = this.OpenParam;
    (this.IncId = e?.ItemUid), (this.ConfigId = e.ItemId);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeChildView,
      this.CloseBtnClickCallBack,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeChildView,
      this.CloseBtnClickCallBack,
    );
  }
  OnBeforeShow() {
    const e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      this.ConfigId,
    ).ItemType;
    const t = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
      this.ConfigId,
      this.IncId,
    );
    this.ItemTipsComponent.Refresh(t),
      void 0 === this.IncId &&
        this.ItemTipsComponent.SetTipsComponentLockButton(!1),
      e === 0 && this.ItemTipsComponent.SetTipsNumShow(!1);
  }
  OnBeforeDestroy() {
    const e = this.OpenParam;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CloseItemTips,
      e.ItemId,
      e.ItemUid,
    );
  }
}
exports.ItemTipsView = ItemTipsView;
// # sourceMappingURL=ItemTipsView.js.map
