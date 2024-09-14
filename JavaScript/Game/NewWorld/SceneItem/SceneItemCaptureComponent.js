"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (s = (r < 3 ? n(s) : 3 < r ? n(t, i, s) : n(t, i)) || s);
    return 3 < r && s && Object.defineProperty(t, i, s), s;
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
      (this.ydn = 3e3),
      (this.Idn = 500),
      (this.rvi = 0),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.l9e = void 0),
      (this._9e = 0),
      (this.Tdn = ""),
      (this.Ldn = 0),
      (this.vzi = void 0),
      (this.Mao = void 0),
      (this.vao = void 0),
      (this.Ddn = Vector_1.Vector.Create()),
      (this.Rdn = Vector_1.Vector.Create()),
      (this.i4o = void 0),
      (this.Ora = !1),
      (this.Udn = () => {
        this.l9e.RemoveMaterialControllerDataGroupWithEnding(this._9e);
      }),
      (this.Adn = () => {
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
    (this.i4o = this.Entity.GetComponent(182)),
      this.i4o &&
        ((this.vzi = this.i4o.GetInteractController()), this.vzi) &&
        (e = this.Entity.GetComponent(105)) &&
        (e.SetPawnNameKey(ABSORB_PAWN_NAME_KEY),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "开始生成抓取幻象Item", [
            "EntityId",
            this.Entity.Id,
          ]),
        this.Cmn());
  }
  OnDisable(e) {
    this.Ora || EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, !0);
  }
  OnEnable() {
    this.Ora || EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, !1);
  }
  OnTick(e) {
    this.i4o?.ForceUpdate();
  }
  koe() {
    (this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.vao.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.vao.bIsSingle = !0),
      (this.vao.bIgnoreSelf = !0),
      this.vao.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      (this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Mao.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Mao.bIsSingle = !0),
      (this.Mao.bIgnoreSelf = !0),
      this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  Cmn() {
    let t = 0;
    const i = this.Entity.GetComponent(187);
    let e = 100;
    var o = i.CreatureData.GetPbEntityInitData();
    if (
      (0, IComponent_1.getComponent)(o.ComponentsData, "VisionItemComponent")
    ) {
      o = i.CreatureData.ComponentDataMap.get("Sys")?.Sys;
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到monsterCaptureComponent数据")
        );
      var n = o.IIs,
        o =
          ((this.Ldn = o.F4n),
          0 < o.TIs &&
            ((e =
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
                o.TIs,
              ).InteractionRadius),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Battle",
              4,
              "服务器下发掉落幻象设置交互范围",
              ["MonsterId", o.TIs],
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
    this.Ldn &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.Ldn,
        this.Entity.Id,
      );
    var r,
      o = new LevelGameplayActionsDefine_1.ActionSendGameplayEvent(),
      n =
        ((o.Tag =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(447475264)),
        (o.Both = !0),
        new LevelGameplayActionsDefine_1.ActionCaptureRequest()),
      o =
        ((n.SuccessEvent = o),
        new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
      s =
        ((o.Type = 0),
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          "行为状态.位置状态.空中",
        ));
    s &&
      (((r =
        new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId =
        s),
      (r.IsContain = !1),
      o.Conditions.push(r)),
      this.vzi.AddClientInteractOption(
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
      this.Ifr(),
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
        (this.Tdn = a.蓝图.ToAssetPathName()),
        (this.Tdn = this.Tdn.substr(0, this.Tdn.lastIndexOf("/"))),
        (this.Tdn = this.Tdn.concat("/CommonAnim/Death_Shoufu.Death_Shoufu")),
        this.l9e ||
          (this.l9e = i.Owner.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
        this.l9e
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              a.网格体.ToAssetPathName(),
              UE.SkeletalMesh,
              (e) => {
                this.Pdn(e, i, t, a);
              },
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "渲染组件添加失败"))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneItem", 37, "模型设置为空", ["modelId", t]);
  }
  Ifr() {
    (this.Mao && this.vao) || this.koe();
    var e = this.Entity.GetComponent(187),
      t = e.ActorLocation,
      i =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t),
        this.Mao.SetEndLocation(t.X, t.Y, t.Z - CHECK_WATER_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Mao,
          CHECK_WATER_PROFILE_KEY,
        )),
      t =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, t),
        this.vao.SetEndLocation(t.X, t.Y, t.Z - CHECK_GROUND_OFFSET_Z),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.vao,
          CHECK_GROUND_PROFILE_KEY,
        ));
    i && t
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Mao.HitResult,
          0,
          this.Rdn,
        ),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.vao.HitResult,
          0,
          this.Ddn,
        ),
        e.SetActorLocation(
          (this.Ddn.Z > this.Rdn.Z ? this.Ddn : this.Rdn).ToUeVector(),
          "SceneItemCaptureFixBornLocation",
          !1,
        ))
      : i
        ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.Mao.HitResult,
            0,
            this.Rdn,
          ),
          e.SetActorLocation(
            this.Rdn.ToUeVector(),
            "SceneItemCaptureFixBornLocation",
            !1,
          ))
        : t &&
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.vao.HitResult,
            0,
            this.Ddn,
          ),
          e.SetActorLocation(
            this.Ddn.ToUeVector(),
            "SceneItemCaptureFixBornLocation",
            !1,
          )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "掉落幻象修正坐标", ["Pos", this.Ddn]);
  }
  Pdn(e, i, t, o) {
    if (this.Entity.Valid) {
      if (e instanceof UE.SkeletalMesh) {
        if (!i?.Valid) return;
        if (!this.l9e?.IsValid()) return;
        i.SkeletalMesh.SetSkeletalMesh(e),
          this.l9e.Init(2),
          this.l9e.AddComponentByCase(0, i.SkeletalMesh),
          i.SkeletalMesh.SetHiddenInGame(!0);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "模型加载失败！", ["ModelConfigId", t]);
      e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(void 0);
      (e.SkeletalMeshComp = i.SkeletalMesh),
        (this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(
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
                    this.l9e.AddComponentByCase(7, t),
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
                      this.xdn(e);
                    },
                  );
              },
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              AbsorbedStateEffectPath,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                this.xdn(e);
              },
            );
    }
  }
  xdn(e) {
    this.Entity.Valid &&
      (e
        ? ((this._9e = this.l9e.AddMaterialControllerDataGroup(e)),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Tdn,
            UE.AnimationAsset,
            (e) => {
              this.wdn(e);
            },
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法找到收服材质效果", [
            "AbsorbedStateEffectPath",
            AbsorbedStateEffectPath,
          ]));
  }
  wdn(e) {
    var t;
    this.Entity.Valid &&
      (e
        ? ((t = this.Entity.GetComponent(187).SkeletalMesh).PlayAnimation(
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
            this.Tdn,
          ]));
  }
  ExecuteCapture(e) {
    this.Ora = !0;
    var t = this.Entity.GetComponent(187).ActorLocationProxy,
      i = Global_1.Global.BaseCharacter.CharacterActorComponent,
      o = Vector_1.Vector.Create(t),
      n =
        (o.SubtractionEqual(i.ActorLocationProxy),
        (o.Z = 0),
        o.Normalize(),
        new UE.Rotator()),
      o =
        (o.ToOrientationRotator(n),
        i.Entity.GetComponent(38)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        i.SetActorRotation(n, this.constructor.name, !1),
        this.Ldn !== SpecialDropEntityConfigId &&
          ((o = i.Entity.GetComponent(34)) &&
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
        this.Entity.GetComponent(106));
    o && o.CloseInteract("触发收复后关闭交互"),
      this.Ldn &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
          this.Ldn,
        ),
      TimerSystem_1.TimerSystem.Delay(this.Udn, this.Idn),
      TimerSystem_1.TimerSystem.Delay(this.Adn, this.ydn),
      EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.rvi,
          "开始收服，关闭特效",
          !1,
        );
  }
};
(SceneItemCaptureComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(133)],
  SceneItemCaptureComponent,
)),
  (exports.SceneItemCaptureComponent = SceneItemCaptureComponent);
//# sourceMappingURL=SceneItemCaptureComponent.js.map
