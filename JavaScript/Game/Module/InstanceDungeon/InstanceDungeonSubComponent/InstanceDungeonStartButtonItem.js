"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonStartButtonItem = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  InstOnlineType_1 = require("../../../../Core/Define/Config/SubType/InstOnlineType"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  CLICK_INSTANCE_BEGIN_BUTTON_CD = 500;
class InstanceDungeonStartButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.c5a = 0),
      (this.OnClickBtnSoloCallBack = void 0),
      (this.OnClickBtnMultipleCallBack = void 0),
      (this.OnClickBtnTeamCallBack = void 0),
      (this.OnClickBtnSolo = () => {
        this.m5a() &&
          ((this.c5a =
            TimeUtil_1.TimeUtil.GetServerTimeStamp() +
            CLICK_INSTANCE_BEGIN_BUTTON_CD),
          this.OnClickBtnSoloCallBack) &&
          this.OnClickBtnSoloCallBack();
      }),
      (this.qli = () => {
        this.m5a() &&
          ((this.c5a =
            TimeUtil_1.TimeUtil.GetServerTimeStamp() +
            CLICK_INSTANCE_BEGIN_BUTTON_CD),
          this.OnClickBtnMultipleCallBack) &&
          this.OnClickBtnMultipleCallBack();
      }),
      (this.bli = () => {
        this.m5a() &&
          ((this.c5a =
            TimeUtil_1.TimeUtil.GetServerTimeStamp() +
            CLICK_INSTANCE_BEGIN_BUTTON_CD),
          this.OnClickBtnTeamCallBack) &&
          this.OnClickBtnTeamCallBack();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, ue_1.UIButtonComponent],
      [0, ue_1.UIButtonComponent],
      [2, ue_1.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnClickBtnSolo],
        [0, this.qli],
        [2, this.bli],
      ]);
  }
  RefreshItem(e) {
    this.SetActive(!0),
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
        ? (this.SetButtonUiActive(0, !1),
          this.SetButtonUiActive(1, !1),
          this.SetButtonUiActive(2, !1))
        : e === InstOnlineType_1.InstOnlineType.Single
          ? (this.SetButtonUiActive(0, !1),
            this.SetButtonUiActive(1, !0),
            this.SetButtonUiActive(2, !1))
          : e === InstOnlineType_1.InstOnlineType.Multi
            ? (this.SetButtonUiActive(0, !0),
              this.SetButtonUiActive(1, !1),
              ModelManager_1.ModelManager.GameModeModel.IsMulti
                ? this.SetButtonUiActive(2, !0)
                : this.SetButtonUiActive(2, !1))
            : (this.SetButtonUiActive(0, !0),
              ModelManager_1.ModelManager.GameModeModel.IsMulti
                ? (this.SetButtonUiActive(1, !1), this.SetButtonUiActive(2, !0))
                : (this.SetButtonUiActive(1, !0),
                  this.SetButtonUiActive(2, !1)));
  }
  m5a() {
    return !(
      this.c5a > TimeUtil_1.TimeUtil.GetServerTimeStamp() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "InstanceDungeon",
          5,
          "不允许短时间内触发多次进入副本的按钮",
        ),
      1)
    );
  }
}
exports.InstanceDungeonStartButtonItem = InstanceDungeonStartButtonItem;
//# sourceMappingURL=InstanceDungeonStartButtonItem.js.map
