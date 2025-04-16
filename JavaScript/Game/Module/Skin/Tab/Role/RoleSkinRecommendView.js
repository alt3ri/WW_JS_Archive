"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinRecommendView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  RoleSkinRecommendItem_1 = require("./RoleSkinRecommendItem");
class RoleSkinRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.CFl = void 0),
      (this.A6i = void 0),
      (this.t3i = (e, i, t) => {
        this.A6i.RecommendId === e && this.Og();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.ExtraParams,
      i =
        ((this.A6i =
          ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(e)),
        ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(
          this.A6i.RecommendId,
        )),
      i =
        (i ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", e])),
        this.A6i.PrefabPath),
      e = [];
    (this.CFl = new RoleSkinRecommendItem_1.RoleSkinItemContent()),
      e.push(this.CFl.CreateByResourceIdAsync(i)),
      await Promise.all(e),
      this.CFl.SetUiActive(!0),
      this.CFl.GetOriginalItem().SetUIParent(this.GetItem(0));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshGoods,
      this.t3i,
    );
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.CFl.Refresh(this.A6i.Id);
  }
}
exports.RoleSkinRecommendView = RoleSkinRecommendView;
//# sourceMappingURL=RoleSkinRecommendView.js.map
