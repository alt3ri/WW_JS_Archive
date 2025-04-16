"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetSubLevelsVisible = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  SubLevelController_1 = require("../../World/Controller/SubLevelController"),
  LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  ALLINPUTTAG = "BlockAllInputTag";
class LevelEventSetSubLevelsVisible extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.lW_ = void 0),
      (this.if1 = void 0),
      (this.cW_ = 0),
      (this.nx = void 0);
  }
  ExecuteInGm(e, t) {
    this.ExecuteNew(e, t);
  }
  ExecuteNew(e, t) {
    e &&
      (e
        ? this.cC1(e, t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible 参数不正确",
          ));
  }
  cC1(e, t) {
    (this.nx = t),
      this.qSr(),
      this.Pf1(),
      this.dW_(e).then(() => {
        this.xf1(), this.FinishExecute(!0);
      });
  }
  OnTick(e) {
    var t;
    LevelEventSetSubLevelsVisible.uC1 ||
      LevelEventSetSubLevelsVisible.$Er.Empty ||
      ((t = LevelEventSetSubLevelsVisible.$Er.Pop()) &&
        this.cC1(t.Params, t.Context));
  }
  async dW_(t) {
    (LevelEventSetSubLevelsVisible.uC1 = !0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelEvent",
          18,
          "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 开始",
          ["ActionId", this.Id],
          ["GroupId", this.GroupId],
        );
    var i,
      l = t.TransitionOption;
    if (l) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelEvent",
          18,
          "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 开始执行转换表现",
          ["ActionId", this.Id],
          ["GroupId", this.GroupId],
        ),
        l.SceneCaptureEffect &&
          !StringUtils_1.StringUtils.IsBlank(l.SceneCaptureEffect) &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 开始播放SceneCaptureEffect特效",
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.KuroCaptureSceneColor.Release",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.KuroCaptureSceneColor.ImmediateCapture 5",
          ),
          (this.cW_ = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            Global_1.Global.BaseCharacter?.D_GetTransform(),
            l.SceneCaptureEffect,
            "[LevelEventSetSubLevelsVisible]",
            void 0,
            3,
            void 0,
            (e) => {
              this.lW_.SetResult(e);
            },
          )),
          5 !== (i = await this.lW_.Promise) &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 加载屏幕特效错误",
              ["loadResult", i],
              ["SceneCaptureEffectPath", l.SceneCaptureEffect],
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible SceneCaptureEffect特效播放成功",
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          );
      let e = void 0;
      l.ScreenEffectLoop &&
        !StringUtils_1.StringUtils.IsBlank(l.ScreenEffectLoop) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 准备开始播放ScreenEffectLoop特效",
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          ),
        (e = await this.mW_(l.ScreenEffectLoop)),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "LevelEvent",
          18,
          "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible ScreenEffectLoop已经打开",
          ["ActionId", this.Id],
          ["GroupId", this.GroupId],
        ),
        TimerSystem_1.TimerSystem.Next(() => {
          this.if1.SetResult();
        }),
        await this.if1.Promise,
        await this.fW_(t),
        l.ScreenEffect &&
          !StringUtils_1.StringUtils.IsBlank(l.ScreenEffect) &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 生成ScreenEffect",
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ),
          await this.mW_(l.ScreenEffect),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 生成ScreenEffect结束",
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          ),
        e?.IsValid() &&
          (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
            e,
          ),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 关闭ScreenEffectLoop",
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          ),
        EffectSystem_1.EffectSystem.IsValid(this.cW_) &&
          (EffectSystem_1.EffectSystem.StopEffectById(
            this.cW_,
            "[WorldLevelUpView.RecycleEffect]",
            !1,
          ),
          (this.cW_ = 0),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 关闭ScreenCapture特效",
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          ),
        (LevelEventSetSubLevelsVisible.uC1 = !1);
    } else await this.fW_(t);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "LevelEvent",
        18,
        "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible 切换流程结束",
        ["ActionId", this.Id],
        ["GroupId", this.GroupId],
      );
  }
  async fW_(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "LevelEvent",
        18,
        "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible SetVisibleImp开始",
        ["ActionId", this.Id],
        ["GroupId", this.GroupId],
      );
    var t = new Array();
    if (e.EnableLevels) for (const i of e.EnableLevels) t.push(this.icc(i));
    if (((t.length = 0), e.DisableLevels))
      for (const l of e.DisableLevels) t.push(this.rcc(l));
    ControllerHolder_1.ControllerHolder.SubLevelController.RequestSetSubLevelVisible(
      e.EnableLevels,
      e.DisableLevels,
    ),
      await Promise.all(t),
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.RefreshCurrentFloor(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelEvent",
          18,
          "执行行为.LevelEventSetSubLevelsVisible:StartSetSubLevelsVisible SetVisibleImp结束",
        );
  }
  async icc(e) {
    var t, i;
    this.ee1(e, "enable") ||
      ((i = (t =
        ModelManager_1.ModelManager.SubLevelModel).GetPreloadOrLoadedSubLevel(
        e,
      ))?.Level
        ? (await i.SetLevelVisible(
            !0,
            "LevelEventSetSubLevelsVisible.EnableLevel",
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible:EnableLevel",
              ["levelPath", e],
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ),
          t.MovePreloadSubLevelToSubLevel(e))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible 想要enable的子关卡没有预加载,强制执行加载后显示",
              ["subLevelPath", e],
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ),
          await SubLevelController_1.SubLevelController.LoadSubLevel(e, !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible 想要enable的子关卡没有预加载,强制加载显示完毕",
              ["subLevelPath", e],
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            )));
  }
  async rcc(e) {
    var t;
    this.ee1(e, "disable") ||
      ((t =
        ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(
          e,
        )) && t.Level
        ? (await t.SetLevelVisible(
            !1,
            "LevelEventSetSubLevelsVisible.DisableLevel",
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "执行行为.LevelEventSetSubLevelsVisible:DisableLevel",
              ["levelPath", e],
              ["ActionId", this.Id],
              ["GroupId", this.GroupId],
            ))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible 想要Disable的子关卡没有加载",
            ["subLevelPath", e],
            ["ActionId", this.Id],
            ["GroupId", this.GroupId],
          ));
  }
  async mW_(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      UE.EffectScreenPlayData_C,
      (e) => {
        t.SetResult(e);
      },
    );
    var i = await t.Promise;
    return (
      i.IsValid()
        ? ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
            i,
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            18,
            "执行行为.LevelEventSetSubLevelsVisible 屏幕特效资源无效",
            ["effectPath", e],
          ),
      i
    );
  }
  ee1(e, t) {
    if (!StringUtils_1.StringUtils.IsBlank(e)) return !1;
    let i = "";
    if (this.nx)
      switch (this.nx.Type) {
        case 1:
          var l = EntitySystem_1.EntitySystem.Get(
            this.nx.EntityId,
          )?.GetComponent(0);
          i = (l?.GetPbDataId() ?? 0).toString();
          break;
        case 6:
          i = this.nx.TreeConfigId + "_" + this.nx.NodeId;
      }
    t = `想要${t}的子关卡路径为空,配置来源：` + i;
    return (
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
        t,
      ),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          18,
          "执行行为.LevelEventSetSubLevelsVisible 想要disable的子关卡路径为空",
          ["subLevelPath", e],
          ["source", i],
        ),
      !0
    );
  }
  qSr() {
    (this.lW_ = new CustomPromise_1.CustomPromise()),
      (this.if1 = new CustomPromise_1.CustomPromise());
  }
  gW_() {
    (this.lW_ = void 0), (this.if1 = void 0);
  }
  Pf1() {
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
      ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
          ALLINPUTTAG,
        ),
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag())
      : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
          ALLINPUTTAG,
        ),
        LevelEventLockInputState_1.LevelEventLockInputState.Lock([
          ALLINPUTTAG,
        ]));
  }
  xf1() {
    var e;
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput() &&
      (0 <=
        (e =
          LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.findIndex(
            (e) => e === ALLINPUTTAG,
          )) &&
        LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.splice(
          e,
          1,
        ),
      0 ===
        LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames
          .length) &&
      (LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag());
  }
  OnFinish() {
    this.gW_(), (this.nx = void 0);
  }
}
((exports.LevelEventSetSubLevelsVisible = LevelEventSetSubLevelsVisible).uC1 =
  !1),
  (LevelEventSetSubLevelsVisible.$Er = new Queue_1.Queue());
//# sourceMappingURL=LevelEventSetSubLevelsVisible.js.map
