"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingNormalTechCostItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class FishingNormalTechCostItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.TTt = (e) => {
        for (const t of e) if (this.ETt === t.s5n) return void this.Jbi();
      }),
      (this.LTt = (e) => {
        e.includes(this.ETt) && this.Jbi();
      }),
      (this.DTt = (e, t, i) => {
        this.ETt === e.s5n && this.Jbi();
      }),
      (this.YP = () => {
        this.ETt &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.ETt,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  OnStart() {
    this.dde();
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddCommonItemList,
      this.TTt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveCommonItem,
        this.LTt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.DTt,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddCommonItemList,
      this.TTt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveCommonItem,
        this.LTt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.DTt,
      );
  }
  Refresh(e, t, i) {
    this.ETt = e;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    e &&
      (this.SetTextureByPath(e.IconSmall, this.GetTexture(2)),
      (e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.ETt,
      )),
      this.GetText(3).SetText("" + e));
  }
  Jbi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.ETt,
    );
    this.GetText(3).SetText("" + e);
  }
}
exports.FishingNormalTechCostItem = FishingNormalTechCostItem;
//# sourceMappingURL=FishingNormalTechCostItem.js.map
