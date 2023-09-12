import Widget from "./components/game-widget/game-widget";
import RemoteControl from "./components/remote-control/RemoteControl";
import CustomCursor from "./components/custom-cursor/custom-cursor";

const widget = new Widget(".box");
const remoteControl = new RemoteControl('.remote-control', widget);
const customCursor = new CustomCursor('.box');

// widget.startGame();
