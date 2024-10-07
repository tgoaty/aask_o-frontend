import {HTMLAttributes, PropsWithChildren, FC, useState, useEffect, Key} from 'react';
import axios from 'axios';
import type {TableProps} from 'antd';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Switch} from 'antd';
import {endpoints} from "../../shared/api/api-config.ts";


interface Resident {
    id: number;
    name: string;
    surname: string;
    room: string;
    course: number;
    score: number;
    workingOff: number;
    work: boolean;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'boolean';
    record: Resident;
    index: number;
}

interface ColumnType {
    id: string,
    ellipsis?: boolean,
    title: string,
    dataIndex?: string,
    key: string,
    editable?: boolean,
    width: string,
    render?: (_: any, record: Resident) => any
}

const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
                                                                    editing,
                                                                    dataIndex,
                                                                    title,
                                                                    inputType,
                                                                    record,
                                                                    index,
                                                                    children,
                                                                    ...restProps
                                                                }) => {
    let inputNode;
    if (inputType === 'number') {
        inputNode = <InputNumber/>;
    } else if (inputType === 'boolean') {
        inputNode = <Switch checked={record.work}/>;
    } else {
        inputNode = <Input/>;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex as any}
                    style={{margin: 0}}
                    rules={[{required: true, message: `Please Input ${title}!`}]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const AdminTable: FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<Resident[]>([]);  // Начальное значение - пустой массив
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        axios.get(endpoints.getFullTable)
            .then((response) => {
                setData(response.data);  // Убедитесь, что response.data - массив
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const isEditing = (record: Resident) => record.id.toString() === editingKey;

    const edit = (record: Partial<Resident> & { id: Key }) => {
        form.setFieldsValue({
            name: '',
            surname: '',
            room: '',
            course: 0,
            score: 0,
            workingOff: 0,
            work: false, ...record
        });
        setEditingKey(record.id.toString());
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: Key) => {
        try {
            const row = (await form.validateFields()) as Resident;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                const updatedResident = {...item, ...row};

                // Отправляем запрос на сервер для обновления данных
                await axios.put(`/api/your-endpoint/${updatedResident.id}`, updatedResident);

                newData.splice(index, 1, updatedResident);
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteResident = async (id: number) => {
        try {
            // Удаление пользователя с сервера
            await axios.delete(`/api/your-endpoint/${id}`);

            const newData = data.filter((item) => item.id !== id);
            setData(newData);
        } catch (errInfo) {
            console.log('Delete Failed:', errInfo);
        }
    };

    const columns: {
        title: string,
        dataIndex: string,
        width: string,
        editable: boolean,
        render?: (_: any, record: Resident) => any
    }[] = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '10%',
            editable: false
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            width: '15%',
            editable: true,
        },
        {
            title: 'Room',
            dataIndex: 'room',
            width: '10%',
            editable: true,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            width: '10%',
            editable: true,
        },
        {
            title: 'Score',
            dataIndex: 'score',
            width: '10%',
            editable: true,
        },
        {
            title: 'Working Off',
            dataIndex: 'workingOff',
            width: '10%',
            editable: true,
        },
        {
            title: 'Work',
            dataIndex: 'work',
            width: '10%',
            editable: true,
            render: (_: any, record: Resident) => (record.work ? 'Yes' : 'No'),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: '10%',
            editable: false,
            render: (_: any, record: Resident) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                                         style={{marginRight: 8}}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteResident(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns: TableProps<Resident>['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        // @ts-ignore
        return {
            ...col,
            onCell: (record: Resident) => ({
                inputType: col.dataIndex === 'course' || col.dataIndex === 'score' || col.dataIndex === 'workingOff' ? 'number' : col.dataIndex === 'work' ? 'boolean' : 'text',
                record: record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        } as ColumnType;
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                rowKey="id"
            />
        </Form>
    );
};

export default AdminTable;
