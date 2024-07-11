"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GrapplingHookPoint = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CombineKeyItem_1 = require("../KeyItem/CombineKeyItem"),
  INTERRUPT_DELAY_TIME = 500,
  START_SEQUENCE_NAME = "Start",
  CLOST_SEQUENCE_NAME = "Close";
class GrapplingHookPoint extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.Due = new UE.Vector()),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.R$e = void 0),
      (this.jht = !1),
      (this.Wht = !1),
      (this.Kht = void 0),
      (this.Qht = void 0),
      (this.SPe = void 0),
      (this.Qtt = void 0),
      (this.Xht = (e) => {
        this.$ht();
      }),
      (this.Yht = (e) => {
        this.Jht();
      }),
      (this.zht = () => {
        TimerSystem_1.TimerSystem.Has(this.Kht) &&
          TimerSystem_1.TimerSystem.Remove(this.Kht),
          this.Qht && this.Qht();
      }),
      (this.R$e = Global_1.Global.CharacterController),
      (this.Due.X = e.X),
      (this.Due.Y = e.Y),
      (this.Due.Z = e.Z),
      this.CreateThenShowByResourceIdAsync("UiItem_Gousuo", t, !0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UINiagara],
    ]),
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([4, UE.UIItem]);
  }
  async OnBeforeStartAsync() {
    var e;
    Info_1.Info.IsInTouch() ||
      ((e = this.GetItem(4)).SetUIActive(!1),
      (this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      await this.Qtt.CreateByActorAsync(e.GetOwner()),
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.幻象1));
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Jht(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.Xht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Yht,
      );
  }
  Jht() {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.Qtt?.GetRootItem().SetUIActive(!0),
      this.Zht(START_SEQUENCE_NAME),
      this.Zht(CLOST_SEQUENCE_NAME),
      TimerSystem_1.TimerSystem.Has(this.Kht) &&
        TimerSystem_1.TimerSystem.Remove(this.Kht),
      (this.jht = !0),
      (this.Wht = !1);
  }
  $ht() {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.Qtt?.GetRootItem().SetUIActive(!1),
      this.Zht(START_SEQUENCE_NAME),
      this.Zht(CLOST_SEQUENCE_NAME),
      TimerSystem_1.TimerSystem.Has(this.Kht) &&
        TimerSystem_1.TimerSystem.Remove(this.Kht),
      (this.jht = !1),
      (this.Wht = !0);
  }
  Interrupt() {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      (this.Wht = !0),
      (this.Kht = TimerSystem_1.TimerSystem.Delay(
        this.zht,
        INTERRUPT_DELAY_TIME,
      ));
  }
  BindOnInterruptCompleted(e) {
    this.Qht = e;
  }
  GetIsActivateHook() {
    return this.jht;
  }
  GetIsInterrupting() {
    return this.Wht;
  }
  OnBeforeDestroy() {
    this.SPe && (this.SPe.Clear(), (this.SPe = void 0)),
      (this.Wht = !1),
      (this.jht = !1),
      TimerSystem_1.TimerSystem.Has(this.Kht) &&
        TimerSystem_1.TimerSystem.Remove(this.Kht),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.Xht,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkStart,
          this.Xht,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Yht,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkEnd,
          this.Yht,
        );
  }
  AfterTick() {
    var e;
    this.jht && (e = this.elt(this.Due)) && this.Ad(e);
  }
  Ad(e) {
    this.RootItem.SetAnchorOffset(e);
  }
  elt(e) {
    if (UE.GameplayStatics.ProjectWorldToScreen(this.R$e, e, this.S$e))
      return (
        (e = (0, puerts_1.$unref)(this.S$e)),
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
          e,
        )
      );
  }
  Zht(e) {
    this.SPe.StopSequenceByKey(e);
  }
}
exports.GrapplingHookPoint = GrapplingHookPoint;
//# sourceMappingURL=GrapplingHookPoint.js.map
