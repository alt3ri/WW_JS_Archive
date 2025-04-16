"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarBase = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  VisibleStateUtil_1 = require("../../VisibleStateUtil"),
  BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer"),
  SpecialEnergyBarKeyItem_1 = require("./SpecialEnergyBarKeyItem"),
  SpecialEnergyBarNumItem_1 = require("./SpecialEnergyBarNumItem"),
  SpecialEnergyBarPercentMachine_1 = require("./SpecialEnergyBarPercentMachine");
class SpecialEnergyBarBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Destroyed = !1),
      (this.PrefabPath = ""),
      (this.RoleData = void 0),
      (this.Config = void 0),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
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
      (this.TweenAnimPlayer = void 0),
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
      Log_1.Log.Debug("Battle", 17, "加载特殊能量条", ["path", i]),
      (this.PrefabPath = i);
    i = await BattleUiControl_1.BattleUiControl.Pool.LoadActor(i, t);
    this.Destroyed
      ? BattleUiControl_1.BattleUiControl.Pool.RecycleSingleActor(i)
      : (await this.CreateByActorAsync(i),
        this.AddEvents(),
        this.RefreshVisible());
  }
  async InitByActorAsync(t) {
    await this.CreateByActorAsync(t), this.AddEvents(), this.RefreshVisible();
  }
  InitData(t, i, e = !0) {
    (this.NeedInitKeyItem = e),
      !this.Destroyed &&
        t &&
        (this.RoleData &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 17, "能量条设置了多次角色的数据"),
          this.kYe(),
          this.FYe()),
        (this.RoleData = t),
        (this.Config = i),
        (this.AttributeId = i.AttributeId),
        (this.MaxAttributeId = i.MaxAttributeId),
        (this.AttributeComponent = this.RoleData.AttributeComponent),
        (this.TagComponent = this.RoleData.GameplayTagComponent),
        (this.BuffComponent = this.RoleData.BuffComponent),
        this.OnInitData(),
        this.PercentMachine.Init(this.GetTargetAttributePercent()),
        this.InitKeyEnableTag());
  }
  OnInitData() {}
  AddEvents() {
    this.ListenForAttributeChanged(this.AttributeId, this.pdt),
      this.ListenForAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  RemoveEvents() {
    this.RemoveListenAttributeChanged(this.AttributeId, this.pdt),
      this.RemoveListenAttributeChanged(this.MaxAttributeId, this.vdt);
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
      this.IsCreateOrCreating ||
      ((t = 0 === this.VisibleState)
        ? this.IsShowOrShowing || this.Show()
        : this.IsShowOrShowing && this.Hide(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "改变特殊能量条显隐",
          ["visible", t],
          ["entityId", this.RoleData.EntityHandle?.Id],
        ));
  }
  DestroyOverride() {
    return !(this.Destroyed = !0);
  }
  OnBeforeDestroy() {
    this.InAsyncLoading() || this.RemoveEvents(),
      this.ClearAllTweenAnim(),
      this.kYe(),
      this.FYe(),
      this.NeedInitKeyItem &&
        ((this.NeedInitKeyItem = !1),
        this.KeyItem?.Destroy(),
        (this.KeyItem = void 0)),
      this.NeedInitNumItem &&
        ((this.NeedInitNumItem = !1),
        this.NumItem?.Destroy(),
        (this.NumItem = void 0)),
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
      this.Config.KeyInfoList.length <= 0 ||
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
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId),
      i = this.AttributeComponent.GetCurrentValue(this.MaxAttributeId);
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
  InitTweenAnim(t) {
    this.TweenAnimPlayer ||
      (this.TweenAnimPlayer =
        new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer()),
      this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer?.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer?.StopTweenAnim(t);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear();
  }
}
exports.SpecialEnergyBarBase = SpecialEnergyBarBase;
//# sourceMappingURL=SpecialEnergyBarBase.js.map
