"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineApplyView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineController_1 = require("../OnlineController");
class OnlineApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.XFt = void 0),
      (this.pNi = void 0),
      (this.vNi = !1),
      (this.MNi = () => {
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
      (this.uHe = () => {
        ModelManager_1.ModelManager.OnlineModel.CurrentApply
          ? OnlineController_1.OnlineController.AgreeJoinResultRequest(
              ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayerId,
              !1,
            )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("MultiPlayerTeam", 5, "当前申请不存在"),
            UiManager_1.UiManager.CloseView("OnlineMultipleApplyView"));
      }),
      (this.ENi = () => {
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
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.MNi],
        [8, this.uHe],
      ]);
  }
  OnStart() {
    (this.XFt = this.GetText(5)),
      (this.pNi = this.GetSprite(6)),
      this.RefreshView();
  }
  OnTick(e) {
    var i = ModelManager_1.ModelManager.OnlineModel.CurrentApply;
    !i || i.ApplyTimeLeftTime < 0
      ? this.vNi || (this.CloseMe(), (this.vNi = !0))
      : (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(i.ApplyTimeLeftTime)),
        this.pNi.SetFillAmount(
          i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
        ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshApply,
      this.ENi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshApply,
      this.ENi,
    );
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize(),
      i = this.GetItem(3),
      n = this.GetItem(4),
      t = this.GetText(7),
      i =
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
      this.XFt.SetText(
        TimeUtil_1.TimeUtil.GetCoolDown(
          ModelManager_1.ModelManager.OnlineModel.CurrentApply
            .ApplyTimeLeftTime,
        ),
      ),
      this.pNi.SetFillAmount(
        i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
      ),
      (n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        i.HeadId,
      )?.Card) && this.SetTextureByPath(n, this.GetTexture(0)),
      this.GetButton(8)?.RootUIComp.SetUIActive(!0));
  }
}
exports.OnlineApplyView = OnlineApplyView;
//# sourceMappingURL=OnlineApplyView.js.map
