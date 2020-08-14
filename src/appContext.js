import { createContext } from 'react'

const AppContext = createContext({
    loading: false,
    login: false
});

export default AppContext;
