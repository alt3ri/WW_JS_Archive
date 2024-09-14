"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PositionPanel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FeatureRestrictionTemplate_1 = require("../../../Common/FeatureRestrictionTemplate"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  ENTITY_SCORE_PATH =
    "../Config/Raw/Tables/k.可视化编辑/EntityPerformanceData.json",
  SIMPLE_NPC_PERFORMANCE_SCORE = 25,
  LOW_SCORE_THRESHOLD = 300,
  MID_SCORE_THRESHOLD = 500,
  HIGH_SCORE_THRESHOLD = 600,
  LOW_SCORE_COLOR = "green",
  MID_SCORE_COLOR = "orange",
  HIGH_SCORE_COLOR = "purple",
  WARNING_COLOR = "red",
  budgetName = ["Normal", "Fighting", "Cutscene"],
  loadModeName = ["None", "InLoading", "InGame"];
class PositionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.pet = void 0),
      (this.lMa = void 0),
      (this.vet = void 0),
      (this.VQa = void 0),
      (this.Met = !0),
      (this.ola = !1),
      (this.Eet = ""),
      (this._Ma = ""),
      (this.SH = new Map()),
      (this.yet = 500),
      (this.pk = 0),
      (this.uMa = 0),
      (this.cMa = 0),
      (this.wQe = () => {
        this.bZa();
      }),
      (this.ShowPlayerPosition = () => {
        (this.Met = !this.Met), this.pet.SetUIActive(this.Met);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.ola =
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()),
      (this.pet = this.GetText(0)),
      (this.lMa = this.GetText(2)),
      (this.vet = this.GetText(1)),
      (this.VQa = this.GetText(3)),
      Info_1.Info.IsBuildShipping || this.mMa(),
      this.ola
        ? (this.Met = !0)
        : Info_1.Info.IsBuildShipping && (this.Met = !1),
      this.pet.SetUIActive(this.Met),
      this.lMa.SetUIActive(!1),
      this.VQa?.SetUIActive(!1),
      this.bZa();
  }
  AddEvents() {
    this.ChildViewData.AddCallback(0, this.wQe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowPlayerPosition,
        this.ShowPlayerPosition,
      );
  }
  RemoveEvents() {
    this.ChildViewData.RemoveCallback(0, this.wQe),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowPlayerPosition,
        this.ShowPlayerPosition,
      );
  }
  bZa() {
    var e = this.ChildViewData.GetChildVisible(0);
    this.vet?.SetUIActive(e);
  }
  OnBeforeDestroy() {
    (this.pet = void 0), (this.lMa = void 0);
  }
  OnAfterTickBattleChildViewPanel(e) {
    var t, i;
    Global_1.Global.BaseCharacter &&
      (PositionPanel.vJe.Start(),
      (t =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      ([e, t, i] =
        (this.Met && this.Iet(t, e),
        [
          (t.X / 100).toFixed(0),
          (t.Y / 100).toFixed(0),
          (t.Z / 100).toFixed(0),
        ])),
      this.vet.SetText(e + `,${t},` + i),
      PositionPanel.vJe.Stop());
  }
  Iet(e, t) {
    var i = e.X.toFixed(0),
      r = e.Y.toFixed(0),
      e = e.Z.toFixed(0),
      o =
        ((this.uMa += this.dMa),
        this.cMa++,
        TimeUtil_1.TimeUtil.DateFormat2(new Date())),
      s = TimeUtil_1.TimeUtil.DateFormat2(
        new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      ),
      a = Net_1.Net.GetUnVerifiedMessageCount(),
      a =
        10 < a
          ? `
协议缓存队列长度:` + a
          : "",
      _ = (1e3 / t).toFixed(0),
      l = ActorSystem_1.ActorSystem.Size,
      n = ActorSystem_1.ActorSystem.Capacity,
      h =
        BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
          "Stream",
        ),
      m = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityMap().size;
    (this.pk += t),
      this.pk > this.yet &&
        ((this.pk = 0), this.UpdateEffectState(), this.CMa());
    let c = `Fps:${_} Pos: (${i},${r},${e})`;
    (c =
      (c = !this.ola && 0 < this.SH.size ? c + "  " + this._Ma : c) +
      ` 
CTime:${o}
STime:${s}
GTime:` +
      ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString),
      this.VQa?.SetUIActive(!1),
      this.ola ||
        (c =
          `${(c = (c = c + " ServerIp:" + ModelManager_1.ModelManager.LoginModel.Platform + a + this.Eet) + " Bullet:" + m)}
ActorPool:${l}/${n} (${h}) LoadMode:${loadModeName[ResourceSystem_1.ResourceSystem.GetLoadMode()]} BudgetMode:` +
          budgetName[
            GameBudgetInterfaceController_1.GameBudgetInterfaceController
              .CurrentGlobalMode
          ]),
      this.pet.SetText(c);
  }
  UpdateNiagaraGlobalWindow() {
    let e = "",
      t = !1;
    var i = UE.NiagaraFunctionLibrary.GetGlobalInfo(),
      r = i.GlobalTotalActive,
      o = i.GlobalTotalScalability,
      s = i.GlobalTotalParticles,
      i = i.GlobalTotalEmitters;
    let a = 1,
      _ = 1,
      l = 1,
      n = 1;
    (n = ((l = ((_ = 1e3), 4e3)), 2e3)),
      r >
        (a =
          (Platform_1.Platform.IsPcPlatform() ||
            Platform_1.Platform.IsPs5Platform(),
          1e3)) &&
        ((e += ` TotalActive超标,当前值是:${r}
`),
        (t = !0)),
      o > _ &&
        ((e += ` TotalScalability超标,当前值是:${o}
`),
        (t = !0)),
      s > l &&
        ((e += ` TotalParticles超标,当前值是:${s}
`),
        (t = !0)),
      i > n &&
        ((e += ` TotalEmitters超标,当前值是:${i}
`),
        (t = !0)),
      t
        ? (this.VQa?.SetUIActive(!0), this.VQa?.SetText(e))
        : this.VQa?.SetUIActive(!1);
  }
  UpdateEffectState() {
    var e = EffectSystem_1.EffectSystem.GetEffectCount(),
      t = EffectSystem_1.EffectSystem.GetActiveEffectCount(),
      i = EffectSystem_1.EffectSystem.GetEffectLruSize(),
      r = EffectSystem_1.EffectSystem.GetEffectLruCapacity(),
      o = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(0),
      s = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(1),
      a = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(2),
      _ = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(3);
    this.Eet = `
Effect: ${e}(${t}) Pool:${i}/${r}(${o})(${s})(${a})(${_})`;
  }
  CMa() {
    if (0 !== this.SH.size) {
      var r = Math.floor(this.uMa / this.cMa);
      let e = WARNING_COLOR,
        t = "",
        i = "";
      this.lMa.SetUIActive(!1),
        r < LOW_SCORE_THRESHOLD
          ? (e = LOW_SCORE_COLOR)
          : r < MID_SCORE_THRESHOLD
            ? ((e = MID_SCORE_COLOR), (t = "<b>"), (i = "</b>"))
            : r < HIGH_SCORE_THRESHOLD
              ? ((e = HIGH_SCORE_COLOR),
                (t = "<size=+6><b>"),
                (i = "</b></size>"))
              : r >= HIGH_SCORE_THRESHOLD &&
                ((e = WARNING_COLOR),
                (t = "<size=+18><b>"),
                (i = "</b></size>"),
                this.lMa.SetUIActive(!0),
                this.lMa.SetText(
                  `<size=+28><b><color=red>Warning!!!此处Aoi范围内可Tick实体过多，有性能问题。TickScore:${r}</color></b></size>`,
                )),
        (this._Ma = `<color=${e}>${t}TickScore:${r}${i}</color>`),
        (this.uMa = 0),
        (this.cMa = 0);
    }
  }
  get dMa() {
    let i = 0;
    return (
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(
        (e) => {
          var t;
          e.Entity.LastTickFrame === Time_1.Time.Frame &&
            ((t = (e = e.Entity.GetComponent(0)).GetPbDataId()),
            e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) &&
            e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision &&
            14000169 !== t &&
            (t = e?.GetPbEntityInitData()) &&
            (i += this.gMa(t.BlueprintType));
        },
      ),
      Math.floor(i)
    );
  }
  gMa(e) {
    return e.includes("SimpleNPC")
      ? SIMPLE_NPC_PERFORMANCE_SCORE
      : void 0 === (e = this.SH.get(e))
        ? 0
        : e;
  }
  mMa() {
    var e = (0, PublicUtil_1.getConfigPath)(ENTITY_SCORE_PATH),
      t = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(t, e),
      (e = (0, puerts_1.$unref)(t)))
    ) {
      t = JSON.parse(e);
      if (t) {
        e = t.EntityTypeScore;
        if (e) {
          this.SH.clear();
          for (const i of e)
            this.SH.set(i.BlueprintType, Math.floor(10 * i.Score) / 10);
        }
      }
    }
  }
}
(exports.PositionPanel = PositionPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]PositionPanelTick",
);
//# sourceMappingURL=PositionPanel.js.map
