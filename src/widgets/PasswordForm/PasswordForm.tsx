import {Button, Form, Input} from 'antd';
import {FormEvent} from "react";
import {useStore} from "../../app/store/store.ts";

const PasswordForm = () => {
    const [form] = Form.useForm()
    const {setAdminPassword} = useStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        form.validateFields().then((value: { password: string }) => {
            localStorage.setItem('adminPassword', value.password)
            setAdminPassword(value.password)
        })
    }
    return (
        <div>
            <Form layout={"inline"} form={form} onSubmitCapture={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <Form.Item name="password" label="password">
                    <Input placeholder="password"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PasswordForm;