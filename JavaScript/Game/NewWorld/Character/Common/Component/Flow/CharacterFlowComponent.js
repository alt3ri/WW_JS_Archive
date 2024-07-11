"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? i
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(i, e))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, i, e, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(i, e, n) : s(i, e)) || n);
    return 3 < r && n && Object.defineProperty(i, e, n), n;
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
      t = this.ActorComp.CreatureData.ComponentDataMap.get("Uys")?.Uys?.MIs;
      if (t)
        for (const e of t) {
          var i = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(
            e.pIs,
          );
          if (i) {
            i =
              DynamicFlowController_1.DynamicFlowController.CreateCharacterFlowData(
                i,
              );
            DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(i);
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
    var t, i;
    this.FlowData &&
      ((t = this.FlowData.EnterRange),
      (i = this.FlowData.LeaveRange),
      (this.MinRangeSquared = t * t),
      (this.MaxRangeSquared = i * i));
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
  InitFlowLogicRange(t, i) {
    return !(
      !this.FlowData ||
      !this.FlowLogic ||
      ((t = t ?? exports.DEFAULT_BUBBLE_ENTER_RANGE),
      (i = i ?? exports.DEFAULT_BUBBLE_LEAVE_RANGE),
      (this.MinRangeSquared = t * t),
      (this.MaxRangeSquared = i * i),
      0)
    );
  }
  CheckCondition() {
    return (
      !!this.FlowData &&
      !!this.IsInit &&
      !(
        (!this.FlowLogic.HasValidFlow() && !this.IsPlayDynamicFlow) ||
        !this.ActorComp?.Owner?.IsValid() ||
        !Global_1.Global.BaseCharacter ||
        ((this.ActorComp.Owner.bHidden ||
          !this.FlowLogic.GetUiRootItemState()) &&
          (this.ForceStopFlow(), 1))
      )
    );
  }
  OnTick(t) {
    var i;
    this.CheckCondition() &&
      ((i =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      (i = Vector_1.Vector.DistSquared2D(
        i,
        this.ActorComp.ActorLocationProxy,
      )) < this.MinRangeSquared
        ? (this.IsEnter ||
            this.FlowLogic.IsPlaying ||
            (this.FlowLogic.EnableUpdate = !0),
          (this.IsEnter = !0),
          (this.FlowLogic.IsPause = !1))
        : i < this.MaxRangeSquared
          ? ((this.IsEnter = !1), (this.FlowLogic.IsPause = !0))
          : this.ForceStopFlow(),
      this.FlowLogic.Tick(Time_1.Time.DeltaTimeSeconds));
  }
  RemoveFlowActions() {
    this.Entity.GetComponent(72).HideDialogueText();
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
