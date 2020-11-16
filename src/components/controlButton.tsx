import React, { useState } from "react";
import { AnimationItem } from "lottie-web";
import Lottie from "lottie-web";
import _ from "lodash";

type AnimationRealItem = AnimationItem & {
  totalFrames: number;
};
interface IProps {
  animObj: AnimationRealItem;
  setDuration: (key: number) => void;
  initAnim: () => void;
}

const ControlButton: React.FC<IProps> = (props) => {
  // 设置播放/暂停
  const [isPlay, setPlay] = useState(true);
  const togglePlay = () => {
    isPlay ? props.animObj.pause() : props.animObj.play();
    setPlay(!isPlay);
  };

  // 设置动画速度
  const [curSpeed, setCurSpeed] = useState(1);
  const toggleSpeed = () => {
    const speedList = [0.5, 1, 1.5, 2];
    const setNextSpeed =
      speedList.indexOf(curSpeed) === speedList.length - 1
        ? speedList[0]
        : speedList[speedList.indexOf(curSpeed) + 1];
    props.animObj.setSpeed(setNextSpeed);
    props.setDuration(props.animObj.getDuration(false));
    setCurSpeed(setNextSpeed);
  };

  // 前进到动画1/2帧并开始播放
  const toggleGoAndStop = () => {
    setPlay(false);
    props.animObj.goToAndStop(props.animObj.totalFrames / 2);
    props.animObj.pause();
  };

  // 前进到动画1/2帧并停止播放
  const toggleGoAndPlay = () => {
    props.animObj.goToAndPlay(props.animObj.totalFrames / 2);
  };

  // 设置动画方向
  const [isPositive, setPositive] = useState(true);
  const toggleDirection = () => {
    const direction = isPositive ? -1 : 1;
    props.animObj.setDirection(direction);
    setPositive(!isPositive);
  };

  // 设置播放指定帧并决定播放时机
  const [playNow, setPlayNow] = useState(true);
  const togglePlaySpecifyFrames = () => {
    props.animObj.playSegments([1, 20], playNow);
    setPlayNow(!playNow);
  };

  // 销毁或者重建动画
  const [isDestroy, setIsDestroy] = useState(false);
  const toggleIfDestroy = () => {
    if (isDestroy) {
      props.initAnim();
    } else {
      props.animObj.destroy();
    }
    setIsDestroy(!isDestroy);
  };

  const controlList = [
    { name: isPlay ? "暂停" : "播放", onClick: togglePlay },
    { name: `设置速度：当前速度${curSpeed}`, onClick: toggleSpeed },
    { name: "前进到动画1/2帧并开始播放", onClick: toggleGoAndPlay },
    { name: "前进到动画1/2帧并停止播放", onClick: toggleGoAndStop },
    {
      name: `设置方向：当前方向${isPositive ? "正向" : "反向"}`,
      onClick: toggleDirection,
    },
    {
      name: `播放动画1-20帧，${playNow ? "立即播放" : "当前动画结束后播放"}`,
      onClick: togglePlaySpecifyFrames,
    },
    {
      name: `${isDestroy ? "重建动画" : "销毁动画"}`,
      onClick: toggleIfDestroy,
    },
  ];
  if (_.isUndefined(props.animObj.totalFrames)) return null;
  return (
    <div className="control_box">
      {controlList.map((button) => (
        <div className="button" onClick={button.onClick} key={button.name}>
          <span>{button.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ControlButton;
