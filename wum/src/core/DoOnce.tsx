import { useReducer } from "react";

type DoOnceState = {
    value: boolean
};

export default function useDoOnce<Payload>(callback: (p: Payload) => boolean) {
    return useReducer(
        (state: DoOnceState, action: boolean | Payload) => {
            console.log(state)
            console.log(action)
            if(action === true || action === false)
                return { value: action };
            return state.value ? state : { value: callback(action) }
        },
        { value: false }
    )[1];
}

//export default (callback: any) => useReducer((state: DoOnceState, action: ) => (state ? state : callback), false)[1];