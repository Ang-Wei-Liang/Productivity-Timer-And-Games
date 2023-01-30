import React from "react";



const PracticeContext = React.createContext()

const PracticeProvider = ({children}) => {
    const [data, setData] = React.useState("None")
    return(
        <PracticeContext.Provider value={{
            data, setData
        }}>
           {children}
        </PracticeContext.Provider>
    )
}

export {PracticeContext,PracticeProvider}
//xProvider xContent