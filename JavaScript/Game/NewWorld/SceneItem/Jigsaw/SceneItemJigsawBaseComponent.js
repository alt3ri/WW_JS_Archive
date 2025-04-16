"use strict";
var SceneItemJigsawBaseComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var h,
        o = arguments.length,
        r =
          o < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, s, e);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (r = (o < 3 ? h(r) : 3 < o ? h(i, s, r) : h(i, s)) || r);
      return 3 < o && r && Object.defineProperty(i, s, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemJigsawBaseComponent = exports.JigsawIndex = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TicTacToeGame_1 = require("../../../LevelGamePlay/Chess/TicTacToe/TicTacToeGame"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  COS_45 = Math.cos(0.25 * Math.PI),
  TIMER_PERIOD = 500;
class JigsawIndex {
  constructor(t, i) {
    (this.Row = 0),
      (this.Col = 0),
      (this.jEe = void 0),
      (this.hnr = void 0),
      (this.lnr = void 0),
      (this.Row = t),
      (this.Col = i);
  }
  DeepCopy(t) {
    (this.Row = t.Row), (this.Col = t.Col);
  }
  SetValue(t, i) {
    (this.Row = t), (this.Col = i);
  }
  Equels(t) {
    return this.Row === t.Row && this.Col === t.Col;
  }
  GetKey() {
    return (
      (this.jEe && this.hnr === this.Row && this.lnr === this.Col) ||
        ((this.jEe = this.Row.toString() + "," + this.Col.toString()),
        (this.hnr = this.Row),
        (this.lnr = this.Col)),
      this.jEe
    );
  }
  static GenObjFromKey(t) {
    t = t.split(",");
    return new JigsawIndex(Number(t[0]), Number(t[1]));
  }
  static GenKey(t, i) {
    return t.toString() + "," + i.toString();
  }
}
exports.JigsawIndex = JigsawIndex;
class JigsawState {
  constructor(t, i, s) {
    (this.State = 0),
      (this.Occupancy = !1),
      (this.ActivatedNum = 0),
      (this.State = t ?? 0),
      (this.Occupancy = i ?? !1),
      (this.ActivatedNum = s ?? 0);
  }
}
class BoxTraceCheckData {
  constructor(t, i, s) {
    (this.Location = Vector_1.Vector.Create()),
      (this.TagId = 0),
      (this.CurIndex = void 0),
      (this.Location = t),
      (this.TagId = i),
      (this.CurIndex = s);
  }
}
let SceneItemJigsawBaseComponent =
  (SceneItemJigsawBaseComponent_1 = class SceneItemJigsawBaseComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.fcn = void 0),
        (this.pcn = new Map()),
        (this.vcn = new Map()),
        (this.Mcn = new Map()),
        (this.Ecn = void 0),
        (this.Scn = void 0),
        (this.ycn = 0),
        (this.ui = !1),
        (this.Icn = new Set()),
        (this.Tcn = new Map()),
        (this.Lcn = void 0),
        (this._Ga = void 0),
        (this.Dcn = (t, i, s) => {
          var e = i.Entity.GetComponent(0).GetPbDataId();
          this.Icn.has(e) && this.Rcn(i), this._Ga && this.P5a(e);
        }),
        (this.Ucn = () => {
          this.Acn(), this.Pcn();
        }),
        (this.JMc = !1),
        (this.fFl = !1),
        (this.vFl = void 0),
        (this.SFl = !0),
        (this.xcn = () => {
          !this.Tcn.size &&
            this.Lcn &&
            (TimerSystem_1.TimerSystem.Remove(this.Lcn), (this.Lcn = void 0));
          for (var [t, i] of this.Tcn) {
            var s = t.GetComponent(153);
            if (s?.Valid)
              for (const e of i)
                s.StartBoxTrace(e.Location)
                  ? this.fcn.HasTagByIndex(e.CurIndex, e.TagId) &&
                    this.fcn.RemoveTagsByIndex(e.CurIndex, e.TagId)
                  : this.fcn.HasTagByIndex(e.CurIndex, e.TagId) ||
                    this.fcn.AddTagsByIndex(e.CurIndex, e.TagId);
          }
        }),
        (this.uGa = void 0),
        (this.cGa = void 0),
        (this.mGa = void 0),
        (this.dGa = void 0),
        (this.CGa = void 0),
        (this.wkl = !1),
        (this.ewl = !1),
        (this.gGa = (t, i) => {
          var s = this.Config.JigsawConfig.Column,
            e = t % s,
            h = Math.floor(t / s),
            o = this.pGa,
            h = (o.SetValue(h, e), o.GetKey());
          this.Mcn.has(h) &&
            (e = this.Mcn.get(h)) &&
            ((o = i % s),
            (h = Math.floor(i / s)),
            (s = this.pGa).SetValue(h, o),
            (h = s.GetKey()),
            this.Mcn.has(h) ||
              ((this.twl = !0),
              (this.wkl = !0),
              this.Mcn.delete(e.PutDownIndex.GetKey()),
              this.Mcn.set(s.GetKey(), e),
              (o = e.Entity.GetComponent(252)),
              (h =
                this.Config?.JigsawConfig.Shape ===
                IAction_1.EJigsawShape.Circle),
              o &&
                (this._Ga.CheckIsCenter(t) || this._Ga.CheckIsCenter(i) || !h
                  ? o.OnTicTacToePieceMove(s, this.vGa)
                  : (this.MGa(t, i),
                    o.OnTicTacToePieceMove(
                      s,
                      this.vGa,
                      this.uGa,
                      this.cGa,
                      this.mGa,
                    )))));
        }),
        (this.vGa = (t, i, s) => {
          this.oGa && t && this.oGa(t), this.fGa(i, s);
        }),
        (this.SGa = void 0),
        (this.pGa = void 0),
        (this.EGa = new Map()),
        (this.yGa = new Map()),
        (this.IGa = void 0),
        (this.iwl = new Set()),
        (this.w5a = new Set()),
        (this.B5a = new Set()),
        (this.ZMc = () => {
          !this._Ga ||
            0 !== this.w5a.size ||
            (this.fcn && !this.fcn.GetIsFinish()) ||
            this.eEc();
        }),
        (this.w1h = void 0),
        (this.oGa = void 0),
        (this.zll = void 0),
        (this.vAl = void 0),
        (this.QPl = void 0),
        (this.KPl = void 0),
        (this.mJl = !1);
    }
    get IsTicTacToe() {
      return void 0 !== this._Ga;
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemJigsawBaseComponent_1)[0];
      this.Config = t;
      for (const s of this.Config.JigsawConfig.Pieces) {
        var i = new JigsawIndex(s.Index.RowIndex, s.Index.ColumnIndex);
        switch (s.InitState) {
          case IAction_1.EJigsawPieceState.Disable:
            this.pcn.set(i.GetKey(), new JigsawState());
            break;
          case IAction_1.EJigsawPieceState.Correct:
            this.pcn.set(i.GetKey(), new JigsawState(1));
            break;
          case IAction_1.EJigsawPieceState.Incorrect:
            this.pcn.set(i.GetKey(), new JigsawState(2));
        }
      }
      return !0;
    }
    OnStart() {
      return (
        (this.EIe = this.Entity.GetComponent(0)),
        (this.Hte = this.Entity.GetComponent(200)),
        (this.fcn = this.Entity.GetComponent(157)),
        !0
      );
    }
    OnActivate() {
      if ((this.wcn(), 0 < this.EIe.OccupiedGridInfo.size)) {
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.Dcn,
        ),
          this.Icn.clear();
        for (const e of this.EIe.OccupiedGridInfo) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            e[0],
          );
          this.Icn.add(e[0]), t?.IsInit && this.Rcn(t);
        }
      }
      if (
        (this.Config.CompleteCondition.Type ===
          IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece &&
          this.TGa(),
        0 < this.EIe.DynamicGridInfo.length)
      )
        for (const h of this.EIe.DynamicGridInfo) {
          var i = new JigsawIndex(h.zTs, h.ZTs),
            s = MathUtils_1.MathUtils.LongToNumber(h.eLs);
          this.DynamicModifySocketState(i, s);
        }
      this.SFl = this.EIe.BoardCanMove;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.Dcn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.Dcn,
          ),
        this.Lcn &&
          (TimerSystem_1.TimerSystem.Remove(this.Lcn), (this.Lcn = void 0)),
        !0
      );
    }
    DeleteItem(t) {
      t = t.PutDownIndex.GetKey();
      this.Mcn.has(t) && this.Mcn.delete(t);
    }
    Rcn(t) {
      var i = t.Entity.GetComponent(136),
        s = t.Entity.GetComponent(0),
        e = this.EIe.OccupiedGridInfo.get(s.GetPbDataId()).l8n,
        h = new JigsawIndex(e.N5n, e.F5n),
        e = ((i.Rotation = e.V5n), this.GetBlockLocationByIndex(h)),
        o = Rotator_1.Rotator.Create(0, -i.Rotation, 0).Quaternion(),
        o = this.Hte?.ActorTransform.TransformRotation(o.ToUeQuat()).Rotator(),
        e =
          (t.Entity.GetComponent(200)?.SetActorLocationAndRotation(
            e.ToUeVector(),
            o,
          ),
          this.Entity.GetComponent(159)),
        o = e?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock,
        t = t.Entity.GetComponent(154);
      t && ((t.ActivatedOutlet = e), (s.RelationId = this.EIe.GetPbDataId())),
        this.PutDownItem(i, h, o);
    }
    wcn() {
      if (this.Config.ModelId) {
        var s = [],
          e = new Map();
        for (let i = 0; i < this.Config.JigsawConfig.Row; i++)
          for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
            var h = new JigsawIndex(i, t),
              o = [];
            if (this.Entity.GetComponent(131).IsInState(4))
              switch (this.GetBlockStateByIndex(h)) {
                case 2:
                  o.push(-1375820440), s.push(h);
                  break;
                case 1:
                  o.push(-894208705), o.push(1248700469), s.push(h);
              }
            else
              switch (this.GetBlockStateByIndex(h)) {
                case 2:
                  o.push(-1375820440), o.push(-2002333932), s.push(h);
                  break;
                case 1:
                  o.push(-894208705), o.push(-1270526641), s.push(h);
              }
            e.set(h.GetKey(), o);
          }
        this.fcn.InitGenerateInfo(
          this.Config.ModelId.toString(),
          s,
          (t) => this.GetBlockLocationByIndex(t, !1),
          e,
          this.ZMc,
        );
      } else this.fcn.SetIsFinish(!0);
    }
    GetBlockLocationByIndex(s, e = !0) {
      if (
        !(
          s.Row >= this.Config.JigsawConfig.Row ||
          s.Col >= this.Config.JigsawConfig.Column
        )
      ) {
        var h = this.Config?.JigsawConfig.Shape,
          o = this.vcn.get(s.GetKey());
        if (void 0 !== o && e) return o;
        var o = this.Config.JigsawConfig.Row,
          r = this.Config.JigsawConfig.Column,
          o = new JigsawIndex(o / 2 - 0.5, r / 2 - 0.5),
          r = o.Row - s.Row,
          o = o.Col - s.Col,
          n = this.Config.JigsawConfig.Size;
        let t = Vector2D_1.Vector2D.Create(r, o),
          i =
            (h === IAction_1.EJigsawShape.Circle &&
              ((t = Vector2D_1.Vector2D.Create(-o, r)),
              (h = Math.max(Math.abs(r), Math.abs(o))),
              0 < t.Size()) &&
              ((r = h / t.Size()),
              (t = Vector2D_1.Vector2D.Create(r, r).MultiplyEqual(t))),
            (t = Vector2D_1.Vector2D.Create(n, n).MultiplyEqual(t)),
            Vector_1.Vector.ZeroVectorProxy);
        e &&
          (i = Vector_1.Vector.Create(
            this.Config.PlaceOffset.X ?? 0,
            this.Config.PlaceOffset.Y ?? 0,
            this.Config.PlaceOffset.Z ?? 0,
          ));
        (o = new UE.VectorDouble(t.X + i.X, -t.Y + i.Y, i.Z)),
          (h = Vector_1.Vector.Create(0, 0, 0));
        return (
          h.FromUeVector(this.Hte.ActorTransform.TransformPosition(o)),
          e && this.vcn.set(s.GetKey(), h),
          h
        );
      }
    }
    CalcJigsawSocketLocation(t = !1) {
      var i,
        s,
        e,
        h,
        o,
        r,
        n,
        a = Vector_1.Vector.Create(
          CameraController_1.CameraController.CameraLocation,
        ),
        c = Vector_1.Vector.Create(0, 0, 0);
      CameraController_1.CameraController.CameraRotator.Vector(c),
        c.Normalize();
      let _ = MathUtils_1.MathUtils.MaxFloat,
        l = void 0;
      for ([i, s] of this.pcn)
        0 === s.State ||
          (s.Occupancy && !t) ||
          ((e = JigsawIndex.GenObjFromKey(i)),
          (h = this.GetBlockLocationByIndex(e)),
          (o = Vector_1.Vector.Create(a)),
          h.Subtraction(a, o),
          (h = Vector_1.Vector.Create(o)),
          o.Normalize(),
          (o = o.DotProduct(c)),
          (o = Math.acos(o) * (180 / Math.PI) * h.Size()) < _ &&
            ((_ = o), (l = e)));
      return void 0 === l
        ? [void 0, void 0]
        : ((r = Vector_1.Vector.Create(this.GetBlockLocationByIndex(l))),
          (n = this.Hte?.ActorTransform.InverseTransformPosition(
            r.ToUeVector(),
          )),
          r.FromUeVector(n),
          [r, l]);
    }
    CheckJigsawBlockIllegal(t, i) {
      if (t.Config.FillCfg.Type !== IComponent_1.EFillType.Direction)
        for (const e of t.GetActiveBlockOffset()) {
          var s = new JigsawIndex(i.Row + e.Row, i.Col + e.Col),
            s = this.pcn.get(s.GetKey());
          if (void 0 === s || 0 === s.State || s.Occupancy) return !0;
        }
      return !1;
    }
    CheckJigsawBlockCorrect(t, i) {
      for (const e of t.GetActiveBlockOffset()) {
        var s = new JigsawIndex(i.Row + e.Row, i.Col + e.Col);
        if (1 !== this.pcn.get(s.GetKey()).State) return !1;
      }
      return !0;
    }
    PutDownItem(i, s, e, h = !0) {
      var t = i.Entity.GetComponent(153),
        t =
          (t && t.UpdateBoxTrace(this, s),
          (i.PutDownIndex = s),
          i.OnPutDownToBase(this),
          this.pcn.get(s.GetKey()));
      if (
        0 === t.State ||
        (t.Occupancy && e !== IComponent_1.EItemFoundation.PulseDevice)
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[SceneItemJigsawBaseComponent.OnputDownItem] 目标位置不可用",
          );
      else {
        let t = [];
        switch (i.Config.FillCfg.Type) {
          case IComponent_1.EFillType.Fixed:
            t = i.GetActiveBlockOffset();
            break;
          case IComponent_1.EFillType.Direction:
            t = this.Bcn(s, i.Direction, i.Rotation);
        }
        for (const _ of t) {
          var o = new JigsawIndex(s.Row + _.Row, s.Col + _.Col),
            r = o.GetKey(),
            n = this.pcn.get(r);
          e === IComponent_1.EItemFoundation.BuildingBlock &&
            0 !== n.State &&
            (n.Occupancy = !0);
          let t = void 0;
          0 === n.ActivatedNum &&
            (2 === n.State
              ? (t = -1279673628)
              : 1 === n.State && (t = 692213831)),
            (n.ActivatedNum += 1),
            0 < n.ActivatedNum && (n.Occupancy = !0),
            void 0 !== t && this.fcn.AddTagsByIndex(o, t),
            e !== IComponent_1.EItemFoundation.PulseDevice ||
              r === s.GetKey() ||
              this.Mcn.has(r) ||
              (n.Occupancy = !1);
        }
        this.Mcn.set(s.GetKey(), i);
        for (var [a, c] of this.Mcn) {
          a = JigsawIndex.GenObjFromKey(a);
          this.Tcn.has(c.Entity) ||
            (this.Tcn.set(c.Entity, []), this.Lcn) ||
            (this.Lcn = TimerSystem_1.TimerSystem.Forever(
              this.xcn,
              TIMER_PERIOD,
            )),
            this.bcn(a, c);
        }
        h && this.CheckFinish();
      }
    }
    CheckFinish() {
      switch (this.Config.CompleteCondition.Type) {
        case IComponent_1.EJigsawCompleteCondition.ActivateAllCorrectPiece:
          for (var [, t] of this.pcn)
            if (1 === t.State && t.ActivatedNum <= 0) return;
          break;
        case IComponent_1.EJigsawCompleteCondition.PutInTheSpecifiedPiece:
          for (const s of this.Config.CompleteCondition.MatchList) {
            var i = JigsawIndex.GenKey(s.Index.RowIndex, s.Index.ColumnIndex),
              i = this.Mcn.get(i);
            if (!i?.Valid || i.CreatureDataComp.GetPbDataId() !== s.EntityId)
              return;
          }
          break;
        default:
          IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece;
          return;
      }
      this.EDe();
    }
    PickUpItem(t, i, s, e = !0) {
      t.OnPickUpFormBase(this);
      let h = [];
      switch (t.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          h = t.GetActiveBlockOffset();
          break;
        case IComponent_1.EFillType.Direction:
          h = this.Bcn(i, t.Direction, t.Rotation);
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          31,
          "[SceneItemJigsawBaseComp] OnPickUpItem",
          ["PbDataId", t.Entity.GetComponent(0)?.GetPbDataId()],
          ["SocketIndex", i.GetKey()],
          ["Direction", t.Direction.toString(2)],
          ["Rotation", t.Rotation],
          ["offset", h],
        );
      for (const _ of h) {
        var o = new JigsawIndex(i.Row + _.Row, i.Col + _.Col),
          r = o.GetKey(),
          r = this.pcn.get(r);
        s === IComponent_1.EItemFoundation.BuildingBlock &&
          0 !== r.State &&
          (r.Occupancy = !1);
        let t = void 0;
        --r.ActivatedNum,
          0 === r.ActivatedNum &&
            (2 === r.State
              ? (t = -1279673628)
              : 1 === r.State && (t = 692213831),
            (r.Occupancy = !1)),
          void 0 !== t && this.fcn.RemoveTagsByIndex(o, t);
      }
      let n = "";
      for (var [a, c] of this.Mcn)
        if (c === t) {
          n = a;
          break;
        }
      "" !== n && this.Mcn.delete(n),
        this.RemoveMagnetTipsTag(i),
        this.Tcn.has(t.Entity) && this.Tcn.delete(t.Entity),
        e && this.CheckFinish();
    }
    GetBlockStateByIndex(t) {
      t = t.GetKey();
      return this.pcn.get(t).State;
    }
    AimBlockByIndex(t, h) {
      if (
        t?.GetKey() !== this.Ecn?.GetKey() ||
        h.Rotation !== this.ycn ||
        h !== this.Scn
      ) {
        var i = h.Entity.GetComponent(154),
          s =
            (i?.TryRemoveTagById(-2116928595),
            i?.TryAddTagById(-2116928595),
            this.Gcn(),
            this.Acn(),
            (this.Ecn = t),
            (this.Scn = h),
            (this.ycn = h.Rotation),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              ConfigManager_1.ConfigManager.ManipulateConfig
                .MatControllerDaPath,
              UE.ItemMaterialControllerActorData_C,
              (t) => {
                var i, s, e;
                t?.IsValid() &&
                  ((i = this.Scn.Entity.GetComponent(200)),
                  (s = new UE.TransformDouble()),
                  (e = this.GetBlockLocationByIndex(this.Ecn).ToUeVector()),
                  s.SetLocation(e),
                  (e = Rotator_1.Rotator.Create(
                    0,
                    -h.Rotation,
                    0,
                  ).Quaternion()),
                  (e = this.Hte?.ActorTransform.TransformRotation(
                    e.ToUeQuat(),
                  )),
                  s.SetRotation(e),
                  i.GetInteractionMainActor().MakeActorProjection(s, t));
              },
            ),
            this.CheckJigsawBlockIllegal(h, t));
        for (const r of this.Ncn(t, h)) {
          var e = new JigsawIndex(t.Row + r.Row, t.Col + r.Col),
            e = this.fcn.GetInteractionActorByIndex(e);
          if (e) {
            var o = e.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                s ? -1517802777 : -1817626386,
              ),
            );
            for (let t = 0; t < o.Num(); t++)
              o.Get(t)?.SetActorHiddenInGame(!1);
          }
        }
      }
    }
    Ncn(t, i, s) {
      switch (i.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          return i.GetActiveBlockOffset(s);
        case IComponent_1.EFillType.Direction:
          return this.Bcn(t, i.Direction, s ?? i.Rotation);
      }
      return [];
    }
    Gcn() {
      this.ui ||
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.HideJigsawBaseHint,
          this.Ucn,
        ),
        (this.ui = !0));
    }
    Pcn() {
      this.ui &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.HideJigsawBaseHint,
          this.Ucn,
        ),
        (this.ui = !1));
    }
    Acn() {
      if (this.Ecn && this.Scn) {
        this.Scn.Entity.GetComponent(200)
          .GetInteractionMainActor()
          .RemoveActorProjection();
        var t = this.Ncn(this.Ecn, this.Scn, this.ycn);
        for (const i of t) {
          var s = new JigsawIndex(this.Ecn.Row + i.Row, this.Ecn.Col + i.Col),
            s = this.fcn.GetInteractionActorByIndex(s);
          if (s) {
            let i = s.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                -1517802777,
              ),
            );
            for (let t = 0; t < i.Num(); t++)
              i.Get(t)?.SetActorHiddenInGame(!0);
            i = s.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                -1817626386,
              ),
            );
            for (let t = 0; t < i.Num(); t++)
              i.Get(t)?.SetActorHiddenInGame(!0);
          }
        }
      }
      (this.Ecn = void 0), (this.Scn = void 0);
    }
    RequestPutDownOrPickUpItem(t, i, s) {
      var e = Protocol_1.Aki.Protocol.ZJn.create(),
        h = Protocol_1.Aki.Protocol.TFs.create(),
        o = Protocol_1.Aki.Protocol.LFs.create(),
        r = Protocol_1.Aki.Protocol.Gks.create(),
        n = Protocol_1.Aki.Protocol.D2s.create(),
        a = t.Entity,
        c = a.GetComponent(200),
        _ = c.ActorLocationProxy,
        c = c.ActorRotationProxy;
      (h.N5n = i.Row),
        (h.F5n = i.Col),
        (h.V5n = t.Rotation),
        (r.X = _.X),
        (r.Y = _.Y),
        (r.Z = _.Z),
        (n.Pitch = c.Pitch),
        (n.Roll = c.Roll),
        (n.Yaw = c.Yaw),
        (o.l8n = r),
        (o._8n = n),
        (e.G5n = MathUtils_1.MathUtils.NumberToLong(
          this.EIe.GetCreatureDataId(),
        )),
        (e.O5n = MathUtils_1.MathUtils.NumberToLong(
          a.GetComponent(0).GetCreatureDataId(),
        )),
        (e.H5n = s ? 1 : 0),
        (e.k5n = h),
        (e.sKn = o),
        Net_1.Net.Call(16370, e, (t) => {
          switch (t.G9n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlaceFailOfAlreadyOnBoard:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.G9n,
                26871,
              );
          }
        });
    }
    EDe() {
      var t = Protocol_1.Aki.Protocol.izn.create();
      (t.j5n = MathUtils_1.MathUtils.NumberToLong(
        this.EIe.GetCreatureDataId(),
      )),
        Net_1.Net.Call(25051, t, (t) => {
          t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? this.OnFinish()
            : t.G9n ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrBoardNotActiveAllGrid &&
              (this.JMc = !0),
            this.Config.CompleteCondition.Type ===
              IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece &&
              this.LGa();
        });
    }
    OnFinish() {
      for (var [t, i] of this.pcn)
        1 === i.State &&
          this.fcn.AddTagsByIndex(JigsawIndex.GenObjFromKey(t), 1248700469),
          0 !== i.State &&
            (this.fcn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              692213831,
            ),
            this.fcn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -1270526641,
            ),
            this.fcn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -1279673628,
            ),
            this.fcn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -2002333932,
            ));
      for (const s of this.Mcn) s[1].OnFinish();
    }
    Bcn(t, i, s) {
      let e = [new JigsawIndex(0, 0)];
      return (
        this.Ocn(i, 1) && (e = e.concat(this.kcn(t, s))),
        this.Ocn(i, 2) && (e = e.concat(this.kcn(t, s + 180))),
        this.Ocn(i, 3) && (e = e.concat(this.kcn(t, s + 90))),
        (e = this.Ocn(i, 4) ? e.concat(this.kcn(t, s + 270)) : e)
      );
    }
    Ocn(t, i) {
      return 1 == ((t >> i) & 1);
    }
    kcn(i, t) {
      var s = [],
        e = [
          { RowDelta: -1, ColDelta: 0 },
          { RowDelta: 0, ColDelta: -1 },
          { RowDelta: 1, ColDelta: 0 },
          { RowDelta: 0, ColDelta: 1 },
        ],
        h = ((Math.floor(t / 90) % 4) + 4) % 4;
      for (
        let t = 0;
        t < this.Config.JigsawConfig.Row * this.Config.JigsawConfig.Column;
        t++
      ) {
        var o = i.Row + e[h].RowDelta * t,
          r = i.Col + e[h].ColDelta * t;
        if (
          o < 0 ||
          o >= this.Config.JigsawConfig.Row ||
          r < 0 ||
          r >= this.Config.JigsawConfig.Column
        )
          break;
        var n = this.pcn.get(JigsawIndex.GenKey(o, r));
        if (n && 0 === n.State) break;
        s.push(new JigsawIndex(o - i.Row, r - i.Col));
      }
      return s;
    }
    GetNextPosByDirection(t, i, s) {
      var e = new JigsawIndex(t.Row, t.Col),
        h = Vector_1.Vector.Create(i),
        o = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
        r = (o.Normalize(), Vector_1.Vector.Create()),
        i = i.DotProduct(o),
        o =
          (o.Multiply(i, r),
          h.SubtractionEqual(r),
          h.Normalize(),
          Vector_1.Vector.Create(0, 0, 0)),
        i =
          (this.Hte.ActorQuatProxy.RotateVector(
            Vector_1.Vector.BackwardVectorProxy,
            o,
          ),
          Vector_1.Vector.Create(0, 0, 0)),
        n =
          (this.Hte.ActorQuatProxy.RotateVector(
            Vector_1.Vector.LeftVectorProxy,
            i,
          ),
          s.GetComponent(153));
      for (const _ of [
        { Vector: this.Hte.ActorForwardProxy, RowDelta: -1, ColDelta: 0 },
        { Vector: this.Hte.ActorRightProxy, RowDelta: 0, ColDelta: 1 },
        { Vector: o, RowDelta: 1, ColDelta: 0 },
        { Vector: i, RowDelta: 0, ColDelta: -1 },
      ])
        if (MathUtils_1.MathUtils.DotProduct(h, _.Vector) > COS_45) {
          for (
            ;
            0 <= e.Row &&
            e.Row < this.Config.JigsawConfig.Row &&
            0 <= e.Col &&
            e.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((e.Row += _.RowDelta),
              (e.Col += _.ColDelta),
              this.pcn.has(e.GetKey()))
            ) {
              var a,
                c = this.pcn.get(e.GetKey());
              if (0 !== c.State)
                return (
                  (a = this.GetBlockLocationByIndex(e)),
                  n?.StartBoxTrace(a) || 0 !== c.ActivatedNum ? t : e
                );
            }
          return t;
        }
      return e;
    }
    OnItemMove(t, i) {
      this.PickUpItem(
        t,
        t.PutDownIndex,
        IComponent_1.EItemFoundation.BuildingBlock,
        !1,
      ),
        this.PutDownItem(t, i, IComponent_1.EItemFoundation.BuildingBlock, !1),
        this.RequestMoveItem(t, i),
        this.CheckFinish();
    }
    RequestMoveItem(s, t, i = void 0) {
      var e = Protocol_1.Aki.Protocol.nzn.create(),
        h = Protocol_1.Aki.Protocol.TFs.create(),
        o = Protocol_1.Aki.Protocol.LFs.create(),
        r = Protocol_1.Aki.Protocol.Gks.create(),
        n = Protocol_1.Aki.Protocol.D2s.create(),
        a = s.Entity,
        c = a.GetComponent(200),
        _ = c.ActorLocationProxy,
        c = c.ActorRotationProxy;
      (h.N5n = t.Row),
        (h.F5n = t.Col),
        (h.V5n = s.Rotation),
        (r.X = _.X),
        (r.Y = _.Y),
        (r.Z = _.Z),
        (n.Pitch = c.Pitch),
        (n.Roll = c.Roll),
        (n.Yaw = c.Yaw),
        (o.l8n = r),
        (o._8n = n),
        (e.G5n = MathUtils_1.MathUtils.NumberToLong(
          this.EIe.GetCreatureDataId(),
        )),
        (e.O5n = MathUtils_1.MathUtils.NumberToLong(
          a.GetComponent(0).GetCreatureDataId(),
        )),
        (e.k5n = h),
        (e.sKn = o),
        this.Config?.CompleteCondition.Type ===
          IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece &&
          ((this.vFl = i), (this.fFl = !0)),
        Net_1.Net.Call(28013, e, (t) => {
          switch (t.G9n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrGridPosAlreadyOccupied:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.G9n,
                21758,
              );
          }
          var i;
          this.Config?.CompleteCondition.Type ===
            IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece &&
            (t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
              ? this.SFl && this.MFl()
              : this.vFl &&
                (this.fGa(s, this.vFl, !1, !1),
                (i = s.Entity.GetComponent(252))) &&
                i.SetTicTacToePieceLocation(this.vFl, this.oGa),
            (this.vFl = void 0));
        });
    }
    OnBoardCanMovePlacementNotify(t) {
      this.Config?.CompleteCondition.Type ===
        IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece &&
        ((this.SFl = t)
          ? (this.KPl && this.KPl(), this.MFl())
          : this.QPl && this.QPl());
    }
    RemoveMagnetTipsTag(t) {
      this.fcn.RemoveTagsByIndex(t, 1531999982),
        this.fcn.RemoveTagsByIndex(t, -1705770981),
        this.fcn.RemoveTagsByIndex(t, -230062685),
        this.fcn.RemoveTagsByIndex(t, -447552724);
    }
    bcn(i, t) {
      if (1 !== this.pcn.get(i.GetKey()).State) {
        var s = t.Entity.GetComponent(153),
          e = [];
        for (const r of [
          { Tag: 1531999982, RowDelta: -1, ColDelta: 0 },
          { Tag: -1705770981, RowDelta: 1, ColDelta: 0 },
          { Tag: -230062685, RowDelta: 0, ColDelta: -1 },
          { Tag: -447552724, RowDelta: 0, ColDelta: 1 },
        ]) {
          let t = !1;
          for (
            var h = new JigsawIndex(i.Row, i.Col);
            0 <= h.Row &&
            h.Row < this.Config.JigsawConfig.Row &&
            0 <= h.Col &&
            h.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((h.Row += r.RowDelta),
              (h.Col += r.ColDelta),
              this.pcn.has(h.GetKey()))
            ) {
              var o = this.pcn.get(h.GetKey());
              if (0 !== o.State) {
                0 === o.ActivatedNum &&
                  ((o = this.GetBlockLocationByIndex(h)),
                  e.push(new BoxTraceCheckData(o, r.Tag, i)),
                  s?.StartBoxTrace(o) ||
                    ((t = !0), this.fcn.HasTagByIndex(i, r.Tag)) ||
                    this.fcn.AddTagsByIndex(i, r.Tag));
                break;
              }
            }
          t || this.fcn.RemoveTagsByIndex(i, r.Tag);
        }
        this.Tcn.set(t.Entity, e);
      }
    }
    HasEmptySocket() {
      for (var [, t] of this.pcn) if (0 !== t.State && !t.Occupancy) return !0;
      return !1;
    }
    DynamicModifySocketState(t, i) {
      var s = this.pcn.get(t.GetKey());
      if (s.State !== i) {
        var e,
          h,
          o = [];
        0 === s.State
          ? (o.push(1 === i ? -894208705 : -1375820440),
            this.fcn.DynamicAddActorByIndex(t, o))
          : 0 !== i
            ? (1 === s.State
                ? this.fcn.RemoveTagsByIndex(t, -894208705)
                : 2 === s.State && this.fcn.RemoveTagsByIndex(t, -1375820440),
              1 === i
                ? this.fcn.AddTagsByIndex(t, -894208705)
                : this.fcn.AddTagsByIndex(t, -1375820440))
            : this.fcn.DynamicRemoveActorByIndex(t),
          (s.State = i);
        for ([e, h] of this.Mcn) this.bcn(JigsawIndex.GenObjFromKey(e), h);
      }
    }
    GetAllItemOnBase() {
      var t,
        i = [];
      for ([, t] of this.Mcn) i.push(t);
      return i;
    }
    GetPutItemIndex(t) {
      let i = "";
      for (var [s, e] of this.Mcn) e === t && (i = s);
      if ("" !== i) return JigsawIndex.GenObjFromKey(i);
    }
    MGa(t, i) {
      this.uGa ||
        ((this.uGa = Vector_1.Vector.Create()),
        (this.cGa = Vector_1.Vector.Create()),
        (this.mGa = Vector_1.Vector.Create()),
        (this.dGa = Vector_1.Vector.Create()),
        (this.CGa = Vector_1.Vector.Create()));
      var s = this.Config.JigsawConfig.Row,
        e = this.Config.JigsawConfig.Column,
        t =
          ((this.dGa.X = t % e),
          (this.dGa.Y = Math.floor(t / e)),
          (this.dGa.Z = 0),
          (this.CGa.X = i % e),
          (this.CGa.Y = Math.floor(i / e)),
          (this.CGa.Z = 0),
          s / 2 - 0.5),
        i = e / 2 - 0.5,
        s =
          ((this.dGa.X = this.dGa.X - i),
          (this.dGa.Y = this.dGa.Y - t),
          (this.CGa.X = this.CGa.X - i),
          (this.CGa.Y = this.CGa.Y - t),
          Math.max(Math.abs(this.dGa.X), Math.abs(this.dGa.Y)));
      let h = MathUtils_1.MathUtils.GetAngleByVector2D(this.dGa),
        o = MathUtils_1.MathUtils.GetAngleByVector2D(this.CGa);
      0 < h && o < 0 ? (o += 360) : h < 0 && 0 < o && (h += 360);
      (e = h + (o - h) / 4),
        (i = h + (2 * (o - h)) / 4),
        (t = h + (3 * (o - h)) / 4),
        MathUtils_1.MathUtils.GetVector2dByAngle(e, this.uGa),
        MathUtils_1.MathUtils.GetVector2dByAngle(i, this.cGa),
        MathUtils_1.MathUtils.GetVector2dByAngle(t, this.mGa),
        (e = this.Config.JigsawConfig.Size);
      this.uGa.MultiplyEqual(e * s),
        this.cGa.MultiplyEqual(e * s),
        this.mGa.MultiplyEqual(e * s),
        (this.uGa.X += this.Config.PlaceOffset.X ?? 0),
        (this.uGa.Y += this.Config.PlaceOffset.Y ?? 0),
        (this.uGa.Z = this.Config.PlaceOffset.Z ?? 0),
        (this.cGa.X += this.Config.PlaceOffset.X ?? 0),
        (this.cGa.Y += this.Config.PlaceOffset.Y ?? 0),
        (this.cGa.Z = this.Config.PlaceOffset.Z ?? 0),
        (this.mGa.X += this.Config.PlaceOffset.X ?? 0),
        (this.mGa.Y += this.Config.PlaceOffset.Y ?? 0),
        (this.mGa.Z = this.Config.PlaceOffset.Z ?? 0),
        this.uGa.FromUeVector(
          this.Hte.ActorTransform.TransformPosition(this.uGa.ToUeVector()),
        ),
        this.cGa.FromUeVector(
          this.Hte.ActorTransform.TransformPosition(this.cGa.ToUeVector()),
        ),
        this.mGa.FromUeVector(
          this.Hte.ActorTransform.TransformPosition(this.mGa.ToUeVector()),
        );
    }
    get twl() {
      return this.ewl;
    }
    set twl(t) {
      if (this.ewl !== t) {
        this.ewl = t;
        for (const i of this.iwl) i.OnTicTacToePieceMovingChange(t);
      }
    }
    MFl() {
      this.wkl &&
        this._Ga &&
        (this._Ga.IsFinish
          ? this.EDe()
          : this.fFl &&
            ((this.fFl = !1), this._Ga.NextRound(), this._Ga.IsPlayerRound) &&
            ((this.wkl = !1), (this.twl = !1)));
    }
    b5a() {
      var t = this.Config.InitMatchList,
        i = this.Config.JigsawConfig.Column,
        s = this.EIe.ComponentDataMap.get("rI_")?.rI_;
      if (s) {
        this._Ga.SetCurrentRound(s.BI_);
        var e = s?.kI_;
        if (e) {
          for (const c of this.EIe.OccupiedGridInfo)
            if (e === c[0]) {
              var h = c[1].l8n;
              if (h) {
                h = h.N5n * i + h.F5n;
                if (this._Ga.CheckGameOver(h)) return void this.EDe();
              }
            }
          for (const _ of t)
            if (e === _.EntityId) {
              var o = _.Index,
                o = o.RowIndex * i + o.ColumnIndex;
              if (this._Ga.CheckGameOver(o)) return void this.EDe();
            }
        }
      }
      this.iwl.clear();
      for (const l of this._Ga.GetPlayerPieces()) {
        var r = l % i,
          n = Math.floor(l / i),
          a = this.pGa,
          n = (a.SetValue(n, r), a.GetKey());
        this.Mcn.has(n) &&
          (r = this.Mcn.get(n)) &&
          (a = r.Entity?.GetComponent(252)) &&
          (this.iwl.add(a), this.mJl) &&
          a.OnTicTacToePieceMovingChange(this.twl);
      }
    }
    TGa() {
      const e = this.Config?.CompleteCondition;
      if (
        e &&
        !(e.RenjuConfig.length < 2 || this.EIe.OccupiedGridInfo.size < 1)
      ) {
        this._Ga || (this._Ga = new TicTacToeGame_1.TicTacToeGame()),
          (this.pGa = new JigsawIndex(0, 0));
        var h = new Map(),
          o = new Map(),
          r = new Array(),
          n = new Array();
        let t = void 0,
          i = void 0;
        for (const f of e.RenjuConfig)
          "Computer" === f.Controller
            ? (i = f)
            : "Player" === f.Controller && (t = f);
        var a = this.Config.JigsawConfig.Column;
        let s = !1;
        t && i && t.Order > i.Order && (s = !0),
          this._Ga.Init(s, this.gGa),
          this.B5a.clear(),
          this.w5a.clear();
        for (const e of this.Config.InitMatchList) {
          var c,
            _ = e.Index,
            _ =
              (this.B5a.add(e.EntityId),
              t?.EntityIds?.includes(e.EntityId)
                ? ((c = _.RowIndex * a + _.ColumnIndex),
                  h.set(e.EntityId, c),
                  r.push(c))
                : i?.EntityIds?.includes(e.EntityId) &&
                  ((c = _.RowIndex * a + _.ColumnIndex),
                  o.set(e.EntityId, c),
                  n.push(c)),
              ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                e.EntityId,
              ));
          _?.IsInit || this.w5a.add(e.EntityId);
        }
        this._Ga.InitBoardInfo(n, r, !0), (n.length = 0), (r.length = 0);
        for (const d of this.EIe.OccupiedGridInfo) {
          var l,
            v = d[1].l8n;
          v &&
            (t?.EntityIds?.includes(d[0])
              ? ((l = v.N5n * a + v.F5n), h.set(d[0], l))
              : i?.EntityIds?.includes(d[0]) &&
                ((l = v.N5n * a + v.F5n), o.set(d[0], l)));
        }
        for (const m of h.values()) r.push(m);
        for (const w of o.values()) n.push(w);
        this._Ga.InitBoardInfo(n, r),
          0 === this.w5a.size && (this.b5a(), this.vAl) && this.vAl();
      }
    }
    get WaitingInitPiecesComplete() {
      return 0 === this.w5a.size;
    }
    P5a(t) {
      this.w5a.has(t) &&
        (this.w5a.delete(t),
        0 !== this.w5a.size ||
          (this.fcn && !this.fcn.GetIsFinish()) ||
          this.eEc());
    }
    eEc() {
      var t;
      this.b5a(),
        this.vAl
          ? this.vAl()
          : (((t = new Protocol_1.Aki.Protocol.Mv_()).F4n =
              MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId())),
            Net_1.Net.Call(22509, t, (t) => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Level",
                  36,
                  "OnWaitInitPiecesComplete RenjuExitMatchedActionResponse",
                  ["ErrorCode", t.G9n],
                );
            }));
    }
    ResetTicTacToeGame() {
      var t, i;
      this._Ga &&
        (!this._Ga.IsFinish || this.JMc) &&
        ((this.JMc = !1),
        (this.fFl = !1),
        (this.vFl = void 0),
        (this.w1h = void 0),
        (this.wkl = !1),
        (this.ewl = !1),
        (t = this.EIe?.GetCreatureDataId())) &&
        (((i = Protocol_1.Aki.Protocol.mf_.create()).F4n = t),
        Net_1.Net.Call(16617, i, (t) => {
          if (t?.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            var i = new Map();
            for (const r of this.Mcn) {
              var s = r[1],
                e = s.CreatureDataComp.GetPbDataId();
              i.set(e, s);
            }
            t = this.Config?.InitMatchList;
            if (t) {
              this.Mcn.clear();
              for (const n of t) {
                var h,
                  o = n.EntityId;
                i.has(o) &&
                  ((h = new JigsawIndex(n.Index.RowIndex, n.Index.ColumnIndex)),
                  (o = i.get(o)),
                  this.Mcn.set(h.GetKey(), o),
                  this.fGa(o, h, !1, !1),
                  (o = o.Entity.GetComponent(252))) &&
                  o.SetTicTacToePieceLocation(h, this.oGa);
              }
              this._Ga.ResetGame();
            }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Level",
                36,
                "ResetTicTacToeGame Failed",
                ["EntityId", this.Entity.Id],
                ["PbDataId", this.EIe?.GetPbDataId()],
              );
        }));
    }
    OnItemTicTacToeSelect(t) {
      const i = t.Index;
      if (i) {
        this.SGa || (this.SGa = new Array());
        var s = this.Config.JigsawConfig.Column,
          e = i.Row * s + i.Col,
          e = this._Ga.GetNoneNeighbors(e);
        this.SGa.length = 0;
        for (const i of e) {
          var h = i % s,
            o = Math.floor(i / s),
            o =
              (this.pGa.SetValue(o, h), this.GetBlockLocationByIndex(this.pGa));
          o && this.SGa.push(o);
        }
        return (this.IGa = t), this.SGa;
      }
    }
    OnGridTicTacToeClick(t) {
      var i,
        s = this.IGa?.Item;
      return (
        !!s &&
        ((i = this.Config.JigsawConfig.Column),
        (i = t.Row * i + t.Col),
        !!this._Ga.CheckCanMove(i)) &&
        (this.OnItemTicTacToeMove(s, t),
        this.IGa && (this.IGa.OnSelectEnd(), (this.IGa = void 0)),
        !0)
      );
    }
    fGa(t, i, s = !0, e = !0) {
      let h = void 0;
      e && (h = new JigsawIndex(t.PutDownIndex.Row, t.PutDownIndex.Col)),
        t.OnPickUpFormBase(this),
        t.PutDownIndex || (t.PutDownIndex = new JigsawIndex(0, 0)),
        t.PutDownIndex.DeepCopy(i),
        e && this.RequestMoveItem(t, i, h),
        t.OnPutDownToBase(this),
        s && this.CheckFinish();
    }
    OnItemTicTacToeMove(t, i) {
      var s;
      this.IsTicTacToe &&
        ((s = this.Config.JigsawConfig.Column),
        (t = t.PutDownIndex.Row * s + t.PutDownIndex.Col),
        (s = i.Row * s + i.Col),
        this._Ga.OnIndexMove(t, s));
    }
    GetPickItemActors() {
      this.EGa.clear(), this.yGa.clear();
      var s = new Array();
      for (const n of this.B5a) {
        var t,
          i,
          e,
          h = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(n);
        h &&
          (t = EntitySystem_1.EntitySystem.GetComponent(h.Id, 251)) &&
          ((i = EntitySystem_1.EntitySystem.GetComponent(h.Id, 1)),
          (h = EntitySystem_1.EntitySystem.GetComponent(h.Id, 136))) &&
          ((h = h.PutDownIndex),
          (e = this.Config.JigsawConfig.Column),
          (e = h.Row * e + h.Col),
          this._Ga?.CheckIsPlayerPiece(e)) &&
          (h = i?.Owner) &&
          (this.EGa.set(h, t), s.push(h));
      }
      for (let i = 0; i < this.Config.JigsawConfig.Row; i++)
        for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
          var o = new JigsawIndex(i, t),
            r = this.fcn.GetInteractionActorByIndex(o);
          r && (this.yGa.set(r, o), s.push(r));
        }
      return s;
    }
    ClearLevelPickSelect() {
      var t;
      this.w1h &&
        (this.w1h.OnSelectEnd(),
        (t = this.w1h.Entity.GetComponent(252)) &&
          t.OnTicTacToePieceSelect(!1, !0),
        (this.w1h = void 0)),
        (this.twl = !1);
    }
    LevelPickSelectUndefined() {
      if (this.w1h) {
        this.ClearLevelPickSelect();
        for (const t of this.iwl) t.OnTicTacToePieceSelect(!1, !0);
      }
    }
    ForceResetPieceSelect(t) {
      if (t) {
        (this.w1h = void 0), (this.twl = !1);
        for (const i of this.iwl) i.OnTicTacToePieceSelect(!1, !0);
      } else for (const s of this.iwl) s.OnTicTacToePieceSelect(!1, !1);
    }
    OnLevelPickClick(t) {
      if (!this._Ga?.IsFinish && !this.twl && !this.wkl) {
        if (this.yGa.has(t)) {
          var i = this.yGa.get(t);
          if (i && this.OnGridTicTacToeClick(i)) return;
        }
        if (this.EGa.has(t)) {
          i = this.EGa.get(t);
          if (i) {
            this.ClearLevelPickSelect(), i.OnSelect(), (this.w1h = i);
            var s = this.w1h.Entity.GetComponent(252);
            s && s.OnTicTacToePieceSelect(!0, !1);
            for (const e of this.iwl)
              e !== s && e.OnTicTacToePieceSelect(!1, !1);
          }
        }
      }
    }
    LGa() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          36,
          "[SceneItemJigsawBaseComponent.OnTicTacToeGameOver]",
          ["PlayerWin", this._Ga?.PlayerWin],
          ["AiWin", this._Ga?.AiWin],
        ),
        this.zll && this.zll(this._Ga?.PlayerWin ?? !1);
    }
    RegisterPickControllerEvents(t, i, s, e, h) {
      (this.mJl = !0),
        (this.oGa = t),
        (this.zll = i),
        (this.vAl = s),
        (this.QPl = e),
        (this.KPl = h);
    }
    UnregisterPickControllerEvents() {
      (this.mJl = !1),
        (this.oGa = void 0),
        (this.zll = void 0),
        (this.vAl = void 0),
        (this.QPl = void 0),
        (this.KPl = void 0);
    }
    RegisterAiInfo(t) {
      this._Ga && t && this._Ga.RefreshAiInfo(t);
    }
    RefreshAiEnable(t) {
      this._Ga && this._Ga.RefreshAiEnable(t);
    }
  });
(SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(135)],
    SceneItemJigsawBaseComponent,
  )),
  (exports.SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent);
//# sourceMappingURL=SceneItemJigsawBaseComponent.js.map
