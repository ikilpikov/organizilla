import Layout from '../../components/Layout/Layout';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
const SettingsPage = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    if (isLoading) {
        return <></>;
    }

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar',
            },
        });
        if (error) {
            alert('ERROR');
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }
    return (
        <Layout>
            <div>
                <div>
                    {session ? (
                        <>
                            <h2>Hey {session.user.email}</h2>
                            <button onClick={() => signOut()}>Sign out with Google</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => googleSignIn()}>Sign in with Google</button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
