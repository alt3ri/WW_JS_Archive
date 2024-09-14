"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPanelBase = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiActorPool_1 = require("../UiActorPool"),
  UiImageSettingModule_1 = require("../UiImageSettingModule"),
  UiNiagaraSettingModule_1 = require("../UiNiagaraSettingModule"),
  UiPrefabLoadModule_1 = require("../UiPrefabLoadModule"),
  UiSpineLoadModule_1 = require("../UiSpineLoadModule"),
  ComponentAction_1 = require("./ComponentAction"),
  UiBehaviorBase_1 = require("./UiBehaviorBase");
class UiPanelBase extends ComponentAction_1.ComponentAction {
  constructor() {
    super(),
      (this.RootItem = void 0),
      (this.RootActor = void 0),
      (this.G_r = void 0),
      (this.bxo = void 0),
      (this.ParentUiItem = void 0),
      (this.UsePool = !1),
      (this.SkipDestroyActor = !1),
      (this.N_r = !1),
      (this.EnableActorPoolReleaseLog = !0),
      (this.OpenParam = void 0),
      (this.O_r = ""),
      (this.k_r = []),
      (this.u9 = []),
      (this.Parent = void 0),
      (this.F_r = new Map()),
      (this.ComponentRegisterInfos = []),
      (this.BtnBindInfo = []),
      (this.V_r = void 0),
      (this.UiPoolActorNew = void 0),
      (this.H_r = () => {
        this.IsDestroyOrDestroying ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "UiComponent",
              17,
              "创建对象没有执行Destroy, 进行自动Destroy",
              ["Ts类名", this.constructor.name],
            ),
          this.Destroy());
      }),
      (this.PostClickAudioEvent = (t) => {
        t = (0, AudioSystem_1.parseAudioEventPath)(t);
        t && AudioSystem_1.AudioSystem.PostEvent(t);
      }),
      (this.j_r = new UiImageSettingModule_1.UiImageSettingModule()),
      (this.W_r = new UiNiagaraSettingModule_1.UiNiagaraSettingModule()),
      (this.wAr = new UiSpineLoadModule_1.UiSpineLoadModule()),
      (this.QXe = new UiPrefabLoadModule_1.UiPrefabLoadModule()),
      (this.OnSequenceEvent = (t, i) => {});
  }
  OnRegisterComponent() {}
  OnBeforeCreate() {}
  async OnCreateAsync() {}
  async OnBeforeStartAsync() {}
  OnStart() {}
  OnBeforeShow() {}
  OnAfterShow() {}
  async OnBeforeHideAsync() {}
  OnBeforeHide() {}
  OnAfterHide() {}
  OnBeforeDestroy() {}
  OnAfterDestroy() {}
  OnBeforeCreateImplement() {}
  async OnCreateAsyncImplementImplement() {}
  OnAfterCreateImplement() {}
  OnStartImplement() {}
  async OnBeforeShowAsyncImplement() {}
  OnBeforeShowImplement() {}
  OnAfterShowImplement() {}
  async OnShowAsyncImplementImplement() {}
  async OnHideAsyncImplementImplement() {}
  async OnDestroyAsyncImplementImplement() {}
  OnBeforeHideImplement() {}
  OnAfterHideImplement() {}
  OnBeforeDestroyImplement() {}
  OnAfterDestroyImplement() {}
  async OnCreateAsyncImplement() {
    this.OnBeforeCreateImplement(), this.OnBeforeCreate();
    let i = !0;
    return (
      await Promise.all([
        this.K_r(),
        this.OnCreateAsyncImplementImplement(),
        this.OnCreateAsync(),
        ...this.k_r.map(async (t) => t.CreateAsync()),
        ...this.u9.map(async (t) => t.CreateAsync()),
      ]).catch((t) => {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "UiCore",
              17,
              "[OnCreateAsyncImplement] 加载失败",
              t,
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[OnCreateAsyncImplement] 加载异常",
              ["component", this.constructor.name],
              ["error", t],
            ),
          (i = !1);
      }),
      this.OnAfterCreateImplement(),
      i
    );
  }
  async OnStartAsyncImplement() {
    await this.OnBeforeStartAsync(),
      this.OnStartImplement(),
      this.OnStart(),
      await Promise.all([
        ...this.k_r.map(async (t) => t.StartAsync()),
        ...this.u9.map(async (t) => t.StartAsync()),
      ]);
  }
  OnStartImplementCompatible() {
    this.OnStartImplement(),
      this.OnStart(),
      this.k_r.forEach((t) => {
        t.StartCompatible();
      }),
      this.u9.forEach((t) => {
        t.StartCompatible();
      });
  }
  async OnShowAsyncImplement() {
    await this.OnBeforeShowAsyncImplement(),
      this.OnBeforeShowImplement(),
      this.OnBeforeShow(),
      this.SetUiActive(!0),
      await Promise.all([
        this.OnShowAsyncImplementImplement(),
        ...this.k_r.map(async (t) => t.ShowAsync()),
        ...this.u9.map(async (t) => t.ShowAsync()),
      ]),
      this.OnAfterShowImplement(),
      this.OnAfterShow();
  }
  OnShowAsyncImplementImplementCompatible() {}
  OnShowImplementCompatible() {
    this.OnBeforeShowImplement(),
      this.OnBeforeShow(),
      this.SetUiActive(!0),
      this.OnShowAsyncImplementImplementCompatible(),
      this.k_r.forEach((t) => {
        t.ShowCompatible();
      }),
      this.u9.forEach((t) => {
        t.ShowCompatible();
      }),
      this.OnAfterShowImplement(),
      this.OnAfterShow();
  }
  async OnHideAsyncImplement() {
    await this.OnBeforeHideAsync(),
      this.OnBeforeHide(),
      this.OnBeforeHideImplement(),
      await Promise.all([
        ...this.k_r.map(async (t) => t.HideAsync()),
        ...this.u9.map(async (t) => t.HideAsync()),
        this.OnHideAsyncImplementImplement(),
      ]),
      this.WaitToDestroy || this.SetUiActive(!1),
      this.OnAfterHide(),
      this.OnAfterHideImplement();
  }
  OnHideAsyncImplementImplementCompatible() {}
  OnHideImplementCompatible() {
    this.OnBeforeHide(),
      this.OnBeforeHideImplement(),
      this.k_r.forEach((t) => {
        t.HideCompatible();
      }),
      this.u9.forEach((t) => {
        t.HideCompatible();
      }),
      this.OnHideAsyncImplementImplementCompatible(),
      this.SetUiActive(!1),
      this.OnAfterHide(),
      this.OnAfterHideImplement();
  }
  async OnDestroyAsyncImplement() {
    this.OnBeforeDestroy(),
      this.OnBeforeDestroyImplement(),
      await Promise.all([
        ...this.k_r.map(async (t) => t.DestroyAsync()),
        ...this.u9.map(async (t) => t.CloseMeAsync()),
      ]),
      await this.OnDestroyAsyncImplementImplement(),
      this.Q_r(),
      this.OnAfterDestroy(),
      this.OnAfterDestroyImplement();
  }
  OnDestroyAsyncImplementImplementCompatible() {}
  OnDestroyImplementCompatible() {
    this.OnBeforeDestroy(),
      this.OnBeforeDestroyImplement(),
      this.k_r.forEach((t) => {
        t.DestroyCompatible();
      }),
      [...this.u9].forEach((t) => {
        t.DestroyCompatible();
      }),
      this.OnDestroyAsyncImplementImplementCompatible(),
      this.Q_r(),
      this.OnAfterDestroy(),
      this.OnAfterDestroyImplement();
  }
  SetRootActorLoadInfoByPath(t, i, e = !1, s = !1) {
    (this.O_r = t), (this.ParentUiItem = i), (this.UsePool = e), (this.N_r = s);
  }
  SetRootActorLoadInfo(t, i, e = !1, s = !1) {
    (this.O_r =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
      (this.ParentUiItem = i),
      (this.UsePool = e),
      (this.N_r = s);
  }
  async CreateThenShowByResourceIdAsync(t, i, e = !1) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    await this.CreateThenShowByPathAsync(t, i, e);
  }
  async CreateByResourceIdAsync(t, i, e = !1) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    await this.CreateByPathAsync(t, i, e);
  }
  async CreateByPathAsync(t, i, e = !1) {
    await this.OnlyCreateByPathAsync(t, i, e), await this.StartAsync();
  }
  async OnlyCreateByPathAsync(t, i, e = !1) {
    this.SetRootActorLoadInfoByPath(t, i, e), await this.CreateAsync();
  }
  async CreateThenShowByPathAsync(t, i, e = !1) {
    await this.CreateByPathAsync(t, i, e), await this.ShowAsync();
  }
  async CreateThenShowByActorAsync(t, i = void 0, e = !1) {
    await this.CreateByActorAsync(t, i, e), await this.ShowAsync();
  }
  async CreateByActorAsync(t, i = void 0, e = !1) {
    await this.OnlyCreateByActorAsync(t, i, e), await this.StartAsync();
  }
  async OnlyCreateByActorAsync(t, i = void 0, e = !1) {
    (this.UsePool = e),
      void 0 !== i && (this.OpenParam = i),
      this.oL(t),
      await this.CreateAsync();
  }
  SetActive(t) {
    t ? this.Show() : this.Hide();
  }
  GetActive() {
    return !!this.RootItem?.IsValid() && this.RootItem.IsUIActiveSelf();
  }
  IsUiActiveInHierarchy() {
    return !!this.RootItem?.IsValid() && this.RootItem.IsUIActiveInHierarchy();
  }
  SetUiActive(t) {
    this.RootItem?.IsValid() && this.RootItem.SetUIActive(t);
  }
  InAsyncLoading() {
    return this.IsCreating;
  }
  async K_r() {
    var i = this.O_r;
    if (i) {
      let t = void 0;
      (t = this.UsePool
        ? ((this.UiPoolActorNew = await UiActorPool_1.UiActorPool.GetAsync(
            i,
            this.ParentUiItem,
          )),
          UiActorPool_1.UiActorPool.SetKeepWhileCleaning(i, this.N_r),
          this.UiPoolActorNew.Actor)
        : await this.LoadPrefabAsync(i, this.ParentUiItem)).IsValid() &&
        (this.IsDestroy &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            11,
            "当前Actor创建完成,界面已经处于销毁状态",
            ["path", i],
          ),
        this.oL(t));
    }
  }
  oL(t) {
    return t?.IsValid()
      ? ((this.G_r = t),
        (this.bxo = this.G_r.GetComponentByClass(UE.UIItem.StaticClass())),
        this.X_r(),
        this.$_r(),
        this.BindOnClickEvents(),
        this.SetUiActive(!1),
        this.G_r.OnDestroyed.Add(this.H_r),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            17,
            "[SetActor] actor is not UIBaseActor",
            ["uiActor", t],
            ["path", LguiUtil_1.LguiUtil.GetActorFullPath(t)],
          ),
        !1);
  }
  X_r() {
    this.OnRegisterComponent(),
      (this.RootActor = this.Y_r() ?? this.G_r),
      (this.RootItem = this.RootActor.GetComponentByClass(
        UE.UIItem.StaticClass(),
      ));
  }
  Y_r() {
    var t = this.G_r;
    let i = LguiUtil_1.LguiUtil.GetComponentsRegistry(t),
      e = t;
    if (
      (i ||
        !(e = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(t)) ||
        (i = LguiUtil_1.LguiUtil.GetComponentsRegistry(e)) ||
        ((e = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(e)) &&
          (i = LguiUtil_1.LguiUtil.GetComponentsRegistry(e))),
      i)
    ) {
      var s = i.Components.Num();
      for (const o of this.ComponentRegisterInfos) {
        var n = o[0];
        s <= n ||
          ((n = i.Components.Get(n)?.GetComponentByClass(o[1].StaticClass()))
            ? (this.F_r.set(o[0], [o[1], n]), this.J_r(o[1], n))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiCore",
                17,
                "[FindInitedComponentRegistryActor]请该UI负责人和程序检查以下路径的LGUIComponentsRegistry组件, 检查是否缺失以下类型的组件",
                ["节点全路径为", LguiUtil_1.LguiUtil.GetActorFullPath(e)],
                ["缺失组件的索引为", o[0]],
                ["缺失的组件类型为", o[1].StaticClass().GetName()],
              ));
      }
      return e;
    }
  }
  DestroyOverride() {
    return !1;
  }
  Q_r() {
    this.UnBindOnClickEvents(),
      this.z_r(),
      this.Z_r(),
      this.ClearUiPrefabLoadModule(),
      this.F_r.clear(),
      (this.BtnBindInfo.length = 0),
      (this.u9.length = 0),
      this.eur(),
      (this.k_r.length = 0),
      (this.OpenParam = void 0),
      this.tur();
  }
  tur() {
    this.SkipDestroyActor ||
      (this.RootActor?.OnDestroyed.Remove(this.H_r),
      this.DestroyOverride() ||
        (this.UsePool
          ? this.iur()
          : this.G_r?.IsValid() &&
            UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.G_r, !0)),
      (this.G_r = void 0),
      (this.RootActor = void 0),
      (this.RootItem = void 0));
  }
  GetRootItem() {
    return this.RootItem;
  }
  GetRootActor() {
    return this.RootActor;
  }
  GetOriginalActor() {
    return this.G_r;
  }
  GetOriginalItem() {
    return this.bxo;
  }
  GetClosePromiseImplement() {}
  iur() {
    UiActorPool_1.UiActorPool.RecycleAsync(
      this.UiPoolActorNew,
      this.O_r,
      this.EnableActorPoolReleaseLog,
    ),
      (this.UiPoolActorNew = void 0);
  }
  J_r(t, i) {
    var e;
    t === UE.UIButtonComponent
      ? ((e = i).OnPostAudioEvent.Bind((t) => {
          this.PostClickAudioEvent(t);
        }),
        e.OnPostAudioStateEvent.Bind((t, i) => {
          this.PostClickAudioEvent(i);
        }))
      : t === UE.UIExtendToggle &&
        ((e = i).OnPostAudioEvent.Bind((t) => {
          this.PostClickAudioEvent(t);
        }),
        e.OnPostAudioStateEvent.Bind((t, i) => {
          this.PostClickAudioEvent(i);
        }));
  }
  z_r() {
    for (var [t, i] of this.F_r.values()) {
      var e;
      t === UE.UIButtonComponent
        ? ((e = i).OnPostAudioEvent.Unbind(), e.OnPostAudioStateEvent.Unbind())
        : t === UE.UIExtendToggle &&
          ((e = i).OnPostAudioEvent.Unbind(), e.OnPostAudioStateEvent.Unbind());
    }
  }
  BindOnClickEvents() {
    for (const t of this.BtnBindInfo)
      this.F_r.has(t[0])
        ? this.BindOnClickEvent(t[0], t[1])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            21,
            "检查BtnBindInfo中的项是否没有在ComponentsRegisterInfo中注册",
          );
  }
  BindOnClickEvent(t, i) {
    t = this.F_r.get(t);
    t &&
      (t[0] === UE.UIButtonComponent
        ? t[1].OnClickCallBack.Bind(i)
        : t[0] === UE.UIToggleComponent
          ? t[1].OnToggleEvent.Bind(i)
          : t[0] === UE.UIExtendToggle
            ? t[1].OnStateChange.Add(i)
            : t[0] === UE.UISliderComponent
              ? t[1].OnValueChangeCb.Bind(i)
              : t[0] === UE.UITextInputComponent &&
                t[1].OnInputActivateDelegate.Bind(i));
  }
  UnBindOnClickEvents() {
    for (const t of this.BtnBindInfo) this.UnBindOnClickEvent(t[0]);
  }
  UnBindOnClickEvent(t) {
    var i,
      t = this.F_r.get(t);
    t &&
      (t[0] === UE.UIButtonComponent
        ? t[1].OnClickCallBack.Unbind()
        : t[0] === UE.UIToggleComponent
          ? t[1].OnToggleEvent.Unbind()
          : t[0] === UE.UIExtendToggle
            ? ((i = t[1]).OnStateChange.Clear(), i.CanExecuteChange.Unbind())
            : t[0] === UE.UISliderComponent
              ? t[1].OnValueChangeCb.Unbind()
              : t[0] === UE.UITextInputComponent &&
                t[1].OnInputActivateDelegate.Unbind());
  }
  GetButton(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIButtonComponent) return t[1];
  }
  GetItem(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIItem) return t[1];
  }
  GetSpine(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.SpineSkeletonAnimationComponent) return t[1];
  }
  GetInteractionGroup(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIInteractionGroup) return t[1];
  }
  GetText(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIText) return t[1];
  }
  GetArtText(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIArtText) return t[1];
  }
  GetSprite(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UISprite) return t[1];
  }
  GetTexture(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UITexture) return t[1];
  }
  GetSlider(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UISliderComponent) return t[1];
  }
  GetToggle(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIToggleComponent) return t[1];
  }
  GetExtendToggle(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIExtendToggle) return t[1];
  }
  GetExtendToggleGroup(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIExtendToggleGroup) return t[1];
  }
  GetScrollViewWithScrollbar(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIScrollViewWithScrollbarComponent) return t[1];
  }
  GetUIDynScrollViewComponent(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIDynScrollViewComponent) return t[1];
  }
  GetScrollScrollbar(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIScrollbarComponent) return t[1];
  }
  GetScrollView(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIScrollViewComponent) return t[1];
  }
  GetLoopScrollViewComponent(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UILoopScrollViewComponent) return t[1];
  }
  GetDropdown(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIDropdownComponent) return t[1];
  }
  GetInputText(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UITextInputComponent) return t[1];
  }
  GetDraggable(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIDraggableComponent) return t[1];
  }
  GetUiNiagara(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UINiagara) return t[1];
  }
  GetVerticalLayout(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIVerticalLayout) return t[1];
  }
  GetHorizontalLayout(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIHorizontalLayout) return t[1];
  }
  GetMultiTemplateLayout(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIMultiTemplateLayout) return t[1];
  }
  GetGridLayout(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIGridLayout) return t[1];
  }
  GetLayoutBase(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UILayoutBase) return t[1];
  }
  GetUITextTransition(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UITextTransition) return t[1];
  }
  GetUiTextureTransitionComponent(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UITextureTransitionComponent) return t[1];
  }
  GetUiSpriteTransition(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UISpriteTransition) return t[1];
  }
  GetUiExtendToggleSpriteTransition(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIExtendToggleSpriteTransition) return t[1];
  }
  GetUiExtendToggleTextureTransition(t) {
    t = this.F_r.get(t);
    if (t && t[0] === UE.UIExtendToggleTextureTransition) return t[1];
  }
  $_r() {
    this.V_r = this.GetRootActor()?.GetComponentByClass(
      UE.GuideHookRegistry.StaticClass(),
    );
  }
  GetGuideUiItem(t) {
    if (this.V_r) {
      t = this.V_r.GuideHookComponents.Get(t);
      if (t) return t.GetUIItem();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        17,
        "引导步骤已配置的聚焦界面未实现GetGuideUiItemEx函数",
      );
  }
  GetGuideScrollViewToLock() {}
  SetButtonUiActive(t, i) {
    t = this.GetButton(t);
    t
      ? t.GetRootComponent().SetUIActive(i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCommon",
          17,
          "设置Button可见性错误，Button组件为空！",
        );
  }
  SetSpriteByPath(t, i, e, s = void 0, n = void 0) {
    s
      ? this.j_r.SetSpriteByPathSync(t, i, e, s, n)
      : this.j_r.SetSpriteByPathAsync(t, i, e, n);
  }
  async SetSpriteTransitionByPath(t, i, e = 5) {
    await this.j_r.SetSpriteTransitionByPath(t, i, e);
  }
  SetTextureByPath(t, i, e = void 0, s = void 0) {
    e
      ? this.j_r.SetTextureByPathSync(t, i, e, s)
      : this.j_r.SetTextureByPathAsync(t, i, s);
  }
  async SetTextureTransitionByPath(t, i, e = 5) {
    await this.j_r.SetTextureTransitionByPath(t, i, e);
  }
  async SetTextureAsync(t, i) {
    await this.j_r.SetTextureAsync(t, i);
  }
  async SetSpriteAsync(t, i, e) {
    await this.j_r.SetSpriteAsync(t, i, e);
  }
  SetTextureShowUntilLoaded(t, i, e = void 0) {
    i &&
      (i.SetUIActive(!1),
      this.j_r.SetTextureByPathAsync(t, i, (t) => {
        i.SetUIActive(!0), e && e(t);
      }));
  }
  SetItemIcon(t, i, e = void 0, s = void 0) {
    e
      ? this.j_r.SetItemIconSync(t, i, e, s)
      : this.j_r.SetItemIconAsync(t, i, s);
  }
  async SetItemIconAsync(t, i) {
    await this.j_r.SetItemIconTextureAsync(t, i);
  }
  SetQualityIconById(t, i, e = void 0, s = "BackgroundSprite", n = void 0) {
    e
      ? this.j_r.SetQualityIconByIdSync(t, i, e, s, n)
      : this.j_r.SetQualityIconByIdAsync(t, i, s, n);
  }
  SetItemQualityIcon(t, i, e = void 0, s = "BackgroundSprite", n = void 0) {
    e
      ? this.j_r.SetItemQualityIconSync(t, i, e, s, n)
      : this.j_r.SetItemQualityIconAsync(t, i, s, n);
  }
  SetRoleIcon(t, i, e, s = void 0, n) {
    s
      ? this.j_r.SetRoleIconSync(t, i, e, s, n)
      : this.j_r.SetRoleIconAsync(t, i, e, n);
  }
  SetElementIcon(t, i, e, s = void 0) {
    s
      ? this.j_r.SetElementIconSync(t, i, e, s)
      : this.j_r.SetElementIcon(t, i, e);
  }
  SetMonsterIcon(t, i, e, s = void 0) {
    s
      ? this.j_r.SetMonsterIconSync(t, i, e, s)
      : this.j_r.SetMonsterIconAsync(t, i, e);
  }
  SetDungeonEntranceIconSync(t, i, e, s = void 0) {
    s
      ? this.j_r.SetDungeonEntranceIconSync(t, i, e, s)
      : this.j_r.SetDungeonEntranceIconAsync(t, i, e);
  }
  SetNiagaraTextureByPath(t, i, e, s, n = void 0, o = void 0) {
    n
      ? this.j_r.SetNiagaraTextureSync(t, i, e, s, n, o)
      : this.j_r.SetNiagaraTextureAsync(t, i, e, s, o);
  }
  SetNiagaraSystemByPath(t, i, e = void 0) {
    this.W_r.SetNiagaraByPathAsync(t, i, e);
  }
  async SetSpineAssetByPath(t, i, e) {
    await this.wAr.LoadSpineAssetAsync(t, i, e);
  }
  Z_r() {
    this.j_r.Clear(), this.W_r.Clear(), this.wAr.Clear();
  }
  async LoadPrefabAsync(t, i) {
    return this.QXe.LoadPrefabAsync(t, i);
  }
  ClearUiPrefabLoadModule() {
    this.QXe.Clear();
  }
  AddUiBehavior(t) {
    this.AddUiBehaviorProxy(new UiBehaviorBase_1.UiBehaviorBaseProxy(t));
  }
  AddUiBehaviorProxy(t) {
    this.k_r.push(t);
  }
  AddChild(t) {
    this.u9.push(t), (t.Parent = this);
  }
  eur() {
    var t;
    !this.Parent ||
      (t = this.Parent?.u9.indexOf(this)) < 0 ||
      (this.Parent.u9.splice(t, 1), (this.Parent = void 0));
  }
  GetLastChild() {
    var t = this.u9.length;
    if (0 !== t) return this.u9[t - 1];
  }
  Register() {}
  Begin() {}
  OnBegin(t = 0) {}
  OnChangeComponentActiveState(t) {}
  OnRegister() {}
  OnCreate() {}
  OnShow() {}
  OnHide() {}
  OnPrepareHide(t = 0) {}
  OnEnd() {}
  OnDestroy() {}
  OnStartSequenceFinish() {}
  OnPlayCloseSequence() {
    return !1;
  }
  OnStackShow() {}
  OnShowSequenceFinish() {}
  OnActiveSequenceFinish() {}
  OnCheckLoadSceneCondition() {
    return !0;
  }
  OnCheckReleaseSceneCondition() {
    return !0;
  }
  Start() {}
  End() {}
  InitParam() {}
  InitComponentsData() {}
  OnClearComponentsData() {}
  Create() {}
  ClearComponentsData() {
    return this.Destroy(), !0;
  }
  async ConstructorAsync(t, i, e = !1) {
    return this.CreateThenShowByResourceIdAsync(t, i, e);
  }
  get ComponentsRegisterInfo() {
    return this.ComponentRegisterInfos;
  }
  set ComponentsRegisterInfo(t) {
    this.ComponentRegisterInfos = t;
  }
  SetRootActor(t, i = !0) {
    i ? this.CreateThenShowByActor(t) : this.CreateByActor(t);
  }
  CreateThenShowByActor(t, i = void 0) {
    void 0 !== i && (this.OpenParam = i),
      this.oL(t),
      this.StartCompatible(),
      this.ShowCompatible();
  }
  CreateByActor(t, i = void 0) {
    void 0 !== i && (this.OpenParam = i), this.oL(t), this.StartCompatible();
  }
}
exports.UiPanelBase = UiPanelBase;
//# sourceMappingURL=UiPanelBase.js.map
