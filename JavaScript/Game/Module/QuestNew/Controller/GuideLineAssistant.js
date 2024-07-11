"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideLineAssistant = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const QUERY_VALUE = 500;
const SPLIT_Z_LIMIT = 2e3;
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
        e === 210004 &&
          ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime();
      }),
      (this.Gdt = (t) => {
        t === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
          (ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime(),
          this.Loo());
      }),
      (this.DKt = (t, e, i) => {
        let s;
        t.Type === 6 &&
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
        : (this.Eoo > 0 && this.Too && this.Uoo(), (this.Too = !1));
  }
  sti() {
    if (this.U$t?.length !== 0 && !this.bze)
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
    let t;
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
    const t =
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
      this.yoo >= 1 && this.Soo < 1 && this.Doo(),
      (this.Soo = this.yoo));
  }
  xoo() {
    const t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    if (t && t.CanShowGuideLine()) {
      const e = t.GetCurrentActiveChildQuestNode();
      if (e) {
        const i = t.GetNodeTrackPosition(e.NodeId);
        const s =
          GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
        if (i && s) {
          this.foo.Set(s.X, s.Y, s.Z);
          const r =
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
                const h = r.PathPoints.Get(t);
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
    const r = UE.NewArray(UE.Vector);
    for (let t = 0; t < e.Num() - 1; ++t) {
      const h = e.Get(t);
      const n = e.Get(t + 1);
      if ((r.Add(h), Math.abs(n.Z - h.Z) > SPLIT_Z_LIMIT)) break;
      t + 1 === e.Num() - 1 && r.Add(n);
    }
    i.SetSplinePoints(r, 1, !0), this.goo.Empty();
    const o = i.GetSplineLength();
    for (let t = 0; t < i.GetNumberOfSplinePoints() - 1; ++t) {
      const a = i.GetDistanceAlongSplineAtSplinePoint(t);
      const _ = i.GetDistanceAlongSplineAtSplinePoint(t + 1);
      const l = (_ - a) / s;
      for (let e = a; e <= _ && e <= o; e += l) {
        const v = i.GetWorldLocationAtDistanceAlongSpline(e);
        const c = (0, puerts_1.$ref)(void 0);
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
// # sourceMappingURL=GuideLineAssistant.js.map
