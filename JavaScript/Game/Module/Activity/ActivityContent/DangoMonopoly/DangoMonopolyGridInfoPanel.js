"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyGridInfoPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyGridInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GridData = void 0),
      (this.Promise = void 0),
      (this.RootActorRotation = void 0),
      (this.TimerHandle = void 0),
      (this.Sequence = void 0),
      (this.ActivityData = void 0),
      (this.TimerUpdate = () => {
        this.UpdateCameraFace();
      });
  }
  async Init(t, i) {
    return (
      (this.ActivityData = i),
      await this.CreateThenShowByResourceIdAsync(
        "UiItem_ActivityMonopolyGridInfo",
      ),
      this.RootItem?.SetUIParent(UiLayer_1.UiLayer.WorldSpaceUiRootItem),
      (this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.RootItem?.SetDisplayName(`MonopolyGrid_${t.Id}_` + t.GetPosition()),
      this.UpdateGridData(t),
      this
    );
  }
  UpdateGridData(t) {
    (this.GridData = t), this.UpdateData(), this.CheckCompletedStateToEnd();
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    (this.RootActorRotation = this.RootActor.K2_GetActorRotation()),
      this.GetText(6)?.ShowTextNew(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.Double,
      );
  }
  OnBeforeShow() {
    this.TimerHandle = TimerSystem_1.TimerSystem.Forever(
      this.TimerUpdate,
      TimerSystem_1.MIN_TIME,
    );
  }
  OnBeforeHide() {
    this.ClearTimerHandle();
  }
  OnBeforeDestroy() {
    this.ClearTimerHandle();
  }
  ClearTimerHandle() {
    this.TimerHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
      (this.TimerHandle = void 0));
  }
  UpdateData() {
    var t = this.GridData;
    t.IsExistItem()
      ? this.UpdateItemInfo()
      : t.IsExistDango()
        ? this.UpdateDangoInfo()
        : this.UpdateEmptyInfo();
  }
  CheckCompletedStateToEnd() {
    this.GridData.IsFinish() &&
      (this.Sequence?.PlayLevelSequenceByName("Done"),
      this.Sequence?.EndSequenceLastFrame("Done"));
  }
  UpdateItemInfo() {
    var t = this.GridData,
      i = t.IsActiveDouble(),
      i =
        (this.GetItem(0)?.SetUIActive(i),
        this.GetItem(5)?.SetUIActive(i),
        "X" + (i ? 2 * t.ItemCount : t.ItemCount)),
      i = (this.GetText(1)?.SetText(i), t.IsFinish()),
      i = (this.GetItem(2)?.SetUIActive(i), t.ItemId),
      t = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(i);
    t && ((i = t.Icon), this.SetTextureByPath(i, this.GetTexture(3)));
  }
  UpdateDangoInfo() {
    this.SetActive(!1);
  }
  UpdateEmptyInfo() {
    this.SetActive(!1);
  }
  async EnterStartGridUpdate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        "格子UI => 团子进入格子起步 - 开始起跳 - Burst",
        ["Id", this.GridData.Id],
        ["Position", this.GridData.GetPosition()],
      ),
      await this.PlaySequence("Burst");
  }
  async EnterEndGirdUpdate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        "格子UI => 团子进入到格子里之后 - 落地 - ShiftIn",
        ["Id", this.GridData.Id],
        ["Position", this.GridData.GetPosition()],
      ),
      await this.Promise?.Promise,
      this.UpdateHeight(),
      await this.PlaySequence("ShiftIn"),
      this.UpdateData(),
      await this.PlaySequence("Done");
  }
  async OutBeforeGridUpdate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        "格子UI => 团子从格子出来之前 - 未起跳 - Hide",
        ["Id", this.GridData.Id],
        ["Position", this.GridData.GetPosition()],
      ),
      await this.PlaySequence("Hide");
  }
  async OutStartGridUpdate() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        "格子UI => 团子从格子出来起步 - 开始起跳 - ShiftOut",
        ["Id", this.GridData.Id],
        ["Position", this.GridData.GetPosition()],
      ),
      this.UpdateHeight(),
      await this.PlaySequence("ShiftOut"),
      this.UpdateData(),
      await this.PlaySequence("Done");
  }
  async PlaySequence(t) {
    await this.Promise?.Promise,
      (this.Promise = new CustomPromise_1.CustomPromise()),
      await this.Sequence?.PlaySequenceAsync(t, this.Promise),
      (this.Promise = void 0);
  }
  async PlayActiveSequence() {
    this.UpdateData(), await this.PlaySequence("Transform");
  }
  UpdateRotation(t, i) {
    var e, s;
    this.RootActorRotation &&
      ((i = i - 90),
      (t = t + 90),
      (e = MathUtils_1.MathUtils.IsNearlyEqual(
        this.RootActorRotation.Roll,
        i,
        0.001,
      )),
      (s = MathUtils_1.MathUtils.IsNearlyEqual(
        this.RootActorRotation.Yaw,
        t,
        0.001,
      )),
      (e && s) ||
        ((this.RootActorRotation.Roll = i),
        (this.RootActorRotation.Pitch = 0),
        (this.RootActorRotation.Yaw = t),
        this.RootItem.SetUIWorldRotation(this.RootActorRotation)));
  }
  UpdateCameraFace() {
    var t = CameraController_1.CameraController.CameraRotator;
    t && this.UpdateRotation(t.Yaw, t.Pitch);
  }
  UpdateHeight() {
    var t = this.GridData.Id,
      i = this.ActivityData.ChessPointParamsMap.get(t);
    i &&
      ((t = Vector_1.Vector.Create(
        i.Location.X,
        i.Location.Y,
        this.ActivityData.GetGridEntityInfoAddHeight(t, i.Location.Z),
      ).ToUeVector()),
      this.GetRootItem().D_K2_SetWorldLocation(t, !0, void 0, !1));
  }
  GetCursorPosition() {
    var t = this.GetItem(7);
    return UiModelUtil_1.UiModelUtil.GetActorLguiPos(t.GetOwner());
  }
}
exports.DangoMonopolyGridInfoPanel = DangoMonopolyGridInfoPanel;
//# sourceMappingURL=DangoMonopolyGridInfoPanel.js.map
