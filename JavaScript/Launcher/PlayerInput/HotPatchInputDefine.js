"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.gamepadKeyPathMap =
    exports.SCROLLBAR_INTERVAL =
    exports.gamepadAxisInputMap =
    exports.gamepadActionInputMap =
    exports.pcInputMap =
    exports.axisMappings =
    exports.ANY_KEY =
      void 0),
  (exports.ANY_KEY = "AnyKey"),
  (exports.axisMappings = { 手柄右摇杆垂直方向: "手柄右摇杆垂直方向" }),
  (exports.pcInputMap = new Map([["UI左键点击", "LeftMouseButton"]])),
  (exports.gamepadActionInputMap = new Map([
    ["手柄右边上键", "Gamepad_FaceButton_Top"],
    ["手柄右边左键", "Gamepad_FaceButton_Left"],
    ["手柄右边右键", "Gamepad_FaceButton_Right"],
    ["手柄右边下键", "Gamepad_FaceButton_Bottom"],
    ["手柄LB", "Gamepad_LeftShoulder"],
    ["手柄LT", "Gamepad_LeftTrigger"],
    ["手柄RB", "Gamepad_RightShoulder"],
    ["手柄RT", "Gamepad_RightTrigger"],
  ])),
  (exports.gamepadAxisInputMap = new Map([
    [exports.axisMappings.手柄右摇杆垂直方向, ["Gamepad_RightY", 1]],
  ])),
  (exports.SCROLLBAR_INTERVAL = 800),
  (exports.gamepadKeyPathMap = new Map([
    [
      "Gamepad_FaceButton_Top",
      {
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsJian_UI.T_IconPcBtn_PsJian_UI",
      },
    ],
    [
      "Gamepad_FaceButton_Left",
      {
        XBox: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_XboxGamepad_FaceButton_Left_UI.T_IconPcBtn_XboxGamepad_FaceButton_Left_UI",
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsKuang_UI.T_IconPcBtn_PsKuang_UI",
      },
    ],
    [
      "Gamepad_FaceButton_Right",
      {
        XBox: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_KeyB_UI.T_IconPcBtn_KeyB_UI",
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsYuan_UI.T_IconPcBtn_PsYuan_UI",
      },
    ],
    [
      "Gamepad_FaceButton_Bottom",
      {
        XBox: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_KeyA_UI.T_IconPcBtn_KeyA_UI",
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsCha_UI.T_IconPcBtn_PsCha_UI",
      },
    ],
    [
      "Gamepad_LeftShoulder",
      {
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsL1_UI.T_IconPcBtn_PsL1_UI",
      },
    ],
    [
      "Gamepad_LeftTrigger",
      {
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsL2_UI.T_IconPcBtn_PsL2_UI",
      },
    ],
    [
      "Gamepad_RightShoulder",
      {
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsR1_UI.T_IconPcBtn_PsR1_UI",
      },
    ],
    [
      "Gamepad_RightTrigger",
      {
        Ps: "/Game/Aki/UI/Module/HotFix/Image/T_IconPcBtn_PsR2_UI.T_IconPcBtn_PsR2_UI",
      },
    ],
  ]));
//# sourceMappingURL=HotPatchInputDefine.js.map
