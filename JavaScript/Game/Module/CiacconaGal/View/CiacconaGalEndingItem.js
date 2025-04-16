"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalEndingItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CiacconaGalEndingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.DPc = e),
      (this.eS1 = t),
      (this.bPc = void 0),
      (this.UPc =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningFinalLock",
        )),
      (this.FKa = () => {
        var e;
        this.DPc.IsFinished
          ? ((e = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id),
            ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetActivityEndingReward(
              e,
              this.DPc.Id,
            ))
          : ((e = {
              RewardLists:
                ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
                  this.DPc.RewardId,
                ).map((e) => ({ Id: e[0].ItemId, Num: e[1], Received: !1 })),
              MountItem: this.GetItem(5),
              PosBias: new UE.Vector(0, 0, 0),
            }),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshRewardPopUp,
              e,
            ));
      }),
      (this.R2c = () => {
        this.DPc.IsFinished
          ? ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingDetailView(
              this.DPc.Id,
              this.eS1,
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "EndingUnfinished",
            );
      }),
      (this.f4c = () => {
        this.PKt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.R2c]]);
  }
  async OnBeforeStartAsync() {
    (this.bPc = new ButtonSpriteItem_1.ButtonSpriteItem()),
      this.bPc.SetFunction(this.FKa),
      await this.bPc.CreateByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.PKt(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaEndingDataUpdate,
        this.f4c,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCiacconaEndingDataUpdate,
      this.f4c,
    );
  }
  PKt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.eS1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.DPc.Title),
      this.bPc.SetActive(!this.DPc.IsRewarded),
      this.bPc.SetRedDotVisible(this.DPc.IsFinished && !this.DPc.IsRewarded),
      this.GetSprite(4).SetUIActive(this.DPc.IsRewarded);
    var e = this.DPc.IsFinished ? this.DPc.ImagePath : this.UPc;
    this.SetTextureByPath(e, this.GetTexture(1)),
      this.GetTexture(6).SetUIActive(!this.DPc.IsFinished),
      this.GetTexture(7).SetUIActive(this.DPc.IsFinished);
  }
}
exports.CiacconaGalEndingItem = CiacconaGalEndingItem;
//# sourceMappingURL=CiacconaGalEndingItem.js.map
