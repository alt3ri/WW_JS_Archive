"use strict";
var SceneItemJigsawItemComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
        o = arguments.length,
        r =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (n = t[h]) &&
            (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
      return 3 < o && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemJigsawItemComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  SceneItemJigsawBaseComponent_1 = require("./SceneItemJigsawBaseComponent"),
  sinValue = [0, 1, 0, -1],
  cosValue = [1, 0, -1, 0];
let SceneItemJigsawItemComponent =
  (SceneItemJigsawItemComponent_1 = class SceneItemJigsawItemComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.CreatureDataComp = void 0),
        (this.Hte = void 0),
        (this.Ncn = void 0),
        (this.Lie = void 0),
        (this.Direction = 0),
        (this.hmn = []),
        (this.lmn = void 0),
        (this._mn = void 0),
        (this.umn = void 0),
        (this.cmn = 0),
        (this.gIe = (t, e) => {
          var i = 793256493,
            s = 741712776,
            n = 1488947861,
            o = this.Lie.HasTag(s) || this.Lie.HasTag(n),
            r = this.Lie.HasTag(i),
            h = o ? 2142861976 : -628734864;
          for (const a of t)
            if (a === i)
              for (const c of this.hmn)
                this.Ncn.AddTagsByIndex(c, a), this.Ncn.AddTagsByIndex(c, h);
          for (const m of e) {
            if ((m === s || m === n) && r)
              for (const f of this.hmn)
                this.Ncn.RemoveTagsByIndex(f, 2142861976);
            if (m === i)
              for (const v of this.hmn)
                this.Ncn.RemoveTagsByIndex(v, m),
                  this.Ncn.RemoveTagsByIndex(v, h);
          }
        });
    }
    set PutDownIndex(t) {
      this._mn = t;
    }
    get PutDownIndex() {
      return this._mn;
    }
    set PutDownBase(t) {
      this.umn = t;
    }
    get PutDownBase() {
      return this.umn;
    }
    get Rotation() {
      return this.cmn;
    }
    set Rotation(t) {
      this.cmn = t;
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemJigsawItemComponent_1)[0],
        e = ((this.Config = t), this.Config.FillCfg),
        i = this.Config.FillCfg;
      switch (this.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          var s = i.Centre;
          this.lmn = new SceneItemJigsawBaseComponent_1.JigsawIndex(
            s.RowIndex,
            s.ColumnIndex,
          );
          for (const n of i.Config.Pieces)
            n.InitState === IAction_1.EJigsawPieceState.Correct &&
              this.hmn.push(
                new SceneItemJigsawBaseComponent_1.JigsawIndex(
                  n.Index.RowIndex,
                  n.Index.ColumnIndex,
                ),
              );
          break;
        case IComponent_1.EFillType.Direction:
          e.W && (this.Direction |= 2),
            e.S && (this.Direction |= 4),
            e.A && (this.Direction |= 8),
            e.D && (this.Direction |= 16);
          s = new SceneItemJigsawBaseComponent_1.JigsawIndex(0, 0);
          this.hmn.push(s), (this.lmn = s);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.CreatureDataComp = this.Entity.GetComponent(0)),
        (this.Ncn = this.Entity.GetComponent(143)),
        (this.Lie = this.Entity.GetComponent(177)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    OnActivate() {
      this.emn();
    }
    emn() {
      var t = this.Config.FillCfg;
      if (t.Type === IComponent_1.EFillType.Fixed)
        if (void 0 !== t.ModelId) {
          var e = [];
          for (const i of this.hmn) e.push(i);
          this.Ncn.InitGenerateInfo(t.ModelId.toString(), e, (t) =>
            Vector_1.Vector.Create(this.GetBlockLocationByIndex(t)),
          );
        } else this.Ncn.SetIsFinish(!0);
    }
    GetCenterIndex() {
      return this.lmn;
    }
    GetActiveBlockOffset(t) {
      var e = [];
      for (const i of this.hmn)
        e.push(
          this.mmn(
            new SceneItemJigsawBaseComponent_1.JigsawIndex(
              i.Row - this.lmn.Row,
              i.Col - this.lmn.Col,
            ),
            t,
          ),
        );
      return e;
    }
    RotateSelf() {
      this.cmn += 90;
    }
    mmn(t, e) {
      var e = ((e ?? this.cmn) / 90) % sinValue.length,
        i = t.Row * cosValue[e] - t.Col * sinValue[e],
        t = t.Row * sinValue[e] + t.Col * cosValue[e];
      return new SceneItemJigsawBaseComponent_1.JigsawIndex(i, t);
    }
    GetBlockLocationByIndex(t) {
      var e,
        i,
        s = this.Config.FillCfg;
      return s.Type !== IComponent_1.EFillType.Fixed
        ? this.Hte.ActorLocationProxy
        : t.Row >= s.Config.Row || t.Col >= s.Config.Column
          ? void 0
          : ((i = (e = this.lmn).Row - t.Row),
            (e = e.Col - t.Col),
            (t = s.Config.Size),
            (s = Vector2D_1.Vector2D.Create(t, t).MultiplyEqual(
              Vector2D_1.Vector2D.Create(i, e),
            )),
            (t = new UE.Vector(s.X, -s.Y, 0)),
            (i = Vector_1.Vector.Create(0, 0, 0)).FromUeVector(
              this.Hte.ActorTransform.TransformPosition(t),
            ),
            i);
    }
    OnPutDownToBase(t) {
      this.umn = t;
      for (const i of this.hmn) {
        var e = this.mmn(
          new SceneItemJigsawBaseComponent_1.JigsawIndex(
            i.Row - this.lmn.Row,
            i.Col - this.lmn.Col,
          ),
        );
        switch (
          ((e.Row += this.PutDownIndex.Row),
          (e.Col += this.PutDownIndex.Col),
          t.GetBlockStateByIndex(e))
        ) {
          case 1:
            this.Ncn.AddTagsByIndex(i, -1682391476);
            break;
          case 2:
            this.Ncn.AddTagsByIndex(i, -1936327549);
        }
      }
    }
    OnPickUpFormBase(t) {
      this.umn = void 0;
      for (const i of this.hmn) {
        var e = this.mmn(
          new SceneItemJigsawBaseComponent_1.JigsawIndex(
            i.Row - this.lmn.Row,
            i.Col - this.lmn.Col,
          ),
        );
        switch (
          ((e.Row += this.PutDownIndex.Row),
          (e.Col += this.PutDownIndex.Col),
          t.GetBlockStateByIndex(e))
        ) {
          case 1:
            this.Ncn.RemoveTagsByIndex(i, -1682391476);
            break;
          case 2:
            this.Ncn.RemoveTagsByIndex(i, -1936327549);
        }
      }
    }
    OnFinish() {
      for (const t of this.hmn) this.Ncn.AddTagsByIndex(t, 754952868);
    }
    GetNextMoveTargetOnHit(t) {
      if (this.PutDownBase?.Valid)
        return [
          (t = this.PutDownBase.GetNextPosByDirection(
            this.PutDownIndex,
            t,
            this.Entity,
          )).GetKey() !== this.PutDownIndex.GetKey(),
          this.PutDownBase.GetBlockLocationByIndex(t),
          t,
        ];
    }
    OnMove(t) {
      this.PutDownBase.OnItemMove(this, t);
    }
    RemoveMagnetTipsTag() {
      this.PutDownBase.RemoveMagnetTipsTag(this.PutDownIndex);
    }
    GetAllActivatedBlockPos() {
      var t = [];
      for (const i of this.hmn) {
        var e = this.GetBlockLocationByIndex(i);
        e && t.push(Vector_1.Vector.Create(e));
      }
      return t;
    }
  });
(SceneItemJigsawItemComponent = SceneItemJigsawItemComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(122)],
    SceneItemJigsawItemComponent,
  )),
  (exports.SceneItemJigsawItemComponent = SceneItemJigsawItemComponent);
//# sourceMappingURL=SceneItemJigsawItemComponent.js.map
