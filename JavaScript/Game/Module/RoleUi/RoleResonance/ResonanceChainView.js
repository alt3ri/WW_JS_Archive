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
      (this.plo = void 0),
      (this.Vuo = void 0),
      (this.Huo = void 0),
      (this.juo = void 0),
      (this.Wuo = void 0),
      (this.xWt = void 0),
      (this.Gft = void 0),
      (this.Kuo = -1),
      (this.ZPt = (e) => {
        var t;
        ("CamLef" !== e && "CamRig" !== e) ||
          ((t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
          this.Gft.SetActorTag(e, RoleDefine_1.UI_SCENE_ROLE_TAG, t),
          this.Gft.SetRelativeTransform(
            e,
            RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
          ));
      }),
      (this.Quo = () => {
        this.Xuo();
        var e,
          t,
          i = this.plo.GetCurRoleResonanceGroupIndex() - 1;
        const s = this.juo[i];
        s &&
          (s.PlayActivateSequence(() => {
            s.SetActive(!1);
          }),
          (e = this.$uo(i)),
          (t = this.plo.GetCurSelectRoleId()),
          e.SetSelectState(!0),
          e.Update(t, s.GetResonanceId()),
          e.SetActive(!0),
          (this.juo[i] = e).PlayActivateSequence(),
          (t = 1 + i) < this.juo.length) &&
          this.juo[t].RefreshRedDot();
      }),
      (this.Yuo = (e) => {
        this.PlayMontageStart(),
          this.Gft.StopSequenceByKey("Start"),
          this.Gft.PlayLevelSequenceByName("Start"),
          this.bl(),
          this.ShowItems();
      }),
      (this.Juo = () => {
        this.zuo(),
          this.Gft.StopSequenceByKey("CamLef"),
          this.Gft.PlayLevelSequenceByName("CamLef"),
          this.Zuo();
      }),
      (this.eco = (e) => {
        var t = this.Kuo;
        let i = void 0;
        0 <= t && (i = this.tco(t));
        t = e;
        let s = void 0;
        0 <= t && ((this.Kuo = t), (s = this.tco(t))),
          i?.RefreshToggleState(!1),
          s?.RefreshToggleState(!0),
          0 === this.plo.RoleViewState && this.ico(),
          this.Xuo();
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
    (this.plo = this.ExtraParams),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "ResonanceChainView",
          ])
        : (this.Fq(), this.oco());
  }
  Fq() {
    (this.Wuo = new Array(RESONANCE_ITEM_COUNT)),
      (this.Vuo = new Array(RESONANCE_ITEM_COUNT)),
      (this.Huo = new Array(RESONANCE_ITEM_COUNT)),
      (this.juo = new Array(RESONANCE_ITEM_COUNT)),
      (this.Wuo[0] = this.GetItem(0)),
      (this.Wuo[1] = this.GetItem(1)),
      (this.Wuo[2] = this.GetItem(2)),
      (this.Wuo[3] = this.GetItem(3)),
      (this.Wuo[4] = this.GetItem(4)),
      (this.Wuo[5] = this.GetItem(5)),
      (this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.Gft.BindSequenceStartEvent(this.ZPt);
  }
  oco() {
    this.Kuo = -1;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
      this.Quo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Yuo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Juo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
      this.Quo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Yuo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Juo,
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
    this.juo.forEach((e) => {
      t.push(e.ShowItem());
    }),
      await Promise.all(t);
  }
  ico() {
    this.rco(),
      this.Gft.StopSequenceByKey("CamRig"),
      this.Gft.PlayLevelSequenceByName("CamRig"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleInternalViewEnter,
      );
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(7);
  }
  rco() {
    0 <= this.Kuo &&
      !this.xWt &&
      (this.xWt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
        this.RootItem,
      )),
      this.xWt.ShowItem();
  }
  zuo() {
    this.xWt.HideItem();
  }
  nco(e) {
    if (!(e < 0 || e >= RESONANCE_ITEM_COUNT))
      return RESONANCE_FIRST_ITEM_ANGLE + e * RESONANCE_PER_ITEM_ANGLE;
  }
  sco(t) {
    if (!(t < 0 || t >= RESONANCE_ITEM_COUNT)) {
      let e = this.Huo[t];
      return (
        e ||
          ((e = new ResonanceChainItem_1.ResonanceChainLockedItem(this.Wuo[t])),
          (this.Huo[t] = e).BindToggleCallBack(this.eco),
          e.SetIconRotation(this.nco(t))),
        e
      );
    }
  }
  $uo(t) {
    if (!(t < 0 || t >= RESONANCE_ITEM_COUNT)) {
      let e = this.Vuo[t];
      return (
        e ||
          ((e = new ResonanceChainItem_1.ResonanceChainActivatedItem(
            this.Wuo[t],
          )),
          (this.Vuo[t] = e).BindToggleCallBack(this.eco),
          e.SetIconRotation(this.nco(t))),
        e
      );
    }
  }
  tco(e) {
    e =
      ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(e);
    if (e) {
      e = e.GroupIndex - 1;
      if (0 <= e && e < RESONANCE_ITEM_COUNT) return this.juo[e];
    }
  }
  bl() {
    const n = this.plo.GetCurRoleResonanceGroupIndex();
    var e = this.plo.GetCurRoleResonanceConfigList();
    const h = this.plo.GetCurSelectRoleId();
    this.juo.forEach((e) => {
      e?.SetActive(!1);
    }),
      e &&
        0 < e.length &&
        e.forEach((e) => {
          let t = void 0;
          var i = e.GroupIndex,
            s = i - 1;
          s < RESONANCE_ITEM_COUNT &&
            ((t = i <= n ? this.$uo(s) : this.sco(s)).SetActive(!0),
            t.Update(h, e.Id),
            (this.juo[s] = t));
        });
  }
  Zuo() {
    var e = this.Kuo;
    let t = void 0;
    0 <= e && (t = this.tco(e)), (this.Kuo = -1), t?.RefreshToggleState(!1, !0);
  }
  Xuo() {
    this.xWt ||
      (this.xWt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
        this.RootItem,
      ));
    var e = this.plo.GetCurSelectRoleData();
    this.xWt.Update(e.GetDataId(), this.Kuo, e.IsTrialRole());
  }
  OnBeforeDestroy() {
    this.Vuo.forEach((e) => {
      e?.Destroy();
    }),
      this.Huo.forEach((e) => {
        e?.Destroy();
      }),
      (this.Vuo = void 0),
      (this.Huo = void 0),
      (this.juo = void 0),
      (this.Wuo = void 0),
      (this.Gft = void 0),
      this.oco();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 === e.length)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 17, "共鸣链聚焦引导extraParam字段配置错误", [
          "configParams",
          e,
        ]);
    else {
      var t = this.aco(e[0]);
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
  aco(e) {
    let t = void 0;
    var i = Number(e);
    return (
      i
        ? (t = this.sco(--i)?.GetUiItemForGuide())
        : "btn" === e && (t = this.xWt?.GetUiItemForGuide()),
      t
    );
  }
}
exports.ResonanceChainView = ResonanceChainView;
//# sourceMappingURL=ResonanceChainView.js.map
