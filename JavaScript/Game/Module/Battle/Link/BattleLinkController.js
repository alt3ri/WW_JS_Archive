"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, a) {
      var n,
        o = arguments.length,
        r =
          o < 3
            ? t
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(t, i))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, a);
      else
        for (var l = e.length - 1; 0 <= l; l--)
          (n = e[l]) &&
            (r = (o < 3 ? n(r) : 3 < o ? n(t, i, r) : n(t, i)) || r);
      return 3 < o && r && Object.defineProperty(t, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleLinkController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletController_1 = require("../../../NewWorld/Bullet/BulletController"),
  RenderUtil_1 = require("../../../Render/Utils/RenderUtil"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GameModeController_1 = require("../../../World/Controller/GameModeController"),
  BattleUiControl_1 = require("../../BattleUi/BattleUiControl"),
  CombatMessage_1 = require("../../CombatMessage/CombatMessage"),
  BattleLinkDefine_1 = require("./BattleLinkDefine"),
  seqCameraTag = new UE.FName("SequenceCamera"),
  characterTag = new UE.FName("Character");
class BattleLinkController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(28168, this.JAl),
      Net_1.Net.Register(20198, this.ZAl),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(28168), Net_1.Net.UnRegister(20198), this.Nmt(), !0
    );
  }
  static OnPreload() {
    if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInBattleLink())
      return (
        this.yWe(),
        this.PJa(),
        ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()
          ? [
              "BattleLinkController",
              ModelManager_1.ModelManager.BattleLinkModel.PreloadTeamRoleRes(),
            ]
          : void 0
      );
  }
  static OnLeaveLevel() {
    return (
      this.Nmt(),
      (this.Zza = !1),
      this.awa &&
        (this.awa.SequencePlayer?.IsPlaying() &&
          this.awa.SequencePlayer?.Stop(),
        ActorSystem_1.ActorSystem.Put(
          "BattleLinkController.OnLeaveLevel",
          this.awa,
        )),
      (this.awa = void 0),
      this.j3 &&
        (TimerSystem_1.TimerSystem.Remove(this.j3),
        (this.j3 = void 0),
        this.eRe()),
      this.tJa &&
        BattleUiControl_1.BattleUiControl.SetBattleViewVisible(this.tJa),
      (this.tJa = void 0),
      this.dgl && GameModeController_1.GameModeController.SetTimeDilation(1),
      (this.dgl = !1),
      this.Ash.clear(),
      (this.Dsh = !0),
      !(this.Mth = void 0)
    );
  }
  static yWe() {
    this.zHa ||
      ((this.zHa = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.dLe,
      ),
      ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink() &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharUseSkill,
          this.BJe,
        ),
      ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink() &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.Fi1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnRevive,
          this.Ni1,
        )));
  }
  static Nmt() {
    this.zHa &&
      ((this.zHa = !1),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.dLe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.dLe,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharUseSkill,
        this.BJe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharUseSkill,
          this.BJe,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Fi1,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.Fi1,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnRevive,
        this.Ni1,
      )) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRevive,
        this.Ni1,
      );
  }
  static PJa() {
    this.awa ||
      (this.awa = ActorSystem_1.ActorSystem.Get(
        UE.LevelSequenceActor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransformDouble,
        void 0,
        !1,
      ));
  }
  static Vi1(e, t) {
    this.ji1?.includes(e) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnNewLinkStatusChanged,
        ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus(),
      );
  }
  static Rsh(t) {
    if (!this.Ash.has(t)) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(i)
          .GetCurrentGroup()
          .GetRoleList();
      let e = 0;
      for (const n of i) {
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          n.CreatureDataId,
        );
        a.Entity.Id === t &&
          (this.Ash.set(a.Entity.Id, a), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Battle", 67, "[BattleLink]缓存Entity成功", [
            "entityId",
            t,
          ]),
          this.Ash.has(a.Entity.Id) && (e += 1);
      }
      e === i.length && (this.Dsh = !1);
    }
  }
  static UseLinkSkill(e) {
    var t, i;
    e &&
      (this.Zqi
        ? ModelManager_1.ModelManager.BattleLinkModel.HasLinkEntityId(e.Id)
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[BattleLink]触发队友大招失败, 该entity已触发过",
              ["entityId", e.Id],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "[BattleLink]触发队友大招成功",
                ["MessageId", this.Zqi],
                ["entityId", e.Id],
              ),
            (e = e.GetComponent(172)),
            (t = MathUtils_1.MathUtils.LongToBigInt(this.Zqi)),
            (i = CommonParamById_1.configCommonParamById.GetLong54Config(
              "LinkSkillNotifyBuff",
            )) &&
              e.AddBuff(i, {
                InstigatorId: e.CreatureDataId,
                Reason: "触发Link大招",
                PreMessageId: t,
              }))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "[BattleLink]触发队友大招失败", [
            "MessageId",
            this.Zqi,
          ]));
  }
  static StartLink(e = 0) {
    e = 0 === e ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : e;
    UiManager_1.UiManager.IsViewOpen("BattleLinkView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattleLinkRestart,
          e,
        )
      : UiManager_1.UiManager.OpenView("BattleLinkView", e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]Link倒计时开始");
  }
  static StopLink() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStop),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]Link倒计时结束");
  }
  static StartLinkExplosion() {
    this.StopLink(), this.TryPlaySplitScreen();
  }
  static TryPlaySplitScreen() {
    this.Zza ||
      (ModelManager_1.ModelManager.BattleLinkModel?.CheckSplitScreenRes() &&
      this.awa
        ? ((this.Zza = !0),
          ModelManager_1.ModelManager.BattleLinkModel.PlayRoleAnim(!0),
          ModelManager_1.ModelManager.BattleLinkModel.GetSplitScreenMainBp()?.IsA(
            UE.BP_SplitScreen_New_C.StaticClass(),
          )
            ? (this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
                (this.j3 = void 0), this.t$a();
              }, 100))
            : this.eJa(),
          this.LinkExplosionStart())
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏衔接播放失败"));
  }
  static eJa() {
    var e,
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity,
      t =
        (t &&
          (t = t.GetComponent(21)) &&
          ((e = t?.AddCue(BattleLinkDefine_1.LINK_BURST_POST_EFFECT)),
          (this.yta = t?.GetCueByHandle(e))),
        BattleLinkDefine_1.LINK_POST_EFFECT_DURATION *
          TimeUtil_1.TimeUtil.InverseMillisecond);
    (this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      (this.j3 = void 0), this.eRe(), this.t$a();
    }, t)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]播放分屏衔接");
  }
  static eRe() {
    this.yta && (this.yta.Destroy(), (this.yta = void 0));
  }
  static t$a() {
    var e = ModelManager_1.ModelManager.BattleLinkModel,
      t = e?.GetSplitScreenMainBp(),
      i = e?.GetSplitScreenSeq();
    t && i && this.awa
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq开始播放"),
        e.InitBeforeStart(),
        e.PlayRoleAnim(),
        AudioSystem_1.AudioSystem.SetState("game_rogue_link_state", "in_link"),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 42, "[BattleLink]Link音乐切入"),
        e.PlayRoleLinkAudio(),
        (this.Mth = new UE.Rotator()),
        (e =
          ControllerHolder_1.ControllerHolder.CameraController.CameraRotator),
        (this.Mth.Pitch = e.Pitch),
        (this.Mth.Yaw = e.Yaw),
        (this.Mth.Roll = e.Roll),
        CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetBlendTime(
          0,
          0,
        ),
        CameraController_1.CameraController.SequenceCamera.PlayerComponent.StopSequence(),
        (e =
          ModelManager_1.ModelManager.CameraModel.SequenceCamera
            .DisplayComponent.CineCamera),
        this.awa.SetSequence(i),
        this.GPe.Add(e),
        this.awa.SetBindingByTag(seqCameraTag, this.GPe, !1),
        this.GPe.Empty(),
        this.GPe.Add(t),
        this.awa.SetBindingByTag(characterTag, this.GPe, !1),
        this.GPe.Empty(),
        CameraController_1.CameraController.EnterCameraMode(1),
        t.SetActorHiddenInGame(!1),
        t.Start(),
        this.awa.SequencePlayer.OnFinished.Clear(),
        this.awa.SequencePlayer.OnFinished.Add(this.uwa),
        this.awa.SequencePlayer.Play(),
        RenderUtil_1.RenderUtil.BeginPSOSyncMode())
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq播放失败"),
        this.LinkExplosionEnd());
  }
  static LinkExplosionStart() {
    (this.dgl = !0),
      (this.tJa = BattleUiControl_1.BattleUiControl.SetBattleViewInvisible()),
      GameModeController_1.GameModeController.SetTimeDilation(0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏假时停开始");
  }
  static LinkExplosionEnd() {
    if (
      ((this.dgl = !1),
      this.tJa &&
        BattleUiControl_1.BattleUiControl.SetBattleViewVisible(this.tJa),
      (this.tJa = void 0),
      GameModeController_1.GameModeController.SetTimeDilation(1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏假时停结束"),
      ModelManager_1.ModelManager.BattleLinkModel?.ResetLinkSkillStatus(),
      this.Zqi)
    ) {
      var i,
        a = MathUtils_1.MathUtils.LongToBigInt(this.Zqi),
        n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity,
        o = n.GetComponent(172);
      let e = void 0,
        t = void 0;
      if (
        (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()
          ? ((e =
              CommonParamById_1.configCommonParamById.GetLong54ArrayConfig(
                "LinkBrustBuffs",
              )),
            (t =
              CommonParamById_1.configCommonParamById.GetLong54ArrayConfig(
                "LinkBrustBullets",
              )))
          : (i =
              ModelManager_1.ModelManager.BattleLinkModel?.GetLinkConfig()) &&
            ((e = i.BuffIdsInBrust), (t = i.BulletIdsInBrust)),
        e)
      )
        for (const r of e)
          o.AddBuff(Number(r), {
            InstigatorId: o.CreatureDataId,
            Reason: "Link爆发结束增加buff",
            PreMessageId: a,
          });
      if (t)
        for (const l of t)
          BulletController_1.BulletController.CreateBulletCustomTarget(
            n,
            l.toString(),
            void 0,
            {},
            a,
          );
    }
  }
  static SetPlayerUltraSkillEnable(e) {
    var t =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
        203,
      );
    t && (e ? t.RemoveTag(-732810197) : t.AddTag(-732810197));
  }
  static ShowLinkButton(e, t) {
    UiManager_1.UiManager.GetViewByName("BattleView").ShowLinkButton(e),
      t &&
        (ModelManager_1.ModelManager.BattleLinkModel.SetNewLinkGmTest(e),
        this.Nmt(),
        this.yWe());
  }
  static RefreshAliveRoleIdList() {
    let e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(
      !1,
      !0,
    );
    if (e) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      const a = [];
      for (const n of t) {
        var i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
          n.GetConfigId,
        );
        i && n.IsDead() && a.push(i);
      }
      (e = e.filter((e) => !a.includes(e))),
        ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(e),
        ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp();
    }
  }
  static SetMessageId(e) {
    this.Zqi = e;
  }
  static OnNewLinkStateNotify(e, t, i) {
    var a = i?.$8n ?? 0;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        67,
        "[BattleLink]接收Link状态改变通知",
        ["status", t.lMs],
        ["msgId", a],
      ),
      e?.Valid &&
        (this.SetMessageId(a),
        ModelManager_1.ModelManager.BattleLinkModel?.HandleNewLinkStateNotify(
          t,
          i,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnNewLinkStatusChanged,
          Number(t.lMs),
        ),
        t.lMs === Protocol_1.Aki.Protocol.Ho1.Proto_Burst
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBattleLinkStatusChanged,
              4,
            )
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBattleLinkStatusChanged,
              0,
            ));
  }
  static RequestNewLinkBurst() {
    var e, t;
    void 0 !== this.Zqi &&
      (e =
        ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity) &&
      ((t = MathUtils_1.MathUtils.LongToBigInt(this.Zqi)),
      CombatMessage_1.CombatNet.Send(
        22284,
        e,
        Protocol_1.Aki.Protocol.Vo1.create(),
        t,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]Link爆发请求", ["msgId", t]),
      this.RefreshAliveRoleIdList(),
      this.TryPlaySplitScreen());
  }
  static async NewLinkBurstTest() {
    this.x6c ||
      (this.PJa(),
      this.RefreshAliveRoleIdList(),
      (this.x6c = !0),
      await ModelManager_1.ModelManager.BattleLinkModel.PreloadRes().Promise,
      this.TryPlaySplitScreen(),
      (this.x6c = !1));
  }
}
((_a = BattleLinkController).zHa = !1),
  (BattleLinkController.tJa = void 0),
  (BattleLinkController.Zqi = void 0),
  (BattleLinkController.Zza = !1),
  (BattleLinkController.yta = void 0),
  (BattleLinkController.awa = void 0),
  (BattleLinkController.GPe = UE.NewArray(UE.Actor)),
  (BattleLinkController.Mth = void 0),
  (BattleLinkController.j3 = void 0),
  (BattleLinkController.Ash = new Map()),
  (BattleLinkController.Dsh = !0),
  (BattleLinkController.dgl = !1),
  (BattleLinkController.ji1 = []),
  (BattleLinkController.x6c = !1),
  (BattleLinkController.BJe = (e, t, i) => {
    _a.Dsh && !_a.Ash.has(e) && _a.Rsh(e);
    var a = _a.Ash.get(e);
    a
      ? 3 === a.Entity?.GetComponent(39)?.GetSkillInfo(t)?.SkillGenre &&
        ModelManager_1.ModelManager.BattleLinkModel.CanUseLinkSkill(e) &&
        (ModelManager_1.ModelManager.BattleLinkModel.AddLinkEntityId(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattleLinkStop,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattleLinkStatusChanged,
          3,
        ))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]EntityCache中找不到entity", [
          "entityId",
          e,
        ]);
  }),
  (BattleLinkController.dLe = () => {
    if (ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink()) {
      _a.ji1.length = 0;
      for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
        var e = i.EntityHandle?.Entity?.Id ?? 0;
        e && _a.ji1.push(e);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnNewLinkStatusChanged,
        ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus(),
      );
    } else {
      var t =
        ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(
          !1,
          !0,
        );
      t &&
        (ModelManager_1.ModelManager.BattleLinkModel.SetRoleIdList(t),
        ModelManager_1.ModelManager.BattleLinkModel.ResetMainBp()),
        _a.Ash.clear(),
        (_a.Dsh = !0);
    }
  }),
  (BattleLinkController.Fi1 = (e) => {
    _a.Vi1(e, !0);
  }),
  (BattleLinkController.Ni1 = (e) => {
    _a.Vi1(e.Id, !1);
  }),
  (BattleLinkController.uwa = () => {
    (_a.Zza = !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Seq播放结束");
    var e = ModelManager_1.ModelManager.BattleLinkModel?.GetSplitScreenMainBp(),
      e =
        (e?.End(),
        e?.SetActorHiddenInGame(!0),
        ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent
          .CineCamera);
    e.GetAttachParentActor() && e.K2_DetachFromActor(),
      CameraController_1.CameraController.ExitCameraMode(1),
      _a.Mth &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
          _a.Mth,
        ),
        (_a.Mth = void 0)),
      _a.LinkExplosionEnd(),
      RenderUtil_1.RenderUtil.EndPSOSyncMode();
  }),
  (BattleLinkController.JAl = (e) => {
    ModelManager_1.ModelManager.BattleLinkModel?.HandleLinkingStateNotify(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          67,
          "[BattleLink]接收Link状态改变通知",
          ["status", e.sT_],
          ["msgId", e._Vn],
        );
  }),
  (BattleLinkController.ZAl = (e) => {
    ModelManager_1.ModelManager.BattleLinkModel?.HandleLinkExitNotify(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          67,
          "[BattleLink]接收Link退出通知",
          ["status", e.sT_],
          ["reason", e.x9n],
        ),
      AudioSystem_1.AudioSystem.SetState(
        "game_rogue_link_state",
        "not_in_link",
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 42, "[BattleLink]Link音乐切出");
  }),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("No1", !1)],
    BattleLinkController,
    "OnNewLinkStateNotify",
    null,
  ),
  (exports.BattleLinkController = BattleLinkController);
//# sourceMappingURL=BattleLinkController.js.map
