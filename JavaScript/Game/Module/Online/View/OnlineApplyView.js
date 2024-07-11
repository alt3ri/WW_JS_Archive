"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineApplyView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
class OnlineApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Q2t = void 0),
      (this.pGi = void 0),
      (this.vGi = !1),
      (this.MGi = () => {
        if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1)
          return ModelManager_1.ModelManager.OnlineModel.CurrentApply
            ? void OnlineController_1.OnlineController.AgreeJoinResultRequest(
                ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayerId,
                !0,
              )
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("MultiPlayerTeam", 5, "当前申请不存在"),
              void UiManager_1.UiManager.CloseView("OnlineMultipleApplyView"));
        UiManager_1.UiManager.OpenView("OnlineMultipleApplyView");
      }),
      (this.SGi = () => {
        this.RefreshView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.MGi]]);
  }
  OnStart() {
    (this.Q2t = this.GetText(5)),
      (this.pGi = this.GetSprite(6)),
      this.RefreshView();
  }
  OnTick(e) {
    const i = ModelManager_1.ModelManager.OnlineModel.CurrentApply;
    !i || i.ApplyTimeLeftTime < 0
      ? this.vGi || (this.CloseMe(), (this.vGi = !0))
      : (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(i.ApplyTimeLeftTime)),
        this.pGi.SetFillAmount(
          i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
        ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshApply,
      this.SGi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshApply,
      this.SGi,
    );
  }
  RefreshView() {
    const e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize();
    var i = this.GetItem(3);
    let n = this.GetItem(4);
    const t = this.GetText(7);
    var i =
      (e <= 1
        ? (i.SetUIActive(!0),
          n.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalText(t, "OnlineSingleApply"))
        : (i.SetUIActive(!1),
          n.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalText(t, "OnlineMultipleApply", e)),
      ModelManager_1.ModelManager.OnlineModel.CurrentApply);
    i &&
      (this.GetText(1).SetText(i.Name),
      this.Q2t.SetText(
        TimeUtil_1.TimeUtil.GetCoolDown(
          ModelManager_1.ModelManager.OnlineModel.CurrentApply
            .ApplyTimeLeftTime,
        ),
      ),
      this.pGi.SetFillAmount(
        i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
      ),
      (n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        i.HeadId,
      )?.Card)) &&
      this.SetTextureByPath(n, this.GetTexture(0));
  }
}
exports.OnlineApplyView = OnlineApplyView;
// # sourceMappingURL=OnlineApplyView.js.map
