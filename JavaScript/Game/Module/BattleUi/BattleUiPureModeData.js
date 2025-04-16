"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiPureModeData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  desktopHideChildren = [4, 13, 14, 15, 16, 17],
  padHideChildren = [4, 13, 14, 15, 16, 17];
class BattleUiPureModeData {
  constructor() {
    (this.SEl = !1),
      (this.yEl = 0),
      (this.IsSkipConfirmBox = !1),
      (this.IsSkipConfirmBoxTmp = !1),
      (this.GuideId = 0);
  }
  Init() {
    (this.yEl = Info_1.Info.OperationType),
      (this.GuideId =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "PureModeGuideId",
        ));
  }
  Clear() {
    this.IsOpen = !1;
  }
  get IsOpen() {
    return this.SEl;
  }
  set IsOpen(e) {
    this.SEl !== e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "沉浸模式切换", ["是否开启", e]),
      (this.SEl = e),
      this.bl(!e),
      UiManager_1.UiManager.RefreshByPureModeChanged(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiPureModeChanged,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        GameSettingsDefine_1.EFunction.UIPureMode,
      ));
  }
  ShowTypeChange(e, t) {
    0 !== t &&
      this.yEl !== t &&
      (this.IsOpen
        ? (this.bl(!1), (this.yEl = t), this.bl(!1))
        : (this.yEl = t));
  }
  bl(e) {
    0 !== this.yEl &&
      (2 === this.yEl
        ? ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(
            8,
            desktopHideChildren,
            e,
          )
        : ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(
            8,
            padHideChildren,
            e,
          ));
  }
}
exports.BattleUiPureModeData = BattleUiPureModeData;
//# sourceMappingURL=BattleUiPureModeData.js.map
