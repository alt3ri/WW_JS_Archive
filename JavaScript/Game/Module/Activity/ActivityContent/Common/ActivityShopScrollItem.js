"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityShopScrollItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class ActivityShopScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t, r) {
    super(),
      (this.LVc = r),
      (this.LoopScrollView = void 0),
      (this.ZHe = void 0),
      (this.HOi = void 0),
      (this.wVc = 0),
      (this.t3i = (e, i, t) => {
        i = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(i);
        this.LoopScrollView.RefreshByDataAsync(i, !1, !0);
      }),
      (this.Z1l = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
        e.FunctionMap.set(1, () => {
          UiManager_1.UiManager.CloseViewById(this.wVc);
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Activity",
              27,
              "PayShop:DockyardBuyTabView 商品VersionCode不同步,打开弹窗",
            );
      }),
      (this.sGe = () => {
        return new this.LVc();
      }),
      (this.ZHe = e),
      (this.HOi = i),
      (this.wVc = t);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShopVersionCodeChange,
        this.Z1l,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShopVersionCodeChange,
        this.Z1l,
      );
  }
  OnStart() {
    (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.ZHe,
      this.HOi.GetOwner(),
      this.sGe,
    )),
      this.AddEventListener();
  }
  async Refresh(e) {
    var i = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
    await this.LoopScrollView.RefreshByDataAsync(i, !1, !0),
      ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(e);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityShopScrollItem = ActivityShopScrollItem;
//# sourceMappingURL=ActivityShopScrollItem.js.map
