"use strict";
var SceneBulletComponent_1,
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
        for (var l = t.length - 1; 0 <= l; l--)
          (n = t[l]) &&
            (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
      return 3 < o && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBulletComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BulletController_1 = require("../Bullet/BulletController");
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
        (this.M_n = !1),
        (this.Qcn = !1),
        (this.G2e = 0),
        (this.Xcn = void 0),
        (this.$cn = void 0),
        (this.Ycn = void 0),
        (this.vtn = void 0),
        (this.Hte = void 0),
        (this.JUn = void 0),
        (this.Jcn = !1),
        (this.vsa = () => {
          this.oZo(this.G2e);
        }),
        (this.zcn = (t, e) => {
          e = e.Entity;
          if (
            ((this.Qcn = t),
            this.M_n && e && (e.GetComponent(52) || e.GetComponent(140)))
          )
            if (t) this.oZo(this.G2e);
            else for (const i of this.Ycn.keys()) this.HVo(i);
        }),
        (this.m1n = (t, e) => {
          if (((this.G2e = t), this.M_n && e)) {
            (this.Qcn || this.Jcn) && this.oZo(this.G2e);
            for (const i of this.Ycn.keys()) i !== this.G2e && this.HVo(i);
          }
        });
    }
    OnInitData(t) {
      (this.$cn = Vector_1.Vector.Create(0, 0, 0)),
        (this.Xcn = Vector_1.Vector.Create(0, 0, 0)),
        (this.Ycn = new Map());
      for (const i of t.GetParam(SceneBulletComponent_1)[0].BulletGroups) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          i.EntityState,
        );
        this.Ycn.has(e) || this.Ycn.set(e, []),
          this.Ycn.get(e).push(
            new BulletData(i, Transform_1.Transform.Create()),
          );
      }
      t = this.Entity.GetComponent(0)?.ComponentDataMap.get("Nys");
      return (
        (this.JUn = MathUtils_1.MathUtils.LongToBigInt(t?.Nys?.tVn)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        ),
        !0
      );
    }
    OnStart() {
      (this.vtn = this.Entity.GetComponent(76)),
        this.vtn
          ? this.vtn.AddOnEntityOverlapCallback(this.zcn)
          : (this.Jcn = !0);
      var t = this.Entity.GetComponent(180);
      for (const e of this.Ycn.keys())
        if (t.HasTag(e)) {
          this.G2e = e;
          break;
        }
      return !0;
    }
    OnActivate() {
      return (
        (this.Hte = this.Entity.GetComponent(1)),
        (this.M_n = !0),
        void 0 !== Global_1.Global.BaseCharacter?.CharacterActorComponent &&
        ModelManager_1.ModelManager.BulletModel.IsSceneBulletOwnerCreated
          ? this.Jcn && this.oZo(this.G2e)
          : this.Jcn &&
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.SceneBulletOwnerCreated,
              this.vsa,
            ),
        !0
      );
    }
    oZo(t) {
      if (this.Ycn.has(t) && 0 !== this.Ycn.get(t).length)
        for (const n of this.Ycn.get(t)) {
          if (n.BulletEntityId) return;
          this.Zcn(n);
          var e = n.BulletGroup,
            i = n.BulletTransform;
          let t = void 0;
          e.Range &&
            (this.$cn.Set(e.Range.X, e.Range.Y, e.Range.Z),
            (t = { Size: this.$cn }));
          var s = BulletController_1.BulletController.GetSceneBulletOwner();
          if (!s?.IsInit)
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                18,
                "Bullet生成错误, 找不到场景子弹owner",
                ["EntityID", this.Entity.Id],
              )
            );
          s = BulletController_1.BulletController.CreateBulletCustomTarget(
            s.Entity,
            e.BulletId.toString(),
            i.ToUeTransform(),
            t,
            this.JUn,
          );
          s?.GetComponent(154)?.Owner?.IsValid() &&
            (((i =
              BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
                14,
              )).IsParentActor = !0),
            (i.Actor = this.Hte.Owner),
            (i.LocationRule = 1),
            (i.RotationRule = 1),
            (i.ScaleRule = 1),
            (i.WeldSimulatedBodies = !1),
            BulletController_1.BulletController.GetActionRunner().AddAction(
              s.GetBulletInfo(),
              i,
            )),
            (n.BulletEntityId = s?.Id),
            s
              ? EventSystem_1.EventSystem.Has(
                  EventDefine_1.EEventName.SceneBulletOwnerCreated,
                  this.vsa,
                ) &&
                EventSystem_1.EventSystem.Remove(
                  EventDefine_1.EEventName.SceneBulletOwnerCreated,
                  this.vsa,
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
    HVo(t) {
      if (this.Ycn.has(t) && 0 !== this.Ycn.get(t).length)
        for (const i of this.Ycn.get(t)) {
          if (!i.BulletEntityId) return;
          var e = EntitySystem_1.EntitySystem.Get(i.BulletEntityId);
          e?.Valid && e.GetComponent(154).Owner?.K2_DetachFromActor(1, 1, 1),
            BulletController_1.BulletController.DestroyBullet(
              i.BulletEntityId,
              !1,
            ),
            (i.BulletEntityId = void 0);
        }
    }
    Zcn(t) {
      (t.BulletTransform = Transform_1.Transform.Create()),
        t.BulletTransform.FromUeTransform(this.Hte.ActorTransform),
        t.BulletGroup.Offset &&
          (this.Xcn.Set(
            t.BulletGroup.Offset.X ?? 0,
            t.BulletGroup.Offset.Y ?? 0,
            t.BulletGroup.Offset.Z ?? 0,
          ),
          t.BulletTransform.SetLocation(
            t.BulletTransform.ToUeTransform()
              .GetLocation()
              .op_Addition(this.Xcn.ToUeVector()),
          ));
    }
    OnEnd() {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.SceneBulletOwnerCreated,
        this.vsa,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.SceneBulletOwnerCreated,
          this.vsa,
        ),
        this.vtn?.RemoveOnEntityOverlapCallback(this.zcn);
      for (const t of this.Ycn.keys()) this.HVo(t);
      return this.Ycn.clear(), (this.M_n = !1), !(this.Qcn = !1);
    }
    OnClear() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.m1n,
          ),
        !0
      );
    }
  });
(SceneBulletComponent = SceneBulletComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(128)],
    SceneBulletComponent,
  )),
  (exports.SceneBulletComponent = SceneBulletComponent);
//# sourceMappingURL=SceneBulletComponent.js.map
