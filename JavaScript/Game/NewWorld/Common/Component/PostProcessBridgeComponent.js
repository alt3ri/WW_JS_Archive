"use strict";
var PostProcessBridgeComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var o,
        h = arguments.length,
        r =
          h < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, s, e);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (o = t[n]) &&
            (r = (h < 3 ? o(r) : 3 < h ? o(i, s, r) : o(i, s)) || r);
      return 3 < h && r && Object.defineProperty(i, s, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PostProcessBridgeComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  SkyboxById_1 = require("../../../../Core/Define/ConfigQuery/SkyboxById"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ComponentForceTickController_1 = require("../../../World/Controller/ComponentForceTickController"),
  RoleTriggerController_1 = require("../../Character/Role/RoleTriggerController"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  DEFAULT_PRIORITY = 10,
  TICK_TIME = 1e3;
let PostProcessBridgeComponent =
  (PostProcessBridgeComponent_1 = class PostProcessBridgeComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.gU = !1),
        (this.Vge = !1),
        (this.nsn = void 0),
        (this.ssn = void 0),
        (this.asn = void 0),
        (this.hsn = void 0),
        (this.lsn = void 0),
        (this._sn = void 0),
        (this.OC = void 0),
        (this.usn = !0),
        (this.csn = void 0),
        (this.msn = void 0),
        (this.e8 = 0),
        (this.dsn = !1),
        (this.Csn = 0.001),
        (this.Jue = 10),
        (this.gsn = 0),
        (this.fsn = 0),
        (this.psn = (t) => {
          t ? this.OnTriggerEnter() : this.OnTriggerExit();
        }),
        (this.cjr = (t) => {
          this.gU &&
            (0 < this.msn && this.vsn(t), this.fsn !== this.gsn) &&
            (this.gsn > this.fsn
              ? ((this.fsn = this.fsn + t * this.Csn),
                (this.fsn = Math.min(this.fsn, this.gsn)))
              : ((this.fsn = this.fsn - t * this.Csn),
                (this.fsn = Math.max(this.fsn, this.gsn))),
            (this._sn.BlendWeight = this.fsn),
            this.Msn());
        });
    }
    OnInitData(t) {
      var i,
        t = t.GetParam(PostProcessBridgeComponent_1)[0];
      return (
        t.SkyboxSetting
          ? (i = SkyboxById_1.configSkyboxById.GetConfig(t.SkyboxSetting)) &&
            ((this.nsn = i.StaticSkybox), (this.ssn = i.DynamicSkybox))
          : ((this.nsn = t.WeatherDataAsset), (this.ssn = t.PPTODDataAsset)),
        void 0 !== t.FadeTime && 0 < t.FadeTime
          ? (this.Csn =
              1 / (t.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond))
          : (this.Csn = 0),
        (this.Jue = t.Priority ?? DEFAULT_PRIORITY),
        (this.usn = void 0 === t.TriggerMode),
        (this.csn = t.TriggerMode),
        t.TriggerMode?.Type === IComponent_1.ETriggerMode.Distance
          ? ((i = t.TriggerMode), (this.msn = i.Distance * i.Distance))
          : (this.msn = 0),
        (this.e8 = 0),
        !(this.dsn = !1)
      );
    }
    OnStart() {
      var t,
        i = this.Entity.GetComponent(1).Owner;
      if (i?.IsValid()) {
        if (
          ((this.OC = i),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            ((t = this.Entity.GetComponent(0)?.GetPbDataId()),
            i.SetActorLabel("SkyboxEntity_" + t)),
          (this._sn = i.GetComponentByClass(
            UE.KuroPostProcessComponent.StaticClass(),
          )),
          this._sn?.IsValid() ||
            (this._sn = i.AddComponentByClass(
              UE.KuroPostProcessComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )),
          (this._sn.bUnbound = !0),
          (this._sn.BlendWeight = this.fsn),
          this.Msn(),
          this.usn)
        ) {
          if (((this.lsn = this.Entity.GetComponent(74)), !this.lsn))
            return (
              (this.gU = !1),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  18,
                  "氛围组件初始化失败，缺少RangeComponent",
                ),
              !1
            );
          this.lsn.AddOnPlayerOverlapCallback(this.psn);
        }
        if (
          ((this.gU = !0),
          this.EnableComponent(),
          !StringUtils_1.StringUtils.IsEmpty(this.nsn))
        )
          return (
            ResourceSystem_1.ResourceSystem.LoadAsync(
              this.nsn,
              UE.KuroWeatherDataAsset,
              (t) => {
                t?.IsValid() &&
                  ((this.asn = t),
                  (this._sn.WeatherDataAsset = this.asn),
                  this._sn.SetPriority(this.Jue));
              },
            ),
            !0
          );
        if (!StringUtils_1.StringUtils.IsEmpty(this.ssn))
          return (
            ResourceSystem_1.ResourceSystem.LoadAsync(
              this.ssn,
              UE.KuroTODData,
              (t) => {
                t?.IsValid() &&
                  ((this.hsn = t),
                  (this._sn.PPTODDataAsset = this.hsn),
                  this._sn.SetPriority(this.Jue));
              },
            ),
            !0
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            18,
            "氛围组件初始化失败",
            ["WeatherDataAssetPath", this.nsn],
            ["TodDataAssetPath", this.ssn],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 18, "氛围组件初始化失败, actor为空");
      return !1;
    }
    OnTriggerEnter() {
      this.gU &&
        this.Vge &&
        ((this.dsn = !0),
        this.SetTargetBlendWeight(1),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "氛围组件触发",
          ["WeatherDataAssetPath", this.nsn],
          ["TodDataAssetPath", this.ssn],
        );
    }
    OnTriggerExit() {
      this.gU &&
        this.Vge &&
        ((this.dsn = !1),
        this.SetTargetBlendWeight(0),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "氛围组件关闭",
          ["WeatherDataAssetPath", this.nsn],
          ["TodDataAssetPath", this.ssn],
        );
    }
    SetTargetBlendWeight(t, i = !1) {
      this.gU &&
        ((this.gsn = t),
        (!i && 0 !== this.Csn) ||
          ((this.fsn = t), (this._sn.BlendWeight = this.fsn), this.Msn()));
    }
    EnableComponent() {
      this.gU &&
        ((this.Vge = !0),
        (this.e8 = TICK_TIME),
        (this.dsn = !1),
        this.usn
          ? this.lsn.IsOverlappingPlayer() && this.OnTriggerEnter()
          : this.csn?.Type === IComponent_1.ETriggerMode.Global &&
            this.OnTriggerEnter());
    }
    DisableComponent() {
      this.gU && ((this.Vge = !1), this.SetTargetBlendWeight(0));
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    OnForceTick(t) {
      this.cjr(t);
    }
    vsn(t) {
      (this.e8 += t),
        this.e8 < TICK_TIME ||
          ((this.e8 = 0),
          (t =
            RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger())?.IsValid() &&
            this.OC?.IsValid() &&
            ((t = t.GetSquaredDistanceTo(this.OC) < this.msn),
            this.dsn ? t || this.OnTriggerExit() : t && this.OnTriggerEnter()));
    }
    Msn() {
      this._sn.bEnabled = 0 < this.fsn;
    }
    OnEnd() {
      return (
        this.lsn &&
          (this.lsn.RemoveOnPlayerOverlapCallback(this.psn),
          (this.lsn = void 0)),
        (this.gU = !1),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
  });
(PostProcessBridgeComponent = PostProcessBridgeComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(94)],
    PostProcessBridgeComponent,
  )),
  (exports.PostProcessBridgeComponent = PostProcessBridgeComponent);
//# sourceMappingURL=PostProcessBridgeComponent.js.map
