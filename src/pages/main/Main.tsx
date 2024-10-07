import GeneralCard from "../../entities/GeneralCard/GeneralCard.tsx";
import {useEffect, useState} from "react";
import {GeneralInfo} from "../../shared/types/types.ts";
import StudentTable from "../../widgets/StudentTable/StudentTable.tsx";
import axios from "axios";
import {endpoints} from "../../shared/api/api-config.ts";

const Main = () => {
    const [currentGeneral, setCurrentGeneral] = useState<null | GeneralInfo>(null)

    useEffect(() => {
        axios.get(endpoints.getCurrentGeneral).then(response => setCurrentGeneral(response.data))
    }, [])

    return (
        <div>
            <GeneralCard cardInfo={currentGeneral}/>
            <StudentTable/>
        </div>
    );
};

export default Main;