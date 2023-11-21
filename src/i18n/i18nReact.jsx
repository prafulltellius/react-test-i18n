import {  useState,useEffect } from 'react';
import { getI18nInstance } from './i18Instances';




export default function withTranslation(Component){
    const i18Instance = getI18nInstance()
    function AppWith18n(props){
        const [lang,setLangauge] = useState({});
        useEffect(()=>{
            i18Instance.on('languageChanged',(language)=>{
                setLangauge(language)
            })
        },[setLangauge])

        return <Component {...props} lang={lang} />
    }

    return AppWith18n;
}

