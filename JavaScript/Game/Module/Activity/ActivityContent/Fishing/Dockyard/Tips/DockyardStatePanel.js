"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardStatePanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  FishingDefine_1 = require("../../FishingDefine");
class ConsumeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.ETt,
        );
      }),
      (this.d7s = () => {
        this.Refresh(this.ETt);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.eTt]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountRefresh,
      this.d7s,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountRefresh,
      this.d7s,
    );
  }
  Refresh(e) {
    this.ETt = e;
    var t =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
    this.GetText(1)?.SetText(t.toString()),
      this.SetItemIcon(this.GetTexture(0), e);
  }
}
class DockyardStatePanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
    ];
  }
  async InitConsumeItem(e, t) {
    var i = new ConsumeItem();
    await i.CreateThenShowByActorAsync(t.GetOwner()), i.Refresh(e);
  }
  InitSkillText() {
    var e = ModelManager_1.ModelManager.FishingModel.UnlockFishingTechCount,
      t = ModelManager_1.ModelManager.FishingModel.AllFishingTechCount;
    this.GetText(3)?.SetText(e + "/" + t);
  }
  InitSpeedText() {
    var e =
      ModelManager_1.ModelManager.FishingModel.GetShipData()
        .GetEntityHandle()
        ?.Entity?.GetComponent(233)?.VehicleMovement?.MaxSpeed ?? 0;
    this.GetText(4)?.SetText(e.toString());
  }
  async OnBeforeStartAsync() {
    await Promise.all([
      this.InitConsumeItem(
        FishingDefine_1.FISHING_ENTRUST_ITEMID,
        this.GetItem(0),
      ),
      this.InitConsumeItem(FishingDefine_1.BOMB_ITEMID, this.GetItem(1)),
      this.InitConsumeItem(FishingDefine_1.BAIT_ITEMID, this.GetItem(2)),
    ]),
      this.InitSkillText(),
      this.InitSpeedText();
  }
}
exports.DockyardStatePanel = DockyardStatePanel;
//# sourceMappingURL=DockyardStatePanel.js.map
