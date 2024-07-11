"use strict";
var SceneItemProgressControlComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        o = arguments.length,
        n =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (r = t[h]) &&
            (n = (o < 3 ? r(n) : 3 < o ? r(e, i, n) : r(e, i)) || n);
      return 3 < o && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemProgressControlComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
let SceneItemProgressControlComponent =
  (SceneItemProgressControlComponent_1 = class SceneItemProgressControlComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Rne = void 0),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.u1n = void 0),
        (this.c1n = void 0),
        (this.m1n = (t, e) => {
          switch (t) {
            case -1152559349:
              this.d1n(
                "[SceneItemProgressControlComponent.HandleUpdateState] 状态变为常态, 停止进度控制",
              ),
                this.C1n(),
                this.H1t(),
                this.g1n();
              break;
            case -3775711:
              this.f1n();
              break;
            case 1298716444:
              this.d1n(
                "[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制",
              );
          }
        }),
        (this.vtn = void 0),
        (this.p1n = !1),
        (this.v1n = void 0),
        (this.M1n = 0),
        (this.E1n = (t) => {
          "CaptureStrategicPoint" === this.Lo.Control.Type &&
            this.p1n !== t &&
            ((this.p1n = t), this.S1n());
        }),
        (this.y1n = (t, e) => {
          var i = this.Lo.Control;
          if ("CaptureStrategicPoint" === i.Type && e?.Valid) {
            var s = e.Entity.GetComponent(3);
            if (!s?.IsRoleAndCtrlByMe) {
              if (t) {
                (s = i.EnemyEntitiyMatch),
                  (t = e.Entity.GetComponent(0).GetBaseInfo()?.Category);
                if (!t) return;
                if (!(0, IUtil_1.isEntitiyMatch)(s, t)) return;
                this.v1n.add(e);
              } else this.v1n.delete(e);
              this.S1n();
            }
          }
        }),
        (this.zpe = (t, e) => {
          this.v1n.has(e) && this.y1n(!1, e);
        });
    }
    OnInitData(t) {
      (t = t.GetParam(SceneItemProgressControlComponent_1)[0]),
        (this.Lo = t),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.c1n = new Set()),
        (this.Rne = void 0),
        this.C1n(),
        (t = this.Lo.Control);
      return "CaptureStrategicPoint" !== t.Type
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlay",
              40,
              "[SceneItemProgressControlComponent.OnCreate] 不支持的进度控制类型",
              ["PbDataId", this.EIe.GetPbDataId()],
              ["ProgressCtrlType", t.Type],
            ),
          !1)
        : ((this.p1n = !1), (this.v1n = new Set()), !0);
    }
    OnStart() {
      if (
        ((this.mBe = this.Entity.CheckGetComponent(119)),
        (this.Lie = this.Entity.CheckGetComponent(180)),
        !this.mBe || !this.Lie)
      )
        return !1;
      var t = this.Lo.Control;
      if ("CaptureStrategicPoint" === t.Type) {
        if (((this.vtn = this.Entity.CheckGetComponent(76)), !this.vtn))
          return !1;
        this.vtn.AddOnPlayerOverlapCallback(this.E1n),
          this.vtn.AddOnEntityOverlapCallback(this.y1n),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          );
      }
      return !0;
    }
    OnActivate() {
      this.I1n(),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.m1n,
        )
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Temp",
              32,
              "SceneItemProgressControlComponent.OnActivate: 重复添加事件",
              ["PbDataId", this.EIe.GetPbDataId()],
            )
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.m1n,
            ),
        this.g1n();
    }
    OnEnd() {
      return (
        "CaptureStrategicPoint" === this.Lo.Control.Type &&
          (this.vtn &&
            (this.vtn.RemoveOnPlayerOverlapCallback(this.E1n),
            this.vtn.RemoveOnEntityOverlapCallback(this.y1n),
            (this.vtn = void 0)),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          )),
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
        !(this.mBe = void 0)
      );
    }
    OnTick(t) {
      "CaptureStrategicPoint" === this.Lo.Control.Type && this.T1n(t);
    }
    I1n() {
      this.mBe?.IsInState(2)
        ? this.f1n()
        : this.d1n(
            "[SceneItemProgressControlComponent.HandleUpdateState] 状态未激活, 停止进度控制",
          );
    }
    L1n() {
      var t = Protocol_1.Aki.Protocol.jls.create();
      (t.P4n = MathUtils_1.MathUtils.NumberToLong(
        this.EIe.GetCreatureDataId(),
      )),
        Net_1.Net.Call(16385, t, (t) => {});
    }
    g1n() {
      var t = this.Lo.Control;
      "CaptureStrategicPoint" !== t.Type ||
        this.u1n?.CurrentValue !== t.MaxValue ||
        this.mBe?.IsInState(4) ||
        this.L1n();
    }
    D1n() {
      return void 0 === this.Rne;
    }
    f1n() {
      !this.D1n() &&
        this.Enable(
          this.Rne,
          "SceneItemProgressControlComponent.EnableProgressControl",
        ) &&
        ((this.Rne = void 0), this.R1n(!0));
    }
    d1n(t) {
      this.D1n() && ((this.Rne = this.Disable(t)), this.R1n(!1));
    }
    R1n(t) {
      "CaptureStrategicPoint" === this.Lo.Control.Type && this.S1n(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
          this.Entity,
          t,
          this.u1n,
        );
    }
    H1t() {
      this.c1n.forEach((t) => {
        t?.(this.u1n);
      });
    }
    AddProgressDataChangedCallback(t) {
      return !(!t || !this.c1n || (this.c1n.add(t), 0));
    }
    RemoveProgressDataChangedCallback(t) {
      return !(!t || !this.c1n) && this.c1n.delete(t);
    }
    GetProgressData() {
      return this.u1n;
    }
    C1n() {
      var t = this.Lo.Control;
      "CaptureStrategicPoint" === t.Type &&
        (this.u1n = {
          ProgressCtrlType: t.Type,
          CurrentValue: t.InitValue,
          MaxValue: t.MaxValue,
        });
    }
    U1n(t) {
      switch (t) {
        case 0:
          return;
        case 3:
          return 1803735224;
        default:
          return -1726296883;
      }
    }
    S1n() {
      var t,
        e = this.M1n;
      let i = 0;
      e !==
        (i = this.D1n()
          ? 0 < this.v1n.size
            ? this.p1n
              ? 1
              : 2
            : this.p1n
              ? 3
              : 4
          : i) &&
        ((this.M1n = i), (e = this.U1n(e)) !== (t = this.U1n(i))) &&
        this.Lie &&
        (this.Lie.NotifyLock++,
        void 0 !== e && this.Lie.RemoveTag(e),
        void 0 !== t && this.Lie.AddTag(t),
        this.Lie.NotifyLock--);
    }
    T1n(e) {
      var i = this.Lo.Control;
      if ("CaptureStrategicPoint" === i.Type) {
        let t = 0;
        switch (this.M1n) {
          case 1:
          case 2:
            t = -i.DecreaseSpeed;
            break;
          case 3:
            t = i.IncreaseSpeed;
            break;
          default:
            return;
        }
        e = MathUtils_1.MathUtils.Clamp(
          this.u1n.CurrentValue +
            (e / CommonDefine_1.MILLIONSECOND_PER_SECOND) * t,
          0,
          i.MaxValue,
        );
        e !== this.u1n.CurrentValue &&
          ((this.u1n.CurrentValue = e), this.H1t(), this.g1n());
      }
    }
  });
(SceneItemProgressControlComponent = SceneItemProgressControlComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(116)],
    SceneItemProgressControlComponent,
  )),
  (exports.SceneItemProgressControlComponent =
    SceneItemProgressControlComponent);
//# sourceMappingURL=SceneItemProgressControlComponent.js.map
