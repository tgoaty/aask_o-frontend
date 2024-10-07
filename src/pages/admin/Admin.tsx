import {useStore} from "../../app/store/store.ts";
import PasswordForm from "../../widgets/PasswordForm/PasswordForm.tsx";
import AdminCurrentGeneral from "../../widgets/AdminCurrentGeneral/AdminCurrentGeneral.tsx";
import AdminNextGeneral from "../../widgets/AdminNextGeneral/AdminNextGeneral.tsx";
import AdminTable from "../../widgets/AdminTable/AdminTable.tsx";

const Admin = () => {
    const {adminPassword} = useStore()
    if (adminPassword !== 'roma-loh-228-420opg') {
        return <PasswordForm/>
    }

    return (
        <div>
            <AdminCurrentGeneral/>
            <AdminNextGeneral/>
            <AdminTable/>
        </div>
    );
};

export default Admin;