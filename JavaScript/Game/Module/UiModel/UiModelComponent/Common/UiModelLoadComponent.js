"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, o);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(t, i, n) : s(t, i)) || n);
    return 3 < r && n && Object.defineProperty(t, i, n), n;
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
      (this.INn = UE.NewArray(UE.SkeletalMesh)),
      (this.ENn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.LoadFinishCallBack = void 0);
  }
  OnInit() {
    (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnEnd() {
    this.CancelLoad(), this.TNn();
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
        var o = new Array(i);
        for (let e = 0; e < i; e++) o[e] = t.Get(e).ToAssetPathName();
        return o;
      }
    }
  }
  LoadModelByModelId(e, t = !1, i, o) {
    e === this.UiModelDataComponent.ModelConfigId &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Character", 43, "重复加载模型", ["modelId", e]),
      (this.UiModelDataComponent.ModelConfigId = e),
      (this.LoadFinishCallBack = i),
      this.LoadModel(t, o);
  }
  LoadModel(h, e, l = 0) {
    1 === this.UiModelDataComponent?.GetModelLoadState() &&
      (this.CancelLoad(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn("Character", 43, "取消上一个模型加载"),
      this.UiModelDataComponent?.ClearLoadingVisible(),
      h && this.UiModelDataComponent?.SetVisible(!1),
      this.UiModelDataComponent?.SetModelLoadState(1);
    const a = this.GetMainMeshPath(),
      d = this.GetAnimClassPath(),
      M = this.GetChildMeshPathList();
    var t = [];
    if (
      (a && !StringUtils_1.StringUtils.IsEmpty(a) && t.push(a),
      d && !StringUtils_1.StringUtils.IsEmpty(d) && t.push(d),
      M && 0 < M.length)
    )
      for (const i of M) StringUtils_1.StringUtils.IsEmpty(i) || t.push(i);
    if (e && 0 < e.length)
      for (const o of e) StringUtils_1.StringUtils.IsEmpty(o) || t.push(o);
    this.LoadHandleId =
      UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
        t,
        (e, t) => {
          this.TNn(), (this.ResourceLoadCache = t);
          var i = UE.NewArray(UE.SkeletalMesh),
            t = this.GetLoadedResource(a),
            o = (i.Add(t), this.GetLoadedResource(d));
          let s = void 0;
          if (M) {
            s = [];
            for (const n of M) {
              var r = this.GetLoadedResource(n);
              s.push(r), i.Add(r);
            }
          }
          this.UiModelActorComponent?.ChangeMesh(t, o, s, l),
            h
              ? (this.ENn =
                  UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
                    i,
                    void 0,
                    () => {
                      this.FinishLoad();
                      var e =
                        this.UiModelDataComponent?.GetLoadingVisible() ?? !0;
                      this.UiModelDataComponent?.SetVisible(e),
                        this.UiModelDataComponent?.ClearLoadingVisible();
                    },
                  ))
              : (this.FinishLoad(), this.INn.Empty());
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
      for (const o of i)
        StringUtils_1.StringUtils.IsEmpty(o) ||
          ((e = this.GetLoadedResource(o)), t.Add(e));
    return t;
  }
  TNn() {
    this.ENn !==
      UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue &&
      (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
        this.ENn,
      ),
      (this.ENn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue));
  }
};
(UiModelLoadComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)],
  UiModelLoadComponent,
)),
  (exports.UiModelLoadComponent = UiModelLoadComponent);
//# sourceMappingURL=UiModelLoadComponent.js.map
