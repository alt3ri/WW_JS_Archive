"use strict";
var SceneItemJigsawBaseComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        r = arguments.length,
        n =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (n = (r < 3 ? o(n) : 3 < r ? o(e, i, n) : o(e, i)) || n);
      return 3 < r && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemJigsawBaseComponent = exports.JigsawIndex = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
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
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  COS_45 = Math.cos(0.25 * Math.PI),
  TIMER_PERIOD = 500,
  SILENT_TAG = -709838471;
class JigsawIndex {
  constructor(t, e) {
    (this.Row = 0),
      (this.Col = 0),
      (this.jEe = void 0),
      (this.hnr = void 0),
      (this.lnr = void 0),
      (this.Row = t),
      (this.Col = e);
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
  static GenKey(t, e) {
    return t.toString() + "," + e.toString();
  }
}
exports.JigsawIndex = JigsawIndex;
class JigsawState {
  constructor(t, e, i) {
    (this.State = 0),
      (this.Occupancy = !1),
      (this.ActivatedNum = 0),
      (this.State = t ?? 0),
      (this.Occupancy = e ?? !1),
      (this.ActivatedNum = i ?? 0);
  }
}
class BoxTraceCheckData {
  constructor(t, e, i) {
    (this.Location = Vector_1.Vector.Create()),
      (this.TagId = 0),
      (this.CurIndex = void 0),
      (this.Location = t),
      (this.TagId = e),
      (this.CurIndex = i);
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
        (this.Lie = void 0),
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
        (this.Dcn = (t, e, i) => {
          var s = e.Entity.GetComponent(0).GetPbDataId();
          this.Icn.has(s) && this.Rcn(e);
        }),
        (this.Ucn = () => {
          this.Acn(), this.Pcn();
        }),
        (this.xcn = () => {
          !this.Tcn.size &&
            this.Lcn &&
            (TimerSystem_1.TimerSystem.Remove(this.Lcn), (this.Lcn = void 0));
          for (var [t, e] of this.Tcn) {
            var i = t.GetComponent(141);
            if (i?.Valid)
              for (const s of e)
                i.StartBoxTrace(s.Location)
                  ? this.fcn.HasTagByIndex(s.CurIndex, s.TagId) &&
                    this.fcn.RemoveTagsByIndex(s.CurIndex, s.TagId)
                  : this.fcn.HasTagByIndex(s.CurIndex, s.TagId) ||
                    this.fcn.AddTagsByIndex(s.CurIndex, s.TagId);
          }
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemJigsawBaseComponent_1)[0];
      this.Config = t;
      for (const i of this.Config.JigsawConfig.Pieces) {
        var e = new JigsawIndex(i.Index.RowIndex, i.Index.ColumnIndex);
        switch (i.InitState) {
          case IAction_1.EJigsawPieceState.Disable:
            this.pcn.set(e.GetKey(), new JigsawState());
            break;
          case IAction_1.EJigsawPieceState.Correct:
            this.pcn.set(e.GetKey(), new JigsawState(1));
            break;
          case IAction_1.EJigsawPieceState.Incorrect:
            this.pcn.set(e.GetKey(), new JigsawState(2));
        }
      }
      return !0;
    }
    OnStart() {
      return (
        (this.EIe = this.Entity.GetComponent(0)),
        (this.Hte = this.Entity.GetComponent(185)),
        (this.fcn = this.Entity.GetComponent(145)),
        !0
      );
    }
    OnActivate() {
      if (
        (this.wcn(),
        (this.Lie = this.Entity.GetComponent(180)),
        0 < this.EIe.OccupiedGridInfo.size && !this.Lie?.HasTag(SILENT_TAG))
      ) {
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.Dcn,
        ),
          this.Icn.clear();
        for (const s of this.EIe.OccupiedGridInfo) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            s[0],
          );
          this.Icn.add(s[0]), t?.IsInit && this.Rcn(t);
        }
      }
      if (0 < this.EIe.DynamicGridInfo.length)
        for (const o of this.EIe.DynamicGridInfo) {
          var e = new JigsawIndex(o.jTs, o.WTs),
            i = MathUtils_1.MathUtils.LongToNumber(o.KTs);
          this.DynamicModifySocketState(e, i);
        }
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
    Rcn(t) {
      var e = t.Entity.GetComponent(124),
        i = t.Entity.GetComponent(0),
        s = this.EIe.OccupiedGridInfo.get(i.GetPbDataId()).e8n,
        o = new JigsawIndex(s.R5n, s.P5n),
        s = ((e.Rotation = s.B5n), this.GetBlockLocationByIndex(o)),
        r = Rotator_1.Rotator.Create(0, -e.Rotation, 0).Quaternion(),
        r = this.Hte?.ActorTransform.TransformRotation(r.ToUeQuat()).Rotator(),
        s =
          (t.Entity.GetComponent(185)?.SetActorLocationAndRotation(
            s.ToUeVector(),
            r,
          ),
          this.Entity.GetComponent(147)),
        r = s?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock,
        t = t.Entity.GetComponent(142);
      t && ((t.ActivatedOutlet = s), (i.RelationId = this.EIe.GetPbDataId())),
        this.OnPutDownItem(e, o, r, !1, !0);
    }
    wcn() {
      if (void 0 !== this.Config.ModelId) {
        var i = [],
          s = new Map();
        for (let e = 0; e < this.Config.JigsawConfig.Row; e++)
          for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
            var o = new JigsawIndex(e, t),
              r = [];
            if (this.Entity.GetComponent(119).IsInState(4))
              switch (this.GetBlockStateByIndex(o)) {
                case 2:
                  r.push(-1375820440), i.push(o);
                  break;
                case 1:
                  r.push(-894208705), r.push(1248700469), i.push(o);
              }
            else
              switch (this.GetBlockStateByIndex(o)) {
                case 2:
                  r.push(-1375820440), r.push(-2002333932), i.push(o);
                  break;
                case 1:
                  r.push(-894208705), r.push(-1270526641), i.push(o);
              }
            s.set(o.GetKey(), r);
          }
        this.fcn.InitGenerateInfo(
          this.Config.ModelId.toString(),
          i,
          (t) => this.GetBlockLocationByIndex(t, !1),
          s,
        );
      } else this.fcn.SetIsFinish(!0);
    }
    GetBlockLocationByIndex(e, i = !0) {
      if (
        !(
          e.Row >= this.Config.JigsawConfig.Row ||
          e.Col >= this.Config.JigsawConfig.Column
        )
      ) {
        var s = this.vcn.get(e.GetKey());
        if (void 0 !== s && i) return s;
        var s = this.Config.JigsawConfig.Row,
          o = this.Config.JigsawConfig.Column,
          s = new JigsawIndex(s / 2 - 0.5, o / 2 - 0.5),
          o = s.Row - e.Row,
          s = s.Col - e.Col,
          r = this.Config.JigsawConfig.Size,
          r = Vector2D_1.Vector2D.Create(r, r).MultiplyEqual(
            Vector2D_1.Vector2D.Create(o, s),
          );
        let t = Vector_1.Vector.ZeroVectorProxy;
        i &&
          (t = Vector_1.Vector.Create(
            this.Config.PlaceOffset.X ?? 0,
            this.Config.PlaceOffset.Y ?? 0,
            this.Config.PlaceOffset.Z ?? 0,
          ));
        (o = new UE.Vector(r.X + t.X, -r.Y + t.Y, t.Z)),
          (s = Vector_1.Vector.Create(0, 0, 0));
        return (
          s.FromUeVector(this.Hte.ActorTransform.TransformPosition(o)),
          i && this.vcn.set(e.GetKey(), s),
          s
        );
      }
    }
    CalcJigsawSocketLocation(t = !1) {
      var e,
        i,
        s,
        o,
        r,
        n,
        a,
        h = Vector_1.Vector.Create(
          CameraController_1.CameraController.CameraLocation,
        ),
        c = Vector_1.Vector.Create(0, 0, 0);
      CameraController_1.CameraController.CameraRotator.Vector(c),
        c.Normalize();
      let _ = MathUtils_1.MathUtils.MaxFloat,
        l = void 0;
      for ([e, i] of this.pcn)
        0 === i.State ||
          (i.Occupancy && !t) ||
          ((s = JigsawIndex.GenObjFromKey(e)),
          (o = this.GetBlockLocationByIndex(s)),
          (r = Vector_1.Vector.Create(h)),
          o.Subtraction(h, r),
          (o = Vector_1.Vector.Create(r)),
          r.Normalize(),
          (r = r.DotProduct(c)),
          (r = Math.acos(r) * (180 / Math.PI) * o.Size()) < _ &&
            ((_ = r), (l = s)));
      return void 0 === l
        ? [void 0, void 0]
        : ((n = Vector_1.Vector.Create(this.GetBlockLocationByIndex(l))),
          (a = this.Hte?.ActorTransform.InverseTransformPosition(
            n.ToUeVector(),
          )),
          n.FromUeVector(a),
          [n, l]);
    }
    CheckJigsawBlockIllegal(t, e) {
      if (t.Config.FillCfg.Type !== IComponent_1.EFillType.Direction)
        for (const s of t.GetActiveBlockOffset()) {
          var i = new JigsawIndex(e.Row + s.Row, e.Col + s.Col),
            i = this.pcn.get(i.GetKey());
          if (void 0 === i || 0 === i.State || i.Occupancy) return !0;
        }
      return !1;
    }
    CheckJigsawBlockCorrect(t, e) {
      for (const s of t.GetActiveBlockOffset()) {
        var i = new JigsawIndex(e.Row + s.Row, e.Col + s.Col);
        if (1 !== this.pcn.get(i.GetKey()).State) return !1;
      }
      return !0;
    }
    OnPutDownItem(e, i, s, o = !0, r = !1) {
      var t = e.Entity.GetComponent(141),
        t =
          (t && t.UpdateBoxTrace(this, i),
          (e.PutDownIndex = i),
          e.OnPutDownToBase(this),
          this.pcn.get(i.GetKey()));
      if (
        0 === t.State ||
        (t.Occupancy && s !== IComponent_1.EItemFoundation.PulseDevice)
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            32,
            "[SceneItemJigsawBaseComponent.OnputDownItem] 目标位置不可用",
          );
      else {
        EventSystem_1.EventSystem.EmitWithTarget(
          e.Entity,
          EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
          i,
          r,
        );
        let t = [];
        switch (e.Config.FillCfg.Type) {
          case IComponent_1.EFillType.Fixed:
            t = e.GetActiveBlockOffset();
            break;
          case IComponent_1.EFillType.Direction:
            t = this.Bcn(i, e.Direction, e.Rotation);
        }
        for (const l of t) {
          var n = new JigsawIndex(i.Row + l.Row, i.Col + l.Col),
            a = n.GetKey(),
            h = this.pcn.get(a);
          s === IComponent_1.EItemFoundation.BuildingBlock &&
            0 !== h.State &&
            (h.Occupancy = !0);
          let t = void 0;
          0 === h.ActivatedNum &&
            (2 === h.State
              ? (t = -1279673628)
              : 1 === h.State && (t = 692213831)),
            (h.ActivatedNum += 1),
            0 < h.ActivatedNum && (h.Occupancy = !0),
            void 0 !== t && this.fcn.AddTagsByIndex(n, t),
            s !== IComponent_1.EItemFoundation.PulseDevice ||
              a === i.GetKey() ||
              this.Mcn.has(a) ||
              (h.Occupancy = !1);
        }
        this.Mcn.set(i.GetKey(), e);
        for (var [c, _] of this.Mcn) {
          c = JigsawIndex.GenObjFromKey(c);
          this.Tcn.has(_.Entity) ||
            (this.Tcn.set(_.Entity, []), this.Lcn) ||
            (this.Lcn = TimerSystem_1.TimerSystem.Forever(
              this.xcn,
              TIMER_PERIOD,
            )),
            this.bcn(c, _);
        }
        o && (this.qcn(e, !0), this.CheckFinish());
      }
    }
    CheckFinish() {
      switch (this.Config.CompleteCondition.Type) {
        case IComponent_1.EJigsawCompleteCondition.ActivateAllCorrectPiece:
          for (var [, t] of this.pcn)
            if (1 === t.State && t.ActivatedNum <= 0) return;
          break;
        case IComponent_1.EJigsawCompleteCondition.PutInTheSpecifiedPiece:
          for (const i of this.Config.CompleteCondition.MatchList) {
            var e = JigsawIndex.GenKey(i.Index.RowIndex, i.Index.ColumnIndex),
              e = this.Mcn.get(e);
            if (!e?.Valid || e.CreatureDataComp.GetPbDataId() !== i.EntityId)
              return;
          }
          break;
        default:
          return;
      }
      this.EDe();
    }
    OnPickUpItem(t, e, i = !0) {
      var s,
        o,
        r = t.PutDownIndex;
      t.OnPickUpFormBase(this);
      let n = [];
      switch (t.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          n = t.GetActiveBlockOffset();
          break;
        case IComponent_1.EFillType.Direction:
          n = this.Bcn(r, t.Direction, t.Rotation);
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          32,
          "[SceneItemJigsawBaseComp] OnPickUpItem",
          ["PbDataId", t.Entity.GetComponent(0)?.GetPbDataId()],
          ["SocketIndex", r.GetKey()],
          ["Direction", t.Direction.toString(2)],
          ["Rotation", t.Rotation],
          ["offset", n],
        );
      for (const _ of n) {
        var a = new JigsawIndex(r.Row + _.Row, r.Col + _.Col),
          h = a.GetKey(),
          h = this.pcn.get(h);
        e === IComponent_1.EItemFoundation.BuildingBlock &&
          0 !== h.State &&
          (h.Occupancy = !1);
        let t = void 0;
        --h.ActivatedNum,
          0 === h.ActivatedNum &&
            (2 === h.State
              ? (t = -1279673628)
              : 1 === h.State && (t = 692213831),
            (h.Occupancy = !1)),
          void 0 !== t && this.fcn.RemoveTagsByIndex(a, t);
      }
      let c = "";
      for ([s, o] of this.Mcn)
        if (o === t) {
          c = s;
          break;
        }
      "" !== c && this.Mcn.delete(c),
        this.RemoveMagnetTipsTag(r),
        this.Tcn.has(t.Entity) && this.Tcn.delete(t.Entity),
        i &&
          (t.Config.FillCfg.Type === IComponent_1.EFillType.Direction &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              32,
              "[CharacterManipulateComp] RequestPickUpItem",
              ["PbDataId", t.Entity.GetComponent(0)?.GetPbDataId()],
            ),
          this.qcn(t, !1));
    }
    GetBlockStateByIndex(t) {
      t = t.GetKey();
      return this.pcn.get(t).State;
    }
    AimBlockByIndex(t, o) {
      if (
        t?.GetKey() !== this.Ecn?.GetKey() ||
        o.Rotation !== this.ycn ||
        o !== this.Scn
      ) {
        var e = o.Entity.GetComponent(142),
          i =
            (e?.TryRemoveTagById(-2116928595),
            e?.TryAddTagById(-2116928595),
            this.Gcn(),
            this.Acn(),
            (this.Ecn = t),
            (this.Scn = o),
            (this.ycn = o.Rotation),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              ConfigManager_1.ConfigManager.ManipulateConfig
                .MatControllerDaPath,
              UE.ItemMaterialControllerActorData_C,
              (t) => {
                var e, i, s;
                t?.IsValid() &&
                  ((e = this.Scn.Entity.GetComponent(185)),
                  (i = new UE.Transform()),
                  (s = this.GetBlockLocationByIndex(this.Ecn).ToUeVector()),
                  i.SetLocation(s),
                  (s = Rotator_1.Rotator.Create(
                    0,
                    -o.Rotation,
                    0,
                  ).Quaternion()),
                  (s = this.Hte?.ActorTransform.TransformRotation(
                    s.ToUeQuat(),
                  )),
                  i.SetRotation(s),
                  e.GetInteractionMainActor().MakeActorProjection(i, t));
              },
            ),
            this.CheckJigsawBlockIllegal(o, t));
        for (const n of this.Ncn(t, o)) {
          var s = new JigsawIndex(t.Row + n.Row, t.Col + n.Col),
            s = this.fcn.GetInteractionActorByIndex(s);
          if (s) {
            var r = s.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                i ? -1517802777 : -1817626386,
              ),
            );
            for (let t = 0; t < r.Num(); t++)
              r.Get(t)?.SetActorHiddenInGame(!1);
          }
        }
      }
    }
    Ncn(t, e, i) {
      switch (e.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          return e.GetActiveBlockOffset(i);
        case IComponent_1.EFillType.Direction:
          return this.Bcn(t, e.Direction, i ?? e.Rotation);
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
        this.Scn.Entity.GetComponent(185)
          .GetInteractionMainActor()
          .RemoveActorProjection();
        var t = this.Ncn(this.Ecn, this.Scn, this.ycn);
        for (const e of t) {
          var i = new JigsawIndex(this.Ecn.Row + e.Row, this.Ecn.Col + e.Col),
            i = this.fcn.GetInteractionActorByIndex(i);
          if (i) {
            let e = i.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                -1517802777,
              ),
            );
            for (let t = 0; t < e.Num(); t++)
              e.Get(t)?.SetActorHiddenInGame(!0);
            e = i.GetRefActorsByTag(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                -1817626386,
              ),
            );
            for (let t = 0; t < e.Num(); t++)
              e.Get(t)?.SetActorHiddenInGame(!0);
          }
        }
      }
      (this.Ecn = void 0), (this.Scn = void 0);
    }
    qcn(t, e) {
      var i = Protocol_1.Aki.Protocol.WJn.create(),
        s = Protocol_1.Aki.Protocol.vFs.create(),
        o = Protocol_1.Aki.Protocol.pFs.create(),
        r = Protocol_1.Aki.Protocol.Pks.create(),
        n = Protocol_1.Aki.Protocol.S2s.create(),
        a = t.Entity,
        h = a.GetComponent(185),
        c = h.ActorLocationProxy,
        h = h.ActorRotationProxy;
      (s.R5n = t.PutDownIndex.Row),
        (s.P5n = t.PutDownIndex.Col),
        (s.B5n = t.Rotation),
        (r.X = c.X),
        (r.Y = c.Y),
        (r.Z = c.Z),
        (n.Pitch = h.Pitch),
        (n.Roll = h.Roll),
        (n.Yaw = h.Yaw),
        (o.e8n = r),
        (o.t8n = n),
        (i.A5n = MathUtils_1.MathUtils.NumberToLong(
          this.EIe.GetCreatureDataId(),
        )),
        (i.U5n = MathUtils_1.MathUtils.NumberToLong(
          a.GetComponent(0).GetCreatureDataId(),
        )),
        (i.w5n = e ? 1 : 0),
        (i.x5n = s),
        (i.JWn = o),
        Net_1.Net.Call(22661, i, (t) => {
          switch (t.A9n) {
            case Protocol_1.Aki.Protocol.O4n.NRs:
            case Protocol_1.Aki.Protocol.O4n.Proto_ErrPlaceFailOfAlreadyOnBoard:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.A9n,
                20881,
              );
          }
        });
    }
    EDe() {
      var t = Protocol_1.Aki.Protocol.XJn.create();
      (t.b5n = MathUtils_1.MathUtils.NumberToLong(
        this.EIe.GetCreatureDataId(),
      )),
        Net_1.Net.Call(14737, t, (t) => {
          t.A9n === Protocol_1.Aki.Protocol.O4n.NRs && this.OnFinish();
        });
    }
    OnFinish() {
      for (var [t, e] of this.pcn)
        1 === e.State &&
          this.fcn.AddTagsByIndex(JigsawIndex.GenObjFromKey(t), 1248700469),
          0 !== e.State &&
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
      for (const i of this.Mcn) i[1].OnFinish();
    }
    Bcn(t, e, i) {
      let s = [new JigsawIndex(0, 0)];
      return (
        this.Ocn(e, 1) && (s = s.concat(this.kcn(t, i))),
        this.Ocn(e, 2) && (s = s.concat(this.kcn(t, i + 180))),
        this.Ocn(e, 3) && (s = s.concat(this.kcn(t, i + 90))),
        (s = this.Ocn(e, 4) ? s.concat(this.kcn(t, i + 270)) : s)
      );
    }
    Ocn(t, e) {
      return 1 == ((t >> e) & 1);
    }
    kcn(e, t) {
      var i = [],
        s = [
          { RowDelta: -1, ColDelta: 0 },
          { RowDelta: 0, ColDelta: -1 },
          { RowDelta: 1, ColDelta: 0 },
          { RowDelta: 0, ColDelta: 1 },
        ],
        o = ((Math.floor(t / 90) % 4) + 4) % 4;
      for (
        let t = 0;
        t < this.Config.JigsawConfig.Row * this.Config.JigsawConfig.Column;
        t++
      ) {
        var r = e.Row + s[o].RowDelta * t,
          n = e.Col + s[o].ColDelta * t;
        if (
          r < 0 ||
          r >= this.Config.JigsawConfig.Row ||
          n < 0 ||
          n >= this.Config.JigsawConfig.Column
        )
          break;
        var a = this.pcn.get(JigsawIndex.GenKey(r, n));
        if (a && 0 === a.State) break;
        i.push(new JigsawIndex(r - e.Row, n - e.Col));
      }
      return i;
    }
    GetNextPosByDirection(t, e, i) {
      var s = new JigsawIndex(t.Row, t.Col),
        o = Vector_1.Vector.Create(e),
        r = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
        n = (r.Normalize(), Vector_1.Vector.Create()),
        e = e.DotProduct(r),
        r =
          (r.Multiply(e, n),
          o.SubtractionEqual(n),
          o.Normalize(),
          Vector_1.Vector.Create(0, 0, 0)),
        e =
          (this.Hte.ActorQuatProxy.RotateVector(
            Vector_1.Vector.BackwardVectorProxy,
            r,
          ),
          Vector_1.Vector.Create(0, 0, 0)),
        a =
          (this.Hte.ActorQuatProxy.RotateVector(
            Vector_1.Vector.LeftVectorProxy,
            e,
          ),
          i.GetComponent(141));
      for (const _ of [
        { Vector: this.Hte.ActorForwardProxy, RowDelta: -1, ColDelta: 0 },
        { Vector: this.Hte.ActorRightProxy, RowDelta: 0, ColDelta: 1 },
        { Vector: r, RowDelta: 1, ColDelta: 0 },
        { Vector: e, RowDelta: 0, ColDelta: -1 },
      ])
        if (MathUtils_1.MathUtils.DotProduct(o, _.Vector) > COS_45) {
          for (
            ;
            0 <= s.Row &&
            s.Row < this.Config.JigsawConfig.Row &&
            0 <= s.Col &&
            s.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((s.Row += _.RowDelta),
              (s.Col += _.ColDelta),
              this.pcn.has(s.GetKey()))
            ) {
              var h,
                c = this.pcn.get(s.GetKey());
              if (0 !== c.State)
                return (
                  (h = this.GetBlockLocationByIndex(s)),
                  a?.StartBoxTrace(h) || 0 !== c.ActivatedNum ? t : s
                );
            }
          return t;
        }
      return s;
    }
    OnItemMove(t, e) {
      this.OnPickUpItem(t, IComponent_1.EItemFoundation.BuildingBlock, !1),
        this.OnPutDownItem(
          t,
          e,
          IComponent_1.EItemFoundation.BuildingBlock,
          !1,
        ),
        this.RequestMoveItem(t),
        this.CheckFinish();
    }
    RequestMoveItem(t) {
      var e = Protocol_1.Aki.Protocol.zJn.create(),
        i = Protocol_1.Aki.Protocol.vFs.create(),
        s = Protocol_1.Aki.Protocol.pFs.create(),
        o = Protocol_1.Aki.Protocol.Pks.create(),
        r = Protocol_1.Aki.Protocol.S2s.create(),
        n = t.Entity,
        a = n.GetComponent(185),
        h = a.ActorLocationProxy,
        a = a.ActorRotationProxy;
      (i.R5n = t.PutDownIndex.Row),
        (i.P5n = t.PutDownIndex.Col),
        (i.B5n = t.Rotation),
        (o.X = h.X),
        (o.Y = h.Y),
        (o.Z = h.Z),
        (r.Pitch = a.Pitch),
        (r.Roll = a.Roll),
        (r.Yaw = a.Yaw),
        (s.e8n = o),
        (s.t8n = r),
        (e.A5n = MathUtils_1.MathUtils.NumberToLong(
          this.EIe.GetCreatureDataId(),
        )),
        (e.U5n = MathUtils_1.MathUtils.NumberToLong(
          n.GetComponent(0).GetCreatureDataId(),
        )),
        (e.x5n = i),
        (e.JWn = s),
        Net_1.Net.Call(11684, e, (t) => {
          switch (t.A9n) {
            case Protocol_1.Aki.Protocol.O4n.NRs:
            case Protocol_1.Aki.Protocol.O4n.Proto_ErrGridPosAlreadyOccupied:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.A9n,
                28975,
              );
          }
        });
    }
    RemoveMagnetTipsTag(t) {
      this.fcn.RemoveTagsByIndex(t, 1531999982),
        this.fcn.RemoveTagsByIndex(t, -1705770981),
        this.fcn.RemoveTagsByIndex(t, -230062685),
        this.fcn.RemoveTagsByIndex(t, -447552724);
    }
    bcn(e, t) {
      if (1 !== this.pcn.get(e.GetKey()).State) {
        var i = t.Entity.GetComponent(141),
          s = [];
        for (const n of [
          { Tag: 1531999982, RowDelta: -1, ColDelta: 0 },
          { Tag: -1705770981, RowDelta: 1, ColDelta: 0 },
          { Tag: -230062685, RowDelta: 0, ColDelta: -1 },
          { Tag: -447552724, RowDelta: 0, ColDelta: 1 },
        ]) {
          let t = !1;
          for (
            var o = new JigsawIndex(e.Row, e.Col);
            0 <= o.Row &&
            o.Row < this.Config.JigsawConfig.Row &&
            0 <= o.Col &&
            o.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((o.Row += n.RowDelta),
              (o.Col += n.ColDelta),
              this.pcn.has(o.GetKey()))
            ) {
              var r = this.pcn.get(o.GetKey());
              if (0 !== r.State) {
                0 === r.ActivatedNum &&
                  ((r = this.GetBlockLocationByIndex(o)),
                  s.push(new BoxTraceCheckData(r, n.Tag, e)),
                  i?.StartBoxTrace(r) ||
                    ((t = !0), this.fcn.HasTagByIndex(e, n.Tag)) ||
                    this.fcn.AddTagsByIndex(e, n.Tag));
                break;
              }
            }
          t || this.fcn.RemoveTagsByIndex(e, n.Tag);
        }
        this.Tcn.set(t.Entity, s);
      }
    }
    HasEmptySocket() {
      for (var [, t] of this.pcn) if (0 !== t.State && !t.Occupancy) return !0;
      return !1;
    }
    DynamicModifySocketState(t, e) {
      var i = this.pcn.get(t.GetKey());
      if (i.State !== e) {
        var s,
          o,
          r = [];
        0 === i.State
          ? (r.push(1 === e ? -894208705 : -1375820440),
            this.fcn.DynamicAddActorByIndex(t, r))
          : 0 !== e
            ? (1 === i.State
                ? this.fcn.RemoveTagsByIndex(t, -894208705)
                : 2 === i.State && this.fcn.RemoveTagsByIndex(t, -1375820440),
              1 === e
                ? this.fcn.AddTagsByIndex(t, -894208705)
                : this.fcn.AddTagsByIndex(t, -1375820440))
            : this.fcn.DynamicRemoveActorByIndex(t),
          (i.State = e);
        for ([s, o] of this.Mcn) this.bcn(JigsawIndex.GenObjFromKey(s), o);
      }
    }
    GetAllItemOnBase() {
      var t,
        e = [];
      for ([, t] of this.Mcn) e.push(t);
      return e;
    }
    GetPutItemIndex(t) {
      let e = "";
      for (var [i, s] of this.Mcn) s === t && (e = i);
      if ("" !== e) return JigsawIndex.GenObjFromKey(e);
    }
  });
(SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(123)],
    SceneItemJigsawBaseComponent,
  )),
  (exports.SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent);
//# sourceMappingURL=SceneItemJigsawBaseComponent.js.map
