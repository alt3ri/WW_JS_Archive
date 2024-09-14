"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResonanceChainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  RoleController_1 = require("../RoleController"),
  RoleDefine_1 = require("../RoleDefine"),
  ResonanceChainInfoItem_1 = require("./ResonanceChainInfoItem"),
  ResonanceChainItem_1 = require("./ResonanceChainItem"),
  RESONANCE_FIRST_ITEM_ANGLE = -60,
  RESONANCE_PER_ITEM_ANGLE = 30,
  RESONANCE_ITEM_COUNT = 6;
class ResonanceChainView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.d1o = void 0),
      (this.Nco = void 0),
      (this.Oco = void 0),
      (this.kco = void 0),
      (this.Fco = void 0),
      (this.xKt = void 0),
      (this.$pt = void 0),
      (this.Vco = -1),
      (this.owt = (e) => {
        var t;
        ("CamLef" !== e && "CamRig" !== e) ||
          ((t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
          this.$pt.SetActorTag(e, RoleDefine_1.UI_SCENE_ROLE_TAG, t),
          this.$pt.SetRelativeTransform(
            e,
            RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
          ));
      }),
      (this.Hco = () => {
        this.jco();
        var e,
          t,
          i = this.d1o.GetCurRoleResonanceGroupIndex() - 1;
        const s = this.kco[i];
        s &&
          (s.PlayActivateSequence(() => {
            s.SetActive(!1), s.SetSelectState(!1);
          }),
          (e = this.Wco(i)),
          (t = this.d1o.GetCurSelectRoleId()),
          e.SetSelectState(!0),
          e.Update(t, s.GetResonanceId()),
          e.SetActive(!0),
          (this.kco[i] = e).PlayActivateSequence(),
          (t = 1 + i) < this.kco.length) &&
          this.kco[t].RefreshRedDot();
      }),
      (this.Kco = (e) => {
        this.PlayMontageStart(),
          this.$pt.StopSequenceByKey("Start"),
          this.$pt.PlayLevelSequenceByName("Start"),
          this.bl(),
          this.ShowItems();
      }),
      (this.Qco = () => {
        this.Xco(),
          this.$pt.StopSequenceByKey("CamLef"),
          this.$pt.PlayLevelSequenceByName("CamLef"),
          this.$co();
      }),
      (this.Yco = (e) => {
        var t = this.Vco;
        let i = void 0;
        0 <= t && (i = this.Jco(t));
        t = e;
        let s = void 0;
        0 <= t && ((this.Vco = t), (s = this.Jco(t))),
          i?.RefreshToggleState(!1),
          s?.RefreshToggleState(!0),
          0 === this.d1o.RoleViewState && this.zco(),
          this.jco();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.d1o = this.ExtraParams),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "ResonanceChainView",
          ])
        : (this.Fq(), this.Zco());
  }
  Fq() {
    (this.Fco = new Array(RESONANCE_ITEM_COUNT)),
      (this.Nco = new Array(RESONANCE_ITEM_COUNT)),
      (this.Oco = new Array(RESONANCE_ITEM_COUNT)),
      (this.kco = new Array(RESONANCE_ITEM_COUNT)),
      (this.Fco[0] = this.GetItem(0)),
      (this.Fco[1] = this.GetItem(1)),
      (this.Fco[2] = this.GetItem(2)),
      (this.Fco[3] = this.GetItem(3)),
      (this.Fco[4] = this.GetItem(4)),
      (this.Fco[5] = this.GetItem(5)),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.$pt.BindSequenceStartEvent(this.owt);
  }
  Zco() {
    this.Vco = -1;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
      this.Hco,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Kco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Qco,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
      this.Hco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Kco,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Qco,
      );
  }
  OnBeforeShow() {
    this.PlayMontageStart(),
      this.bl(),
      this.ShowItems().then(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FinishGuideStepByEvent,
          "ResonanceChainGuide",
        );
      });
  }
  async ShowItems() {
    const t = [];
    this.kco.forEach((e) => {
      t.push(e.ShowItem());
    }),
      await Promise.all(t);
  }
  zco() {
    this.emo(),
      this.$pt.StopSequenceByKey("CamRig"),
      this.$pt.PlayLevelSequenceByName("CamRig"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleInternalViewEnter,
      );
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(7);
  }
  emo() {
    0 <= this.Vco &&
      !this.xKt &&
      (this.xKt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
        this.RootItem,
      )),
      this.xKt.ShowItem().then(() => this.xKt?.SetUiActive(!0));
  }
  Xco() {
    this.xKt.HideItem().then(() => this.xKt?.SetUiActive(!1));
  }
  tmo(e) {
    if (!(e < 0 || e >= RESONANCE_ITEM_COUNT))
      return RESONANCE_FIRST_ITEM_ANGLE + e * RESONANCE_PER_ITEM_ANGLE;
  }
  imo(t) {
    if (!(t < 0 || t >= RESONANCE_ITEM_COUNT)) {
      let e = this.Oco[t];
      return (
        e ||
          ((e = new ResonanceChainItem_1.ResonanceChainLockedItem(this.Fco[t])),
          (this.Oco[t] = e).BindToggleCallBack(this.Yco),
          e.SetIconRotation(this.tmo(t))),
        e
      );
    }
  }
  Wco(t) {
    if (!(t < 0 || t >= RESONANCE_ITEM_COUNT)) {
      let e = this.Nco[t];
      return (
        e ||
          ((e = new ResonanceChainItem_1.ResonanceChainActivatedItem(
            this.Fco[t],
          )),
          (this.Nco[t] = e).BindToggleCallBack(this.Yco),
          e.SetIconRotation(this.tmo(t))),
        e
      );
    }
  }
  Jco(e) {
    e =
      ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(e);
    if (e) {
      e = e.GroupIndex - 1;
      if (0 <= e && e < RESONANCE_ITEM_COUNT) return this.kco[e];
    }
  }
  bl() {
    const n = this.d1o.GetCurRoleResonanceGroupIndex();
    var e = this.d1o.GetCurRoleResonanceConfigList();
    const h = this.d1o.GetCurSelectRoleId();
    this.kco.forEach((e) => {
      e?.SetActive(!1);
    }),
      e &&
        0 < e.length &&
        e.forEach((e) => {
          let t = void 0;
          var i = e.GroupIndex,
            s = i - 1;
          s < RESONANCE_ITEM_COUNT &&
            ((t = i <= n ? this.Wco(s) : this.imo(s)).SetActive(!0),
            t.Update(h, e.Id),
            (this.kco[s] = t));
        });
  }
  $co() {
    var e = this.Vco;
    let t = void 0;
    0 <= e && (t = this.Jco(e)), (this.Vco = -1), t?.RefreshToggleState(!1, !0);
  }
  jco() {
    this.xKt ||
      (this.xKt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
        this.RootItem,
      ));
    var e = this.d1o.GetCurSelectRoleData();
    this.xKt.Update(e.GetDataId(), this.Vco, e.IsTrialRole());
  }
  OnBeforeDestroy() {
    this.Nco.forEach((e) => {
      e?.Destroy();
    }),
      this.Oco.forEach((e) => {
        e?.Destroy();
      }),
      (this.Nco = void 0),
      (this.Oco = void 0),
      (this.kco = void 0),
      (this.Fco = void 0),
      (this.$pt = void 0),
      this.Zco();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 === e.length)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 17, "共鸣链聚焦引导extraParam字段配置错误", [
          "configParams",
          e,
        ]);
    else {
      var t = this.omo(e[0]);
      if (t) return [t, t];
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Guide",
          17,
          "共鸣链聚焦引导extraParam字段配置错误, 找不到对应的共鸣链界面UI节点",
          ["configParams", e],
        );
    }
  }
  omo(e) {
    let t = void 0;
    var i = Number(e);
    return (
      i
        ? (t = this.imo(--i)?.GetUiItemForGuide())
        : "btn" === e && (t = this.xKt?.GetUiItemForGuide()),
      t
    );
  }
}
exports.ResonanceChainView = ResonanceChainView;
//# sourceMappingURL=ResonanceChainView.js.map
