"use strict";
var BatchBulletCasterComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, s) {
      var i,
        r = arguments.length,
        n =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, o))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, o, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (i = t[a]) &&
            (n = (r < 3 ? i(n) : 3 < r ? i(e, o, n) : i(e, o)) || n);
      return 3 < r && n && Object.defineProperty(e, o, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BatchBulletCasterComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  BulletCasterBatch_1 = require("../../BulletCaster/BulletCasterBatch");
let BatchBulletCasterComponent =
  (BatchBulletCasterComponent_1 = class BatchBulletCasterComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.mBe = void 0),
        (this.R0n = void 0),
        (this.CCl = 0),
        (this.gCl = []),
        (this.pCl = !1),
        (this.oFe = () => {
          this.mBe.IsInState(2) ? this.fCl() : this.vCl();
        });
    }
    OnInitData(t) {
      var e = t?.GetParam(BatchBulletCasterComponent_1)?.[0];
      if (!e) return !1;
      (this.R0n = e), (this.EIe = this.Entity.GetComponent(0));
      t = this.EIe?.ComponentDataMap.get("hI_");
      if (!t) return !1;
      var o = MathUtils_1.MathUtils.LongToBigInt(t.hI_._Vn),
        s = [];
      for (const h of e.BulletList) {
        var i = Transform_1.Transform.Create(),
          r = h.Pos,
          n = h.Rot;
        MathUtils_1.MathUtils.CommonTempVector.Set(
          r.X ?? 0,
          r.Y ?? 0,
          r.Z ?? 0,
        ),
          i.SetLocation(MathUtils_1.MathUtils.CommonTempVector),
          MathUtils_1.MathUtils.CommonTempRotator.Set(
            n.Y ?? 0,
            n.Z ?? 0,
            n.X ?? 0,
          ),
          i.SetRotation(MathUtils_1.MathUtils.CommonTempRotator.Quaternion()),
          i.SetScale3D(Vector_1.Vector.OneVectorProxy),
          s.push(i);
      }
      (this.CCl = 0),
        (this.CCl = e.BatchList.reduce(
          (t, e) => (e.Time > t ? e.Time : t),
          -1 / 0,
        ));
      for (const l of e.BatchList) {
        var a = new BulletCasterBatch_1.BulletCasterBatch(
          this.Entity,
          this.CCl,
          l.Time,
          l.CasterList,
          e.WarningEffect,
          o,
          s,
          e.MovementType,
        );
        this.gCl.push(a);
      }
      return !0;
    }
    OnStart() {
      return (this.mBe = this.Entity.GetComponent(131)), !0;
    }
    OnActivate() {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
        this,
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemStateChange,
        this.oFe,
      ),
        this.mBe.IsInState(0) || this.oFe();
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), this.vCl(), !0
      );
    }
    OnChangeTimeDilation(t) {
      var e = this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1;
      for (const o of this.gCl) o.SetTimeDilation(t * e);
    }
    fCl() {
      if (
        !(
          !this.R0n ||
          this.R0n.BatchList.length < 0 ||
          this.CCl <= 0 ||
          this.pCl
        )
      ) {
        (this.pCl = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              39,
              "[BatchBulletCasterComponent] StartLoop",
              ["PbDataId", this.EIe?.GetPbDataId()],
            );
        for (const t of this.gCl) t.Start();
      }
    }
    vCl() {
      if (this.pCl) {
        (this.pCl = !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              39,
              "[BatchBulletCasterComponent] StopLoop",
              ["PbDataId", this.EIe?.GetPbDataId()],
            );
        for (const t of this.gCl) t.Stop();
      }
    }
  });
(BatchBulletCasterComponent = BatchBulletCasterComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(255)],
    BatchBulletCasterComponent,
  )),
  (exports.BatchBulletCasterComponent = BatchBulletCasterComponent);
//# sourceMappingURL=BatchBulletCasterComponent.js.map
