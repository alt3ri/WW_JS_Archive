"use strict";
let SceneItemJigsawBaseComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const r = arguments.length;
    let n =
      r < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, s);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (o = t[h]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, i, n) : o(e, i)) || n);
    return r > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemJigsawBaseComponent = exports.JigsawIndex = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const COS_45 = Math.cos(0.25 * Math.PI);
const TIMER_PERIOD = 500;
class JigsawIndex {
  constructor(t, e) {
    (this.Row = 0),
      (this.Col = 0),
      (this.jSe = void 0),
      (this.urr = void 0),
      (this.crr = void 0),
      (this.Row = t),
      (this.Col = e);
  }
  GetKey() {
    return (
      (this.jSe && this.urr === this.Row && this.crr === this.Col) ||
        ((this.jSe = this.Row.toString() + "," + this.Col.toString()),
        (this.urr = this.Row),
        (this.crr = this.Col)),
      this.jSe
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
        (this.SIe = void 0),
        (this.Hte = void 0),
        (this.Ncn = void 0),
        (this.Ocn = new Map()),
        (this.kcn = new Map()),
        (this.Fcn = new Map()),
        (this.Vcn = void 0),
        (this.Hcn = void 0),
        (this.jcn = 0),
        (this.ui = !1),
        (this.Wcn = new Set()),
        (this.Kcn = new Map()),
        (this.Qcn = void 0),
        (this.Xcn = (t, e, i) => {
          const s = e.Entity.GetComponent(0).GetPbDataId();
          this.Wcn.has(s) && this.$cn(e);
        }),
        (this.Ycn = () => {
          this.Jcn(), this.zcn();
        }),
        (this.Zcn = () => {
          !this.Kcn.size &&
            this.Qcn &&
            (TimerSystem_1.TimerSystem.Remove(this.Qcn), (this.Qcn = void 0));
          for (const [t, e] of this.Kcn) {
            const i = t.GetComponent(139);
            if (i?.Valid)
              for (const s of e)
                i.StartBoxTrace(s.Location)
                  ? this.Ncn.HasTagByIndex(s.CurIndex, s.TagId) &&
                    this.Ncn.RemoveTagsByIndex(s.CurIndex, s.TagId)
                  : this.Ncn.HasTagByIndex(s.CurIndex, s.TagId) ||
                    this.Ncn.AddTagsByIndex(s.CurIndex, s.TagId);
          }
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemJigsawBaseComponent_1)[0];
      this.Config = t;
      for (const i of this.Config.JigsawConfig.Pieces) {
        const e = new JigsawIndex(i.Index.RowIndex, i.Index.ColumnIndex);
        switch (i.InitState) {
          case IAction_1.EJigsawPieceState.Disable:
            this.Ocn.set(e.GetKey(), new JigsawState());
            break;
          case IAction_1.EJigsawPieceState.Correct:
            this.Ocn.set(e.GetKey(), new JigsawState(1));
            break;
          case IAction_1.EJigsawPieceState.Incorrect:
            this.Ocn.set(e.GetKey(), new JigsawState(2));
        }
      }
      return !0;
    }
    OnStart() {
      return (
        (this.SIe = this.Entity.GetComponent(0)),
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Ncn = this.Entity.GetComponent(143)),
        !0
      );
    }
    OnActivate() {
      if ((this.emn(), this.SIe.OccupiedGridInfo.size > 0)) {
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          this.Xcn,
        ),
          this.Wcn.clear();
        for (const s of this.SIe.OccupiedGridInfo) {
          const t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s[0]);
          this.Wcn.add(s[0]), t?.IsInit && this.$cn(t);
        }
      }
      if (this.SIe.DynamicGridInfo.length > 0)
        for (const o of this.SIe.DynamicGridInfo) {
          const e = new JigsawIndex(o.LSs, o.RSs);
          const i = MathUtils_1.MathUtils.LongToNumber(o.DSs);
          this.DynamicModifySocketState(e, i);
        }
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.Xcn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.Xcn,
          ),
        this.Qcn &&
          (TimerSystem_1.TimerSystem.Remove(this.Qcn), (this.Qcn = void 0)),
        !0
      );
    }
    $cn(t) {
      const e = t.Entity.GetComponent(122);
      var i = t.Entity.GetComponent(0);
      var i = this.SIe.OccupiedGridInfo.get(i.GetPbDataId()).M3n;
      const s = new JigsawIndex(i.tFn, i.rFn);
      var i = ((e.Rotation = i.oFn), this.GetBlockLocationByIndex(s));
      var o = Rotator_1.Rotator.Create(0, -e.Rotation, 0).Quaternion();
      var o = this.Hte?.ActorTransform.TransformRotation(
        o.ToUeQuat(),
      ).Rotator();
      var t =
        (t.Entity.GetComponent(182)?.SetActorLocationAndRotation(
          i.ToUeVector(),
          o,
        ),
        this.Entity.GetComponent(145));
      var i =
        t?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock;
      this.OnPutDownItem(e, s, i, !1);
    }
    emn() {
      if (void 0 !== this.Config.ModelId) {
        const i = [];
        const s = new Map();
        for (let e = 0; e < this.Config.JigsawConfig.Row; e++)
          for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
            const o = new JigsawIndex(e, t);
            const r = [];
            if (this.Entity.GetComponent(117).IsInState(4))
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
        this.Ncn.InitGenerateInfo(
          this.Config.ModelId.toString(),
          i,
          (t) => this.GetBlockLocationByIndex(t, !1),
          s,
        );
      } else this.Ncn.SetIsFinish(!0);
    }
    GetBlockLocationByIndex(e, i = !0) {
      if (
        !(
          e.Row >= this.Config.JigsawConfig.Row ||
          e.Col >= this.Config.JigsawConfig.Column
        )
      ) {
        var s = this.kcn.get(e.GetKey());
        if (void 0 !== s && i) return s;
        var s = this.Config.JigsawConfig.Row;
        var o = this.Config.JigsawConfig.Column;
        var s = new JigsawIndex(s / 2 - 0.5, o / 2 - 0.5);
        var o = s.Row - e.Row;
        var s = s.Col - e.Col;
        var r = this.Config.JigsawConfig.Size;
        var r = Vector2D_1.Vector2D.Create(r, r).MultiplyEqual(
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
          i && this.kcn.set(e.GetKey(), s),
          s
        );
      }
    }
    CalcJigsawSocketLocation(t = !1) {
      let e;
      let i;
      let s;
      let o;
      let r;
      let n;
      let h;
      const a = Vector_1.Vector.Create(
        CameraController_1.CameraController.CameraLocation,
      );
      const c = Vector_1.Vector.Create(0, 0, 0);
      CameraController_1.CameraController.CameraRotator.Vector(c),
        c.Normalize();
      let _ = MathUtils_1.MathUtils.MaxFloat;
      let l = void 0;
      for ([e, i] of this.Ocn)
        i.State === 0 ||
          (i.Occupancy && !t) ||
          ((s = JigsawIndex.GenObjFromKey(e)),
          (o = this.GetBlockLocationByIndex(s)),
          (r = Vector_1.Vector.Create(a)),
          o.Subtraction(a, r),
          (o = Vector_1.Vector.Create(r)),
          r.Normalize(),
          (r = r.DotProduct(c)),
          (r = Math.acos(r) * (180 / Math.PI) * o.Size()) < _ &&
            ((_ = r), (l = s)));
      return void 0 === l
        ? [void 0, void 0]
        : ((n = Vector_1.Vector.Create(this.GetBlockLocationByIndex(l))),
          (h = this.Hte?.ActorTransform.InverseTransformPosition(
            n.ToUeVector(),
          )),
          n.FromUeVector(h),
          [n, l]);
    }
    CheckJigsawBlockIllegal(t, e) {
      if (t.Config.FillCfg.Type !== IComponent_1.EFillType.Direction)
        for (const s of t.GetActiveBlockOffset()) {
          var i = new JigsawIndex(e.Row + s.Row, e.Col + s.Col);
          var i = this.Ocn.get(i.GetKey());
          if (void 0 === i || i.State === 0 || i.Occupancy) return !0;
        }
      return !1;
    }
    CheckJigsawBlockCorrect(t, e) {
      for (const s of t.GetActiveBlockOffset()) {
        const i = new JigsawIndex(e.Row + s.Row, e.Col + s.Col);
        if (this.Ocn.get(i.GetKey()).State !== 1) return !1;
      }
      return !0;
    }
    OnPutDownItem(e, i, s, o = !0) {
      var t = e.Entity.GetComponent(139);
      var t =
        (t && t.UpdateBoxTrace(this, i),
        (e.PutDownIndex = i),
        e.OnPutDownToBase(this),
        this.Ocn.get(i.GetKey()));
      if (
        t.State === 0 ||
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
        );
        let t = [];
        switch (e.Config.FillCfg.Type) {
          case IComponent_1.EFillType.Fixed:
            t = e.GetActiveBlockOffset();
            break;
          case IComponent_1.EFillType.Direction:
            t = this.tmn(i, e.Direction, e.Rotation);
        }
        for (const _ of t) {
          const r = new JigsawIndex(i.Row + _.Row, i.Col + _.Col);
          const n = r.GetKey();
          const h = this.Ocn.get(n);
          s === IComponent_1.EItemFoundation.BuildingBlock &&
            h.State !== 0 &&
            (h.Occupancy = !0);
          let t = void 0;
          h.ActivatedNum === 0 &&
            (h.State === 2
              ? (t = -1279673628)
              : h.State === 1 && (t = 692213831)),
            (h.ActivatedNum += 1),
            h.ActivatedNum > 0 && (h.Occupancy = !0),
            void 0 !== t && this.Ncn.AddTagsByIndex(r, t),
            s !== IComponent_1.EItemFoundation.PulseDevice ||
              n === i.GetKey() ||
              this.Fcn.has(n) ||
              (h.Occupancy = !1);
        }
        this.Fcn.set(i.GetKey(), e);
        for (let [a, c] of this.Fcn) {
          a = JigsawIndex.GenObjFromKey(a);
          this.Kcn.has(c.Entity) ||
            (this.Kcn.set(c.Entity, []), this.Qcn) ||
            (this.Qcn = TimerSystem_1.TimerSystem.Forever(
              this.Zcn,
              TIMER_PERIOD,
            )),
            this.imn(a, c);
        }
        o && (this.omn(e, !0), this.CheckFinish());
      }
    }
    CheckFinish() {
      switch (this.Config.CompleteCondition.Type) {
        case IComponent_1.EJigsawCompleteCondition.ActivateAllCorrectPiece:
          for (const [, t] of this.Ocn)
            if (t.State === 1 && t.ActivatedNum <= 0) return;
          break;
        case IComponent_1.EJigsawCompleteCondition.PutInTheSpecifiedPiece:
          for (const i of this.Config.CompleteCondition.MatchList) {
            var e = JigsawIndex.GenKey(i.Index.RowIndex, i.Index.ColumnIndex);
            var e = this.Fcn.get(e);
            if (!e?.Valid || e.CreatureDataComp.GetPbDataId() !== i.EntityId)
              return;
          }
          break;
        default:
          return;
      }
      this.SDe();
    }
    OnPickUpItem(t, e, i = !0) {
      let s;
      let o;
      const r = t.PutDownIndex;
      t.OnPickUpFormBase(this);
      let n = [];
      switch (t.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          n = t.GetActiveBlockOffset();
          break;
        case IComponent_1.EFillType.Direction:
          n = this.tmn(r, t.Direction, t.Rotation);
      }
      for (const _ of n) {
        const h = new JigsawIndex(r.Row + _.Row, r.Col + _.Col);
        var a = h.GetKey();
        var a = this.Ocn.get(a);
        e === IComponent_1.EItemFoundation.BuildingBlock &&
          a.State !== 0 &&
          (a.Occupancy = !1);
        let t = void 0;
        --a.ActivatedNum,
          a.ActivatedNum === 0 &&
            (a.State === 2
              ? (t = -1279673628)
              : a.State === 1 && (t = 692213831),
            (a.Occupancy = !1)),
          void 0 !== t && this.Ncn.RemoveTagsByIndex(h, t);
      }
      let c = "";
      for ([s, o] of this.Fcn)
        if (o === t) {
          c = s;
          break;
        }
      c !== "" && this.Fcn.delete(c),
        this.RemoveMagnetTipsTag(r),
        this.Kcn.has(t.Entity) && this.Kcn.delete(t.Entity),
        i && this.omn(t, !1);
    }
    GetBlockStateByIndex(t) {
      t = t.GetKey();
      return this.Ocn.get(t).State;
    }
    AimBlockByIndex(t, o) {
      if (
        t?.GetKey() !== this.Vcn?.GetKey() ||
        o.Rotation !== this.jcn ||
        o !== this.Hcn
      ) {
        const e = o.Entity.GetComponent(140);
        const i =
          (e?.TryRemoveTagById(-2116928595),
          e?.TryAddTagById(-2116928595),
          this.rmn(),
          this.Jcn(),
          (this.Vcn = t),
          (this.Hcn = o),
          (this.jcn = o.Rotation),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            ConfigManager_1.ConfigManager.ManipulateConfig.MatControllerDaPath,
            UE.ItemMaterialControllerActorData_C,
            (t) => {
              let e, i, s;
              t?.IsValid() &&
                ((e = this.Hcn.Entity.GetComponent(182)),
                (i = new UE.Transform()),
                (s = this.GetBlockLocationByIndex(this.Vcn).ToUeVector()),
                i.SetLocation(s),
                (s = Rotator_1.Rotator.Create(0, -o.Rotation, 0).Quaternion()),
                (s = this.Hte?.ActorTransform.TransformRotation(s.ToUeQuat())),
                i.SetRotation(s),
                e.GetInteractionMainActor().MakeActorProjection(i, t));
            },
          ),
          this.CheckJigsawBlockIllegal(o, t));
        for (const n of this.nmn(t, o)) {
          var s = new JigsawIndex(t.Row + n.Row, t.Col + n.Col);
          var s = this.Ncn.GetInteractionActorByIndex(s);
          if (s) {
            const r = s.GetRefActorsByTag(
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
    nmn(t, e, i) {
      switch (e.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          return e.GetActiveBlockOffset(i);
        case IComponent_1.EFillType.Direction:
          return this.tmn(t, e.Direction, i ?? e.Rotation);
      }
      return [];
    }
    rmn() {
      this.ui ||
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.HideJigsawBaseHint,
          this.Ycn,
        ),
        (this.ui = !0));
    }
    zcn() {
      this.ui &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.HideJigsawBaseHint,
          this.Ycn,
        ),
        (this.ui = !1));
    }
    Jcn() {
      if (this.Vcn && this.Hcn) {
        this.Hcn.Entity.GetComponent(182)
          .GetInteractionMainActor()
          .RemoveActorProjection();
        const t = this.nmn(this.Vcn, this.Hcn, this.jcn);
        for (const e of t) {
          var i = new JigsawIndex(this.Vcn.Row + e.Row, this.Vcn.Col + e.Col);
          var i = this.Ncn.GetInteractionActorByIndex(i);
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
      (this.Vcn = void 0), (this.Hcn = void 0);
    }
    omn(t, e) {
      const i = Protocol_1.Aki.Protocol.zKn.create();
      const s = Protocol_1.Aki.Protocol.AGs.create();
      const o = Protocol_1.Aki.Protocol.PGs.create();
      const r = Protocol_1.Aki.Protocol.VBs.create();
      const n = Protocol_1.Aki.Protocol.iws.create();
      const h = t.Entity;
      var a = h.GetComponent(182);
      const c = a.ActorLocationProxy;
      var a = a.ActorRotationProxy;
      (s.tFn = t.PutDownIndex.Row),
        (s.rFn = t.PutDownIndex.Col),
        (s.oFn = t.Rotation),
        (r.X = c.X),
        (r.Y = c.Y),
        (r.Z = c.Z),
        (n.Pitch = a.Pitch),
        (n.Roll = a.Roll),
        (n.Yaw = a.Yaw),
        (o.M3n = r),
        (o.S3n = n),
        (i.Zkn = MathUtils_1.MathUtils.NumberToLong(
          this.SIe.GetCreatureDataId(),
        )),
        (i.eFn = MathUtils_1.MathUtils.NumberToLong(
          h.GetComponent(0).GetCreatureDataId(),
        )),
        (i.nFn = e ? 1 : 0),
        (i.iFn = s),
        (i.p7n = o),
        Net_1.Net.Call(6099, i, (t) => {
          t.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.X5n,
              6787,
            );
        });
    }
    SDe() {
      const t = Protocol_1.Aki.Protocol.tQn.create();
      (t.sFn = MathUtils_1.MathUtils.NumberToLong(
        this.SIe.GetCreatureDataId(),
      )),
        Net_1.Net.Call(2604, t, (t) => {
          t.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.X5n,
                26153,
              )
            : this.OnFinish();
        });
    }
    OnFinish() {
      for (const [t, e] of this.Ocn)
        e.State === 1 &&
          this.Ncn.AddTagsByIndex(JigsawIndex.GenObjFromKey(t), 1248700469),
          e.State !== 0 &&
            (this.Ncn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              692213831,
            ),
            this.Ncn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -1270526641,
            ),
            this.Ncn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -1279673628,
            ),
            this.Ncn.RemoveTagsByIndex(
              JigsawIndex.GenObjFromKey(t),
              -2002333932,
            ));
      for (const i of this.Fcn) i[1].OnFinish();
    }
    tmn(t, e, i) {
      let s = [new JigsawIndex(0, 0)];
      return (
        this.smn(e, 1) && (s = s.concat(this.amn(t, i))),
        this.smn(e, 2) && (s = s.concat(this.amn(t, i + 180))),
        this.smn(e, 3) && (s = s.concat(this.amn(t, i + 90))),
        (s = this.smn(e, 4) ? s.concat(this.amn(t, i + 270)) : s)
      );
    }
    smn(t, e) {
      return ((t >> e) & 1) == 1;
    }
    amn(e, t) {
      const i = [];
      const s = [
        { RowDelta: -1, ColDelta: 0 },
        { RowDelta: 0, ColDelta: -1 },
        { RowDelta: 1, ColDelta: 0 },
        { RowDelta: 0, ColDelta: 1 },
      ];
      const o = ((Math.floor(t / 90) % 4) + 4) % 4;
      for (
        let t = 0;
        t < this.Config.JigsawConfig.Row * this.Config.JigsawConfig.Column;
        t++
      ) {
        const r = e.Row + s[o].RowDelta * t;
        const n = e.Col + s[o].ColDelta * t;
        if (
          r < 0 ||
          r >= this.Config.JigsawConfig.Row ||
          n < 0 ||
          n >= this.Config.JigsawConfig.Column
        )
          break;
        const h = this.Ocn.get(JigsawIndex.GenKey(r, n));
        if (h && h.State === 0) break;
        i.push(new JigsawIndex(r - e.Row, n - e.Col));
      }
      return i;
    }
    GetNextPosByDirection(t, e, i) {
      const s = new JigsawIndex(t.Row, t.Col);
      const o = Vector_1.Vector.Create(e);
      var r = Vector_1.Vector.Create(this.Hte.ActorUpProxy);
      const n = (r.Normalize(), Vector_1.Vector.Create());
      var e = e.DotProduct(r);
      var r =
        (r.Multiply(e, n),
        o.SubtractionEqual(n),
        o.Normalize(),
        Vector_1.Vector.Create(0, 0, 0));
      var e =
        (this.Hte.ActorQuatProxy.RotateVector(
          Vector_1.Vector.BackwardVectorProxy,
          r,
        ),
        Vector_1.Vector.Create(0, 0, 0));
      const h =
        (this.Hte.ActorQuatProxy.RotateVector(
          Vector_1.Vector.LeftVectorProxy,
          e,
        ),
        i.GetComponent(139));
      for (const _ of [
        { Vector: this.Hte.ActorForwardProxy, RowDelta: -1, ColDelta: 0 },
        { Vector: this.Hte.ActorRightProxy, RowDelta: 0, ColDelta: 1 },
        { Vector: r, RowDelta: 1, ColDelta: 0 },
        { Vector: e, RowDelta: 0, ColDelta: -1 },
      ])
        if (MathUtils_1.MathUtils.DotProduct(o, _.Vector) > COS_45) {
          for (
            ;
            s.Row >= 0 &&
            s.Row < this.Config.JigsawConfig.Row &&
            s.Col >= 0 &&
            s.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((s.Row += _.RowDelta),
              (s.Col += _.ColDelta),
              this.Ocn.has(s.GetKey()))
            ) {
              var a;
              const c = this.Ocn.get(s.GetKey());
              if (c.State !== 0)
                return (
                  (a = this.GetBlockLocationByIndex(s)),
                  h?.StartBoxTrace(a) || c.ActivatedNum !== 0 ? t : s
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
      const e = Protocol_1.Aki.Protocol.oQn.create();
      const i = Protocol_1.Aki.Protocol.AGs.create();
      const s = Protocol_1.Aki.Protocol.PGs.create();
      const o = Protocol_1.Aki.Protocol.VBs.create();
      const r = Protocol_1.Aki.Protocol.iws.create();
      const n = t.Entity;
      var h = n.GetComponent(182);
      const a = h.ActorLocationProxy;
      var h = h.ActorRotationProxy;
      (i.tFn = t.PutDownIndex.Row),
        (i.rFn = t.PutDownIndex.Col),
        (i.oFn = t.Rotation),
        (o.X = a.X),
        (o.Y = a.Y),
        (o.Z = a.Z),
        (r.Pitch = h.Pitch),
        (r.Roll = h.Roll),
        (r.Yaw = h.Yaw),
        (s.M3n = o),
        (s.S3n = r),
        (e.Zkn = MathUtils_1.MathUtils.NumberToLong(
          this.SIe.GetCreatureDataId(),
        )),
        (e.eFn = MathUtils_1.MathUtils.NumberToLong(
          n.GetComponent(0).GetCreatureDataId(),
        )),
        (e.iFn = i),
        (e.p7n = s),
        Net_1.Net.Call(22923, e, (t) => {
          t?.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.X5n,
              17305,
            );
        });
    }
    RemoveMagnetTipsTag(t) {
      this.Ncn.RemoveTagsByIndex(t, 1531999982),
        this.Ncn.RemoveTagsByIndex(t, -1705770981),
        this.Ncn.RemoveTagsByIndex(t, -230062685),
        this.Ncn.RemoveTagsByIndex(t, -447552724);
    }
    imn(e, t) {
      if (this.Ocn.get(e.GetKey()).State !== 1) {
        const i = t.Entity.GetComponent(139);
        const s = [];
        for (const n of [
          { Tag: 1531999982, RowDelta: -1, ColDelta: 0 },
          { Tag: -1705770981, RowDelta: 1, ColDelta: 0 },
          { Tag: -230062685, RowDelta: 0, ColDelta: -1 },
          { Tag: -447552724, RowDelta: 0, ColDelta: 1 },
        ]) {
          let t = !1;
          for (
            let o = new JigsawIndex(e.Row, e.Col);
            o.Row >= 0 &&
            o.Row < this.Config.JigsawConfig.Row &&
            o.Col >= 0 &&
            o.Col < this.Config.JigsawConfig.Column;

          )
            if (
              ((o.Row += n.RowDelta),
              (o.Col += n.ColDelta),
              this.Ocn.has(o.GetKey()))
            ) {
              let r = this.Ocn.get(o.GetKey());
              if (r.State !== 0) {
                r.ActivatedNum === 0 &&
                  ((r = this.GetBlockLocationByIndex(o)),
                  s.push(new BoxTraceCheckData(r, n.Tag, e)),
                  i?.StartBoxTrace(r) ||
                    ((t = !0), this.Ncn.HasTagByIndex(e, n.Tag)) ||
                    this.Ncn.AddTagsByIndex(e, n.Tag));
                break;
              }
            }
          t || this.Ncn.RemoveTagsByIndex(e, n.Tag);
        }
        this.Kcn.set(t.Entity, s);
      }
    }
    HasEmptySocket() {
      for (const [, t] of this.Ocn)
        if (t.State !== 0 && !t.Occupancy) return !0;
      return !1;
    }
    DynamicModifySocketState(t, e) {
      const i = this.Ocn.get(t.GetKey());
      if (i.State !== e) {
        let s;
        let o;
        const r = [];
        i.State === 0
          ? (r.push(e === 1 ? -894208705 : -1375820440),
            this.Ncn.DynamicAddActorByIndex(t, r))
          : e !== 0
            ? (i.State === 1
                ? this.Ncn.RemoveTagsByIndex(t, -894208705)
                : i.State === 2 && this.Ncn.RemoveTagsByIndex(t, -1375820440),
              e === 1
                ? this.Ncn.AddTagsByIndex(t, -894208705)
                : this.Ncn.AddTagsByIndex(t, -1375820440))
            : this.Ncn.DynamicRemoveActorByIndex(t),
          (i.State = e);
        for ([s, o] of this.Fcn) this.imn(JigsawIndex.GenObjFromKey(s), o);
      }
    }
    GetAllItemOnBase() {
      let t;
      const e = [];
      for ([, t] of this.Fcn) e.push(t);
      return e;
    }
    GetPutItemIndex(t) {
      let e = "";
      for (const [i, s] of this.Fcn) s === t && (e = i);
      if (e !== "") return JigsawIndex.GenObjFromKey(e);
    }
  });
(SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(121)],
    SceneItemJigsawBaseComponent,
  )),
  (exports.SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent);
// # sourceMappingURL=SceneItemJigsawBaseComponent.js.map
