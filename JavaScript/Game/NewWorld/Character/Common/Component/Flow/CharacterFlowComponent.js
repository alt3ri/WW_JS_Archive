"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (r = t[h]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, i, n) : r(e, i)) || n);
    return 3 < s && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFlowComponent =
    exports.DEFAULT_BUBBLE_LEAVE_RANGE =
    exports.DEFAULT_BUBBLE_ENTER_RANGE =
      void 0);
const Time_1 = require("../../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../../../Global"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterFlowLogic_1 = require("./CharacterFlowLogic"),
  DynamicFlowController_1 = require("./DynamicFlowController");
(exports.DEFAULT_BUBBLE_ENTER_RANGE = 500),
  (exports.DEFAULT_BUBBLE_LEAVE_RANGE = 1500);
let CharacterFlowComponent = class CharacterFlowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.FlowLogic = void 0),
      (this.IsInit = !1),
      (this.MinRangeSquared = 0),
      (this.MaxRangeSquared = 0),
      (this.IsEnter = !1),
      (this.FlowData = void 0),
      (this.IsPlayDynamicFlow = !1);
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    var t = this.ActorComp?.CreatureData.GetPbEntityInitData();
    if (t) {
      (this.FlowData = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "BubbleComponent",
      )),
        this.InitFlowLogic(this.FlowData);
      t = this.ActorComp.CreatureData.ComponentDataMap.get("mps")?.mps?.oMs;
      if (t)
        for (const i of t) {
          var e = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(
            i.rMs,
          );
          if (e) {
            e =
              DynamicFlowController_1.DynamicFlowController.CreateCharacterFlowData(
                e,
              );
            DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e);
            break;
          }
        }
    }
    return !0;
  }
  OnActivate() {
    var t;
    this.ActorComp &&
      ((t = this.ActorComp.CreatureData.GetPbDataId()),
      (t =
        DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(
          t,
        ))) &&
      this.PlayDynamicFlowBegin(t);
  }
  OnClear() {
    var t;
    return (
      this.IsPlayDynamicFlow &&
        ((t = this.ActorComp.CreatureData.GetPbDataId()),
        DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(t)),
      !0
    );
  }
  ResetBaseInfo() {
    var t, e;
    this.FlowData &&
      ((t = this.FlowData.EnterRange),
      (e = this.FlowData.LeaveRange),
      (this.MinRangeSquared = t * t),
      (this.MaxRangeSquared = e * e));
  }
  InitFlowLogic(t) {
    t &&
      ((this.FlowLogic = new CharacterFlowLogic_1.CharacterFlowLogic(
        this.ActorComp,
        t,
      )),
      this.InitFlowLogicRange(
        this.FlowData?.EnterRange,
        this.FlowData?.LeaveRange,
      ),
      (this.IsEnter = !1),
      (this.IsInit = !0));
  }
  InitFlowLogicRange(t, e) {
    return !(
      !this.FlowData ||
      !this.FlowLogic ||
      ((t = t ?? exports.DEFAULT_BUBBLE_ENTER_RANGE),
      (e = e ?? exports.DEFAULT_BUBBLE_LEAVE_RANGE),
      (this.MinRangeSquared = t * t),
      (this.MaxRangeSquared = e * e),
      0)
    );
  }
  CheckCondition() {
    return (
      !!this.FlowData &&
      !!this.IsInit &&
      !(
        (!this.FlowLogic.HasValidFlow() && !this.IsPlayDynamicFlow) ||
        !this.ActorComp ||
        !Global_1.Global.BaseCharacter ||
        ((ModelManager_1.ModelManager.PlotModel.IsInPlot ||
          !this.FlowLogic.GetUiRootItemState()) &&
          (this.ForceStopFlow(), 1))
      )
    );
  }
  OnTick(t) {
    var e;
    this.CheckCondition() &&
      ((e =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      (e = Vector_1.Vector.DistSquared2D(
        e,
        this.ActorComp.ActorLocationProxy,
      )) < this.MinRangeSquared
        ? (this.IsEnter ||
            this.FlowLogic.IsPlaying ||
            (this.FlowLogic.EnableUpdate = !0),
          (this.IsEnter = !0),
          (this.FlowLogic.IsPause = !1))
        : e < this.MaxRangeSquared
          ? ((this.IsEnter = !1), (this.FlowLogic.IsPause = !0))
          : this.ForceStopFlow(),
      this.FlowLogic.Tick(Time_1.Time.DeltaTimeSeconds));
  }
  RemoveFlowActions() {
    this.Entity.GetComponent(70).HideDialogueText();
  }
  ResetFlowPlayCoolDownTime() {
    this.FlowLogic && this.FlowLogic.ResetWaitTime();
  }
  ForceStopFlow() {
    (this.IsEnter = !1),
      this.FlowLogic &&
        ((this.FlowLogic.IsPause = !0), this.FlowLogic.IsPlaying) &&
        this.FlowLogic.StopFlow();
  }
  PlayDynamicFlowBegin(t) {
    this.ForceStopFlow(),
      (this.IsPlayDynamicFlow = !0),
      this.InitFlowLogicRange(
        t.BubbleData?.EnterRadius,
        t.BubbleData?.LeaveRadius,
      ),
      this.ResetFlowPlayCoolDownTime();
  }
  PlayDynamicFlowEnd() {
    this.IsPlayDynamicFlow &&
      (this.ForceStopFlow(),
      (this.IsPlayDynamicFlow = !1),
      this.InitFlowLogicRange(
        this.FlowData?.EnterRange,
        this.FlowData?.LeaveRange,
      ));
  }
};
(CharacterFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(28)],
  CharacterFlowComponent,
)),
  (exports.CharacterFlowComponent = CharacterFlowComponent);
//# sourceMappingURL=CharacterFlowComponent.js.map
