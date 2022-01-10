import React, {useState} from 'react';
import Keypad from '../keypad';
import Screen from '../screen';
import s from './calculator.module.css';


export default function Calculator() {
  // TODO: Implement calculator logic here
  const [data, setData] = useState({"data":"", "result":"0", "button":""});
  const [memory, setMemory] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  switch (data.button){
    case '=':{
      if (!isFinished){
        var ans='';
        try{
          ans = eval(data.data.slice(0,-1));
          ans = ans.toString();
          setMemory(ans);
        }
        catch(err){
          console.log(err);
        }
        setData({...data, "result": ans, "data":"", "button":""});
        setIsFinished(true);
        break;
      }
      break;
  }
  case 'C': {
    console.log("dw");
    if (!isFinished){
      setData({...data, "result": "0", "data":"", "button":""});
      setIsFinished(true);
      break;
    }
     break;
   }
}

  console.log("calculator data: " + data.data , data.result, data.button);

  return (
    <div className={s.calculator}>
      <Screen text = {data.data + " " +data.result} />
      <Keypad sendData={(newData) => setData({...newData, "data":newData.data,"result": newData.result ,"button": newData.button})}
      isFinished={(t) => setIsFinished(t)} getResult={memory} changeMemory={(v) => setMemory(v)}/>
    </div>
  );
}
