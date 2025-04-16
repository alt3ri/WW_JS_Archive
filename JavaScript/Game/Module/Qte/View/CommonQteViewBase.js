"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteViewBase = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager");
class CommonQteViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.IsMobile = !1),
      (this.IsQteActive = !1),
      (this.IsQtePlayStart = !1),
      (this.IsQteStart = !1),
      (this.IsQteEnd = !1),
      (this.IsQteInteractive = !1),
      (this.IsQtePause = !1),
      (this.oIl = (e) => {
        this.CommonQteEnd(e);
      }),
      (this.mFl = () => {
        this.RefreshOnBattleUiVisibleChanged();
      }),
      (this.esh = () => {
        this.IsQteEnd ||
          (0 === Time_1.Time.TimeDilation ? this.PauseQte() : this.ResumeQte());
      });
  }
  OnRegisterComponent() {
    this.IsMobile = Info_1.Info.IsInTouch();
  }
  OnStart() {
    var e = UiLayer_1.UiLayer.GetFloatUnit(
      UiLayerType_1.ELayerType.BattleFloat,
      2,
    );
    e && this.SetParentUiItem(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DisableCustomInputData,
        this.Info.Name,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        20,
        this.mFl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.esh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CommonQteEnd,
        this.oIl,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.EnableCacheCustomInputData,
      this.Info.Name,
    ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        20,
        this.mFl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.esh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CommonQteEnd,
        this.oIl,
      );
  }
  OnAfterShow() {
    super.OnAfterShow(), this.ResumeQte();
  }
  OnBeforeHide() {
    super.OnBeforeHide(), this.PauseQte();
  }
  CommonQteEnd(e) {}
  RefreshOnBattleUiVisibleChanged() {}
  PauseQte() {
    this.IsQtePause ||
      this.IsQteEnd ||
      ((this.IsQtePause = !0),
      this.IsQteActive && this.OnQtePause(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CommonQte", 67, "Qte界面进入暂停", [
          "IsQteActive",
          this.IsQteActive,
        ]));
  }
  ResumeQte() {
    this.IsQtePause &&
      !this.IsQteEnd &&
      ((this.IsQtePause = !1),
      this.IsQteActive && this.OnQteResume(),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("CommonQte", 67, "Qte界面暂停恢复", [
        "IsQteActive",
        this.IsQteActive,
      ]);
  }
  OnQtePause() {}
  OnQteResume() {}
  HandleQteEnd() {}
  IsValidInput() {
    return !(!this.IsQteInteractive || this.IsQteEnd || this.IsQtePause);
  }
  SetQteActive(e) {
    var t;
    (this.IsQteActive = !0),
      3 === e.Source
        ? (t = UiManager_1.UiManager.GetViewByName("VideoView")) &&
          (t = t.GetRootItem()) &&
          this.GetRootItem().SetUIParent(t)
        : 0 === e.Source &&
          ((t =
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
              20,
            ))
            ? 0 === Time_1.Time.TimeDilation && this.PauseQte()
            : (this.PauseQte(), this.SetActive(t)));
  }
}
exports.CommonQteViewBase = CommonQteViewBase;
//# sourceMappingURL=CommonQteViewBase.js.map
