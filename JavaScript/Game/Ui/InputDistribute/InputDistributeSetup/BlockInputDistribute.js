"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlockInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BlackScreenFadeController_1 = require("../../../Module/BlackScreen/BlackScreenFadeController"),
  InputDistributeDefine_1 = require("../InputDistributeDefine"),
  InputDistributeSetup_1 = require("./InputDistributeSetup");
class BlockInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    var t;
    return this.Bc_()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Input",
            50,
            "[InputDistribute]无缝加载过渡场景中，只允许角色轴向输入",
          ),
        this.SetInputDistributeTag(
          InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
            .AxisInputTag,
        ),
        !0)
      : this.v$e()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Input",
              10,
              "[InputDistribute]加载中设置输入分发tag为 MouseInputTag NavigationTag",
            ),
          this.SetInputDistributeTags([
            InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
              .MouseInputTag,
            InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
              .NavigationTag,
          ]),
          !0)
        : this.Udr()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Input",
                10,
                "[InputDistribute]断线中，则设置输入分发tag为 BlockAllInputTag",
              ),
            this.SetInputDistributeTag(
              InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
            ),
            !0)
          : this.oIa()
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Input",
                  10,
                  "[InputDistribute]Sdk打开界面，则设置输入分发tag为 BlockAllInputTag",
                ),
              this.SetInputDistributeTag(
                InputDistributeDefine_1.inputDistributeTagDefine
                  .BlockAllInputTag,
              ),
              !0)
            : this.Adr()
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Input",
                    17,
                    "[InputDistribute]战斗结算中设置输入分发tag为 BlockAllInputTag",
                  ),
                this.SetInputDistributeTag(
                  InputDistributeDefine_1.inputDistributeTagDefine
                    .BlockAllInputTag,
                ),
                !0)
              : ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Input",
                      48,
                      "[InputDistribute]死亡界面打开中设置输入分发tag为 BlockAllInputTag",
                    ),
                  this.SetInputDistributeTag(
                    InputDistributeDefine_1.inputDistributeTagDefine
                      .BlockAllInputTag,
                  ),
                  !0)
                : this.Pdr()
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Input",
                        45,
                        "[InputDistribute]黑幕中，则设置输入分发tag为 MouseInputTag",
                      ),
                    this.SetInputDistributeTag(
                      InputDistributeDefine_1.inputDistributeTagDefine
                        .UiInputRoot.MouseInputTag,
                    ),
                    !0)
                  : CameraController_1.CameraController.IsSequenceCameraInCinematic()
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "Input",
                          10,
                          "[InputDistribute]玩家角色在播放处决中，大招中等镜头时，只允许角色技能输入，设置输入分发tag为 CharacterSkillInputTag",
                        ),
                      this.SetInputDistributeTag(
                        InputDistributeDefine_1.inputDistributeTagDefine
                          .FightInputRoot.ActionInput.CharacterSkillInputTag,
                      ),
                      !0)
                    : ModelManager_1.ModelManager.MapModel?.IsInUnopenedAreaPullback()
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Input",
                            10,
                            "[InputDistribute]角色进入未开放区域启动拉回，设置输入分发tag为 MouseInputTag",
                          ),
                        this.SetInputDistributeTag(
                          InputDistributeDefine_1.inputDistributeTagDefine
                            .UiInputRoot.MouseInputTag,
                        ),
                        !0)
                      : this.qc_()
                        ? (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Input",
                              50,
                              "[InputDistribute]角色处于载具攀瀑状态，禁止所有输入",
                            ),
                          this.SetInputDistributeTag(
                            InputDistributeDefine_1.inputDistributeTagDefine
                              .BlockAllInputTag,
                          ),
                          !0)
                        : (t =
                              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                                203,
                              )) && t.HasTag(191377386)
                          ? (Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Input",
                                10,
                                "[InputDistribute]角色落水中，则设置输入分发tag为 MouseInputTag",
                              ),
                            this.SetInputDistributeTag(
                              InputDistributeDefine_1.inputDistributeTagDefine
                                .UiInputRoot.MouseInputTag,
                            ),
                            !0)
                          : ModelManager_1.ModelManager.MenuModel
                                ?.IsWaitForKeyInput
                            ? (Log_1.Log.CheckInfo() &&
                                Log_1.Log.Info(
                                  "Input",
                                  10,
                                  "[InputDistribute]玩家设置按键中，则设置输入分发tag为 NavigationTag",
                                ),
                              this.SetInputDistributeTags([
                                InputDistributeDefine_1.inputDistributeTagDefine
                                  .UiInputRoot.NavigationTag,
                                InputDistributeDefine_1.inputDistributeTagDefine
                                  .UiInputRoot.MouseInputTag,
                              ]),
                              !0)
                            : !!ModelManager_1.ModelManager
                                .GeneralLogicTreeModel.DisableInput &&
                              (Log_1.Log.CheckInfo() &&
                                Log_1.Log.Info(
                                  "Input",
                                  10,
                                  "[InputDistribute]行为配置禁用输入 设置输入分发tag为 BlockAllInputTag",
                                ),
                              this.SetInputDistributeTag(
                                InputDistributeDefine_1.inputDistributeTagDefine
                                  .BlockAllInputTag,
                              ),
                              !0);
  }
  Bc_() {
    return (
      ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
      ModelManager_1.ModelManager.TeleportModel.IsInSeamlessTeleport
    );
  }
  v$e() {
    return ModelManager_1.ModelManager.LoadingModel.IsLoading;
  }
  Udr() {
    return (
      1 === ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus()
    );
  }
  oIa() {
    return ModelManager_1.ModelManager.KuroSdkModel.GetSdkFocusState();
  }
  Pdr() {
    return BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis;
  }
  Adr() {
    return ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement;
  }
  qc_() {
    return !!Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(
      226,
    )?.VehicleEntity?.GetComponent(242)?.IsWaterfallMove;
  }
}
exports.BlockInputDistribute = BlockInputDistribute;
//# sourceMappingURL=BlockInputDistribute.js.map
