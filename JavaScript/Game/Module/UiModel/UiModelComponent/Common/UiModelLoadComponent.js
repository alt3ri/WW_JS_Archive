"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var o,
      r = arguments.length,
      h =
        r < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, s);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (o = e[n]) && (h = (r < 3 ? o(h) : 3 < r ? o(t, i, h) : o(t, i)) || h);
    return 3 < r && h && Object.defineProperty(t, i, h), h;
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
      (this.CNn = UE.NewArray(UE.SkeletalMesh)),
      (this.mNn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.LoadFinishCallBack = void 0);
  }
  OnInit() {
    (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnEnd() {
    this.CancelLoad(), this.gNn();
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
    var t = ModelUtil_1.ModelUtil.GetModelConfig(
      this.UiModelDataComponent.ModelConfigId,
    ).子网格体;
    if (t) {
      var i = t.Num();
      if (0 < i) {
        var s = new Array(i);
        for (let e = 0; e < i; e++) s[e] = t.Get(e).ToAssetPathName();
        return s;
      }
    }
  }
  LoadModelByModelId(e, t = !1, i) {
    (this.UiModelDataComponent.ModelConfigId = e),
      (this.LoadFinishCallBack = i),
      this.LoadModel(t);
  }
  LoadModel(n) {
    1 === this.UiModelDataComponent?.GetModelLoadState() &&
      (this.CancelLoad(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn("Character", 44, "取消上一个模型加载"),
      this.UiModelDataComponent?.ClearLoadingVisible(),
      n && this.UiModelDataComponent?.SetVisible(!1),
      this.UiModelDataComponent?.SetModelLoadState(1);
    const l = this.GetMainMeshPath(),
      a = this.GetAnimClassPath(),
      d = this.GetChildMeshPathList();
    var e = [];
    if (
      (l && !StringUtils_1.StringUtils.IsEmpty(l) && e.push(l),
      a && !StringUtils_1.StringUtils.IsEmpty(a) && e.push(a),
      d && 0 < d.length)
    )
      for (const t of d) StringUtils_1.StringUtils.IsEmpty(t) || e.push(t);
    this.LoadHandleId =
      UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
        e,
        (e, t) => {
          this.gNn(), (this.ResourceLoadCache = t);
          var i = UE.NewArray(UE.SkeletalMesh),
            t = this.GetLoadedResource(l),
            s = (i.Add(t), this.GetLoadedResource(a));
          let o = void 0;
          if (d) {
            o = [];
            for (const h of d) {
              var r = this.GetLoadedResource(h);
              o.push(r), i.Add(r);
            }
          }
          this.UiModelActorComponent?.ChangeMesh(t, s, o),
            n
              ? (this.mNn =
                  UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
                    i,
                    void 0,
                    () => {
                      this.FinishLoad(),
                        this.UiModelDataComponent?.GetLoadingVisible() ?? !0
                          ? this.UiModelDataComponent?.SetVisible(!0, !0)
                          : this.UiModelDataComponent?.SetVisible(!1, !1),
                        this.UiModelDataComponent?.ClearLoadingVisible();
                    },
                  ))
              : (this.FinishLoad(), this.CNn.Empty());
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
  GetModelAllMesh() {
    var e,
      t = UE.NewArray(UE.SkeletalMesh),
      i = this.GetMainMeshPath(),
      i =
        (i &&
          !StringUtils_1.StringUtils.IsEmpty(i) &&
          ((i = this.GetLoadedResource(i)), t.Add(i)),
        this.GetChildMeshPathList());
    if (i && 0 < i.length)
      for (const s of i)
        StringUtils_1.StringUtils.IsEmpty(s) ||
          ((e = this.GetLoadedResource(s)), t.Add(e));
    return t;
  }
  gNn() {
    this.mNn !==
      UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue &&
      (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
        this.mNn,
      ),
      (this.mNn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue));
  }
};
(UiModelLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)],
  UiModelLoadComponent,
)),
  (exports.UiModelLoadComponent = UiModelLoadComponent);
//# sourceMappingURL=UiModelLoadComponent.js.map
