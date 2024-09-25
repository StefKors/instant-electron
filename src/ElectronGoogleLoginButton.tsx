import {db} from "./db.ts";
import {useEffect} from "react";

const CLIENT_NAME = 'Kosmik'
const APP_LINK = 'kosmik-instant://instant_oauth'

export const ElectronGoogleLoginButton = () => {
    const handleGoogleClick = async () => {
        const url = db.auth.createAuthorizationURL({
            clientName: CLIENT_NAME,
            redirectURL: APP_LINK
        });
        window.open(url);
    };

    useEffect(() => {
        const handleAuthCode = (event: CustomEvent) => {
            const oauth_code = event.detail.replace(APP_LINK, '');
            const params = new URLSearchParams(oauth_code);
            const code = params.get('code');
            if (code) {
                db.auth
                    .exchangeOAuthCode({code, codeVerifier: null})
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err.body?.message));
            }
        };

        window.addEventListener('auth-code', handleAuthCode as EventListener);
        return () => {
            window.removeEventListener('auth-code', handleAuthCode as EventListener);
        };
    }, []);

    return (
        <button onClick={handleGoogleClick}>
            Continue with Google
        </button>
    );
};