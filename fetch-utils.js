const SUPABASE_URL = 'https://vrgnnbxjpirhnspwbtxy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZ25uYnhqcGlyaG5zcHdidHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMDM4ODksImV4cCI6MTk2Nzg3OTg4OX0.pLi2lpE10QoZGWcQundIQW6sYkcpvCsuLewA1q7lto8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function getWorkshops() {
    const resp = await client.from('workshops').select('*, participants(*)');
    if (resp.error) {
        console.error(resp.error.message);
    } else {
        return resp.data;
    }
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
