"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleLinkModel = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
  SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine"),
  BattleLinkController_1 = require("./BattleLinkController"),
  BattleLinkDefine_1 = require("./BattleLinkDefine"),
  THREE_ROLE = 3,
  TWO_ROLE = 2,
  ACTIVITY_ID = 102600001,
  LINK_COMMON_PARAM_ROW = 1,
  DEFAULT_COMP_NAME = "WeaponCase";
class BattleLinkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.swa = void 0),
      (this.hwa = void 0),
      (this.gml = void 0),
      (this.lwa = void 0),
      (this._wa = void 0),
      (this.Ush = void 0),
      (this.F$ = void 0),
      (this.Ksl = void 0),
      (this.Ual = void 0),
      (this.Dal = void 0),
      (this.NUe = -1),
      (this.Oll = -1),
      (this.Wke = void 0),
      (this.V1l = !1),
      (this.H1l = !1),
      (this.JKa = void 0),
      (this.kJa = void 0),
      (this.KZa = void 0),
      (this.uul = !1),
      (this.Yul = void 0),
      (this.zul = void 0),
      (this.$i1 = 0),
      (this.ln1 = void 0),
      (this.NewLinkGmTest = !1),
      (this.ZKa = 0),
      (this.pa1 = 0);
  }
  OnInit() {
    return !0;
  }
  OnLeaveLevel() {
    return (
      this.swa &&
        ActorSystem_1.ActorSystem.Put("BattleLinkModel.OnLeaveLevel", this.swa),
      (this.swa = void 0),
      (this.hwa = void 0),
      (this.gml = void 0),
      this.lwa?.clear(),
      this._wa?.clear(),
      this.Ush?.clear(),
      this.F$?.clear(),
      this.Ksl?.clear(),
      this.Ual?.clear(),
      this.Dal?.clear(),
      (this.NUe = -1),
      (this.Oll = -1),
      (this.V1l = !1),
      (this.H1l = !1),
      (this.zul = void 0),
      (this.uul = !1),
      (this.JKa = void 0),
      (this.ZKa = 0),
      !(this.NewLinkGmTest = !1)
    );
  }
  Jul() {
    if (this.CheckInNewBattleLink()) return this.Wke;
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (!this.Yul) {
      var e =
        ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(
          ACTIVITY_ID,
        );
      if (!e) return;
      var i,
        s,
        e = e.PreloadRoleIds;
      this.Yul = new Map();
      for ([i, s] of e.entries()) {
        var r = s.split(";").map((t) => parseInt(t));
        this.Yul.set(i, r);
      }
    }
    let o = this.Yul.get(t);
    return (o = o || this.Wke);
  }
  SetRoleIdList(e) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]设置角色列表", [
          "roleIdList",
          e,
        ]),
      this.CheckInNewBattleLink())
    ) {
      var i = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
      if (i) {
        this.ln1?.clear();
        for (const o of i) {
          var t,
            s = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
              o.GetConfigId,
            );
          e.includes(s) &&
            (t = o.EntityHandle?.Entity?.GetComponent(0)?.GetModelId()) &&
            (void 0 === this.ln1 && (this.ln1 = new Map()), this.ln1.set(s, t));
        }
        var r = this.GetLinkConfig();
        1 === i.length &&
          r &&
          r.IsEnableOneRoleBurst &&
          ((i = r.OneRoleBurstTeammateId),
          (r =
            ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(
              i,
            ))) &&
          ((r = r.RoleId), this.ln1?.set(r, i), e.push(r));
      }
    }
    if (
      ((this.V1l = !1),
      (this.H1l = !1),
      e.length === THREE_ROLE
        ? (this.V1l = !0)
        : e.length === TWO_ROLE && (this.H1l = !0),
      this.V1l || this.H1l)
    ) {
      let t = e[0];
      (i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem),
        (r =
          (i &&
            (t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
              i.GetConfigId,
            )),
          [...e]));
      r.splice(e.indexOf(t), 1),
        r.splice(1, 0, t),
        (this.Wke = r),
        (this.Oll = t);
    }
  }
  PreloadRes() {
    const t = new CustomPromise_1.CustomPromise();
    if (this.zul && this.Wke && this.zul.length >= this.Wke.length) {
      let e = !0;
      var i = this.Wke.length;
      for (let t = 0; t < i; t++)
        if (!this.zul.includes(this.Wke[t])) {
          e = !1;
          break;
        }
      if (e) {
        const t = new CustomPromise_1.CustomPromise();
        return t.SetResult(!0), t;
      }
    }
    return (
      (this.zul = this.Jul()),
      this.zul || (this.zul = []),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]开始预加载资源", [
          "roleIdList",
          this.zul,
        ]),
      this.Pl1()
        .then(() => {
          this.$sl(this.zul)
            .then(() => {
              this.xl1(this.zul)
                .then(() => {
                  this.$Za(), this.ResetMainBp(), t.SetResult(!0);
                })
                .catch(() => {
                  t.SetResult(!1);
                });
            })
            .catch(() => {
              t.SetResult(!1);
            });
        })
        .catch(() => {
          t.SetResult(!1);
        }),
      t
    );
  }
  PreloadTeamRoleRes() {
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(
      !1,
      !0,
    );
    return t && this.SetRoleIdList(t), this.PreloadRes();
  }
  async Pl1() {
    var t = [];
    t.push(this.cwa()),
      this.CheckInNewBattleLink()
        ? (t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH)),
          t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_NEW_PATH)))
        : (t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_PATH)),
          t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_PATH))),
      await Promise.all(t);
  }
  async $sl(t) {
    const s = [];
    t.forEach((t, e) => {
      var i = this.GetRoleConfig(t);
      i
        ? s.push(this.Wll(t, i.CharacterDataAsset))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", [
            "roleid",
            t,
          ]);
    }),
      await Promise.all(s);
  }
  async xl1(t) {
    const h = [],
      l = this.CheckInNewBattleLink();
    t.forEach((e, t) => {
      var i,
        s = this.Ksl?.get(e),
        r =
          (s
            ? (s.CharacterActorClass &&
                ((i = UE.KismetSystemLibrary.GetPathName(
                  s.CharacterActorClass,
                )),
                h.push(this.dwa(e, i))),
              s.Cos_Pose_AnimSequence &&
                ((i = UE.KismetSystemLibrary.GetPathName(
                  s.Cos_Pose_AnimSequence,
                )),
                h.push(this.Ral(e, i))))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 67, "[BattleLink]找不到角色对应的DA", [
                "roleid",
                e,
              ]),
          this.GetRoleConfig(e));
      if (r)
        if (
          (1 === r.NeedLoadMesh &&
            (s =
              ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(
                e,
              )?.MeshId) &&
            (i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
              0,
              s.toString(),
            )?.网格体?.ToAssetPathName()) &&
            i.length &&
            "None" !== i &&
            h.push(this.xsh(e, i)),
          l)
        ) {
          var o = r.WeaponMeshList.length,
            a = r.WeaponAnimList.length,
            n = r.CompNameList.length;
          for (let t = 0; t < o; t++)
            h.push(
              this.xsh(
                e,
                r.WeaponMeshList[t],
                !0,
                t < n ? r.CompNameList[t] : DEFAULT_COMP_NAME,
              ),
            );
          for (let t = 0; t < a; t++)
            h.push(
              this.Ral(
                e,
                r.WeaponAnimList[t],
                !0,
                t < n ? r.CompNameList[t] : DEFAULT_COMP_NAME,
              ),
            );
        } else
          1105 === e &&
            (h.push(this.xsh(e, BattleLinkDefine_1.ZHEZHI_WEAPON_MESH, !0)),
            h.push(this.Ral(e, BattleLinkDefine_1.ZHEZHI_WEAPON_ANIM, !0)));
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", [
            "roleid",
            e,
          ]);
    }),
      await Promise.all(h);
  }
  async cwa() {
    const e = new CustomPromise_1.CustomPromise();
    var t = this.CheckInNewBattleLink()
      ? BattleLinkDefine_1.BATTLE_LINK_BP_NEW_PATH
      : BattleLinkDefine_1.BATTLE_LINK_BP_PATH;
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.Class,
        (t) => {
          t
            ? (this.swa &&
                ActorSystem_1.ActorSystem.Put(
                  "BattleLinkModel.LoadMainBp",
                  this.swa,
                ),
              (this.swa = ActorSystem_1.ActorSystem.Get(
                t,
                MathUtils_1.MathUtils.DefaultTransformDouble,
              )))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                67,
                "[BattleLink]加载BP_SplitScreen失败",
              ),
            e.SetResult();
        },
        100,
      ),
      e.Promise
    );
  }
  async Wll(e, t) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.BP_SplitScreenCharacterData_C,
        (t) => {
          t
            ? (this.Ksl || (this.Ksl = new Map()),
              this.Ksl.set(e, t),
              i.SetResult())
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色DA失败");
        },
        100,
      ),
      i.Promise
    );
  }
  async Ral(i, t, s = !1, r = DEFAULT_COMP_NAME) {
    const o = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.AnimSequence,
        (e) => {
          if (e)
            if (s) {
              this.Ual || (this.Ual = new Map());
              let t = this.Ual.get(i);
              t || ((t = new Map()), this.Ual.set(i, t)), t.set(r, e);
            } else this._wa || (this._wa = new Map()), this._wa.set(i, e);
          else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                67,
                "[BattleLink]加载anim失败",
                ["roleId", i],
                ["path", t],
              );
          o.SetResult();
        },
        100,
      ),
      o.Promise
    );
  }
  async dwa(e, t) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.Class,
        (t) => {
          t
            ? (this.lwa || (this.lwa = new Map()), this.lwa.set(e, t))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色SeqBp失败"),
            i.SetResult();
        },
        100,
      ),
      i.Promise
    );
  }
  async mwa(e) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LevelSequence,
        (t) => {
          t
            ? e === BattleLinkDefine_1.THREE_ROLE_SEQ_PATH ||
              e === BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH
              ? (this.hwa = t)
              : (this.gml = t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 67, "[BattleLink]加载Seq失败", [
                "path",
                e,
              ]),
            i.SetResult();
        },
        100,
      ),
      i.Promise
    );
  }
  async xsh(i, t, s = !1, r = DEFAULT_COMP_NAME) {
    const o = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.SkeletalMesh,
        (e) => {
          if (e)
            if (s) {
              this.Dal || (this.Dal = new Map());
              let t = this.Dal.get(i);
              t || ((t = new Map()), this.Dal.set(i, t)), t.set(r, e);
            } else this.Ush || (this.Ush = new Map()), this.Ush.set(i, e);
          else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                67,
                "[BattleLink]加载Mesh失败",
                ["roleId", i],
                ["path", t],
              );
          o.SetResult();
        },
        100,
      ),
      o.Promise
    );
  }
  CheckSplitScreenRes() {
    return this.swa
      ? this.V1l || this.H1l
        ? this.V1l && !this.hwa
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Battle",
                67,
                "[BattleLink]播放分屏时资源没准备好: ThreeRoleSeq",
              ),
            !1)
          : !(
              this.H1l &&
              !this.gml &&
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Battle",
                  67,
                  "[BattleLink]播放分屏时资源没准备好: TwoRoleSeq",
                ),
              1)
            )
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              67,
              "[BattleLink]非三人或双人队伍, 播放分屏检查seq失败",
            ),
          !1)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            67,
            "[BattleLink]播放分屏时资源没准备好: MainBp",
          ),
        !1);
  }
  $Za() {
    this.swa &&
      (this.swa.End(),
      (this.NUe = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      this.swa.D_K2_SetActorLocation(this.GetBpLocation(), !1, void 0, !1),
      this.swa.SetActorHiddenInGame(!0));
  }
  ResetMainBp() {
    var t;
    this.swa &&
      (this.swa.Reset(),
      this.V1l
        ? ((this.swa.E_LinkPos_1 = 0),
          (this.swa.E_LinkPos_2 = 0.5),
          (this.swa.E_LinkPos_3 = 1))
        : ((this.swa.E_LinkPos_1 = 1), (this.swa.E_LinkPos_2 = 0)),
      (t = [this.swa.CharacterActor_1, this.swa.CharacterActor_2]),
      this.V1l && t.push(this.swa.CharacterActor_3),
      t.forEach((t, e) => {
        if (!(e >= this.Wke.length)) {
          var i = this.Wke[e],
            s = this.lwa?.get(i),
            s =
              (t?.SetChildActorClass(s),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  67,
                  "[BattleLink]分屏Bp设置ChildActor",
                  ["roleId", i],
                  ["class", s],
                ),
              t?.ChildActor?.GetComponentByClass(
                UE.SkeletalMeshComponent.StaticClass(),
              ));
          if (s) {
            var r = this.Ush?.get(i),
              s = (r && s.SetSkeletalMesh(r), this.Dal?.get(i));
            if (s)
              for (var [o, a] of s.entries()) {
                let e = void 0;
                var n = t?.ChildActor?.K2_GetComponentsByClass(
                  UE.MeshComponent.StaticClass(),
                );
                if (n)
                  for (let t = 0; t < n.Num(); t++) {
                    var h = n.Get(t);
                    if (
                      h.IsA(UE.SkeletalMeshComponent.StaticClass()) &&
                      h.GetName() === o
                    ) {
                      e = h;
                      break;
                    }
                  }
                e &&
                  (e.SetSkeletalMesh(a), e.SetVisibility(!0), e.SetActive(!0));
              }
          }
          r = this.Ksl?.get(i);
          r && this.Xsl(e, r);
        }
      }));
  }
  Xsl(t, e) {
    if (this.swa) {
      var i,
        s = this.swa;
      switch (t) {
        case 0:
          (s.PointLight1_Location = e.PointLight_Location),
            (s.PointLight1_ToonLightColor = e.PointLight_Color),
            (s.EyeLightSimulation_Color1 = e.EyeLightSimulation_Color),
            s.IsA(UE.BP_SplitScreen_New_C.StaticClass()) &&
              (((i = s).LightYaw1 = e.LightYaw),
              (i.FaceLightYaw1 = e.FaceLightYaw));
          break;
        case 1:
          (s.PointLight2_Location = e.PointLight_Location),
            (s.PointLight2_ToonLightColor = e.PointLight_Color),
            (s.EyeLightSimulation_Color2 = e.EyeLightSimulation_Color),
            s.IsA(UE.BP_SplitScreen_New_C.StaticClass()) &&
              (((i = s).LightYaw2 = e.LightYaw),
              (i.FaceLightYaw2 = e.FaceLightYaw));
          break;
        case 2:
          (s.PointLight3_Location = e.PointLight_Location),
            (s.PointLight3_ToonLightColor = e.PointLight_Color),
            (s.EyeLightSimulation_Color3 = e.EyeLightSimulation_Color),
            s.IsA(UE.BP_SplitScreen_New_C.StaticClass()) &&
              (((i = s).LightYaw3 = e.LightYaw),
              (i.FaceLightYaw3 = e.FaceLightYaw));
      }
    }
  }
  XZa(e, i, s) {
    var r = i.ChildActor;
    if (r) {
      i = r.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (i) {
        let t = void 0;
        if (
          ((t =
            (t = i.GetLinkedAnimGraphInstanceByTag(
              CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
            )) || i.GetAnimInstance()),
          s)
        ) {
          (i = this._wa?.get(e)),
            (s = t?.PlaySlotAnimationAsDynamicMontage(
              i,
              SequenceDefine_1.ABP_Seq_Slot_Name,
              0,
              0,
              1,
              1,
            ));
          s &&
            (t?.Montage_Pause(s),
            this.F$ || (this.F$ = new Map()),
            this.F$.set(e, s));
        } else {
          (i = this.F$?.get(e)),
            (s =
              (i && (t?.Montage_Resume(i), this.F$?.delete(e)),
              this.Ual?.get(e)));
          if (s)
            for (var [o, a] of s.entries()) {
              let e = void 0;
              var n = r.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
              if (n)
                for (let t = 0; t < n.Num(); t++) {
                  var h = n.Get(t);
                  if (
                    h.IsA(UE.SkeletalMeshComponent.StaticClass()) &&
                    h.GetName() === o
                  ) {
                    e = h;
                    break;
                  }
                }
              e && e.PlayAnimation(a, !1);
            }
        }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            67,
            "[BattleLink]找不到ChildActor的骨骼网格体",
            ["roleId", e],
          );
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Bp的ChildActor为空", [
          "roleId",
          e,
        ]);
  }
  PlayRoleAnim(t = !1) {
    this.swa &&
      (this.XZa(this.Wke[0], this.swa.CharacterActor_1, t),
      this.XZa(this.Wke[1], this.swa.CharacterActor_2, t),
      this.V1l) &&
      this.XZa(this.Wke[2], this.swa.CharacterActor_3, t);
  }
  PlayRoleLinkAudio() {
    var e =
      ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(
        ACTIVITY_ID,
      );
    if (ConfigManager_1.ConfigManager.DreamLinkConfig && e) {
      var i = e.FirstWhiteCatDungeonId;
      if (this.V1l && this.NUe === i) {
        let t = !0;
        for (const s of this.Wke) t = t && e.PlotRoleLinkTeam.includes(s);
        if (t)
          return (
            (i = e.PlotRoleLinkAudio),
            AudioSystem_1.AudioSystem.PostEvent(i),
            void (
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Audio", 42, "[BattleLink]播放剧情Link语音.", [
                "Event",
                i,
              ])
            )
          );
      }
      this._ml();
    }
  }
  _ml() {
    var t;
    this.Oll < 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Audio",
          42,
          "[BattleLink]播放Link语音时获取当前角色失败",
          ["RoleId", this.Oll],
        )
      : (t = this.GetRoleConfig(this.Oll))
        ? ((t = t.RoleLinkAudio),
          AudioSystem_1.AudioSystem.PostEvent(t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 42, "[BattleLink]播放主控角色Link语音", [
              "Event",
              t,
            ]))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            42,
            "[BattleLink]播放Link语音时获取当前角色配置失败",
            ["RoleId", this.Oll],
          );
  }
  InitBeforeStart() {
    var t;
    this.swa &&
      this.swa.IsA(UE.BP_SplitScreen_New_C.StaticClass()) &&
      ((t = this.swa),
      this.V1l
        ? ((t.IsThree = !0), (t.Width = 38))
        : ((t.IsThree = !1), (t.Width = 28)));
  }
  GetSplitScreenMainBp() {
    return this.swa;
  }
  GetSplitScreenSeq() {
    return this.V1l ? this.hwa : this.H1l ? this.gml : void 0;
  }
  GetLinkDuration() {
    return (
      this.kJa ||
        (this.kJa = CommonParamById_1.configCommonParamById.GetIntConfig(
          "LinkPrepareDuration",
        )),
      this.kJa
    );
  }
  GetBpLocation() {
    return this.KZa || (this.KZa = new UE.VectorDouble(0, 0, -3e3)), this.KZa;
  }
  CheckInBattleLink() {
    return this.CheckInNewBattleLink() || this.CheckInDreamLink();
  }
  CheckInNewBattleLink() {
    var t, e;
    return (
      !!this.NewLinkGmTest ||
      !(
        !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
        ((t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
        (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)),
        (e = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(
          LINK_COMMON_PARAM_ROW,
        )),
        !t?.InstSubType) ||
        !e?.InstSubTypeList.includes(t.InstSubType)
      )
    );
  }
  CheckInDreamLink() {
    var t, e;
    return (
      !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      23 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)
          ?.InstSubType ||
        !(
          !(e =
            CommonParamById_1.configCommonParamById.GetIntArrayConfig(
              "LinkInstanceIds",
            )) || !e.includes(t)
        ))
    );
  }
  IsNewLinkGmTest() {
    return this.NewLinkGmTest;
  }
  SetNewLinkGmTest(t) {
    this.NewLinkGmTest = t;
  }
  GetLinkStatus() {
    return this.ZKa;
  }
  CanUseLinkSkill(t = void 0) {
    if (2 !== this.ZKa && 3 !== this.ZKa) return !1;
    if (this.uul) return !1;
    let e = t;
    return !(
      !(e =
        e ||
        ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity
          ?.Id) || this.HasLinkEntityId(e)
    );
  }
  ResetLinkSkillStatus() {
    this.SetLinkSkillInCd(!1), (this.JKa = void 0);
  }
  UpdateLinkStatus(t, e = void 0) {
    (this.ZKa = t),
      this.SetLinkSkillInCd(!1),
      0 === t
        ? ((this.JKa = void 0),
          ControllerHolder_1.ControllerHolder.BattleLinkController.StopLink(),
          ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(
            void 0,
          ))
        : 2 === t
          ? (this.JKa = void 0)
          : 3 === t
            ? ((e = MathUtils_1.MathUtils.LongToNumber(e || Time_1.Time.Now)),
              ControllerHolder_1.ControllerHolder.BattleLinkController.StartLink(
                e,
              ))
            : 4 === t &&
              ControllerHolder_1.ControllerHolder.BattleLinkController.StartLinkExplosion(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBattleLinkStatusChanged,
        t,
      );
  }
  HandleLinkingStateNotify(t) {
    ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(
      t._Vn,
    ),
      0 === t.sT_
        ? this.UpdateLinkStatus(2)
        : this.V1l || this.H1l
          ? (this.V1l && t.sT_ < 3) || (this.H1l && t.sT_ < 2)
            ? this.UpdateLinkStatus(3, t.J8n)
            : this.UpdateLinkStatus(4)
          : this.UpdateLinkStatus(0);
  }
  HandleLinkExitNotify(t) {
    this.UpdateLinkStatus(0);
  }
  AddLinkEntityId(t) {
    this.JKa ? this.JKa.includes(t) || this.JKa.push(t) : (this.JKa = [t]),
      this.SetLinkSkillInCd(!0);
  }
  HasLinkEntityId(t) {
    return !!this.JKa?.includes(t);
  }
  SetLinkSkillInCd(t) {
    this.uul !== t &&
      ((this.uul = t),
      BattleLinkController_1.BattleLinkController.SetPlayerUltraSkillEnable(
        !t,
      ));
  }
  HandleNewLinkStateNotify(t, e) {
    (this.pa1 = Number(t.lMs)), (this.$i1 = t.jo1);
  }
  GetNewLinkStatus() {
    return this.pa1;
  }
  GetLinkConfig() {
    return ConfigManager_1.ConfigManager.BattleLinkConfig?.GetLinkDataConfig(
      this.$i1,
    );
  }
  GetRoleConfig(t) {
    let e = void 0;
    var i;
    return (e = this.CheckInNewBattleLink()
      ? ((i = this.ln1?.get(t) ?? 0),
        ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(i))
      : ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfig(t));
  }
}
exports.BattleLinkModel = BattleLinkModel;
//# sourceMappingURL=BattleLinkModel.js.map
