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
  constructor(t, e) {
    super(),
      (this.Due = new UE.VectorDouble()),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.R$e = void 0),
      (this.jht = !1),
      (this.Wht = !1),
      (this.Kht = void 0),
      (this.Qht = void 0),
      (this.SPe = void 0),
      (this.Qtt = void 0),
      (this.Xht = (t) => {
        t && "LevelD" !== t.PlotLevel && "Prompt" !== t.PlotLevel && this.$ht();
      }),
      (this.Yht = (t) => {
        this.Jht();
      }),
      (this.zht = () => {
        TimerSystem_1.TimerSystem.Has(this.Kht) &&
          TimerSystem_1.TimerSystem.Remove(this.Kht),
          this.Qht && this.Qht();
      }),
      (this.R$e = Global_1.Global.CharacterController),
      (this.Due.X = t.X),
      (this.Due.Y = t.Y),
      (this.Due.Z = t.Z),
      this.CreateThenShowByResourceIdAsync("UiItem_Gousuo", e, !0);
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
    var t;
    Info_1.Info.IsInTouch() ||
      ((t = this.GetItem(4)).SetUIActive(!1),
      (this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      (this.Qtt.SkipDestroyActor = !0),
      await this.Qtt.CreateByActorAsync(t.GetOwner()),
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
  UpdateHookPointLocation(t) {
    this.Due.Set(t.X, t.Y, t.Z);
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
  BindOnInterruptCompleted(t) {
    this.Qht = t;
  }
  GetIsActivateHook() {
    return this.jht;
  }
  GetIsInterrupting() {
    return this.Wht;
  }
  OnBeforeDestroy() {
    this.SPe && (this.SPe.Clear(), (this.SPe = void 0)),
      this.Qtt && (this.Qtt.Destroy(), (this.Qtt = void 0)),
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
    var t;
    this.jht && (t = this.elt(this.Due)) && this.Ad(t);
  }
  Ad(t) {
    this.RootItem.SetAnchorOffset(t);
  }
  elt(t) {
    if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t, this.S$e))
      return (
        (t = (0, puerts_1.$unref)(this.S$e)),
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
          t,
        )
      );
  }
  Zht(t) {
    this.SPe.StopSequenceByKey(t);
  }
}
exports.GrapplingHookPoint = GrapplingHookPoint;
//# sourceMappingURL=GrapplingHookPoint.js.map
