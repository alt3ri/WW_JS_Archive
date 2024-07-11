"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, i, t, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? i
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(i, t))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, i, t, o);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(i, t, n) : s(i, t)) || n);
    return 3 < r && n && Object.defineProperty(i, t, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelLoadComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadComponent = class UiModelLoadComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.UiModelActorComponent = void 0),
      (this.UiModelDataComponent = void 0),
      (this.LoadHandleId =
        UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue),
      (this.ResourceLoadCache = void 0),
      (this._Gn = UE.NewArray(UE.SkeletalMesh)),
      (this.aGn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.LoadFinishCallBack = void 0);
  }
  OnInit() {
    (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnEnd() {
    this.CancelLoad(), this.uGn();
  }
  GetMainMeshPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(
      this.UiModelDataComponent.ModelConfigId,
    ).网格体.ToAssetPathName();
  }
  GetAnimClassPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(
      this.UiModelDataComponent.ModelConfigId,
    ).动画蓝图.ToAssetPathName();
  }
  GetChildMeshPathList() {
    var i = ModelUtil_1.ModelUtil.GetModelConfig(
      this.UiModelDataComponent.ModelConfigId,
    ).子网格体;
    if (i) {
      var t = i.Num();
      if (0 < t) {
        var o = new Array(t);
        for (let e = 0; e < t; e++) o[e] = i.Get(e).ToAssetPathName();
        return o;
      }
    }
  }
  LoadModelByModelId(e, i = !1, t) {
    (this.UiModelDataComponent.ModelConfigId = e),
      (this.LoadFinishCallBack = t),
      this.LoadModel(i);
  }
  LoadModel(h) {
    1 === this.UiModelDataComponent?.GetModelLoadState() &&
      (this.CancelLoad(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn("Character", 44, "取消上一个模型加载"),
      h && this.UiModelDataComponent?.SetVisible(!1),
      this.UiModelDataComponent?.SetModelLoadState(1);
    const a = this.GetMainMeshPath(),
      l = this.GetAnimClassPath(),
      d = this.GetChildMeshPathList();
    var e = [];
    if (
      (a && !StringUtils_1.StringUtils.IsEmpty(a) && e.push(a),
      l && !StringUtils_1.StringUtils.IsEmpty(l) && e.push(l),
      d && 0 < d.length)
    )
      for (const i of d) StringUtils_1.StringUtils.IsEmpty(i) || e.push(i);
    this.LoadHandleId =
      UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
        e,
        (e, i) => {
          this.uGn(), (this.ResourceLoadCache = i);
          var t = UE.NewArray(UE.SkeletalMesh),
            o = this.GetLoadedResource(a),
            i = (t.Add(o), this.GetLoadedResource(l));
          let s = void 0;
          if (d) {
            s = [];
            for (const n of d) {
              var r = this.GetLoadedResource(n);
              s.push(r), t.Add(o);
            }
          }
          this.UiModelActorComponent?.ChangeMesh(o, i, s),
            h
              ? (this.aGn =
                  UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
                    t,
                    void 0,
                    () => {
                      this.FinishLoad(),
                        this.UiModelDataComponent?.SetVisible(!0, !0);
                    },
                  ))
              : (this.FinishLoad(), this._Gn.Empty());
        },
      );
  }
  FinishLoad() {
    this.UiModelDataComponent?.SetModelLoadState(2);
    var e = this.UiModelDataComponent?.GetDitherEffectValue() ?? 1;
    this.UiModelDataComponent?.SetDitherEffect(e), this.LoadFinishCallBack?.();
  }
  CancelLoad() {
    1 === this.UiModelDataComponent?.GetModelLoadState() &&
      UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(
        this.LoadHandleId,
      ),
      (this.ResourceLoadCache = void 0),
      this.UiModelDataComponent?.SetModelLoadState(0);
  }
  GetLoadedResource(e) {
    if (this.ResourceLoadCache) return this.ResourceLoadCache.get(e);
  }
  uGn() {
    this.aGn !==
      UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue &&
      (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
        this.aGn,
      ),
      (this.aGn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue));
  }
};
(UiModelLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)],
  UiModelLoadComponent,
)),
  (exports.UiModelLoadComponent = UiModelLoadComponent);
//# sourceMappingURL=UiModelLoadComponent.js.map
