import React, {useState} from 'react';
import s from './keypad.module.css';
import Button from '../button';
import cx from 'classnames';


export default function Keypad({sendData, isFinished, getResult, changeMemory}) {
  const [data, setData] = useState({"data":"", "result": "0" ,"button":""});

  const handleButtonClick = (button) => {
    // TODO: handle clicking here.
    isFinished(false);

    if (button == "x"){
      button = "*";
    }

    if(button == "÷"){
      button = "/";
    }

    if (button == "C"){
      setData({...data, ["data"]:"", ["result"]: "0", ["button"]:""});
      sendData({...data, ["data"]:"", ["result"]: "0", ["button"]:""});
    }
    else if ((button == ".") || (data["result"] != "0" && !(isNaN(button)))){
        if (!(data["result"].includes(".")) || (button != ".")){
          setData({...data, ["result"]: data["result"] + button, ["button"]: button});
          sendData({...data, ["result"]: data["result"] + button, ["button"]: button});
      }
    }
    else if (isNaN(button)){
          if (button == "+/-"){
            setData({...data, ["data"]: data["data"]+ "  -" + data["result"], ["result"]: "", ["button"]: button});
            sendData({...data, ["data"]: data["data"]+ "  -" + data["result"], ["result"]: "", ["button"]: button});
          }
          else if (!isNaN(data["data"].slice(-1)) || (data["result"] != "")){
            setData({...data, ["data"]: data["data"]+ " " + data["result"] + " " + button, ["result"]: "", ["button"]: button});
            sendData({...data, ["data"]: data["data"]+ " " + data["result"] + " " + button, ["result"]: "", ["button"]: button});
          }
          else{
            setData({...data, ["data"]: data["data"].slice(0, -1) + button, ["result"]: "", ["button"]: button});
            sendData({...data, ["data"]: data["data"].slice(0, -1) + button, ["result"]: "", ["button"]: button});
          }
    }
    else{
      setData({...data, ["result"]: button, ["button"]: button});
      sendData({...data, ["result"]: button, ["button"]: button});
    }

    if (getResult != ""){
      console.log("updateData:", getResult);
      let tmp = getResult;
      let tmp2 = getResult;
      if ((button == ".") || !(isNaN(button)) || (button=="C")){
        tmp = "0";
        tmp2 = "";
      }
      else{
          if (button == "+/-"){
            tmp = "";
            tmp2 = "- "+ tmp2;
          }
          else if (button == "="){
            tmp2 = "";
          }
          else{
            tmp = "";
            tmp2 = tmp2 + " " + button;
          }
      }
      setData({...data, ["result"]: tmp, ["button"]: button, ["data"]: tmp2});
      sendData({...data, ["result"]: tmp, ["button"]: button, ["data"]: tmp2});
      changeMemory("");
    }

    console.log(button);
  };
  console.log(data);


  const buttons = [
    { text: 'C', isDark: true },
    { text: '+/-', isDark: true },
    { text: '%', isDark: true },
    { text: '÷', isDark: true },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: 'x', isDark: true },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '-', isDark: true },
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '+', isDark: true },
    { text: '0', isLarge: true },
    { text: '.' },
    { text: '=', isDark: true },
  ];

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.text}
          text={button.text}
          onClick={handleButtonClick}
          className={cx(
            button.isLarge && s['button-2x'],
            button.isDark && s.dark,
          )}
        />
      ))}
    </div>
  );
}
