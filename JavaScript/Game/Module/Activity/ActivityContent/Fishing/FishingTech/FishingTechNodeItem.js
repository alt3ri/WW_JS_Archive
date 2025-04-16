"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechNodeItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class FishingTechNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.PRr = void 0),
      (this.OnClickToggleBack = void 0),
      (this.kqe = () => {
        this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
      }),
      (this.J9_ = () => {
        this.GetExtendToggle(0).SetToggleState(1, !1),
          this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
      }),
      (this.th_ = (e) => {
        (this.PRr?.ConfigId !== e && this.PRr?.PreNode !== e) ||
          (this.RefreshNode(this.PRr),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
            this.PRr?.ConfigId,
          ));
      });
  }
  get CurrentNode() {
    return this.PRr;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      this.GetExtendToggle(0)?.OnUndeterminedClicked.Add(this.J9_);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FishingNormalTechNode",
        this.GetItem(3),
        this.PRr.ConfigId,
      );
  }
  SelectNode() {
    this.GetExtendToggle(0).SetToggleState(1, !1),
      this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
  }
  RefreshNode(e) {
    e &&
      (this.PRr &&
        RedDotController_1.RedDotController.UnBindGivenUi(
          "FishingNormalTechNode",
          this.GetItem(3),
          this.PRr.ConfigId,
        ),
      (this.PRr = e),
      (e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(
        this.PRr.ConfigId,
      )),
      this.SetTextureByPath(e.Icon, this.GetTexture(1)),
      (e = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(
        this.PRr.ConfigId,
      )),
      this.GetItem(2).SetUIActive(!e),
      ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(
        this.PRr.ConfigId,
      )
        ? this.GetExtendToggle(0).SetToggleState(0)
        : this.GetExtendToggle(0).SetToggleState(2),
      RedDotController_1.RedDotController.BindRedDot(
        "FishingNormalTechNode",
        this.GetItem(3),
        void 0,
        this.PRr.ConfigId,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
        this.PRr?.ConfigId,
      ));
  }
}
exports.FishingTechNodeItem = FishingTechNodeItem;
//# sourceMappingURL=FishingTechNodeItem.js.map
