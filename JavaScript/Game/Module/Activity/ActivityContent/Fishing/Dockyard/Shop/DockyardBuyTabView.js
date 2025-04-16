"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardBuyTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView"),
  DockyardShopGridItem_1 = require("./DockyardShopGridItem");
class DockyardBuyTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.t3i = (e, r, i) => {
        this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.Z1l = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
        e.FunctionMap.set(1, () => {
          UiManager_1.UiManager.CloseView("DockyardShopMainView");
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Dockyard",
              10,
              "PayShop:DockyardBuyTabView 商品VersionCode不同步,打开弹窗",
            );
      }),
      (this.sGe = () => {
        return new DockyardShopGridItem_1.DockyardShopGridItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.sGe,
    );
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
  async OnShowAsyncImplementImplement() {
    var e = ModelManager_1.ModelManager.DockyardModel.GetShopDataList(),
      e =
        (await this.LoopScrollView.RefreshByDataAsync(e, !1, !0),
        ModelManager_1.ModelManager.DockyardModel.ShopId);
    ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(e);
  }
}
exports.DockyardBuyTabView = DockyardBuyTabView;
//# sourceMappingURL=DockyardBuyTabView.js.map
