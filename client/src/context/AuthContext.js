import {createContext , useReducer} from "react" ; 
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user: {
        _id : "61c18f5166b2f80e99b52b5b",
        username : "mparyabi",
        email : "mparyabi@gmail.com",
        password : "$2b$10$PsXGK7AvubK.Ciudwh9cCuKgFlkqWVjq/2HdtvAkEOaiHPLYKYivW",
        profilePicture : "",
        coverPicture : "",
        followers : [ 
            "61b98ac7289ca3d4369dda62"
        ],
        followings : [ 
            "61b98ac7289ca3d4369dda62"
        ],
        isAdmin : false,
        desc : "",
        city : "",
        from : "",
        createdAt : "2021-12-21T08:24:49.352Z",
        updatedAt : "2021-12-21T08:24:49.352Z",
        __v : 0
    },
    isFetching : false ,
    error:false
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider value={{
        user:state.user ,
        isFetching:state.isFetching ,
        error:state.error,
        dispatch
          }}>
              {children}
        </AuthContext.Provider>
    )
}
