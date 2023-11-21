import { useState } from "react";
import { getLanguage, setLanguage } from "./i18n";
// import { useTranslation } from "react-i18next";

import './App.css';

const LanguageOptions = [
  {
    label: "English",
    value: "en"
  },
  {
    label: "हिंदी",
    value: "hi"
  },
  {
    label: "తెలుగు",
    value: "tel"
  }
];



const Select=({selectedLang,onChangeLanguage})=>{
  return (<select value={selectedLang} onChange={onChangeLanguage}>
  {LanguageOptions.map(({ label, value: optionValue }) => (
    <option key={optionValue} value={optionValue}>{label}</option>
  ))}
</select>)
}

const TextUpdate=()=>{
  return (<div><div>{__("Hello")}</div>
  <div>
    {__("Hello {{name}} working in {{job}}", {
      name: "Prafull",
      job: "Railway"
    })}
  </div></div>)

}




export default function App() {
  const language = getLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  const onChangeLanguage = (e) => {
    setSelectedLang(e.target.value);
    setLanguage(e.target.value);
  };


  return (
    <div className="App">
     
     <TextUpdate/>
        <Select selectedLang={selectedLang} onChangeLanguage={onChangeLanguage}/>
      {/* <div>
        {t(backendObj.name, {
          language: backendObj.language
        })}
      </div>

      <div>{t("Hello {{name}} working in {{job}}", backendObj)}</div> */}
      
    </div>
  );
}
