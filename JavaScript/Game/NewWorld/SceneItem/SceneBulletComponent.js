"use strict";
let SceneBulletComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let n;
    const o = arguments.length;
    let r =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, s);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (n = t[h]) && (r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r);
    return o > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBulletComponent = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletController_1 = require("../Bullet/BulletController");
class BulletData {
  constructor(t, e) {
    (this.BulletEntityId = void 0),
      (this.BulletGroup = void 0),
      (this.BulletTransform = void 0),
      (this.BulletGroup = t),
      (this.BulletTransform = e);
  }
}
let SceneBulletComponent =
  (SceneBulletComponent_1 = class SceneBulletComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.F_n = !1),
        (this.dmn = !1),
        (this.Mke = 0),
        (this.Cmn = void 0),
        (this.gmn = void 0),
        (this.fmn = void 0),
        (this.ktn = void 0),
        (this.Hte = void 0),
        (this.jDn = void 0),
        (this.pmn = !1),
        (this.nye = () => {
          this.szo(this.Mke);
        }),
        (this.vmn = (t, e) => {
          e = e.Entity;
          if (
            ((this.dmn = t),
            this.F_n && e && (e.GetComponent(51) || e.GetComponent(138)))
          )
            if (t) this.szo(this.Mke);
            else for (const i of this.fmn.keys()) this.K5o(i);
        }),
        (this.B1n = (t, e) => {
          if (((this.Mke = t), this.F_n && e)) {
            (this.dmn || this.pmn) && this.szo(this.Mke);
            for (const i of this.fmn.keys()) i !== this.Mke && this.K5o(i);
          }
        }),
        (this.kpe = () => {
          if (
            this.pmn &&
            void 0 !== Global_1.Global.BaseCharacter?.CharacterActorComponent &&
            ModelManager_1.ModelManager.GameModeModel.WorldDone
          ) {
            for (const t of this.fmn.keys()) this.K5o(t);
            this.szo(this.Mke);
          }
        });
    }
    OnInitData(t) {
      (this.gmn = Vector_1.Vector.Create(0, 0, 0)),
        (this.Cmn = Vector_1.Vector.Create(0, 0, 0)),
        (this.fmn = new Map());
      for (const i of t.GetParam(SceneBulletComponent_1)[0].BulletGroups) {
        const e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          i.EntityState,
        );
        this.fmn.has(e) || this.fmn.set(e, []),
          this.fmn
            .get(e)
            .push(new BulletData(i, Transform_1.Transform.Create()));
      }
      t = this.Entity.GetComponent(0)?.ComponentDataMap.get("yps");
      return (
        (this.jDn = MathUtils_1.MathUtils.LongToBigInt(t?.yps?.S4n)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.kpe,
        ),
        !0
      );
    }
    OnStart() {
      (this.ktn = this.Entity.GetComponent(74)),
        this.ktn
          ? this.ktn.AddOnEntityOverlapCallback(this.vmn)
          : (this.pmn = !0);
      const t = this.Entity.GetComponent(177);
      for (const e of this.fmn.keys())
        if (t.HasTag(e)) {
          this.Mke = e;
          break;
        }
      return !0;
    }
    OnActivate() {
      return (
        (this.Hte = this.Entity.GetComponent(1)),
        (this.F_n = !0),
        void 0 !== Global_1.Global.BaseCharacter?.CharacterActorComponent &&
        ModelManager_1.ModelManager.GameModeModel.WorldDone
          ? this.pmn && this.szo(this.Mke)
          : this.pmn &&
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.WorldDone,
              this.nye,
            ),
        !0
      );
    }
    szo(t) {
      if (this.fmn.has(t) && this.fmn.get(t).length !== 0)
        for (const n of this.fmn.get(t)) {
          if (n.BulletEntityId) return;
          this.Mmn(n);
          const e = n.BulletGroup;
          var i = n.BulletTransform;
          let t = void 0;
          e.Range &&
            (this.gmn.Set(e.Range.X, e.Range.Y, e.Range.Z),
            (t = { Size: this.gmn }));
          var s;
          var i = BulletController_1.BulletController.CreateBulletCustomTarget(
            Global_1.Global.BaseCharacter.CharacterActorComponent.Actor,
            e.BulletId.toString(),
            i.ToUeTransform(),
            t,
            this.jDn,
          );
          i?.GetComponent(152)?.Owner?.IsValid() &&
            (((s =
              BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
                14,
              )).IsParentActor = !0),
            (s.Actor = this.Hte.Owner),
            (s.LocationRule = 1),
            (s.RotationRule = 1),
            (s.ScaleRule = 1),
            (s.WeldSimulatedBodies = !1),
            BulletController_1.BulletController.GetActionRunner().AddAction(
              i.GetBulletInfo(),
              s,
            )),
            (n.BulletEntityId = i?.Id),
            i
              ? EventSystem_1.EventSystem.Has(
                  EventDefine_1.EEventName.WorldDone,
                  this.nye,
                ) &&
                EventSystem_1.EventSystem.Remove(
                  EventDefine_1.EEventName.WorldDone,
                  this.nye,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  43,
                  "Bullet生成错误",
                  ["BulletID", e.BulletId],
                  ["当前Bullet的EntityState", e.EntityState],
                  ["EntityID", this.Entity.Id],
                );
        }
    }
    K5o(t) {
      if (this.fmn.has(t) && this.fmn.get(t).length !== 0)
        for (const i of this.fmn.get(t)) {
          if (!i.BulletEntityId) return;
          const e = EntitySystem_1.EntitySystem.Get(i.BulletEntityId);
          e?.Valid && e.GetComponent(152).Owner?.K2_DetachFromActor(1, 1, 1),
            BulletController_1.BulletController.DestroyBullet(
              i.BulletEntityId,
              !1,
            ),
            (i.BulletEntityId = void 0);
        }
    }
    Mmn(t) {
      (t.BulletTransform = Transform_1.Transform.Create()),
        t.BulletTransform.FromUeTransform(this.Hte.ActorTransform),
        t.BulletGroup.Offset &&
          (this.Cmn.Set(
            t.BulletGroup.Offset.X ?? 0,
            t.BulletGroup.Offset.Y ?? 0,
            t.BulletGroup.Offset.Z ?? 0,
          ),
          t.BulletTransform.SetLocation(
            t.BulletTransform.ToUeTransform()
              .GetLocation()
              .op_Addition(this.Cmn.ToUeVector()),
          ));
    }
    OnEnd() {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WorldDone,
          this.nye,
        ),
        this.ktn?.RemoveOnEntityOverlapCallback(this.vmn);
      for (const t of this.fmn.keys()) this.K5o(t);
      return this.fmn.clear(), (this.F_n = !1), !(this.dmn = !1);
    }
    OnClear() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.B1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.B1n,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.kpe,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnUpdateSceneTeam,
            this.kpe,
          ),
        !0
      );
    }
  });
(SceneBulletComponent = SceneBulletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(126)],
    SceneBulletComponent,
  )),
  (exports.SceneBulletComponent = SceneBulletComponent);
// # sourceMappingURL=SceneBulletComponent.js.map
