"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarBase = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  VisibleStateUtil_1 = require("../../VisibleStateUtil"),
  SpecialEnergyBarKeyItem_1 = require("./SpecialEnergyBarKeyItem"),
  SpecialEnergyBarNumItem_1 = require("./SpecialEnergyBarNumItem"),
  SpecialEnergyBarPercentMachine_1 = require("./SpecialEnergyBarPercentMachine"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBarBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.NeedOverrideDestroy = !0),
      (this.Destroyed = !1),
      (this.PrefabPath = ""),
      (this.RoleData = void 0),
      (this.Config = void 0),
      (this.AttributeComponent = void 0),
      (this.TagComponent = void 0),
      (this.BuffComponent = void 0),
      (this.TagTaskList = []),
      (this.HasKeyEnableTag = !1),
      (this.NiagaraList = []),
      (this.NeedInitKeyItem = !0),
      (this.KeyItem = void 0),
      (this.NeedInitNumItem = !1),
      (this.NumItem = void 0),
      (this.PercentMachine =
        new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine()),
      (this.GYe = new Map()),
      (this.VisibleState = 0),
      (this.pdt = (t, i, e) => {
        this.OnAttributeChanged();
      }),
      (this.vdt = (t, i, e) => {
        this.OnMaxAttributeChanged();
      }),
      (this.OnKeyEnableTagChanged = (t, i) => {
        (this.HasKeyEnableTag = i), this.OnKeyEnableChanged();
      });
  }
  async InitByPathAsync(t, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "加载特殊能量条", ["path", i]),
      (this.PrefabPath = i);
    i = await BattleUiControl_1.BattleUiControl.Pool.LoadActor(i, t);
    this.Destroyed
      ? BattleUiControl_1.BattleUiControl.Pool.RecycleSingleActor(i)
      : (await this.CreateByActorAsync(i),
        this.AddEvents(),
        this.RefreshVisible());
  }
  InitData(t, i, e = !0) {
    (this.NeedInitKeyItem = e),
      !this.Destroyed &&
        t &&
        (this.RoleData &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "能量条设置了多次角色的数据"),
          this.kYe(),
          this.FYe()),
        (this.RoleData = t),
        (this.Config = i),
        (this.AttributeComponent = this.RoleData.AttributeComponent),
        (this.TagComponent = this.RoleData.GameplayTagComponent),
        (this.BuffComponent = this.RoleData.BuffComponent),
        this.PercentMachine.Init(this.GetTargetAttributePercent()),
        this.OnInitData(),
        this.InitKeyEnableTag());
  }
  OnInitData() {}
  AddEvents() {
    this.ListenForAttributeChanged(this.Config.AttributeId, this.pdt),
      this.ListenForAttributeChanged(this.Config.MaxAttributeId, this.vdt);
  }
  RemoveEvents() {
    this.RemoveListenAttributeChanged(this.Config.AttributeId, this.pdt),
      this.RemoveListenAttributeChanged(this.Config.MaxAttributeId, this.vdt);
  }
  SetVisible(t, i = 0) {
    (this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
      this.VisibleState,
      t,
      i,
    )),
      this.RefreshVisible();
  }
  RefreshVisible() {
    var t;
    this.InAsyncLoading() ||
      this.IsRegister ||
      ((t = 0 === this.VisibleState)
        ? this.IsShowOrShowing || this.Show()
        : this.IsShowOrShowing && this.Hide(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          18,
          "改变特殊能量条显隐",
          ["visible", t],
          ["entityId", this.RoleData.EntityHandle?.Id],
        ));
  }
  DestroyOverride() {
    return (
      (this.Destroyed = !0),
      !this.NeedOverrideDestroy &&
        (this.InAsyncLoading() ||
          (BattleUiControl_1.BattleUiControl.Pool.RecycleActorByPath(
            this.PrefabPath,
            this.RootActor,
            !0,
          ),
          (this.RootActor = void 0),
          (this.RootItem = void 0)),
        !0)
    );
  }
  OnBeforeDestroy() {
    this.InAsyncLoading() || this.RemoveEvents(),
      this.kYe(),
      this.FYe(),
      (this.RoleData = void 0),
      (this.AttributeComponent = void 0),
      (this.TagComponent = void 0),
      (this.BuffComponent = void 0);
  }
  GetEntityId() {
    return this.RoleData?.EntityHandle?.Id;
  }
  Tick(t) {
    this.PercentMachine.Update(t) && this.OnBarPercentChanged();
  }
  OnAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
      this.OnBarPercentChanged();
  }
  OnMaxAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent()),
      this.OnBarPercentChanged();
  }
  OnBarPercentChanged() {}
  ListenForAttributeChanged(t, i) {
    var e = this.RoleData?.AttributeComponent;
    e && (e.AddListener(t, i), this.GYe.set(t, i));
  }
  RemoveListenAttributeChanged(t, i) {
    var e = this.AttributeComponent;
    e && (e.RemoveListener(t, i), this.GYe.delete(t));
  }
  kYe() {
    var t = this.AttributeComponent;
    if (t) {
      for (var [i, e] of this.GYe) t.RemoveListener(i, e);
      this.GYe.clear();
    }
  }
  ListenForTagCountChanged(t, i) {
    var e = this.TagComponent;
    e && ((e = e.ListenForTagAnyCountChanged(t, i)), this.TagTaskList.push(e));
  }
  FYe() {
    if (this.TagTaskList) {
      for (const t of this.TagTaskList) t.EndTask();
      this.TagTaskList.length = 0;
    }
  }
  ListenForTagAddOrRemoveChanged(t, i) {
    var e = this.TagComponent;
    e && ((e = e.ListenForTagAddOrRemove(t, i)), this.TagTaskList.push(e));
  }
  GetBuffCountByBuffId(t) {
    return this.BuffComponent.GetBuffTotalStackById(t);
  }
  async LoadEffects() {
    if (this.Config) {
      var i = [],
        e = this.Config.NiagaraPathList.length;
      for (let t = 0; t < e; t++) {
        var s = this.Config.NiagaraPathList[t];
        i.push(this.YIn(s, t, this.NiagaraList));
      }
      await Promise.all(i);
    }
  }
  async YIn(t, i, e) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.NiagaraSystem,
        (t) => {
          (e[i] = t), s.SetResult();
        },
        103,
      ),
      s.Promise
    );
  }
  async InitKeyItem(t) {
    !this.NeedInitKeyItem ||
      Info_1.Info.IsInTouch() ||
      ((this.KeyItem = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem()),
      this.KeyItem.SetConfig(this.Config),
      await this.KeyItem.CreateThenShowByResourceIdAsync(
        "UiItem_EnergyBarHotKey",
        t,
      ));
  }
  async InitNumItem(t) {
    this.NeedInitNumItem &&
      ((this.NumItem = new SpecialEnergyBarNumItem_1.SpecialEnergyBarNumItem()),
      await this.NumItem.CreateThenShowByResourceIdAsync(
        "UiItem_EnergyBarTxtNum",
        t,
      ));
  }
  InitKeyEnableTag() {
    var t = this.Config.KeyEnableTagId;
    0 !== t &&
      ((this.HasKeyEnableTag = this.TagComponent?.HasTag(t) ?? !1),
      this.ListenForTagAddOrRemoveChanged(t, this.OnKeyEnableTagChanged));
  }
  GetTargetAttributePercent() {
    var t = this.AttributeComponent.GetCurrentValue(this.Config.AttributeId),
      i = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
    let e = 0 < i ? t / i : 0;
    return e;
  }
  GetKeyEnable() {
    return !(
      this.PercentMachine.GetCurPercent() < this.Config.DisableKeyOnPercent ||
      (0 !== this.Config.KeyEnableTagId && !this.HasKeyEnableTag)
    );
  }
  OnKeyEnableChanged() {}
  OnChangeVisibleByTagChange(t) {}
  ReplaceFullEffect(t) {}
}
exports.SpecialEnergyBarBase = SpecialEnergyBarBase;
//# sourceMappingURL=SpecialEnergyBarBase.js.map
