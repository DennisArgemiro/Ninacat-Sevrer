import { createClient } from '@supabase/supabase-js'

const URL = "https://ioaemblrnvviqzueifez.supabase.co"
const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvYWVtYmxybnZ2aXF6dWVpZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzNDc2MjgsImV4cCI6MTk4OTkyMzYyOH0.mJHoGZ5lYDs-8PN4eNT7BHS8pAtHIYCy_g_RPOIJYgQ"

const supabase = createClient(URL, Key)

async function login() {
    const { data, error } = await supabase.auth.signUp({
        email: 'dennisarg2011@gmail.com',
        password: 'supapassword',
    })
}
login()

async function select(database, filter = undefined, equals = '') {

    const eq = equals != '' ? { colunm: equals.colunm, value: equals.value } : { colunm: "", value: "" }
    if (filter != undefined) {
        const { data, error } = await supabase.from(database).select(`${filter}`).eq(eq.colunm, eq.value)
        return error ? error : data;

    } else {
        const { data, error } = await supabase.from(database).select().eq(eq.colunm, eq.value)
        return error ? error : data;
    }

}

async function insert(database,content) {
    const { data, error } = await supabase.from(database).insert(content).select()

    return error ? error : {msg: "Cadastro realisado com sucesso!", userCreated: {
        name: content.name,
        username: content.username,
        password: "hidden",
        uid: content.uid
    }};
}

async function update(database, values, equals) {
    const eq = equals != '' ? { colunm: equals.colunm, value: equals.value } : { colunm: "", value: "" }

    const { data, error } = await supabase.from(database).update(values).eq(eq.colunm, eq.value).select()

    return error ? error : data;
}

async function _delete(database, equals) {
    const eq = equals != '' ? { colunm: equals.colunm, value: equals.value } : { colunm: "", value: "" }
    const data = await select(undefined, { colunm: eq.colunm, value: eq.value })
    const { error } = await supabase.from(database).delete().eq(eq.colunm, eq.value)

    return error ? error : { msg: "Deletado com sucesso!", userDeleted: data }
}

export {
    select,
    insert,
    update,
    _delete
}