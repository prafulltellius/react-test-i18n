import {  useState,useEffect } from 'react';
import { getI18nInstance } from './i18Instances';




export default function withTranslation(Component){
    const i18Instance = getI18nInstance()
    function AppWith18n(props){
        const [rerender,forceRerender] = useState({});

        useEffect(()=>{
            i18Instance.on('languageChanged',()=>{
                forceRerender({})
            })
        },[forceRerender])

        return <Component {...props} />
    }

    return AppWith18n;
}

