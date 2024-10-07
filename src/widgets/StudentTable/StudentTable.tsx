import {Table} from "antd"
import {useEffect, useState} from "react";
import {Resident} from "../../shared/types/types.ts";
import axios from "axios"
import {endpoints} from "../../shared/api/api-config.ts";

const StudentTable = () => {
    const [data, setData] = useState<Resident[] | null>(null)

    useEffect(() => {
        //Здесь отсееваю всех work === false
        axios.get(endpoints.getFullTable).then(response => setData(response.data.filter(item => item.work) as Resident[]))
    }, [])
    const columns = [
        {
            title: 'Комната',
            dataIndex: 'room',
            key: 'room'
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname'
        },
        {
            title: 'Кол-во отработок',
            dataIndex: 'score',
            key: 'score'
        },
        {
            title: 'Кол-во штрафных отработок',
            dataIndex: 'workingOff',
            key: 'workingOff'
        }
    ]

    return (
        <Table columns={columns} data={data}/>
    );
};

export default StudentTable;