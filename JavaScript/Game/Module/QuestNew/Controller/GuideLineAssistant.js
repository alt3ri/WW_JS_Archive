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
  constructor(t) {
    super(),
      (this.CVs = 0),
      (this._ro = void 0),
      (this.uro = void 0),
      (this.UYt = []),
      (this.QZe = void 0),
      (this.cro = 0),
      (this.mro = UE.NewArray(UE.Vector)),
      (this.dro = Vector_1.Vector.Create()),
      (this.Cro = Vector_1.Vector.Create(
        QUERY_VALUE,
        QUERY_VALUE,
        QUERY_VALUE,
      )),
      (this.gro = 0),
      (this.fro = 0),
      (this.pro = -0),
      (this.vro = 0),
      (this.Mro = -0),
      (this.Ero = !1),
      (this.Sro = !1),
      (this.ero = (t, e) => {
        210004 === e &&
          ModelManager_1.ModelManager.GeneralLogicTreeModel.UpdateGuideLineStartShowTime();
      }),
      (this.$Ct = (t) => {
        t === this.CVs &&
          (ModelManager_1.ModelManager.GeneralLogicTreeModel.UpdateGuideLineStartShowTime(),
          this.yro());
      }),
      (this.DQt = (t, e, s) => {
        6 === t.Type &&
          (this.lzs()?.Id ?? 0) === t.TreeConfigId &&
          s === Protocol_1.Aki.Protocol.BNs._5n &&
          this.$Ct(t.BtType);
      }),
      (this.SpawnQuestGuideLine = () => {
        this.Tro(),
          (this._ro = ActorSystem_1.ActorSystem.Get(
            UE.BP_Fx_WayFinding_C.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
          )),
          this.Lro(),
          (this.uro = UE.NewArray(UE.Vector));
      }),
      (this.yro = () => {
        (this.QZe = void 0),
          (this.UYt.length = 0) < this.vro &&
            this.UYt.push(new EndShowProcess()),
          this.UYt.push(new StartShowProcess());
      }),
      (this.Iro = () => {
        (this.QZe.Finished = !0), this.UYt.shift(), (this.QZe = void 0);
      }),
      (this.CTa = !0),
      (this.CVs = t);
  }
  OnInit() {}
  OnDestroy() {
    (this.UYt.length = 0), this.Tro(), this.mro.Empty();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
      this.SpawnQuestGuideLine,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.ero,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.$Ct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.yro,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
      this.SpawnQuestGuideLine,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.ero,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.$Ct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.yro,
      );
  }
  Tro() {
    ObjectUtils_1.ObjectUtils.IsValid(this._ro) &&
      (ActorSystem_1.ActorSystem.Put(this._ro), (this._ro = void 0));
  }
  Tick(t) {
    this.Dro(t),
      this.sii(),
      this.CheckCanShowGuideLine()
        ? ((t = this.Rro()),
          (this.Sro && (!t || this.Ero)) || ((this.Sro = !0), this.yro()))
        : (0 < this.vro && this.Sro && this.Lro(), (this.Sro = !1));
  }
  sii() {
    if (0 !== this.UYt?.length && !this.QZe)
      switch (((this.QZe = this.UYt[0]), this.QZe.ProcessType)) {
        case 0:
          this.Uro();
          break;
        case 1:
          this.Aro(2);
      }
  }
  Lro() {
    this.UYt.push(new EndShowProcess()),
      this.CTa || ((this.CTa = !0), this._ro?.NS_Fx_WayFinding.SetPaused(!0));
  }
  CheckCanShowGuideLine() {
    var t;
    return (
      !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
      ((t = this.lzs()) && t.CanShowGuideLine()
        ? !!t.IsAlwaysShowGuideLine() ||
          ((t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetGuideLineStartShowTime()),
          this.cro ||
            (this.cro = parseInt(
              ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig(
                "GuideLineShowTime",
              ),
            )),
          TimeUtil_1.TimeUtil.GetServerTime() - t <= this.cro)
        : (this.Lro(), !1))
    );
  }
  Rro() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        38,
      );
    return t ? this.Pro(t.IsMoving) : (this.Pro(!1), !1);
  }
  Dro(t) {
    this.QZe &&
      ((this.Mro = MathUtils_1.MathUtils.Clamp(this.Mro + t / 500, 0, 1)),
      (this.vro = MathUtils_1.MathUtils.Lerp(this.gro, this.fro, this.Mro)),
      this._ro.NS_Fx_WayFinding.SetNiagaraVariableFloat("Spawn", this.vro),
      1 <= this.Mro && this.pro < 1 && this.Iro(),
      (this.pro = this.Mro));
  }
  Uro() {
    var t = this.lzs();
    if (t) {
      var e = t.GetCurrentActiveChildQuestNode();
      if (e) {
        var s = t.GetNodeTrackPosition(e.NodeId),
          i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
        if (s && i) {
          this.dro.Set(i.X, i.Y, i.Z);
          var r =
            UE.RoadNetNavigationSystem.RoadNet_FindPathToLocationSynchronously(
              GlobalData_1.GlobalData.World,
              this.dro.ToUeVector(),
              s.ToUeVector(),
            );
          if (r && r.PathPoints.Num())
            if (r.Length <= 100 * t.GetGuideLineHideDistance(e.NodeId))
              this.Lro();
            else {
              this.uro.Empty();
              for (let t = 0; t < r.PathPoints.Num(); t++) {
                var h = r.PathPoints.Get(t);
                this.uro.Add(h);
              }
              this.xro(this._ro.Spline, this.uro, 4),
                this._ro.NS_Fx_WayFinding.ReinitializeSystem(),
                this.CTa &&
                  ((this.CTa = !1), this._ro.NS_Fx_WayFinding.SetPaused(!1));
            }
          else this.Lro();
        } else this.Lro();
      } else this.Lro();
    } else this.Lro();
  }
  xro(s, e, i) {
    s.ClearSplinePoints();
    var r = UE.NewArray(UE.Vector);
    for (let t = 0; t < e.Num() - 1; ++t) {
      var h = e.Get(t),
        n = e.Get(t + 1);
      if ((r.Add(h), Math.abs(n.Z - h.Z) > SPLIT_Z_LIMIT)) break;
      t + 1 === e.Num() - 1 && r.Add(n);
    }
    s.SetSplinePoints(r, 1, !0), this.mro.Empty();
    var o = s.GetSplineLength();
    for (let t = 0; t < s.GetNumberOfSplinePoints() - 1; ++t) {
      var a = s.GetDistanceAlongSplineAtSplinePoint(t),
        _ = s.GetDistanceAlongSplineAtSplinePoint(t + 1),
        l = (_ - a) / i;
      for (let e = a; e <= _ && e <= o; e += l) {
        var v = s.GetWorldLocationAtDistanceAlongSpline(e),
          c = (0, puerts_1.$ref)(void 0);
        let t = v;
        UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          v,
          c,
          void 0,
          void 0,
          this.Cro.ToUeVector(),
        ) && (t = (0, puerts_1.$unref)(c)),
          this.mro.Add(t);
      }
    }
    s.SetSplinePoints(this.mro, 1, !0), this.Aro(1);
  }
  Aro(t) {
    switch (((this.gro = this.vro), (this.Mro = 0), t)) {
      case 1:
        this.fro = 2;
        break;
      case 2:
        this.fro = 0;
    }
  }
  Pro(t) {
    return this.Ero !== t && ((this.Ero = t), !0);
  }
  lzs() {
    let t = void 0;
    switch (this.CVs) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        t = ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo();
    }
    return t;
  }
}
exports.GuideLineAssistant = GuideLineAssistant;
//# sourceMappingURL=GuideLineAssistant.js.map
