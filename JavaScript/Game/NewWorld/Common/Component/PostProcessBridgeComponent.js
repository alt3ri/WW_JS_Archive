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
        (this.knn = void 0),
        (this.Fnn = void 0),
        (this.Vnn = void 0),
        (this.Hnn = void 0),
        (this.jnn = void 0),
        (this.Wnn = void 0),
        (this.OC = void 0),
        (this.Knn = !0),
        (this.Qnn = void 0),
        (this.Xnn = void 0),
        (this.e8 = 0),
        (this.$nn = !1),
        (this.Ynn = 0.001),
        (this.Jue = 10),
        (this.Jnn = 0),
        (this.znn = 0),
        (this.Znn = (t) => {
          t ? this.OnTriggerEnter() : this.OnTriggerExit();
        }),
        (this.KHr = (t) => {
          this.gU &&
            (0 < this.Xnn && this.esn(t), this.znn !== this.Jnn) &&
            (this.Jnn > this.znn
              ? ((this.znn = this.znn + t * this.Ynn),
                (this.znn = Math.min(this.znn, this.Jnn)))
              : ((this.znn = this.znn - t * this.Ynn),
                (this.znn = Math.max(this.znn, this.Jnn))),
            (this.Wnn.BlendWeight = this.znn),
            this.tsn());
        });
    }
    OnInitData(t) {
      var i,
        t = t.GetParam(PostProcessBridgeComponent_1)[0];
      return (
        t.SkyboxSetting
          ? (i = SkyboxById_1.configSkyboxById.GetConfig(t.SkyboxSetting)) &&
            ((this.knn = i.StaticSkybox), (this.Fnn = i.DynamicSkybox))
          : ((this.knn = t.WeatherDataAsset), (this.Fnn = t.PPTODDataAsset)),
        void 0 !== t.FadeTime && 0 < t.FadeTime
          ? (this.Ynn =
              1 / (t.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond))
          : (this.Ynn = 0),
        (this.Jue = t.Priority ?? DEFAULT_PRIORITY),
        (this.Knn = void 0 === t.TriggerMode),
        (this.Qnn = t.TriggerMode),
        t.TriggerMode?.Type === IComponent_1.ETriggerMode.Distance
          ? ((i = t.TriggerMode), (this.Xnn = i.Distance * i.Distance))
          : (this.Xnn = 0),
        (this.e8 = 0),
        !(this.$nn = !1)
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
          (this.Wnn = i.GetComponentByClass(
            UE.KuroPostProcessComponent.StaticClass(),
          )),
          this.Wnn?.IsValid() ||
            (this.Wnn = i.AddComponentByClass(
              UE.KuroPostProcessComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )),
          (this.Wnn.bUnbound = !0),
          (this.Wnn.BlendWeight = this.znn),
          this.tsn(),
          this.Knn)
        ) {
          if (((this.jnn = this.Entity.GetComponent(77)), !this.jnn))
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
          this.jnn.AddOnPlayerOverlapCallback(this.Znn);
        }
        if (
          ((this.gU = !0),
          this.EnableComponent(),
          !StringUtils_1.StringUtils.IsEmpty(this.knn))
        )
          return (
            ResourceSystem_1.ResourceSystem.LoadAsync(
              this.knn,
              UE.KuroWeatherDataAsset,
              (t) => {
                t?.IsValid() &&
                  ((this.Vnn = t),
                  (this.Wnn.WeatherDataAsset = this.Vnn),
                  this.Wnn.SetPriority(this.Jue));
              },
            ),
            !0
          );
        if (!StringUtils_1.StringUtils.IsEmpty(this.Fnn))
          return (
            ResourceSystem_1.ResourceSystem.LoadAsync(
              this.Fnn,
              UE.KuroTODData,
              (t) => {
                t?.IsValid() &&
                  ((this.Hnn = t),
                  (this.Wnn.PPTODDataAsset = this.Hnn),
                  this.Wnn.SetPriority(this.Jue));
              },
            ),
            !0
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            18,
            "氛围组件初始化失败",
            ["WeatherDataAssetPath", this.knn],
            ["TodDataAssetPath", this.Fnn],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 18, "氛围组件初始化失败, actor为空");
      return !1;
    }
    OnTriggerEnter() {
      this.gU &&
        this.Vge &&
        ((this.$nn = !0),
        this.SetTargetBlendWeight(1),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "氛围组件触发",
          ["WeatherDataAssetPath", this.knn],
          ["TodDataAssetPath", this.Fnn],
        );
    }
    OnTriggerExit() {
      this.gU &&
        this.Vge &&
        ((this.$nn = !1),
        this.SetTargetBlendWeight(0),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "氛围组件关闭",
          ["WeatherDataAssetPath", this.knn],
          ["TodDataAssetPath", this.Fnn],
        );
    }
    SetTargetBlendWeight(t, i = !1) {
      this.gU &&
        ((this.Jnn = t),
        (!i && 0 !== this.Ynn) ||
          ((this.znn = t), (this.Wnn.BlendWeight = this.znn), this.tsn()));
    }
    EnableComponent() {
      this.gU &&
        ((this.Vge = !0),
        (this.e8 = TICK_TIME),
        (this.$nn = !1),
        this.Knn
          ? this.jnn.IsOverlappingPlayer() && this.OnTriggerEnter()
          : this.Qnn?.Type === IComponent_1.ETriggerMode.Global &&
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
          this.KHr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    OnForceTick(t) {
      this.KHr(t);
    }
    esn(t) {
      (this.e8 += t),
        this.e8 < TICK_TIME ||
          ((this.e8 = 0),
          (t =
            RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger())?.IsValid() &&
            this.OC?.IsValid() &&
            ((t = t.GetSquaredDistanceTo(this.OC) < this.Xnn),
            this.$nn ? t || this.OnTriggerExit() : t && this.OnTriggerEnter()));
    }
    tsn() {
      this.Wnn.bEnabled = 0 < this.znn;
    }
    OnEnd() {
      return (
        this.jnn &&
          (this.jnn.RemoveOnPlayerOverlapCallback(this.Znn),
          (this.jnn = void 0)),
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
    [(0, RegisterComponent_1.RegisterComponent)(97)],
    PostProcessBridgeComponent,
  )),
  (exports.PostProcessBridgeComponent = PostProcessBridgeComponent);
//# sourceMappingURL=PostProcessBridgeComponent.js.map
