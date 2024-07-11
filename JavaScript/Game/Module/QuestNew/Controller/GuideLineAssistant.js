"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideLineAssistant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  QUERY_VALUE = 500,
  SPLIT_Z_LIMIT = 2e3;
class PendingProcess {
  constructor(t) {
    (this.ProcessType = t),
      (this.ProcessId = 0),
      (this.Finished = !1),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
  constructor() {
    super(0);
  }
}
class EndShowProcess extends PendingProcess {
  constructor() {
    super(1);
  }
}
class GuideLineAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.moo = void 0),
      (this.doo = void 0),
      (this.U$t = []),
      (this.bze = void 0),
      (this.Coo = 0),
      (this.goo = UE.NewArray(UE.Vector)),
      (this.foo = Vector_1.Vector.Create()),
      (this.poo = Vector_1.Vector.Create(
        QUERY_VALUE,
        QUERY_VALUE,
        QUERY_VALUE,
      )),
      (this.voo = 0),
      (this.Moo = 0),
      (this.Soo = -0),
      (this.Eoo = 0),
      (this.yoo = -0),
      (this.Ioo = !1),
      (this.Too = !1),
      (this.Loo = () => {
        (this.bze = void 0),
          (this.U$t.length = 0) < this.Eoo &&
            this.U$t.push(new EndShowProcess()),
          this.U$t.push(new StartShowProcess());
      }),
      (this.ooo = (t, e) => {
        210004 === e &&
          ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime();
      }),
      (this.Gdt = (t) => {
        t === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
          (ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime(),
          this.Loo());
      }),
      (this.DKt = (t, e, i) => {
        var s;
        6 === t.Type &&
          (s =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()) &&
          s.Id === t.TreeConfigId &&
          i === Protocol_1.Aki.Protocol.N2s.Lkn &&
          this.Gdt(Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest);
      }),
      (this.Doo = () => {
        (this.bze.Finished = !0), this.U$t.shift(), (this.bze = void 0);
      });
  }
  OnInit() {}
  OnDestroy() {
    (this.U$t.length = 0), this.Roo(), this.goo.Empty();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharUseSkill,
      this.ooo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gdt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DKt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Loo,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.ooo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gdt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DKt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Loo,
      );
  }
  SpawnQuestGuideLine() {
    this.Roo(),
      (this.moo = ActorSystem_1.ActorSystem.Get(
        UE.BP_Fx_WayFinding_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      this.Uoo(),
      (this.doo = UE.NewArray(UE.Vector));
  }
  Roo() {
    ObjectUtils_1.ObjectUtils.IsValid(this.moo) &&
      (ActorSystem_1.ActorSystem.Put(this.moo), (this.moo = void 0));
  }
  Tick(t) {
    this.Aoo(t),
      this.sti(),
      this.CheckCanShowGuideLine()
        ? ((t = this.Poo()),
          (this.Too && (!t || this.Ioo)) || ((this.Too = !0), this.Loo()))
        : (0 < this.Eoo && this.Too && this.Uoo(), (this.Too = !1));
  }
  sti() {
    if (0 !== this.U$t?.length && !this.bze)
      switch (((this.bze = this.U$t[0]), this.bze.ProcessType)) {
        case 0:
          this.xoo();
          break;
        case 1:
          this.woo(2);
      }
  }
  Uoo() {
    this.U$t.push(new EndShowProcess());
  }
  CheckCanShowGuideLine() {
    var t;
    return !(
      ModelManager_1.ModelManager.PlotModel.IsInPlot ||
      ((t =
        ModelManager_1.ModelManager.QuestNewModel.GetGuideLineStartShowTime()),
      this.Coo ||
        (this.Coo = parseInt(
          ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig(
            "GuideLineShowTime",
          ),
        )),
      TimeUtil_1.TimeUtil.GetServerTime() - t > this.Coo)
    );
  }
  Poo() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        36,
      );
    return t ? this.Boo(t.IsMoving) : (this.Boo(!1), !1);
  }
  Aoo(t) {
    this.bze &&
      ((this.yoo = MathUtils_1.MathUtils.Clamp(this.yoo + t / 500, 0, 1)),
      (this.Eoo = MathUtils_1.MathUtils.Lerp(this.voo, this.Moo, this.yoo)),
      this.moo.NS_Fx_WayFinding.SetNiagaraVariableFloat("Spawn", this.Eoo),
      1 <= this.yoo && this.Soo < 1 && this.Doo(),
      (this.Soo = this.yoo));
  }
  xoo() {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    if (t && t.CanShowGuideLine()) {
      var e = t.GetCurrentActiveChildQuestNode();
      if (e) {
        var i = t.GetNodeTrackPosition(e.NodeId),
          s = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
        if (i && s) {
          this.foo.Set(s.X, s.Y, s.Z);
          var r =
            UE.RoadNetNavigationSystem.RoadNet_FindPathToLocationSynchronously(
              GlobalData_1.GlobalData.World,
              this.foo.ToUeVector(),
              i.ToUeVector(),
            );
          if (r && r.PathPoints.Num())
            if (r.Length <= 100 * t.GetGuideLineHideDistance(e.NodeId))
              this.Uoo();
            else {
              this.doo.Empty();
              for (let t = 0; t < r.PathPoints.Num(); t++) {
                var h = r.PathPoints.Get(t);
                this.doo.Add(h);
              }
              this.boo(this.moo.Spline, this.doo, 4),
                this.moo.NS_Fx_WayFinding.ReinitializeSystem();
            }
          else this.Uoo();
        } else this.Uoo();
      } else this.Uoo();
    } else this.Uoo();
  }
  boo(i, e, s) {
    i.ClearSplinePoints();
    var r = UE.NewArray(UE.Vector);
    for (let t = 0; t < e.Num() - 1; ++t) {
      var h = e.Get(t),
        n = e.Get(t + 1);
      if ((r.Add(h), Math.abs(n.Z - h.Z) > SPLIT_Z_LIMIT)) break;
      t + 1 === e.Num() - 1 && r.Add(n);
    }
    i.SetSplinePoints(r, 1, !0), this.goo.Empty();
    var o = i.GetSplineLength();
    for (let t = 0; t < i.GetNumberOfSplinePoints() - 1; ++t) {
      var a = i.GetDistanceAlongSplineAtSplinePoint(t),
        _ = i.GetDistanceAlongSplineAtSplinePoint(t + 1),
        l = (_ - a) / s;
      for (let e = a; e <= _ && e <= o; e += l) {
        var v = i.GetWorldLocationAtDistanceAlongSpline(e),
          c = (0, puerts_1.$ref)(void 0);
        let t = v;
        UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          v,
          c,
          void 0,
          void 0,
          this.poo.ToUeVector(),
        ) && (t = (0, puerts_1.$unref)(c)),
          this.goo.Add(t);
      }
    }
    i.SetSplinePoints(this.goo, 1, !0), this.woo(1);
  }
  woo(t) {
    switch (((this.voo = this.Eoo), (this.yoo = 0), t)) {
      case 1:
        this.Moo = 2;
        break;
      case 2:
        this.Moo = 0;
    }
  }
  Boo(t) {
    return this.Ioo !== t && ((this.Ioo = t), !0);
  }
}
exports.GuideLineAssistant = GuideLineAssistant;
//# sourceMappingURL=GuideLineAssistant.js.map
