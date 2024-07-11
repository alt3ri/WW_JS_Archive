"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, i, r) : n(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemCaptureComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  SkeletalMeshEffectContext_1 = require("../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
  LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  CommonCaptureActionId = 220002,
  SpecialDropEntityConfigId = 31e7,
  TempRotator = new Rotator_1.Rotator(0, -90, 0),
  CHECK_WATER_OFFSET_Z = 1e4,
  CHECK_GROUND_OFFSET_Z = 1e4,
  CHECK_WATER_PROFILE_KEY = "SceneItemCaptureComponent_CheckWaterHit",
  CHECK_GROUND_PROFILE_KEY = "SceneItemCaptureComponent_CheckGroundHit",
  AbsorbedStateEffectPath =
    "/Game/Aki/Effect/MaterialController/Absorbed/DA_Fx_Group_Huanxiangshoufu.DA_Fx_Group_Huanxiangshoufu",
  AbsorbedStartEffectPath =
    "/Game/Aki/Effect/EffectGroup/Common/Fight/DA_Fx_Group_Shoufu_Start.DA_Fx_Group_Shoufu_Start",
  ABSORB_PAWN_NAME_KEY = "Absorb";
let SceneItemCaptureComponent = class SceneItemCaptureComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.jdn = 3e3),
      (this.Wdn = 500),
      (this.opi = 0),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.$6e = void 0),
      (this.Y6e = 0),
      (this.Kdn = ""),
      (this.Qdn = 0),
      (this.SJi = void 0),
      (this.Iso = void 0),
      (this.yso = void 0),
      (this.Xdn = Vector_1.Vector.Create()),
      (this.$dn = Vector_1.Vector.Create()),
      (this.n3o = void 0),
      (this.l9s = !1),
      (this.Ydn = () => {
        this.$6e.RemoveMaterialControllerDataGroupWithEnding(this.Y6e);
      }),
      (this.Jdn = () => {
        this.Entity.Disable(
          "[SceneItemCaptureComponent.OnCaptureFinished] 捕获隐藏实体",
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
      });
  }
  OnActivate() {
    var e;
    (this.n3o = this.Entity.GetComponent(178)),
      this.n3o &&
        ((this.SJi = this.n3o.GetInteractController()), this.SJi) &&
        (e = this.Entity.GetComponent(102)) &&
        (e.SetPawnNameKey(ABSORB_PAWN_NAME_KEY),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "开始生成抓取幻象Item", [
            "EntityId",
            this.Entity.Id,
          ]),
        this.qmn());
  }
  OnDisable(e) {
    this.l9s ||
      (EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.opi,
        )?.SetActorHiddenInGame(!0));
  }
  OnEnable() {
    this.l9s ||
      (EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.opi,
        )?.SetActorHiddenInGame(!1));
  }
  OnTick(e) {
    this.n3o?.ForceUpdate();
  }
  koe() {
    (this.yso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.yso.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.yso.bIsSingle = !0),
      (this.yso.bIgnoreSelf = !0),
      this.yso.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      (this.Iso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Iso.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Iso.bIsSingle = !0),
      (this.Iso.bIgnoreSelf = !0),
      this.Iso.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  qmn() {
    let t = 0;
    const i = this.Entity.GetComponent(182);
    let e = 100;
    var o = i.CreatureData.GetPbEntityInitData();
    if (
      (0, IComponent_1.getComponent)(o.ComponentsData, "VisionItemComponent")
    ) {
      o = i.CreatureData.ComponentDataMap.get("Jvs")?.Jvs;
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到monsterCaptureComponent数据")
        );
      var n = o.tMs,
        o =
          ((this.Qdn = o.rkn),
          0 < o.iMs &&
            ((e =
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
                o.iMs,
              ).InteractionRadius),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Battle",
              4,
              "服务器下发掉落幻象设置交互范围",
              ["MonsterId", o.iMs],
              ["半径", e],
            ),
          ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(n));
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "模板ID不存在", ["TemplateId", n])
        );
      n = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
        o.BlueprintType,
      );
      if (!n)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到EntityModel", [
            "BlueprintType",
            o.BlueprintType,
          ])
        );
      t = n.ModelId;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "无法找到EComponent.VisionItemComponent");
    this.Qdn &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.Qdn,
        this.Entity.Id,
      );
    var s,
      o = new LevelGameplayActionsDefine_1.ActionSendGameplayEvent(),
      n =
        ((o.Tag =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(447475264)),
        (o.Both = !0),
        new LevelGameplayActionsDefine_1.ActionCaptureRequest()),
      o =
        ((n.SuccessEvent = o),
        new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
      r =
        ((o.Type = 0),
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          "行为状态.位置状态.空中",
        ));
    r &&
      (((s =
        new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId =
        r),
      (s.IsContain = !1),
      o.Conditions.push(s)),
      this.SJi.AddClientInteractOption(
        n,
        o,
        "Direct",
        e,
        void 0,
        0,
        Vector_1.Vector.Create(0, 0, 100 < e ? 100 : e),
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "最终掉落幻象设置交互范围", ["半径", e]),
      this.D0r(),
      MathUtils_1.MathUtils.ComposeRotator(
        TempRotator,
        i.ActorRotationProxy,
        this.Gue,
      ),
      i.SetActorRotation(this.Gue.ToUeRotator(), this.constructor.name, !1);
    const a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
      0,
      t.toString(),
    );
    a
      ? (i.InitSkeletalMeshComponent(),
        (this.Kdn = a.蓝图.ToAssetPathName()),
        (this.Kdn = this.Kdn.substr(0, this.Kdn.lastIndexOf("/"))),
        (this.Kdn = this.Kdn.concat("/CommonAnim/Death_Shoufu.Death_Shoufu")),
        this.$6e ||
          (this.$6e = i.Owner.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
        this.$6e
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              a.网格体.ToAssetPathName(),
              UE.SkeletalMesh,
              (e) => {
                this.zdn(e, i, t, a);
              },
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "渲染组件添加失败"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneItem", 37, "模型设置为空", ["modelId", t]);
  }
  D0r() {
    (this.Iso && this.yso) || this.koe();
    var e = this.Entity.GetComponent(182),
      t = e.ActorLocation,
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, t),
        this.Iso.SetEndLocation(t.X, t.Y, t.Z - CHECK_WATER_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Iso,
          CHECK_WATER_PROFILE_KEY,
        )),
      t =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.yso, t),
        this.yso.SetEndLocation(t.X, t.Y, t.Z - CHECK_GROUND_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.yso,
          CHECK_GROUND_PROFILE_KEY,
        ));
    i && t
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Iso.HitResult,
          0,
          this.$dn,
        ),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.yso.HitResult,
          0,
          this.Xdn,
        ),
        e.SetActorLocation(
          (this.Xdn.Z > this.$dn.Z ? this.Xdn : this.$dn).ToUeVector(),
          "SceneItemCaptureFixBornLocation",
          !1,
        ))
      : i
        ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Iso.HitResult,
            0,
            this.$dn,
          ),
          e.SetActorLocation(
            this.$dn.ToUeVector(),
            "SceneItemCaptureFixBornLocation",
            !1,
          ))
        : t &&
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.yso.HitResult,
            0,
            this.Xdn,
          ),
          e.SetActorLocation(
            this.Xdn.ToUeVector(),
            "SceneItemCaptureFixBornLocation",
            !1,
          )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "掉落幻象修正坐标", ["Pos", this.Xdn]);
  }
  zdn(e, i, t, o) {
    if (this.Entity.Valid) {
      if (e instanceof UE.SkeletalMesh) {
        if (!i?.Valid) return;
        if (!this.$6e?.IsValid()) return;
        i.SkeletalMesh.SetSkeletalMesh(e),
          this.$6e.Init(2),
          this.$6e.AddComponentByCase(0, i.SkeletalMesh),
          i.SkeletalMesh.SetHiddenInGame(!0);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "模型加载失败！", ["ModelConfigId", t]);
      e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(void 0);
      (e.SkeletalMeshComp = i.SkeletalMesh),
        (this.opi = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          i.Owner.GetTransform(),
          AbsorbedStartEffectPath,
          "[SceneItemCapture.OnLoadAnimFinish]",
          e,
        )),
        0 < o.子网格体.Num()
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              o.子网格体.Get(0).ToAssetPathName(),
              UE.SkeletalMesh,
              (e) => {
                var t;
                e instanceof UE.SkeletalMesh
                  ? ((t = i.Owner.AddComponentByClass(
                      UE.SkeletalMeshComponent.StaticClass(),
                      !1,
                      MathUtils_1.MathUtils.DefaultTransform,
                      !1,
                    )).SetSkeletalMesh(e),
                    this.$6e.AddComponentByCase(7, t),
                    t.SetMasterPoseComponent(i.SkeletalMesh))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "子模型加载失败！", [
                      "子网格体",
                      o.子网格体,
                    ]),
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    AbsorbedStateEffectPath,
                    UE.PD_CharacterControllerDataGroup_C,
                    (e) => {
                      this.Zdn(e);
                    },
                  );
              },
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              AbsorbedStateEffectPath,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                this.Zdn(e);
              },
            );
    }
  }
  Zdn(e) {
    this.Entity.Valid &&
      (e
        ? ((this.Y6e = this.$6e.AddMaterialControllerDataGroup(e)),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Kdn,
            UE.AnimationAsset,
            (e) => {
              this.eCn(e);
            },
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到收服材质效果", [
            "AbsorbedStateEffectPath",
            AbsorbedStateEffectPath,
          ]));
  }
  eCn(e) {
    var t;
    this.Entity.Valid &&
      (e
        ? ((t = this.Entity.GetComponent(182).SkeletalMesh).PlayAnimation(
            e,
            !1,
          ),
          t.SetPosition(0),
          t.SetPlayRate(0),
          t.SetHiddenInGame(!1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", [
              "EntityId",
              this.Entity.Id,
            ]))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到收服动画Death_Shoufu", [
            "path",
            this.Kdn,
          ]));
  }
  ExecuteCapture(e) {
    this.l9s = !0;
    var t = this.Entity.GetComponent(182).ActorLocationProxy,
      i = Global_1.Global.BaseCharacter.CharacterActorComponent,
      o = Vector_1.Vector.Create(t),
      n =
        (o.SubtractionEqual(i.ActorLocationProxy),
        (o.Z = 0),
        o.Normalize(),
        new UE.Rotator()),
      o =
        (o.ToOrientationRotator(n),
        i.Entity.GetComponent(36)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        i.SetActorRotation(n, this.constructor.name, !1),
        this.Qdn !== SpecialDropEntityConfigId &&
          ((o = i.Entity.GetComponent(33)) &&
            o.BeginSkill(CommonCaptureActionId, {
              Target: this.Entity,
              Context: "SceneItemCaptureComponent.ExecuteCapture",
            }),
          (n = i.Entity.Id),
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            n,
            "ShoufuLocation",
            t.X,
            t.Y,
            t.Z,
          )),
        this.Entity.GetComponent(103));
    o && o.CloseInteract("触发收复后关闭交互"),
      this.Qdn &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
          this.Qdn,
        ),
      TimerSystem_1.TimerSystem.Delay(this.Ydn, this.Wdn),
      TimerSystem_1.TimerSystem.Delay(this.Jdn, this.jdn),
      EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.opi,
          "开始收服，关闭特效",
          !1,
        );
  }
};
(SceneItemCaptureComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(130)],
  SceneItemCaptureComponent,
)),
  (exports.SceneItemCaptureComponent = SceneItemCaptureComponent);
//# sourceMappingURL=SceneItemCaptureComponent.js.map
