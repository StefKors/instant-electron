import './App.css';
import {db} from "./db.ts";
import {ElectronGoogleLoginButton} from "./ElectronGoogleLoginButton.tsx";
import {DataList} from "./dataList.tsx";


const App = () => {
    const {isLoading, user, error} = db.useAuth();

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>Uh oh! {error.message}</div>;
    }

    if (user) {
        return (
            <>
                <button onClick={() => db.auth.signOut()}>
                    sign out
                </button>
                <DataList/>
            </>
        )
    }

    return <ElectronGoogleLoginButton/>
}

export default App;
