"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, n);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(e, i, r) : s(e, i)) || r);
    return 3 < o && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnHeadInfoComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
  UiModel_1 = require("../../../../Ui/UiModel"),
  CharacterActorComponent_1 = require("./CharacterActorComponent"),
  CHECK_QUEST_ICON_INTERVAL = 1e3;
let PawnHeadInfoComponent = class PawnHeadInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.xJr = void 0),
      (this.wJr = void 0),
      (this.BJr = void 0),
      (this.bJr = void 0),
      (this.hor = void 0),
      (this.qJr = !1),
      (this.GJr = !1),
      (this.cna = !0),
      (this.e8 = 0),
      (this.NJr = !1),
      (this.R$a = !1),
      (this.NYs = () => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
          this.NYs,
        ),
          this.FYs();
      }),
      (this.OJr = () => {
        this.kJr(), this.FJr();
      }),
      (this.OnEntityWasRecentlyRenderedOnScreenChange = (t) => {
        if (this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
          var e = this.Hte;
          if (
            !e ||
            0 === e.PrefabRadius ||
            e.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass())
          )
            return void this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(!0);
        }
        this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(t);
      }),
      (this.iZe = (t, e) => {
        this.HJr();
      }),
      (this.jJr = () => {
        this.hor?.SetRootItemState(!1);
      }),
      (this.WJr = () => {
        if (this.hor) {
          var e = this.BJr?.GetInteractController();
          if (e && e.Options.length) {
            let t = !1;
            for (const n of e.Options)
              if (n.Context) {
                var i = this.U$a(n.Context);
                if (void 0 !== i) {
                  if (
                    ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                      n.Condition,
                      this.Hte.Owner,
                    )
                  )
                    return this.hor.SetNpcQuest(i), void (this.R$a = !1);
                  t = !0;
                }
              }
            t && (this.R$a = !0);
          } else this.hor.SetNpcQuest();
        }
      });
  }
  static get Dependencies() {
    return [1, 0];
  }
  OnStart() {
    return (
      (this.xJr = this.Entity.GetComponent(105)),
      (this.Hte = this.Entity.GetComponent(1)),
      (this.wJr = this.Entity.GetComponent(107)),
      (this.BJr = this.Entity.GetComponent(182)),
      (this.bJr = Vector_1.Vector.Create()),
      this.pie(),
      this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent
        ? EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBornFinished,
            this.NYs,
          )
        : this.FYs(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddDynamicOption,
        this.WJr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnRemoveDynamicOption,
        this.WJr,
      ),
      !0
    );
  }
  pie() {
    var t = this.Hte.CreatureData;
    t && ((t = t.GetBaseInfo()), (this.GJr = t?.IsShowNameOnHead ?? !1));
  }
  FYs() {
    this.xJr?.GetMessageId()
      ? this.FJr()
      : (this.NJr = EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.OJr,
        ));
  }
  FJr() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.iZe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.jJr,
      ),
      this.CreateCharacterIconComponentView();
  }
  kJr() {
    this.NJr &&
      ((this.NJr = !1),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterPresentationInitRange,
        this.OJr,
      ));
  }
  OnEnd() {
    return (
      this.kJr(),
      this.hor &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TextLanguageChange,
          this.iZe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.DisActiveBattleView,
          this.jJr,
        ),
        this.hor.Destroy()),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBornFinished,
        this.NYs,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
          this.NYs,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnAddDynamicOption,
        this.WJr,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnAddDynamicOption,
          this.WJr,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnRemoveDynamicOption,
        this.WJr,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRemoveDynamicOption,
          this.WJr,
        ),
      !0
    );
  }
  CreateCharacterIconComponentView() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("HudUnit", 51, "开始角色头顶组件初始化", [
        "PbDataId",
        this.Hte?.CreatureData.GetPbDataId(),
      ]),
      (this.hor = new NpcIconComponent_1.NpcIconComponent(this)),
      this.hor.AddNpcIconAsync(this.xJr?.GetMessageId()).then(() => {
        this.KJr();
      });
    var t = this.Entity.GetComponent(0).GetPbDataId();
    this.hor.SetEntityPbDataId(t);
  }
  KJr() {
    this.SetCharacterIconLocation(),
      this.HJr(),
      this.SetCharacterSecondName(),
      this.WJr();
  }
  SetCharacterIconLocation() {
    this.hor?.SetCharacterIconLocation();
  }
  HJr() {
    var t = this.xJr?.PawnName;
    this.hor?.SetCharacterName(t);
  }
  SetCharacterSecondName() {
    this.hor?.SetCharacterSecondName();
  }
  OnEnable() {
    this.hor?.SetHeadItemState(!0);
  }
  OnDisable() {
    this.hor?.SetHeadItemState(!1);
  }
  VJr() {
    return this.Entity.GetComponent(0).GetEntityType();
  }
  OnTick(t) {
    super.OnTick(t),
      this.R$a &&
        ((this.e8 += t), this.e8 > CHECK_QUEST_ICON_INTERVAL) &&
        ((this.e8 -= CHECK_QUEST_ICON_INTERVAL), this.WJr());
  }
  U$a(t) {
    let e = void 0;
    switch (t.Type) {
      case 2:
        var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        i && !i.HideAcceptQuestMark && (e = i.QuestMarkId);
        break;
      case 6:
        var n,
          i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            t.TreeIncId,
          );
        i &&
          i.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          (n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            t.TreeConfigId,
          )) &&
          4 === n.Type &&
          (n = i.GetNode(t.NodeId)) &&
          n.ContainTag(0) &&
          (e = i.GetTrackIconId());
    }
    return e;
  }
  SetDialogueText(t, e = -1, i = !1) {
    t =
      ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, !0) ??
      "";
    this.hor?.SetDialogueText(t, e, i);
  }
  HideDialogueText() {
    this.hor?.HideDialogueText();
  }
  GetSelfLocation() {
    return this.Hte.ActorLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem
      ? this.Hte.GetStaticMeshComponent()
      : this.Hte.SkeletalMesh;
  }
  GetAttachToSocketName() {
    return (
      this.xJr?.GetHeadStateSocketName() ??
      ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName()
    );
  }
  GetAttachToLocation(t) {
    var e,
      i = this.Hte;
    i
      ? ((e = i.SkeletalMesh.K2_GetComponentLocation()),
        t.Set(e.X, e.Y, e.Z + 2 * i.HalfHeight),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "HudUnit",
            51,
            "获取根头顶组件位置",
            ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
            ["RootLocation", t],
            ["ActorLocation", i.ActorLocationProxy],
            ["MeshLocation", e],
          ))
      : t.FromUeVector(this.Hte.SkeletalMesh.K2_GetComponentLocation());
  }
  GetAddOffsetZ() {
    return this.xJr?.GetHeadStateOffset() ?? 0;
  }
  IsShowNameInfo() {
    return this.GJr;
  }
  IsShowQuestInfo() {
    return this.qJr;
  }
  IsDialogTextActive() {
    return this.hor?.IsDialogueTextActive() ?? !1;
  }
  CanTick() {
    return (
      !!this.wJr &&
      (this.cna &&
      !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
      UiModel_1.UiModel.IsInMainView
        ? (this.hor?.SetRootItemState(!0), !0)
        : (this.hor?.SetRootItemState(!1), !1))
    );
  }
  IsInHeadItemShowRange(t, e, i) {
    var n = this.Entity.GetComponent(0)?.GetPbDataId(),
      n = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(n);
    if (n && 1 !== n.TrackSource) {
      var s = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (s)
        return (
          this.bJr.DeepCopy(this.GetSelfLocation()),
          Vector_1.Vector.DistSquared(s, this.bJr) <
            n.TrackHideDis * n.TrackHideDis * 100 * 100
        );
    }
    return t < e && i < t;
  }
  GetRootItemState() {
    return !!this.hor?.GetRootItemState();
  }
  EnableHeadInfo(t) {
    this.cna !== t && (this.cna = t);
  }
};
(PawnHeadInfoComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(73)],
  PawnHeadInfoComponent,
)),
  (exports.PawnHeadInfoComponent = PawnHeadInfoComponent);
//# sourceMappingURL=PawnHeadInfoComponent.js.map
