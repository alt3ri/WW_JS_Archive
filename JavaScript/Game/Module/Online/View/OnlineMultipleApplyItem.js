"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineMultipleApplyItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  OnlineController_1 = require("../OnlineController");
class OnlineMultipleApplyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.iOi = void 0),
      (this.pNi = void 0),
      (this.T8t = () => {
        OnlineController_1.OnlineController.AgreeJoinResultRequest(
          this.iOi.PlayerId,
          !0,
        );
      }),
      (this.I8t = () => {
        OnlineController_1.OnlineController.AgreeJoinResultRequest(
          this.iOi.PlayerId,
          !1,
        ),
          ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(
            this.iOi.PlayerId,
          ) &&
            (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
              this.iOi.PlayerId,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshApply,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.T8t],
        [5, this.I8t],
      ]);
  }
  OnStart() {
    this.pNi = this.GetSprite(3);
  }
  Refresh(e, t, r) {
    this.iOi = e;
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
      e.HeadId,
    )?.Card;
    i && this.SetTextureByPath(i, this.GetTexture(1)),
      this.GetText(0).SetText(e.Name),
      this.GetText(2).SetText(e.Level.toString());
  }
  UpdateCountDownProgressBar() {
    this.iOi &&
      (this.pNi.SetFillAmount(
        this.iOi.ApplyTimeLeftTime /
          ModelManager_1.ModelManager.OnlineModel.ApplyCd,
      ),
      this.iOi.ApplyTimeLeftTime <= 0) &&
      ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(
        this.iOi.PlayerId,
      ) &&
      (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
        this.iOi.PlayerId,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply));
  }
}
exports.OnlineMultipleApplyItem = OnlineMultipleApplyItem;
//# sourceMappingURL=OnlineMultipleApplyItem.js.map
